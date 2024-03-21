import { createSelector } from "@ngrx/store";
import { UsuarioState } from "./usuarios.reducer";
import { AppState } from "../app.state";

export const selectUsuario = (state: AppState) => state.usuarios;
export const selectAllUsuarios = createSelector(
  selectUsuario,
  (state: UsuarioState) => state.usuarioList
);
export const pedidoSelected = createSelector(
  selectUsuario,
  (state: UsuarioState) => {
    return state.currentUsuario;
  }
);
export const currentOperation = createSelector(
  selectUsuario,
  (state: UsuarioState) => {
    return state.currentOperation;
  }
);
