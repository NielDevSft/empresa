import { Component, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectAllPedidos } from "../../store/pedidos/pedidos.selector";
import { provideNativeDateAdapter } from "@angular/material/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { map } from "rxjs";

@Component({
  selector: "app-pedido",
  templateUrl: "./pedido.component.html",
  styleUrl: "./pedido.component.css",
  providers: [provideNativeDateAdapter()],
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
export class PedidoComponent implements OnInit {
  store = inject(Store);
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

  ngOnInit(): void {
    // this.store.dispatch(getAllPedidosByUser());
  }
}
