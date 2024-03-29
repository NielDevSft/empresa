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
import {
  getAllPedidosByUser,
  setCurrentPedido,
  setOperation,
} from "../../../store/pedidos/pedidos.actions";
import { OperationEnum } from "../../../models/enum/OperationEnum";

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
    "uuid",
    "desPedido",
    "profissionalResponsavel",
    "valorTotal",
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

  onEditPedido(uuid: string) {
    this.router.navigate(["pedido/edit/" + uuid]);
    this.store.dispatch(setOperation({ op: OperationEnum.updating }));
  }
  onDeletePedido(uuid: string) {
    this.router.navigate(["pedido/delete"]);
    this.store.dispatch(setCurrentPedido({ uuid: uuid }));
    this.store.dispatch(setOperation({ op: OperationEnum.deleting }));
  }

  ngOnInit(): void {
    this.store.dispatch(getAllPedidosByUser());
  }
}
