import { Injectable } from "@angular/core";
import { PedidoService } from "../../services/pedido.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import {
  createPedido,
  deletePedido,
  getAllPedidosByUser,
  getAllPedidosByUserFailure,
  getAllPedidosByUserSuccess,
  updatePedido,
} from "./pedidos.actions";
import { catchError, from, map, of, switchMap } from "rxjs";

@Injectable()
export class PedidosEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private pedidoService: PedidoService
  ) {}

  getAllPedidos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllPedidosByUser),
      switchMap(() =>
        from(this.pedidoService.getAllByUsuario()).pipe(
          map((pedidos) => getAllPedidosByUserSuccess({ pedidos: pedidos })),
          catchError((error) => of(getAllPedidosByUserFailure({ error })))
        )
      )
    )
  );

  savePedidos$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createPedido),
        switchMap(({ pedido }) =>
          from(
            this.pedidoService.create(pedido).pipe(
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

  deletePedido$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deletePedido),
        switchMap(({ id }) => from(this.pedidoService.delete(id)))
      ),
    { dispatch: false }
  );

  updatePedido$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updatePedido),
        switchMap(({ pedido }) =>
          from(
            this.pedidoService.update(pedido).pipe(
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
