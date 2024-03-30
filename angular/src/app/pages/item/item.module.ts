import { NgModule, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";

import { SharedModule } from "../../core/common/shared.module";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";

import { FormItemComponent } from "./form-item/form-item.component";
import { ItemComponent } from "./item.component";
import { ConsultaItemComponent } from "./consulta-item/consulta-item.component";
import { DeleteItemComponent } from "./delete-item/delete-item.component";
import { ItemRoutingModule } from "./item-routing.module";

@NgModule({
  declarations: [
    ItemComponent,
    FormItemComponent,
    ConsultaItemComponent,
    DeleteItemComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    SharedModule,
    MatExpansionModule,
    MatTabsModule,
    ItemRoutingModule,
  ],
})
export class ItemModule {}
