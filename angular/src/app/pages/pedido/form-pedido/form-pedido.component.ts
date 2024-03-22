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
import { getAllItensByUser } from "../../../store/itens/itens.actions";

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

  columnsItensToDisplay = ["uuid", "nomItem", "qtdItem", "valItem"];
  pedidoForm: FormGroup = this.fromBuilder.group({
    uuid: [],
    profissionalResponsavel: ["", [Validators.required]],
    itensPedido: [[], [Validators.required]],
    valorTotal: [0, [Validators.required]],
    createAt: [null],
    updateAt: [null],
  });
  itensForm: FormGroup = this.fromBuilder.group({
    item: [, [Validators.required]],
    qtdItem: [, Validators.required],
  });

  public pedidoSelected$ = this.store.select(pedidoSelected);
  public currentOperation? = this.store.select(currentOperation);
  public itemList$ = this.store.select(selectAllItens);

  ngOnInit(): void {
    combineLatest([
      this.pedidoSelected$.pipe(take(1)),
      this.router.params,
    ]).subscribe(([selected, params]) => {
      const idPedido = params["uuid"];
      if (!selected && !!idPedido) {
        this.store.dispatch(setCurrentPedido({ uuid: idPedido }));
      }
    });
    this.itensPedidoControl?.setValue([]);
    this.valorTotalControl?.disable();
    this.pedidoSelected$.subscribe((value) => {
      this.pedidoForm.reset(value);
    });
    this.itemList$.pipe(take(1)).subscribe((list) => {
      if (list.length == 0) {
        this.store.dispatch(getAllItensByUser());
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(setCurrentPedido({ uuid: "" }));
  }

  onAddItem() {
    const valorTotalPedido = this.valorTotalControl?.value || 0;
    const itemPedido = this.itensForm.value;

    this.setValorTotalControl =
      valorTotalPedido + itemPedido.item.valItem * itemPedido.qtdItem;

    this.addItensPedidoControl = itemPedido;
    this.itensForm?.reset();
  }

  onClonseItem(uuid: string) {
    const itemPedidoItem = this.itensPedidoControl?.value as Item[];
    const vf = this.itensForm.value;
    this.itensPedidoControl?.setValue(
      itemPedidoItem.filter((i) => i.uuid == uuid)
    );
    this.itensForm?.reset();
  }

  onSubmit() {
    this.valorTotalControl?.enable();
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

  public get valorTotalControl(): AbstractControl | null {
    return this.pedidoForm.get("valorTotal");
  }
  public set setValorTotalControl(val: number) {
    this.pedidoForm.get("valorTotal")?.enable();
    this.pedidoForm.get("valorTotal")?.setValue(val);
    this.pedidoForm.get("valorTotal")?.disable();
  }

  public set addItensPedidoControl(item: {}) {
    this.pedidoForm.get("itensPedido");
    const itemPedidoItem = this.itensPedidoControl?.value;
    this.itensPedidoControl?.setValue([...(itemPedidoItem || []), item]);
  }
}
