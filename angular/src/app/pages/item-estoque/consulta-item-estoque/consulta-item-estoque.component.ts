import { Component, inject } from "@angular/core";

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
  getAllitensEstoqueByUser,
  setCurrentItemEstoque,
  setOperation,
} from "../../../store/itens-estoque/itens-estoque.actions";
import { OperationEnum } from "../../../models/enum/OperationEnum";
import { selectAllItensEstoque } from "../../../store/itens-estoque/itens-estoque.selector";

@Component({
  selector: "app-consulta-itemEstoque",
  templateUrl: "./consulta-item-estoque.component.html",
  styleUrl: "./consulta-item-estoque.component.css",
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
export class ConsultaItemEstoqueComponent {
  store = inject(Store);
  router = inject(Router);

  public detalhesExpandidos: any;
  public displayedColumns = [
    "uuid",
    "idItem",
    "nomItem",
    "qtdItem",
    "createAt",
    "updateAt",
    "actions",
  ];

  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty("detailRow");

  public itemEstoqueList$ = this.store.select(selectAllItensEstoque).pipe(
    map((data) => {
      const rows: any[] = [];
      data.forEach((element) =>
        rows.push(element, { detailRow: true, element })
      );
      return rows;
    })
  );

  onEditItemEstoque(uuid: string) {
    this.router.navigate(["item-estoque/edit/" + uuid]);
    this.store.dispatch(setOperation({ op: OperationEnum.updating }));
  }
  onDeleteItemEstoque(uuid: string) {
    this.router.navigate(["item-estoque/delete"]);
    this.store.dispatch(setCurrentItemEstoque({ uuid: uuid }));
    this.store.dispatch(setOperation({ op: OperationEnum.deleting }));
  }

  ngOnInit(): void {
    this.store.dispatch(getAllitensEstoqueByUser());
  }
}
