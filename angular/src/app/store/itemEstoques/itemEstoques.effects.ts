import { Injectable } from "@angular/core";
// import { ItemEstoqueService } from "../../services/pedido.service";\a
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import {
  createItemEstoque,
  getAllItemEstoquesByUser,
  getAllItemEstoquesByUserFailure,
  getAllItemEstoquesByUserSuccess,
} from "./itemEstoques.actions";
import { catchError, from, map, of, switchMap } from "rxjs";

@Injectable()
export class ItemEstoquesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState> // private pedidoService: ItemEstoqueService
  ) {}

  // getAllItemEstoques$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(getAllItemEstoquesByUser),
  //     switchMap(() =>
  //       from(this.pedidoService.getAllByUsuario()).pipe(
  //         map((pedidos) => getAllItemEstoquesByUserSuccess({ pedidos: pedidos })),
  //         catchError((error) => of(getAllItemEstoquesByUserFailure({ error })))
  //       )
  //     )
  //   )
  // );

  // saveItemEstoques$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(createItemEstoque),
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
