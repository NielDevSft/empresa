import { createSelector } from "@ngrx/store";

import { AppState } from "../app.state";
import { ItemEstoqueState } from "./itens-estoque.reducer";

export const selectItemEstoque = (state: AppState) => state.itensEstoque;
export const selectAllItensEstoque = createSelector(
  selectItemEstoque,
  (state: ItemEstoqueState) => state.itemEstoqueList
);
export const itensEstoqueSelected = createSelector(
  selectItemEstoque,
  (state: ItemEstoqueState) => {
    return state.currentItemEstoque;
  }
);
export const currentOperation = createSelector(
  selectItemEstoque,
  (state: ItemEstoqueState) => {
    return state.currentOperation;
  }
);
