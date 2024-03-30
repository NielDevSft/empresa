import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { authGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
    canMatch: [authGuard],
  },
  { path: "login", component: LoginComponent },
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
