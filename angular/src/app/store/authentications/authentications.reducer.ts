import { createReducer, on } from "@ngrx/store";
import { ApplicationUser } from "../../models/ApplicationUser";
import { OperationEnum } from "../../models/enum/OperationEnum";
import { StatusEnum } from "../../models/enum/StatusEnum";
import {
  logginWithEmailNPassword,
  logginWithFailure,
  logginWithSuccess,
} from "./authentications.actions";

export interface AuthenticationState {
  currentUserLogged: ApplicationUser | null;
  currentOperation: OperationEnum.listing;
  status: StatusEnum;
  errors: string | null;
}

export const initialState: AuthenticationState = {
  currentUserLogged: null,
  currentOperation: OperationEnum.listing,
  status: StatusEnum.pending,
  errors: null,
};
export const authenticationReducer = createReducer(
  initialState,
  on(logginWithEmailNPassword, (state, { email, password }) => ({
    ...state,
    status: StatusEnum.loading,
    errors: null,
  })),
  on(logginWithSuccess, (state, { usuario }) => ({
    ...state,
    currentUserLogged: usuario,
    status: StatusEnum.success,
    errors: null,
  })),
  on(logginWithFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.error,
  }))
);
