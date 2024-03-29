import { Injectable } from "@angular/core";
// import { ItemService } from "../../services/pedido.service";\a
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import {
  createItem,
  deleteItem,
  getAllItensByUser,
  getAllItensByUserFailure,
  getAllItensByUserSuccess,
  updateItem,
} from "./itens.actions";
import { catchError, from, map, of, switchMap } from "rxjs";
import { ItemService } from "../../services/item.service";

@Injectable()
export class ItensEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private itemService: ItemService
  ) {}

  getAllItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllItensByUser),
      switchMap(() =>
        from(this.itemService.getAllByUsuario()).pipe(
          map((itens) => getAllItensByUserSuccess({ itens: itens })),
          catchError((error) => of(getAllItensByUserFailure({ error })))
        )
      )
    )
  );

  saveItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createItem),
        switchMap(({ item }) =>
          from(
            this.itemService.create(item).pipe(
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

  deleteItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteItem),
        switchMap(({ uuid }) => from(this.itemService.delete(uuid)))
      ),
    { dispatch: false }
  );

  updateItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateItem),
        switchMap(({ item }) =>
          from(
            this.itemService.update(item).pipe(
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
