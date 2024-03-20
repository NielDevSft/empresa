import { Component, OnInit, inject } from "@angular/core";

import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map } from "rxjs";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import {
  getAllItensByUser,
  setCurrentItem,
  setOperation,
} from "../../../store/itens/itens.actions";

import { selectAllItens } from "../../../store/itens/itens.selector";
import { OperationEnum } from "../../../models/enum/OperationEnum";

@Component({
  selector: "app-consulta-item",
  templateUrl: "./consulta-item.component.html",
  styleUrl: "./consulta-item.component.css",
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class ConsultaItemComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);

  public detalhesExpandidos: any;
  public displayedColumns = [
    "id",
    "nomItem",
    "desItem",
    "createAt",
    "updateAt",
    "actions",
  ];

  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty("detailRow");

  public itemList$ = this.store.select(selectAllItens).pipe(
    map((data) => {
      const rows: any[] = [];
      data.forEach((element) =>
        rows.push(element, { detailRow: true, element })
      );
      return rows;
    })
  );

  onEditItem(id: number) {
    this.router.navigate(["item/edit/" + id]);
    this.store.dispatch(setOperation({ op: OperationEnum.updating }));
  }
  onDeleteItem(id: number) {
    this.router.navigate(["item/delete"]);
    this.store.dispatch(setCurrentItem({ id: id }));
    this.store.dispatch(setOperation({ op: OperationEnum.deleting }));
  }

  ngOnInit(): void {
    this.store.dispatch(getAllItensByUser());
  }
}
