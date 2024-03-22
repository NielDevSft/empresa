import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";

import {
  deleteItemEstoque,
  setOperation,
} from "../../../store/itens-estoque/itens-estoque.actions";
import { take } from "rxjs";
import { OperationEnum } from "../../../models/enum/OperationEnum";
import { itensEstoqueSelected } from "../../../store/itens-estoque/itens-estoque.selector";

@Component({
  selector: "app-delete-itemEstoque",
  templateUrl: "./delete-item-estoque.component.html",
  styleUrl: "./delete-item-estoque.component.css",
})
export class DeleteItemEstoqueComponent {
  store = inject(Store);

  public itensEstoqueelected$ = this.store.select(itensEstoqueSelected);

  onDelete() {
    this.itensEstoqueelected$.pipe(take(1)).subscribe((ped) => {
      if (ped) {
        this.store.dispatch(deleteItemEstoque({ uuid: ped.uuid }));
        this.store.dispatch(setOperation({ op: OperationEnum.listing }));
      }
    });
  }
}
