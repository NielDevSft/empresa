import { createSelector } from "@ngrx/store";
import { PedidoState } from "./pedidos.reducer";
import { AppState } from "../app.state";

export const selectPedido = (state: AppState) => state.pedidos;
export const selectAllPedidos = createSelector(
  selectPedido,
  (state: PedidoState) => state.pedidoList
);
