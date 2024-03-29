import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { provideNativeDateAdapter } from "@angular/material/core";

import { combineLatest, take } from "rxjs";
import {
  currentOperation,
  itemSelected,
} from "../../../store/itens/itens.selector";

import {
  createItem,
  setCurrentItem,
  setOperation,
  updateItem,
} from "../../../store/itens/itens.actions";
import { OperationEnum } from "../../../models/enum/OperationEnum";

@Component({
  selector: "app-form-item",
  templateUrl: "./form-item.component.html",
  providers: [provideNativeDateAdapter()],
  styleUrl: "./form-item.component.css",
})
export class FormItemComponent implements OnInit, OnDestroy {
  router = inject(ActivatedRoute);
  store = inject(Store);
  fromBuilder = inject(FormBuilder);

  itemForm: FormGroup = this.fromBuilder.group({
    uuid: [0],
    nomItem: ["", [Validators.required]],
    desItem: ["", [Validators.required]],
    valItem: [0, [Validators.required]],
    createAt: [{ value: null, disable: true }],
    updateAt: [{ value: null, disable: true }],
  });

  public itemSelected$ = this.store.select(itemSelected);
  public currentOperation? = this.store.select(currentOperation);

  ngOnInit(): void {
    combineLatest([
      this.itemSelected$.pipe(take(1)),
      this.router.params,
    ]).subscribe(([selected, params]) => {
      const idItem = params["uuid"];
      if (!selected && !!idItem) {
        this.store.dispatch(setCurrentItem({ uuid: idItem }));
      }
    });

    this.itemSelected$.subscribe((value) => {
      this.itemForm.reset(value);
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(setCurrentItem({ uuid: "" }));
  }

  onSubmit() {
    this.currentOperation?.pipe(take(1)).subscribe((op) => {
      switch (op) {
        case OperationEnum.creating:
          this.store.dispatch(createItem({ item: this.itemForm.value }));
          break;
        case OperationEnum.updating:
          this.store.dispatch(updateItem({ item: this.itemForm.value }));
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
    this.itemForm.get("createAt");
    return this.itemForm.value.createAt;
  }
  public get updateAt(): string {
    this.itemForm.get("updateAt");
    return this.itemForm.value.updateAt;
  }
}
