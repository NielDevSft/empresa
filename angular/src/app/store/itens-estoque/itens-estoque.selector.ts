import { createSelector } from "@ngrx/store";

import { AppState } from "../app.state";
import { ItemEstoqueState } from "./itens-estoque.reducer";

export const selectItem = (state: AppState) => state.itensEstoque;
export const selectAllItensEstoque = createSelector(
  selectItem,
  (state: ItemEstoqueState) => state.itemEstoqueList
);
export const itensEstoqueelected = createSelector(
  selectItem,
  (state: ItemEstoqueState) => {
    return state.currentItemEstoque;
  }
);
export const currentOperation = createSelector(
  selectItem,
  (state: ItemEstoqueState) => {
    return state.currentOperation;
  }
);
