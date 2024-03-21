import { Injectable } from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import {
  getAllUsuarios,
  getAllUsuariosSuccess,
  getAllUsuariosFailure,
} from "./usuarios.actions";
import { catchError, from, map, of, switchMap } from "rxjs";

@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private usuarioService: UsuarioService
  ) {}

  getAllUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllUsuarios),
      switchMap(() =>
        from(this.usuarioService.getAllUsuarios()).pipe(
          map((usuarios) => getAllUsuariosSuccess({ usuarios: usuarios })),
          catchError((error) => of(getAllUsuariosFailure({ error })))
        )
      )
    )
  );
}
