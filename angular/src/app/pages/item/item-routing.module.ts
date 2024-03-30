import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ItemComponent } from "./item.component";
import { FormItemComponent } from "./form-item/form-item.component";
import { authGuard } from "../../guards/auth.guard";
import { ConsultaItemComponent } from "./consulta-item/consulta-item.component";
import { DeleteItemComponent } from "./delete-item/delete-item.component";

const routes: Routes = [
  {
    path: "",
    component: ItemComponent,
    children: [
      {
        path: "new",
        title: "new",
        component: FormItemComponent,
        canMatch: [authGuard],
      },
      {
        path: "edit/:uuid",
        title: "edit",
        component: FormItemComponent,
        canMatch: [authGuard],
      },
      {
        path: "delete",
        title: "delete",
        component: DeleteItemComponent,
        canMatch: [authGuard],
      },
      {
        path: ":uuid",
        title: "show",
        component: ConsultaItemComponent,
        canMatch: [authGuard],
      },
      {
        path: "",
        title: "consulta",
        component: ConsultaItemComponent,
        canMatch: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemRoutingModule {}
