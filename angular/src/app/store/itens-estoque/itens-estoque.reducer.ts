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
  error: string | null;
}

const initItem1 = new Item(
  1,
  "Garrafa",
  13,
  "Garrafinha de plastico",
  new Date(),
  new Date()
);
const initItem2 = new Item(
  2,
  "Carpete",
  25,
  "Carpete de linho",
  new Date(),
  new Date()
);
export const initialState: ItemEstoqueState = {
  itemEstoqueList: [
    new ItemEstoque(1, initItem1, 20, new Date(), new Date()),
    new ItemEstoque(2, initItem2, 10, new Date(), new Date()),
  ],
  currentOperation: OperationEnum.creating,
  currentItemEstoque: null,
  status: StatusEnum.pending,
  error: null,
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
