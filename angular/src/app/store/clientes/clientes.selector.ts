import { createSelector } from "@ngrx/store";
import { ClienteState } from "./clientes.reducer";
import { AppState } from "../app.state";

export const selectCliente = (state: AppState) => state.clientes;
export const selectAllItens = createSelector(
  selectCliente,
  (state: ClienteState) => state.clienteList
);
export const clienteSelected = createSelector(
  selectCliente,
  (state: ClienteState) => {
    return state.currentCliente;
  }
);
export const currentOperation = createSelector(
  selectCliente,
  (state: ClienteState) => {
    return state.currentOperation;
  }
);
