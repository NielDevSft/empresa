import { createAction, props } from "@ngrx/store";
import { Usuario } from "../../models/Usuario";
import { OperationEnum } from "../../models/enum/OperationEnum";

export const getAllUsuarios = createAction(
  "[Usuario Component] Get All getAllUsuarios By User"
);
export const getAllUsuariosSuccess = createAction(
  "[Usuario Component] Get All Usuarios By User Success",
  props<{ usuarios: Usuario[] }>()
);
export const getAllUsuariosFailure = createAction(
  "[Usuario Component] Get All Usuarios By User Failure",
  props<{ error: string }>()
);
export const getUsuarioByUuid = createAction(
  "[Usuario Component] GetUsuarioByUuid",
  props<{ uuidUsuario: number }>()
);
export const setCurrentUsuario = createAction(
  "[Usuario Component] Set Current Usuario",
  props<{ uuid: string }>()
);
export const setOperation = createAction(
  "[Usuario Component] Update Operation",
  props<{ op: OperationEnum }>()
);
