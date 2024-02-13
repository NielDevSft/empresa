import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import {
  createPedido,
  setCurrentPedido,
  setOperation,
  updatePedido,
} from "../../../store/pedidos/pedidos.actions";
import {
  pedidoSelected,
  currentOperation,
} from "../../../store/pedidos/pedidos.selector";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { provideNativeDateAdapter } from "@angular/material/core";

import { combineLatest, take } from "rxjs";
import { OperationEnum } from "../../../models/enum/OperationEnum";

@Component({
  selector: "app-form-pedido",
  templateUrl: "./form-pedido.component.html",
  providers: [provideNativeDateAdapter()],
  styleUrl: "./form-pedido.component.css",
})
export class FormPedidoComponent implements OnInit, OnDestroy {
  router = inject(ActivatedRoute);
  store = inject(Store);
  fromBuilder = inject(FormBuilder);

  pedidoForm: FormGroup = this.fromBuilder.group({
    id: [],
    desPedido: ["", [Validators.required]],
    profissionalResponsavel: ["", [Validators.required]],
    valorConsulta: ["", [Validators.required]],
    dataAgendamento: ["", [Validators.required]],
    createAt: [],
    updateAt: [],
  });

  public pedidoSelected$ = this.store.select(pedidoSelected);
  public currentOperation? = this.store.select(currentOperation);

  ngOnInit(): void {
    combineLatest([
      this.pedidoSelected$.pipe(take(1)),
      this.router.params,
    ]).subscribe(([selected, params]) => {
      const idPedido = params["id"];
      if (!selected && !!idPedido) {
        this.store.dispatch(setCurrentPedido({ id: idPedido }));
      }
    });

    this.pedidoSelected$.subscribe((value) => {
      this.pedidoForm.reset(value);
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(setCurrentPedido({ id: 0 }));
  }

  onSubmit() {
    this.currentOperation?.pipe(take(1)).subscribe((op) => {
      switch (op) {
        case OperationEnum.creating:
          this.store.dispatch(createPedido({ pedido: this.pedidoForm.value }));
          break;
        case OperationEnum.updating:
          this.store.dispatch(updatePedido({ pedido: this.pedidoForm.value }));
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
    this.pedidoForm.get("createAt")?.disable();
    return this.pedidoForm.value.createAt;
  }
  public get updateAt(): string {
    this.pedidoForm.get("updateAt")?.disable();
    return this.pedidoForm.value.updateAt;
  }
}
