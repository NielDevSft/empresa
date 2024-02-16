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
export const initialState: PedidoState = {
  pedidoList: [
    new Pedido(
      1,
      "Rael Ferreira",
      [{ item: initItem2, qtd: 3 }],
      0,
      new Date(),
      new Date(),
      new Date()
    ),
    new Pedido(
      2,
      "Rael Ferreira",
      [
        { item: initItem1, qtd: 3 },
        { item: initItem2, qtd: 3 },
      ],
      334,
      new Date(),
      new Date(),
      new Date()
    ),
  ],
  currentOperation: OperationEnum.creating,
  currentPedido: null,
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
    pedidoList: [
      ...state.pedidoList,
      { ...pedido, id: state.pedidoList.length + 1 },
    ],
  })),
  on(setCurrentPedido, (state, { id }) => ({
    ...state,
    currentPedido:
      state.pedidoList.find((p) => {
        return p.id == Number(id);
      }) || null,
  })),
  on(updatePedido, (state, { pedido }) => ({
    ...state,
    pedidoList: state.pedidoList.map((p) => {
      if (!!pedido && p.id === pedido.id) {
        return pedido;
      }
      return p;
    }),
  })),
  on(deletePedido, (state, { id }) => ({
    ...state,
    pedidoList: state.pedidoList.filter((p) => p.id !== id),
    currentPedido: null,
  })),
  on(setOperation, (state, { op }) => ({
    ...state,
    currentOperation: op,
  }))
);
