import { AppState } from "../app.state";
import { createSelector } from "@ngrx/store";
import { AuthenticationState } from "./authentications.reducer";

export const selectAuthentication = (state: AppState) => state.authentications;

export const userLogged = createSelector(
  selectAuthentication,
  (state: AuthenticationState) => state.currentUserLogged
);
export const rolesUserLogged = createSelector(
  selectAuthentication,
  (state: AuthenticationState) => state.currentUserLogged?.role
);
