import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PedidoComponent } from "./pedido.component";
import { FormPedidoComponent } from "./form-pedido/form-pedido.component";
import { authGuard } from "../../core/guards/auth.guard";
import { ConsultaPedidoComponent } from "./consulta-pedido/consulta-pedido.component";
import { DeletePedidoComponent } from "./delete-pedido/delete-pedido.component";

const routes: Routes = [
  {
    path: "",
    component: PedidoComponent,
    children: [
      {
        path: "new",
        title: "new",
        component: FormPedidoComponent,
        canMatch: [authGuard],
      },
      {
        path: "edit/:id",
        title: "edit",
        component: FormPedidoComponent,
        canMatch: [authGuard],
      },
      {
        path: "delete",
        title: "delete",
        component: DeletePedidoComponent,
        canMatch: [authGuard],
      },
      {
        path: ":id",
        title: "show",
        component: ConsultaPedidoComponent,
        canMatch: [authGuard],
      },
      {
        path: "",
        title: "consulta",
        component: ConsultaPedidoComponent,
        canMatch: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoRoutingModule {}
