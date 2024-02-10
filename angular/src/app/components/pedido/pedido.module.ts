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

@NgModule({
  declarations: [PedidoComponent, FormPedidoComponent, ConsultaPedidoComponent],
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
