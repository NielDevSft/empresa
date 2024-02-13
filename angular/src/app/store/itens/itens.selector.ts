import { createSelector } from "@ngrx/store";
import { ItemState } from "./itens.reducer";
import { AppState } from "../app.state";

export const selectItem = (state: AppState) => state.items;
export const selectAllItens = createSelector(
  selectItem,
  (state: ItemState) => state.itemList
);
export const itemSelected = createSelector(selectItem, (state: ItemState) => {
  return state.currentItem;
});
export const currentOperation = createSelector(
  selectItem,
  (state: ItemState) => {
    return state.currentOperation;
  }
);
