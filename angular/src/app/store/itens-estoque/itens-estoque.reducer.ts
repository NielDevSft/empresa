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
      { ...itemEstoque, uuid: (state.itemEstoqueList.length + 1).toString() },
    ],
  })),
  on(setCurrentItemEstoque, (state, { uuid }) => ({
    ...state,
    currentItemEstoque:
      state.itemEstoqueList.find((p) => {
        return p.uuid == uuid;
      }) || null,
  })),
  on(updateItemEstoque, (state, { itemEstoque }) => ({
    ...state,
    itemEstoqueList: state.itemEstoqueList.map((p) => {
      if (!!itemEstoque && p.uuid === itemEstoque.uuid) {
        return itemEstoque;
      }
      return p;
    }),
  })),
  on(deleteItemEstoque, (state, { uuid }) => ({
    ...state,
    itemEstoqueList: state.itemEstoqueList.filter((p) => p.uuid !== uuid),
    currentItemEstoque: null,
  })),
  on(setOperation, (state, { op }) => ({
    ...state,
    currentOperation: op,
  }))
);
