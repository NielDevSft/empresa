import { createAction, props } from "@ngrx/store";
import { ItemEstoque } from "../../models/ItemEstoque";
import { OperationEnum } from "../../models/enum/OperationEnum";

export const getAllItemEstoquesByUser = createAction(
  "[ItemEstoque Component] Get All ItemEstoques By User"
);
export const getAllItemEstoquesByUserSuccess = createAction(
  "[ItemEstoque Component] Get All ItemEstoques By User Success",
  props<{ ItemEstoques: ItemEstoque[] }>()
);
export const getAllItemEstoquesByUserFailure = createAction(
  "[ItemEstoque Component] Get All ItemEstoques By User Failure",
  props<{ error: string }>()
);
export const getItemEstoqueById = createAction(
  "[ItemEstoque Component] GetItemEstoqueById",
  props<{ idUsuario: number }>()
);
export const createItemEstoque = createAction(
  "[ItemEstoque Component] CreateItemEstoque",
  props<{ itemEstoque: ItemEstoque }>()
);
export const setCurrentItemEstoque = createAction(
  "[ItemEstoque Component] Set Current ItemEstoque",
  props<{ id: number }>()
);
export const updateItemEstoque = createAction(
  "[ItemEstoque Component] Update ItemEstoque",
  props<{ itemEstoque: ItemEstoque }>()
);
export const deleteItemEstoque = createAction(
  "[ItemEstoque Component] Delete ItemEstoque",
  props<{ id: number }>()
);
export const setOperation = createAction(
  "[ItemEstoque Component] Update Operation",
  props<{ op: OperationEnum }>()
);
