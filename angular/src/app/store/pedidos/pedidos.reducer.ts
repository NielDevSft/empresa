import { createReducer, on, createAction } from "@ngrx/store";
import { Pedido } from "../../models/Pedido";
import {
  createPedido,
  deletePedido,
  getAllPedidosByUser,
  getAllPedidosByUserFailure,
  getAllPedidosByUserSuccess,
  updatePedido,
  setCurrentPedido,
  setOperation,
} from "./pedidos.actions";
import { OperationEnum } from "../../models/enum/OperationEnum";
import { StatusEnum } from "../../models/enum/StatusEnum";
import { Item } from "../../models/Item";

export interface PedidoState {
  pedidoList: Pedido[];
  currentPedido: Pedido | null;
  currentOperation: OperationEnum;
  status: StatusEnum;
  errors: string | null;
}

export const initialState: PedidoState = {
  pedidoList: [],
  currentOperation: OperationEnum.creating,
  currentPedido: null,
  status: StatusEnum.pending,
  errors: null,
};

export const pedidoReducer = createReducer(
  initialState,
  on(getAllPedidosByUser, (state) => ({
    ...state,
    status: StatusEnum.pending,
  })),
  on(getAllPedidosByUserSuccess, (state, { pedidos }) => ({
    ...state,
    pedidoList: pedidos,
    error: null,
    status: StatusEnum.success,
  })),
  on(getAllPedidosByUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.error,
  })),
  on(getAllPedidosByUser, (state) => ({
    ...state,
    status: StatusEnum.pending,
  })),
  on(createPedido, (state, { pedido }) => ({
    ...state,
    pedidoList: [
      ...state.pedidoList,
      { ...pedido, uuid: (state.pedidoList.length + 1).toString() },
    ],
  })),
  on(setCurrentPedido, (state, { uuid }) => ({
    ...state,
    currentPedido:
      state.pedidoList.find((p) => {
        return p.uuid == uuid;
      }) || null,
  })),
  on(updatePedido, (state, { pedido }) => ({
    ...state,
    pedidoList: state.pedidoList.map((p) => {
      if (!!pedido && p.uuid === pedido.uuid) {
        return pedido;
      }
      return p;
    }),
  })),
  on(deletePedido, (state, { uuid }) => ({
    ...state,
    pedidoList: state.pedidoList.filter((p) => p.uuid !== uuid),
    currentPedido: null,
  })),
  on(setOperation, (state, { op }) => ({
    ...state,
    currentOperation: op,
  }))
);
