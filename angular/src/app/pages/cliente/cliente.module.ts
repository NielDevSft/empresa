import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClienteComponent } from "./cliente.component";
import { DeleteClienteComponent } from "./delete-cliente/delete-cliente.component";
import { FormClienteComponent } from "./form-cliente/form-cliente.component";
import { ConsultaClienteComponent } from "./consulta-cliente/consulta-cliente.component";
import { ClienteRoutingModule } from "./cliente-routing.module";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { SharedModule } from "../../core/commom-modules/shared.module";
import { MatTableModule } from "@angular/material/table";
import { CpfPipe } from "../../custom-pipes/cpf.pipe";

@NgModule({
  declarations: [
    ClienteComponent,
    DeleteClienteComponent,
    FormClienteComponent,
    ConsultaClienteComponent,
    CpfPipe,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    SharedModule,
    MatExpansionModule,
    MatTabsModule,
    ClienteRoutingModule,
  ],
})
export class ClienteModule {}
