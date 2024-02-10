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

export enum OperationEnum {
  "deleting",
  "creating",
  "listing",
  "updating",
  "seeing",
}
enum StatusEnum {
  "pending",
  "loading",
  "error",
  "success",
}
export interface PedidoState {
  pedidoList: Pedido[];
  currentPedido: Pedido | undefined;
  currentOperation: OperationEnum;
  status: StatusEnum;
  error: string | null;
}

export const initialState: PedidoState = {
  pedidoList: [
    new Pedido(
      1,
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      "Rael Ferreira",
      0,
      new Date(),
      new Date(),
      new Date()
    ),
    new Pedido(
      2,
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      "Rael Ferreira",
      0,
      new Date(),
      new Date(),
      new Date()
    ),
  ],
  currentOperation: OperationEnum.creating,
  currentPedido: undefined,
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
    currentPedido: state.pedidoList.find((p) => p.id == Number(id)),
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
  })),
  on(setOperation, (state, { op }) => ({
    ...state,
    currentOperation: op,
  }))
);
