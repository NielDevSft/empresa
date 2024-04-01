import { createAction, props } from "@ngrx/store";
import { ApplicationUser } from "../../models/ApplicationUser";

export const logginWithEmailNPassword = createAction(
  "[Authentication Component] Try loggin with email and password",
  props<{ email: string; password: string }>()
);
export const logginWithSuccess = createAction(
  "[Authentication Component] Loggin with Success",
  props<{ usuario: ApplicationUser }>()
);
export const logginWithFailure = createAction(
  "[Authentication Component] Loggin with Failure",
  props<{ error: string }>()
);
