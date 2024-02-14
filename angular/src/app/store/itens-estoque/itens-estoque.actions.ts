import { createAction, props } from "@ngrx/store";

import { OperationEnum } from "../../models/enum/OperationEnum";
import { ItemEstoque } from "../../models/ItemEstoque";

export const getAllitensEstoqueByUser = createAction(
  "[ItemEstoque Component] Get All itensEstoque By User"
);
export const getAllitensEstoqueByUserSuccess = createAction(
  "[ItemEstoque Component] Get All itensEstoque By User Success",
  props<{ itensEstoque: ItemEstoque[] }>()
);
export const getAllitensEstoqueByUserFailure = createAction(
  "[ItemEstoque Component] Get All itensEstoque By User Failure",
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