import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { pedidoSelected } from "../../../store/pedidos/pedidos.selector";
import {
  deletePedido,
  setOperation,
} from "../../../store/pedidos/pedidos.actions";
import { OperationEnum } from "../../../store/pedidos/pedidos.reducer";
import { take } from "rxjs";

@Component({
  selector: "app-delete-pedido",
  templateUrl: "./delete-pedido.component.html",
  styleUrl: "./delete-pedido.component.css",
})
export class DeletePedidoComponent {
  store = inject(Store);

  public pedidoSelected$ = this.store.select(pedidoSelected);

  onDelete() {
    this.pedidoSelected$.pipe(take(1)).subscribe((ped) => {
      if (ped) {
        this.store.dispatch(deletePedido({ id: ped.id }));
        this.store.dispatch(setOperation({ op: OperationEnum.listing }));
      }
    });
  }
}
