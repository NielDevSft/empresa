import { createReducer, on, createAction } from "@ngrx/store";
import { Item } from "../../models/Item";
import {
  createItem,
  deleteItem,
  getAllItensByUser,
  getAllItensByUserFailure,
  getAllItensByUserSuccess,
  updateItem,
  setCurrentItem,
  setOperation,
} from "./itens.actions";

import { StatusEnum } from "../../models/enum/StatusEnum";
import { OperationEnum } from "../../models/enum/OperationEnum";

export interface ItemState {
  itemList: Item[];
  currentItem: Item | null;
  currentOperation: OperationEnum;
  status: StatusEnum;
  errors: string | null;
}

export const initialState: ItemState = {
  itemList: [],
  currentOperation: OperationEnum.creating,
  currentItem: null,
  status: StatusEnum.pending,
  errors: null,
};

export const itemReducer = createReducer(
  initialState,
  on(getAllItensByUser, (state) => ({
    ...state,
    status: StatusEnum.pending,
  })),
  on(getAllItensByUserSuccess, (state, { itens }) => ({
    ...state,
    itemList: itens,
    error: null,
    status: StatusEnum.success,
  })),
  on(getAllItensByUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.error,
  })),
  on(getAllItensByUser, (state) => ({
    ...state,
    status: StatusEnum.pending,
  })),
  on(createItem, (state, { item }) => ({
    ...state,
    itemList: [...state.itemList, { ...item, id: state.itemList.length + 1 }],
  })),
  on(setCurrentItem, (state, { id }) => ({
    ...state,
    currentItem:
      state.itemList.find((p) => {
        return p.id == Number(id);
      }) || null,
  })),
  on(updateItem, (state, { item }) => ({
    ...state,
    itemList: state.itemList.map((p) => {
      if (!!item && p.id === item.id) {
        return item;
      }
      return p;
    }),
  })),
  on(deleteItem, (state, { id }) => ({
    ...state,
    itemList: state.itemList.filter((p) => p.id !== id),
    currentItem: null,
  })),
  on(setOperation, (state, { op }) => ({
    ...state,
    currentOperation: op,
  }))
);
