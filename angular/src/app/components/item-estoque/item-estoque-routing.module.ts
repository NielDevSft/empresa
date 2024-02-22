import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ItemEstoqueComponent } from "./item-estoque.component";
import { FormItemEstoqueComponent } from "./form-item-estoque/form-item-estoque.component";
import { authGuard } from "../../core/guards/auth.guard";
import { ConsultaItemEstoqueComponent } from "./consulta-item-estoque/consulta-item-estoque.component";
import { DeleteItemEstoqueComponent } from "./delete-item-estoque/delete-item-estoque.component";

const routes: Routes = [
  {
    path: "",
    component: ItemEstoqueComponent,
    children: [
      {
        path: "edit/:id",
        title: "edit",
        component: FormItemEstoqueComponent,
        canMatch: [authGuard],
      },
      {
        path: "delete",
        title: "delete",
        component: DeleteItemEstoqueComponent,
        canMatch: [authGuard],
      },
      {
        path: ":id",
        title: "show",
        component: ConsultaItemEstoqueComponent,
        canMatch: [authGuard],
      },
      {
        path: "",
        title: "consulta",
        component: ConsultaItemEstoqueComponent,
        canMatch: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemEstoqueRoutingModule {}
