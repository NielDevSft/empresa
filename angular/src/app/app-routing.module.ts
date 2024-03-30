import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { authGuard } from "./core";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
    canMatch: [authGuard],
  },
  { path: "login", component: LoginComponent },
  {
    path: "management",
    loadChildren: () =>
      import("./management/management.module").then((m) => m.ManagementModule),
    canMatch: [authGuard],
  },
  {
    path: "pedido",
    loadChildren: () =>
      import("./pages/pedido/pedido.module").then((m) => m.PedidoModule),
    canMatch: [authGuard],
  },
  {
    path: "item",
    loadChildren: () =>
      import("./pages/item/item.module").then((m) => m.ItemModule),
    canMatch: [authGuard],
  },
  {
    path: "item-estoque",
    loadChildren: () =>
      import("./pages/item-estoque/item-estoque.module").then(
        (m) => m.ItemEstoqueModule
      ),
    canMatch: [authGuard],
  },
  {
    path: "cliente",
    loadChildren: () =>
      import("./pages/cliente/cliente.module").then((m) => m.ClienteModule),
    canMatch: [authGuard],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
