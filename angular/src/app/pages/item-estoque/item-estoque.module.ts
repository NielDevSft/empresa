import { NgModule, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";

import { SharedModule } from "../../core/common/shared.module";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";

import { FormItemEstoqueComponent } from "./form-item-estoque/form-item-estoque.component";
import { ConsultaItemEstoqueComponent } from "./consulta-item-estoque/consulta-item-estoque.component";
import { DeleteItemEstoqueComponent } from "./delete-item-estoque/delete-item-estoque.component";
import { ItemEstoqueComponent } from "./item-estoque.component";
import { ItemEstoqueRoutingModule } from "./item-estoque-routing.module";

@NgModule({
  declarations: [
    ItemEstoqueComponent,
    FormItemEstoqueComponent,
    ConsultaItemEstoqueComponent,
    DeleteItemEstoqueComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    SharedModule,
    MatExpansionModule,
    MatTabsModule,
    ItemEstoqueRoutingModule,
  ],
})
export class ItemEstoqueModule {}
