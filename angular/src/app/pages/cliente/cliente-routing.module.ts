import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClienteComponent } from "./cliente.component";
import { FormClienteComponent } from "./form-cliente/form-cliente.component";
import { authGuard } from "../../guards/auth.guard";
import { ConsultaClienteComponent } from "./consulta-cliente/consulta-cliente.component";
import { DeleteClienteComponent } from "./delete-cliente/delete-cliente.component";

const routes: Routes = [
  {
    path: "",
    component: ClienteComponent,
    children: [
      {
        path: "new",
        title: "new",
        component: FormClienteComponent,
        canMatch: [authGuard],
      },
      {
        path: "edit/:uuid",
        title: "edit",
        component: FormClienteComponent,
        canMatch: [authGuard],
      },
      {
        path: "delete",
        title: "delete",
        component: DeleteClienteComponent,
        canMatch: [authGuard],
      },
      {
        path: ":uuid",
        title: "show",
        component: ConsultaClienteComponent,
        canMatch: [authGuard],
      },
      {
        path: "",
        title: "consulta",
        component: ConsultaClienteComponent,
        canMatch: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
