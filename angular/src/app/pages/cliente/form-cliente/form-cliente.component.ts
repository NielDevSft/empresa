import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import {
  clienteSelected,
  currentOperation,
} from "../../../store/clientes/clientes.selector";
import { combineLatest, take } from "rxjs";
import {
  createCliente,
  setCurrentCliente,
  setOperation,
  updateCliente,
} from "../../../store/clientes/clientes.actions";
import { v4 } from "uuid";
import { OperationEnum } from "../../../models/enum/OperationEnum";
import { provideNativeDateAdapter } from "@angular/material/core";

@Component({
  selector: "app-form-cliente",
  templateUrl: "./form-cliente.component.html",
  providers: [provideNativeDateAdapter()],
  styleUrl: "./form-cliente.component.css",
})
export class FormClienteComponent implements OnInit, OnDestroy {
  router = inject(ActivatedRoute);
  store = inject(Store);
  fromBuilder = inject(FormBuilder);

  clienteForm: FormGroup = this.fromBuilder.group({
    uuid: [""],
    nomeComleto: ["", [Validators.required]],
    dtaNascimento: ["", [Validators.required]],
    valRenda: [0, [Validators.required]],
    cpf: ["", [Validators.required]],
    userUuid: ["", [Validators.required]],
    createAt: [{ value: null, disable: true }],
    updateAt: [{ value: null, disable: true }],
  });

  public clienteSelected$ = this.store.select(clienteSelected);
  public currentOperation? = this.store.select(currentOperation);

  ngOnInit(): void {
    combineLatest([
      this.clienteSelected$.pipe(take(1)),
      this.router.params,
    ]).subscribe(([selected, params]) => {
      const idCliente = params["id"];
      if (!selected && !!idCliente) {
        this.store.dispatch(setCurrentCliente({ uuid: idCliente }));
      }
    });

    this.clienteSelected$.subscribe((value) => {
      this.clienteForm.reset(value);
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(setCurrentCliente({ uuid: v4() }));
  }

  onSubmit() {
    this.currentOperation?.pipe(take(1)).subscribe((op) => {
      switch (op) {
        case OperationEnum.creating:
          this.store.dispatch(
            createCliente({ cliente: this.clienteForm.value })
          );
          break;
        case OperationEnum.updating:
          this.store.dispatch(
            updateCliente({ cliente: this.clienteForm.value })
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
    this.clienteForm.get("createAt");
    return this.clienteForm.value.createAt;
  }
  public get updateAt(): string {
    this.clienteForm.get("updateAt");
    return this.clienteForm.value.updateAt;
  }
}
