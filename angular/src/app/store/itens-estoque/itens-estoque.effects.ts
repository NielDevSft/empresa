import { Injectable } from "@angular/core";
// import { itensEstoqueervice } from "../../services/pedido.service";\a
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import {
  createItemEstoque,
  deleteItemEstoque,
  getAllitensEstoqueByUser,
  getAllitensEstoqueByUserFailure,
  getAllitensEstoqueByUserSuccess,
  updateItemEstoque,
} from "./itens-estoque.actions";
import { catchError, from, map, of, switchMap } from "rxjs";
import { ItemEstoqueService } from "../../services/item-estoque.service";

@Injectable()
export class ItensEstoqueEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private itemEstoqueService: ItemEstoqueService
  ) {}

  getAllItensEstoque$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllitensEstoqueByUser),
      switchMap(() =>
        from(this.itemEstoqueService.getAllByUsuario()).pipe(
          map((itensEstoque) =>
            getAllitensEstoqueByUserSuccess({ itensEstoque: itensEstoque })
          ),
          catchError((error) => of(getAllitensEstoqueByUserFailure({ error })))
        )
      )
    )
  );

  saveItensEstoque$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createItemEstoque),
        switchMap(({ itemEstoque }) =>
          from(
            this.itemEstoqueService.create(itemEstoque).pipe(
              map((itemEstoque) => {
                console.log(itemEstoque + "added successfully");
              })
            )
          )
        )
      ),
    { dispatch: false }
  );

  deleteItemEstoque$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteItemEstoque),
        switchMap(({ uuid }) => from(this.itemEstoqueService.delete(uuid)))
      ),
    { dispatch: false }
  );

  updateItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateItemEstoque),
        switchMap(({ itemEstoque }) =>
          from(
            this.itemEstoqueService.update(itemEstoque).pipe(
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
