import { Component, inject } from "@angular/core";
import { selectAllPedidos } from "../../../store/pedidos/pedidos.selector";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map } from "rxjs";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { OperationEnum } from "../../../store/pedidos/pedidos.reducer";
import { setOperation } from "../../../store/pedidos/pedidos.actions";

@Component({
  selector: "app-consulta-pedido",
  templateUrl: "./consulta-pedido.component.html",
  styleUrl: "./consulta-pedido.component.css",
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
export class ConsultaPedidoComponent {
  store = inject(Store);
  router = inject(Router);

  public detalhesExpandidos: any;
  public displayedColumns = [
    "id",
    "desPedido",
    "profissionalResponsavel",
    "valorConsulta",
    "dataAgendamento",
    "createAt",
    "updateAt",
    "actions",
  ];

  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty("detailRow");

  public pedidoList$ = this.store.select(selectAllPedidos).pipe(
    map((data) => {
      const rows: any[] = [];
      data.forEach((element) =>
        rows.push(element, { detailRow: true, element })
      );
      return rows;
    })
  );

  onEditPedido(id: number) {
    this.router.navigate(["pedido/edit/" + id]);
    this.store.dispatch(setOperation({ op: OperationEnum.updating }));
  }

  ngOnInit(): void {
    // this.store.dispatch(getAllPedidosByUser());
  }
}
