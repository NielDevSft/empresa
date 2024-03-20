import { Injectable } from "@angular/core";
// import { ClienteService } from "../../services/pedido.service";\a
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import {
  createCliente,
  deleteCliente,
  getAllItensByUser,
  getAllItensByUserFailure,
  getAllItensByUserSuccess,
  updateCliente,
} from "./clientes.actions";
import { catchError, from, map, of, switchMap } from "rxjs";
import { ClienteService } from "../../services/cliente.service";

@Injectable()
export class ItensEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private clienteService: ClienteService
  ) {}

  getAllClientes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllItensByUser),
      switchMap(() =>
        from(this.clienteService.getAllByUsuario()).pipe(
          map((clientes) => getAllItensByUserSuccess({ clientes: clientes })),
          catchError((error) => of(getAllItensByUserFailure({ error })))
        )
      )
    )
  );

  saveClientes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createCliente),
        switchMap(({ cliente }) =>
          from(
            this.clienteService.create(cliente).pipe(
              map((pedido) => {
                console.log(pedido + "added successfully");
                return pedido;
              })
            )
          )
        )
      ),
    { dispatch: false }
  );

  deleteCliente$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteCliente),
        switchMap(({ uuid }) => from(this.clienteService.delete(uuid)))
      ),
    { dispatch: false }
  );

  updateCliente$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateCliente),
        switchMap(({ cliente }) =>
          from(
            this.clienteService.update(cliente).pipe(
              map((pedido) => {
                console.log(pedido + "updated successfully");
              })
            )
          )
        )
      ),
    { dispatch: false }
  );
}
