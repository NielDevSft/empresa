import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { provideNativeDateAdapter } from "@angular/material/core";

import { combineLatest, map, of, switchMap, take } from "rxjs";
import { OperationEnum } from "../../../models/enum/OperationEnum";
import {
  createItemEstoque,
  setCurrentItemEstoque,
  setOperation,
  updateItemEstoque,
} from "../../../store/itens-estoque/itens-estoque.actions";
import {
  currentOperation,
  itensEstoqueSelected,
} from "../../../store/itens-estoque/itens-estoque.selector";
import {
  selectAllItens,
  itemSelected,
} from "../../../store/itens/itens.selector";
import {
  getAllItensByUser,
  setCurrentItem,
} from "../../../store/itens/itens.actions";

@Component({
  selector: "app-form-item-estoque",
  templateUrl: "./form-item-estoque.component.html",
  providers: [provideNativeDateAdapter()],
  styleUrl: "./form-item-estoque.component.css",
})
export class FormItemEstoqueComponent implements OnInit, OnDestroy {
  router = inject(ActivatedRoute);
  store = inject(Store);
  fromBuilder = inject(FormBuilder);

  itemEstoqueForm: FormGroup = this.fromBuilder.group({
    id: [],
    idItem: [{}, [Validators.required]],
    qtdItem: ["", [Validators.required]],
    createAt: [{ value: null, disable: true }],
    updateAt: [{ value: null, disable: true }],
  });

  public itemList$ = this.store.select(selectAllItens);
  public itensEstoqueSelected$ = this.store.select(itensEstoqueSelected);
  public currentOperation = this.store.select(currentOperation);

  ngOnInit(): void {
    combineLatest([
      this.itensEstoqueSelected$.pipe(take(1)),
      this.router.params,
    ]).subscribe(([selected, params]) => {
      const idItemEstoque = params["id"];
      if (!selected && !!idItemEstoque) {
        this.store.dispatch(setCurrentItemEstoque({ id: idItemEstoque }));
      }
    });

    this.itensEstoqueSelected$.subscribe((value) => {
      this.itemEstoqueForm.reset({ ...value, idItem: value?.item.id });
    });

    this.itemList$.pipe(take(1)).subscribe((list) => {
      if (list.length == 0) {
        this.store.dispatch(getAllItensByUser());
      }
    });
    this.currentOperation.subscribe((o) => {
      if (o === OperationEnum.updating)
        this.itemEstoqueForm.get("idItem")?.disable();
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(setCurrentItemEstoque({ id: 0 }));
  }

  onSubmit() {
    this.itemEstoqueForm.get("idItem")?.enable();
    this.currentOperation
      ?.pipe(
        take(1),
        map((op) => {
          this.store.dispatch(
            setCurrentItem({ id: this.itemEstoqueForm.value.idItem })
          );
          switch (op) {
            case OperationEnum.creating:
              return createItemEstoque({
                itemEstoque: this.itemEstoqueForm.value,
              });
            case OperationEnum.updating:
              return updateItemEstoque({
                itemEstoque: this.itemEstoqueForm.value,
              });
            default:
              return;
          }
        }),
        switchMap((action) => {
          return combineLatest([of(action), this.store.select(itemSelected)]);
        })
      )
      .subscribe(([action, itemS]) => {
        if (itemS && action) {
          action.itemEstoque = { ...action.itemEstoque, item: itemS };
          this.store.dispatch(action);
        }

        this.store.dispatch(setOperation({ op: OperationEnum.listing }));
      });
  }

  public get createAt(): string {
    return this.itemEstoqueForm.value.createAt;
  }
  public get updateAt(): string {
    return this.itemEstoqueForm.value.updateAt;
  }
}
