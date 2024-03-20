import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClienteComponent } from "./cliente.component";
import { DeleteClienteComponent } from './delete-cliente/delete-cliente.component';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { ConsultaClienteComponent } from './consulta-cliente/consulta-cliente.component';

@NgModule({
  declarations: [ClienteComponent, DeleteClienteComponent, FormClienteComponent, ConsultaClienteComponent],
  imports: [CommonModule],
})
export class ClienteModule {}
