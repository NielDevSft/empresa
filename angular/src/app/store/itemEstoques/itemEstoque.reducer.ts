import { createReducer, on, createAction } from "@ngrx/store";
import { ItemEstoque } from "../../models/ItemEstoque";
import {
  createItemEstoque,
  deleteItemEstoque,
  getAllItemEstoquesByUser,
  getAllItemEstoquesByUserFailure,
  getAllItemEstoquesByUserSuccess,
  updateItemEstoque,
  setCurrentItemEstoque,
  setOperation,
} from "./itemEstoques.actions";

import { StatusEnum } from "../../models/enum/StatusEnum";
import { OperationEnum } from "../../models/enum/OperationEnum";

export interface ItemEstoqueState {
  itemEstoqueList: ItemEstoque[];
  currentItemEstoque: ItemEstoque | null;
  currentOperation: OperationEnum;
  status: StatusEnum;
  error: string | null;
}

export const initialState: ItemEstoqueState = {
  itemEstoqueList: [
    new ItemEstoque(1, 1, "Garrafa", 20, new Date(), new Date()),
    new ItemEstoque(1, 1, "Carpete", 10, new Date(), new Date()),
  ],
  currentOperation: OperationEnum.creating,
  currentItemEstoque: null,
  status: StatusEnum.pending,
  error: null,
};

export const itemEstoqueReducer = createReducer(
  initialState,
  on(getAllItemEstoquesByUser, (state) => ({
    ...state,
    status: StatusEnum.pending,
  })),
  on(getAllItemEstoquesByUserSuccess, (state, { ItemEstoques }) => ({
    ...state,
    itemEstoqueList: ItemEstoques,
    error: null,
    status: StatusEnum.success,
  })),
  on(getAllItemEstoquesByUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.error,
  })),
  on(getAllItemEstoquesByUser, (state) => ({
    ...state,
    status: StatusEnum.pending,
  })),
  on(createItemEstoque, (state, { itemEstoque }) => ({
    ...state,
    itemEstoqueList: [
      ...state.itemEstoqueList,
      { ...itemEstoque, id: state.itemEstoqueList.length + 1 },
    ],
  })),
  on(setCurrentItemEstoque, (state, { id }) => ({
    ...state,
    currentItemEstoque:
      state.itemEstoqueList.find((p) => {
        return p.id == Number(id);
      }) || null,
  })),
  on(updateItemEstoque, (state, { itemEstoque }) => ({
    ...state,
    itemEstoqueList: state.itemEstoqueList.map((p) => {
      if (!!itemEstoque && p.id === itemEstoque.id) {
        return itemEstoque;
      }
      return p;
    }),
  })),
  on(deleteItemEstoque, (state, { id }) => ({
    ...state,
    itemEstoqueList: state.itemEstoqueList.filter((p) => p.id !== id),
    currentItemEstoque: null,
  })),
  on(setOperation, (state, { op }) => ({
    ...state,
    currentOperation: op,
  }))
);
