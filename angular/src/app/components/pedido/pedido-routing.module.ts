import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PedidoComponent } from "./pedido.component";
import { FormPedidoComponent } from "./form-pedido/form-pedido.component";
import { authGuard } from "../../core/guards/auth.guard";

const routes: Routes = [
  { path: "", component: PedidoComponent, canMatch: [authGuard] },
  { path: "new", component: FormPedidoComponent, canMatch: [authGuard] },
  { path: "edit", component: FormPedidoComponent, canMatch: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoRoutingModule {}
