import { createReducer, on } from "@ngrx/store";
import { Pedido } from "../../models/Pedido";
import {
  createPedido,
  deletePedido,
  getAllPedidosByUser,
  getAllPedidosByUserFailure,
  getAllPedidosByUserSuccess,
  updatePedido,
} from "./pedidos.actions";

enum StatusEnum {
  "pending",
  "loading",
  "error",
  "success",
}
export interface PedidoState {
  pedidoList: Pedido[];
  status: StatusEnum;
  error: string | null;
}

export const initialState: PedidoState = {
  pedidoList: [],
  status: StatusEnum.pending,
  error: null,
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
    pedidoList: [...state.pedidoList, pedido],
  })),
  on(updatePedido, (state, { pedido }) => ({
    ...state,
    pedidoList: state.pedidoList.map((p) => {
      if (p.id === pedido.id) {
        return pedido;
      }
      return p;
    }),
  })),
  on(deletePedido, (state, { id }) => ({
    ...state,
    pedidoList: state.pedidoList.filter((p) => p.id !== id),
  }))
);
