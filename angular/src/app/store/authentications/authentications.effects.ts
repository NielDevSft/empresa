import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppState } from "../app.state";
import { Store } from "@ngrx/store";
import { AuthService } from "../../services/authentication.service";
import {
  logginWithEmailNPassword,
  logginWithFailure,
  logginWithSuccess,
} from "./authentications.actions";
import { catchError, from, map, of, switchMap } from "rxjs";
import { ApplicationUser } from "../../models/ApplicationUser";

@Injectable()
export class AuthenticationsEffect {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  loggin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logginWithEmailNPassword),
      switchMap(({ email, password }) =>
        from(this.authService.login(email, password)).pipe(
          map((loginResult) =>
            logginWithSuccess({ usuario: loginResult as ApplicationUser })
          ),
          catchError((error) => of(logginWithFailure({ error })))
        )
      )
    )
  );
}
