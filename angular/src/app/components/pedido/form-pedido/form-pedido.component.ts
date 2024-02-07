import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, map, switchMap } from "rxjs";
import { setCurrentPedido } from "../../../store/pedidos/pedidos.actions";
import { pedidoSelected } from "../../../store/pedidos/pedidos.selector";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-form-pedido",
  templateUrl: "./form-pedido.component.html",
  styleUrl: "./form-pedido.component.css",
})
export class FormPedidoComponent implements OnInit, OnDestroy {
  router = inject(ActivatedRoute);
  store = inject(Store);
  fromBuilder = inject(FormBuilder);
  pedidoForm: FormGroup = this.fromBuilder.group({
    desPedido: ["", [Validators.required]],
    profissionalResponsavel: ["", [Validators.required]],
    valorConsulta: ["", [Validators.required]],
    dataAgendamento: ["", [Validators.required]],
    createAt: [, [Validators.required]],
    updateAt: [, [Validators.required]],
  });

  public pedidoSelected$ = this.store.select(pedidoSelected);

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
  public get createAt(): string {
    return this.pedidoForm.value.createAt;
  }
  public get updateAt(): string {
    return this.pedidoForm.value.updateAt;
  }
}
