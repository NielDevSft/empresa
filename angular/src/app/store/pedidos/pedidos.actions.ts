import { createAction, props } from "@ngrx/store";
import { Pedido } from "../../models/Pedido";
import { OperationEnum } from "../../models/enum/OperationEnum";

export const getAllPedidosByUser = createAction(
  "[Pedido Component] Get All Pedidos By User"
);
export const getAllPedidosByUserSuccess = createAction(
  "[Pedido Component] Get All Pedidos By User Success",
  props<{ pedidos: Pedido[] }>()
);
export const getAllPedidosByUserFailure = createAction(
  "[Pedido Component] Get All Pedidos By User Failure",
  props<{ error: string }>()
);
export const getPedidoByUuid = createAction(
  "[Pedido Component] GetPedidoByUuid",
  props<{ uuidUsuario: number }>()
);
export const createPedido = createAction(
  "[Pedido Component] CreatePedido",
  props<{ pedido: Pedido }>()
);
export const setCurrentPedido = createAction(
  "[Pedido Component] Set Current Pedido",
  props<{ uuid: string }>()
);
export const updatePedido = createAction(
  "[Pedido Component] Update Pedido",
  props<{ pedido: Pedido }>()
);
export const deletePedido = createAction(
  "[Pedido Component] Delete Pedido",
  props<{ uuid: string }>()
);
export const setOperation = createAction(
  "[Pedido Component] Update Operation",
  props<{ op: OperationEnum }>()
);
