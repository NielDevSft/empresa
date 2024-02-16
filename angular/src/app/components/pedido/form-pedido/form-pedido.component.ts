import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { provideNativeDateAdapter } from "@angular/material/core";

import { combineLatest, take } from "rxjs";
import { OperationEnum } from "../../../models/enum/OperationEnum";
import { selectAllItens } from "../../../store/itens/itens.selector";
import { Item } from "../../../models/Item";

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

  columnsItensToDisplay = ["id", "nomItem", "qtd", "valItem"];
  pedidoForm: FormGroup = this.fromBuilder.group({
    id: [],
    profissionalResponsavel: ["", [Validators.required]],
    itensPedido: [[], [Validators.required]],
    valorTotal: [null, [Validators.required]],
    createAt: [null],
    updateAt: [null],
  });
  itensForm: FormGroup = this.fromBuilder.group({
    item: [, [Validators.required]],
    qtd: [, Validators.required],
  });

  public pedidoSelected$ = this.store.select(pedidoSelected);
  public currentOperation? = this.store.select(currentOperation);
  public itemList$ = this.store.select(selectAllItens);

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
    this.itensPedidoControl?.setValue([]);
    this.pedidoSelected$.subscribe((value) => {
      this.pedidoForm.reset(value);
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(setCurrentPedido({ id: 0 }));
  }

  onAddItem() {
    const itemPedidoItem = this.itensPedidoControl?.value;
    const vf = this.itensForm.value;
    this.itensPedidoControl?.setValue([...(itemPedidoItem || []), vf]);
    this.itensForm?.reset();
  }
  onClonseItem(id: number) {
    const itemPedidoItem = this.itensPedidoControl?.value as Item[];
    const vf = this.itensForm.value;
    this.itensPedidoControl?.setValue(itemPedidoItem.filter((i) => i.id == id));
    this.itensForm?.reset();
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
    return this.pedidoForm.value.createAt;
  }
  public get updateAt(): string {
    return this.pedidoForm.value.updateAt;
  }
  public get itensPedidoControl(): AbstractControl | null {
    return this.pedidoForm.get("itensPedido");
  }
}
