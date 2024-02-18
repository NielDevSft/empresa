import { createAction, props } from "@ngrx/store";
import { Item } from "../../models/Item";
import { OperationEnum } from "../../models/enum/OperationEnum";

export const getAllItensByUser = createAction(
  "[Item Component] Get All itens By User"
);
export const getAllItensByUserSuccess = createAction(
  "[Item Component] Get All Itens By User Success",
  props<{ itens: Item[] }>()
);
export const getAllItensByUserFailure = createAction(
  "[Item Component] Get All Itens By User Failure",
  props<{ error: string }>()
);
export const getItemById = createAction(
  "[Item Component] GetItemById",
  props<{ idUsuario: number }>()
);
export const createItem = createAction(
  "[Item Component] CreateItem",
  props<{ item: Item }>()
);
export const setCurrentItem = createAction(
  "[Item Component] Set Current Item",
  props<{ id: number }>()
);
export const updateItem = createAction(
  "[Item Component] Update Item",
  props<{ item: Item }>()
);
export const deleteItem = createAction(
  "[Item Component] Delete Item",
  props<{ id: number }>()
);
export const setOperation = createAction(
  "[Item Component] Update Operation",
  props<{ op: OperationEnum }>()
);
