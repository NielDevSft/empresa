import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";

import {
  deleteItemEstoque,
  setOperation,
} from "../../../store/itens-estoque/itens-estoque.actions";
import { take } from "rxjs";
import { OperationEnum } from "../../../models/enum/OperationEnum";
import { itensEstoqueelected } from "../../../store/itens-estoque/itens-estoque.selector";

@Component({
  selector: "app-delete-itemEstoque",
  templateUrl: "./delete-item-estoque.component.html",
  styleUrl: "./delete-item-estoque.component.css",
})
export class DeleteItemEstoqueComponent {
  store = inject(Store);

  public itensEstoqueelected$ = this.store.select(itensEstoqueelected);

  onDelete() {
    this.itensEstoqueelected$.pipe(take(1)).subscribe((ped) => {
      if (ped) {
        this.store.dispatch(deleteItemEstoque({ id: ped.id }));
        this.store.dispatch(setOperation({ op: OperationEnum.listing }));
      }
    });
  }
}
