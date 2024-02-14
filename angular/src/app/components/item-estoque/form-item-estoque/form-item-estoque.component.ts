import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { provideNativeDateAdapter } from "@angular/material/core";

import { combineLatest, take } from "rxjs";
import { OperationEnum } from "../../../models/enum/OperationEnum";
import {
  createItemEstoque,
  setCurrentItemEstoque,
  setOperation,
  updateItemEstoque,
} from "../../../store/itens-estoque/itens-estoque.actions";
import {
  currentOperation,
  itensEstoqueelected,
} from "../../../store/itens-estoque/itens-estoque.selector";

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
    idItem: ["", [Validators.required]],
    profissionalResponsavel: ["", [Validators.required]],
    qtdItem: ["", [Validators.required]],
    createAt: [],
    updateAt: [],
  });

  public itensEstoqueelected$ = this.store.select(itensEstoqueelected);
  public currentOperation? = this.store.select(currentOperation);

  ngOnInit(): void {
    combineLatest([
      this.itensEstoqueelected$.pipe(take(1)),
      this.router.params,
    ]).subscribe(([selected, params]) => {
      const idItemEstoque = params["id"];
      if (!selected && !!idItemEstoque) {
        this.store.dispatch(setCurrentItemEstoque({ id: idItemEstoque }));
      }
    });

    this.itensEstoqueelected$.subscribe((value) => {
      this.itemEstoqueForm.reset(value);
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(setCurrentItemEstoque({ id: 0 }));
  }

  onSubmit() {
    this.currentOperation?.pipe(take(1)).subscribe((op) => {
      switch (op) {
        case OperationEnum.creating:
          this.store.dispatch(
            createItemEstoque({ itemEstoque: this.itemEstoqueForm.value })
          );
          break;
        case OperationEnum.updating:
          this.store.dispatch(
            updateItemEstoque({ itemEstoque: this.itemEstoqueForm.value })
          );
          break;
        case OperationEnum.seeing:
          break;
        default:
          break;
      }
      this.store.dispatch(setOperation({ op: OperationEnum.listing }));
    });
  }
  public get createAt(): string {
    this.itemEstoqueForm.get("createAt")?.disable();
    return this.itemEstoqueForm.value.createAt;
  }
  public get updateAt(): string {
    this.itemEstoqueForm.get("updateAt")?.disable();
    return this.itemEstoqueForm.value.updateAt;
  }
}
