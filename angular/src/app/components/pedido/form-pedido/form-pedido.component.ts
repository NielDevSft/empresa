import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, map, switchMap } from "rxjs";
import {
  createPedido,
  setCurrentPedido,
  updatePedido,
} from "../../../store/pedidos/pedidos.actions";
import {
  pedidoSelected,
  currentOperation,
} from "../../../store/pedidos/pedidos.selector";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { provideNativeDateAdapter } from "@angular/material/core";
import { OperationEnum } from "../../../store/pedidos/pedidos.reducer";

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
    id: [, [Validators.required]],
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
    this.router.params.subscribe((params) => {
      const idPedido = params["id"];
      if (!!idPedido) {
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
    this.currentOperation?.subscribe((op) => {
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
    });
  }
  public get createAt(): string {
    return this.pedidoForm.value.createAt;
  }
  public get updateAt(): string {
    return this.pedidoForm.value.updateAt;
  }
}
