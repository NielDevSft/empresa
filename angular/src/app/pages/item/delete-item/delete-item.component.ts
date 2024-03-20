import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";

import { take } from "rxjs";
import { itemSelected } from "../../../store/itens/itens.selector";
import { deleteItem, setOperation } from "../../../store/itens/itens.actions";
import { OperationEnum } from "../../../models/enum/OperationEnum";

@Component({
  selector: "app-delete-item",
  templateUrl: "./delete-item.component.html",
  styleUrl: "./delete-item.component.css",
})
export class DeleteItemComponent {
  store = inject(Store);

  public itemSelected$ = this.store.select(itemSelected);

  onDelete() {
    this.itemSelected$.pipe(take(1)).subscribe((ped) => {
      if (ped) {
        this.store.dispatch(deleteItem({ id: ped.id }));
        this.store.dispatch(setOperation({ op: OperationEnum.listing }));
      }
    });
  }
}
