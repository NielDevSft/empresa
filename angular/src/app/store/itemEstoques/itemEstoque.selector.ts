import { createSelector } from "@ngrx/store";

import { AppState } from "../app.state";
import { ItemEstoqueState } from "./itemEstoque.reducer";

export const selectItem = (state: AppState) => state.itemEstoques;
export const selectAllItens = createSelector(
  selectItem,
  (state: ItemEstoqueState) => state.itemEstoqueList
);
export const ItemEstoqueSelected = createSelector(
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
