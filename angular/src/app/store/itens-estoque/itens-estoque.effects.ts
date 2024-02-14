import { Injectable } from "@angular/core";
// import { itensEstoqueervice } from "../../services/pedido.service";\a
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import {
  createItemEstoque,
  getAllitensEstoqueByUser,
  getAllitensEstoqueByUserFailure,
  getAllitensEstoqueByUserSuccess,
} from "./itens-estoque.actions";
import { catchError, from, map, of, switchMap } from "rxjs";

@Injectable()
export class itensEstoqueEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState> // private pedidoService: itensEstoqueervice
  ) {}

  // getAllitensEstoque$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(getAllitensEstoqueByUser),
  //     switchMap(() =>
  //       from(this.pedidoService.getAllByUsuario()).pipe(
  //         map((pedidos) => getAllitensEstoqueByUserSuccess({ pedidos: pedidos })),
  //         catchError((error) => of(getAllitensEstoqueByUserFailure({ error })))
  //       )
  //     )
  //   )
  // );

  // saveitensEstoque$ = createEffect(
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
