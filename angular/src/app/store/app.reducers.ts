import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { pedidoReducer } from "./pedidos/pedidos.reducer";
import { itemReducer } from "./itens/itens.reducer";
import { itemEstoqueReducer } from "./itens-estoque/itens-estoque.reducer";

export const appReducers: ActionReducerMap<AppState> = {
  pedidos: pedidoReducer,
  items: itemReducer,
  itensEstoque: itemEstoqueReducer,
};
