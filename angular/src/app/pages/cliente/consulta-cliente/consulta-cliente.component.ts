import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map } from "rxjs";
import {
  getAllClientesByUser,
  setCurrentCliente,
  setOperation,
} from "../../../store/clientes/clientes.actions";
import { OperationEnum } from "../../../models/enum/OperationEnum";
import { selectAllClientes } from "../../../store/clientes/clientes.selector";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-consulta-cliente",
  templateUrl: "./consulta-cliente.component.html",
  styleUrl: "./consulta-cliente.component.css",
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class ConsultaClienteComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);

  public detalhesExpandidos: any;
  public displayedColumns = [
    "nomeComleto",
    "dtaNascimento",
    "valRenda",
    "cpf",
    "createAt",
    "updateAt",
    "actions",
  ];

  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty("detailRow");

  public clienteList$ = this.store.select(selectAllClientes).pipe(
    map((data) => {
      const rows: any[] = [];
      data.forEach((element) =>
        rows.push(element, { detailRow: true, element })
      );
      return rows;
    })
  );

  onEditCliente(uuid: string) {
    this.router.navigate(["cliente/edit/" + uuid]);
    this.store.dispatch(setOperation({ op: OperationEnum.updating }));
  }
  onDeleteCliente(uuid: string) {
    this.router.navigate(["cliente/delete"]);
    this.store.dispatch(setCurrentCliente({ uuid: uuid }));
    this.store.dispatch(setOperation({ op: OperationEnum.deleting }));
  }

  ngOnInit(): void {
    this.store.dispatch(getAllClientesByUser());
  }
}
