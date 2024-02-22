import { createReducer, on, createAction } from "@ngrx/store";

import { StatusEnum } from "../../models/enum/StatusEnum";
import { OperationEnum } from "../../models/enum/OperationEnum";
import {
  createItemEstoque,
  deleteItemEstoque,
  getAllitensEstoqueByUser,
  getAllitensEstoqueByUserFailure,
  getAllitensEstoqueByUserSuccess,
  setCurrentItemEstoque,
  setOperation,
  updateItemEstoque,
} from "./itens-estoque.actions";
import { ItemEstoque } from "../../models/ItemEstoque";
import { Item } from "../../models/Item";

export interface ItemEstoqueState {
  itemEstoqueList: ItemEstoque[];
  currentItemEstoque: ItemEstoque | null;
  currentOperation: OperationEnum;
  status: StatusEnum;
  errors: string | null;
}

export const initialState: ItemEstoqueState = {
  itemEstoqueList: [],
  currentOperation: OperationEnum.listing,
  currentItemEstoque: null,
  status: StatusEnum.pending,
  errors: null,
};

export const itemEstoqueReducer = createReducer(
  initialState,
  on(getAllitensEstoqueByUser, (state) => ({
    ...state,
    status: StatusEnum.pending,
  })),
  on(getAllitensEstoqueByUserSuccess, (state, { itensEstoque }) => ({
    ...state,
    itemEstoqueList: itensEstoque,
    error: null,
    status: StatusEnum.success,
  })),
  on(getAllitensEstoqueByUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.error,
  })),
  on(getAllitensEstoqueByUser, (state) => ({
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
