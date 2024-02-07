import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, map, switchMap } from "rxjs";
import { setCurrentPedido } from "../../../store/pedidos/pedidos.actions";
import { pedidoSelected } from "../../../store/pedidos/pedidos.selector";

@Component({
  selector: "app-form-pedido",
  templateUrl: "./form-pedido.component.html",
  styleUrl: "./form-pedido.component.css",
})
export class FormPedidoComponent implements OnInit, OnDestroy {
  router = inject(ActivatedRoute);
  store = inject(Store);

  public pedidoSelected$ = this.store.select(pedidoSelected);

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      const idPedido = params["id"];
      if (!!idPedido) {
        this.store.dispatch(setCurrentPedido({ id: idPedido }));
      }
    });
  }
  ngOnDestroy(): void {
    this.store.dispatch(setCurrentPedido({ id: 0 }));
  }
}
