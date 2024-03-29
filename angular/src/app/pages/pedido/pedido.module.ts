import { NgModule, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { PedidoComponent } from "./pedido.component";
import { SharedModule } from "../../core/commom-modules/shared.module";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { PedidoRoutingModule } from "./pedido-routing.module";
import { FormPedidoComponent } from "./form-pedido/form-pedido.component";
import { ConsultaPedidoComponent } from "./consulta-pedido/consulta-pedido.component";
import { DeletePedidoComponent } from "./delete-pedido/delete-pedido.component";
import { NumeroItensPedidoPipe } from "../../custom-pipes/numero-itens-pedido.pipe";
import { CpfPipe } from "../../custom-pipes/cpf.pipe";

@NgModule({
  declarations: [
    PedidoComponent,
    FormPedidoComponent,
    ConsultaPedidoComponent,
    DeletePedidoComponent,
    NumeroItensPedidoPipe,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    SharedModule,
    MatExpansionModule,
    MatTabsModule,
    PedidoRoutingModule,
  ],
})
export class PedidoModule {}
