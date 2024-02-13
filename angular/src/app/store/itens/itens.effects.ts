import { Injectable } from "@angular/core";
// import { ItemService } from "../../services/pedido.service";\a
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import {
  createItem,
  getAllItemsByUser,
  getAllItemsByUserFailure,
  getAllItemsByUserSuccess,
} from "./itens.actions";
import { catchError, from, map, of, switchMap } from "rxjs";

@Injectable()
export class ItemsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState> // private pedidoService: ItemService
  ) {}

  // getAllItems$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(getAllItemsByUser),
  //     switchMap(() =>
  //       from(this.pedidoService.getAllByUsuario()).pipe(
  //         map((pedidos) => getAllItemsByUserSuccess({ pedidos: pedidos })),
  //         catchError((error) => of(getAllItemsByUserFailure({ error })))
  //       )
  //     )
  //   )
  // );

  // saveItems$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(createItem),
  //       switchMap(({ pedido }) =>
  //         from(
  //           this.pedidoService.create(pedido).pipe(
  //             map((pedido) => {
  //               console.log(pedido + "added successfully");
  //             })
  //           )
  //         )
  //       )
  //     ),
  //   { dispatch: false }
  // );
}
