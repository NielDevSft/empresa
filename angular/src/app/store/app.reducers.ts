import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { pedidoReducer } from "./pedidos/pedidos.reducer";

export const appReducers: ActionReducerMap<AppState> = {
  pedidos: pedidoReducer,
};
