import { createAction, props } from "@ngrx/store";
import { Cliente } from "../../models/Cliente";
import { OperationEnum } from "../../models/enum/OperationEnum";

export const getAllClientesByUser = createAction(
  "[Cliente Component] Get All clientes By User"
);
export const getAllClientesByUserSuccess = createAction(
  "[Cliente Component] Get All Clientes By User Success",
  props<{ clientes: Cliente[] }>()
);
export const getAllClientesByUserFailure = createAction(
  "[Cliente Component] Get All Clientes By User Failure",
  props<{ error: string }>()
);
export const getClienteByUuid = createAction(
  "[Cliente Component] GetClienteByUuid",
  props<{ uuid: string }>()
);
export const createCliente = createAction(
  "[Cliente Component] CreateCliente",
  props<{ cliente: Cliente }>()
);
export const setCurrentCliente = createAction(
  "[Cliente Component] Set Current Cliente",
  props<{ uuid: string }>()
);
export const updateCliente = createAction(
  "[Cliente Component] Update Cliente",
  props<{ cliente: Cliente }>()
);
export const deleteCliente = createAction(
  "[Cliente Component] Delete Cliente",
  props<{ uuid: string }>()
);
export const setOperation = createAction(
  "[Cliente Component] Update Operation",
  props<{ op: OperationEnum }>()
);
