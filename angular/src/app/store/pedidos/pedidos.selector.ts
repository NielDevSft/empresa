import { createSelector } from "@ngrx/store";
import { PedidoState } from "./pedidos.reducer";
import { AppState } from "../app.state";

export const selectPedido = (state: AppState) => state.pedidos;
export const selectAllPedidos = createSelector(
  selectPedido,
  (state: PedidoState) => state.pedidoList
);
export const pedidoSelected = createSelector(
  selectPedido,
  (state: PedidoState) => {
    return state.currentPedido;
  }
);
export const currentOperation = createSelector(
  selectPedido,
  (state: PedidoState) => {
    return state.currentOperation;
  }
);
