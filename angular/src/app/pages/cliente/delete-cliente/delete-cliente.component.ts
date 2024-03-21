import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  deleteCliente,
  setOperation,
} from "../../../store/clientes/clientes.actions";
import { OperationEnum } from "../../../models/enum/OperationEnum";
import { take } from "rxjs";
import { clienteSelected } from "../../../store/clientes/clientes.selector";

@Component({
  selector: "app-delete-cliente",
  templateUrl: "./delete-cliente.component.html",
  styleUrl: "./delete-cliente.component.css",
})
export class DeleteClienteComponent {
  store = inject(Store);

  public clienteSelected$ = this.store.select(clienteSelected);

  onDelete() {
    this.clienteSelected$.pipe(take(1)).subscribe((cli) => {
      if (cli) {
        this.store.dispatch(deleteCliente({ uuid: cli.uuid }));
        this.store.dispatch(setOperation({ op: OperationEnum.listing }));
      }
    });
  }
}
