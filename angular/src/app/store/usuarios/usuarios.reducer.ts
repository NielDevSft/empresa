import { createReducer, on } from "@ngrx/store";
import {
  getAllUsuarios,
  getAllUsuariosSuccess,
  getAllUsuariosFailure,
  getUsuarioByUuid,
  setCurrentUsuario,
  setOperation,
} from "./usuarios.actions";
import { OperationEnum } from "../../models/enum/OperationEnum";
import { StatusEnum } from "../../models/enum/StatusEnum";
import { Usuario } from "../../models/Usuario";

export interface UsuarioState {
  usuarioList: Usuario[];
  currentUsuario: Usuario | null;
  currentOperation: OperationEnum;
  status: StatusEnum;
  errors: string | null;
}

export const initialState: UsuarioState = {
  usuarioList: [],
  currentOperation: OperationEnum.creating,
  currentUsuario: null,
  status: StatusEnum.pending,
  errors: null,
};

export const usuarioReducer = createReducer(
  initialState,
  on(getAllUsuarios, (state) => ({
    ...state,
    status: StatusEnum.pending,
  })),
  on(getAllUsuariosSuccess, (state, { usuarios }) => ({
    ...state,
    usuarioList: usuarios,
    error: null,
    status: StatusEnum.success,
  })),
  on(getAllUsuariosFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.error,
  })),
  on(setCurrentUsuario, (state, { uuid }) => ({
    ...state,
    currentusuario:
      state.usuarioList.find((u) => {
        return u.uuid == uuid;
      }) || null,
  })),
  on(setOperation, (state, { op }) => ({
    ...state,
    currentOperation: op,
  }))
);
