import { BrowserModule } from "@angular/platform-browser";
import { NgModule, isDevMode } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { CoreModule } from "./core/core.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { SharedModule } from "./core/commom-modules/shared.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { StoreModule, provideStore } from "@ngrx/store";
import { pedidoReducer } from "./store/pedidos/pedidos.reducer";
import { PedidosEffects } from "./store/pedidos/pedidos.effects";
import { EffectsModule } from "@ngrx/effects";
import { appReducers } from "./store/app.reducers";
import {
  StoreDevtoolsModule,
  provideStoreDevtools,
} from "@ngrx/store-devtools";
import { ItensEffects } from "./store/itens/itens.effects";
import { ItensEstoqueEffects } from "./store/itens-estoque/itens-estoque.effects";
import { ClientesEffects } from "./store/clientes/clientes.effects";
import { UsuariosEffects } from "./store/usuarios/usuarios.effects";
import { itemReducer } from "./store/itens/itens.reducer";
import { itemEstoqueReducer } from "./store/itens-estoque/itens-estoque.reducer";
import { clienteReducer } from "./store/clientes/clientes.reducer";
import { usuarioReducer } from "./store/usuarios/usuarios.reducer";
import { NgToastModule } from "ng-angular-popup";

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [
    NgToastModule,
    EffectsModule.forRoot([
      PedidosEffects,
      ItensEffects,
      ItensEstoqueEffects,
      ClientesEffects,
      UsuariosEffects,
    ]),
    StoreModule.forRoot({
      pedidos: pedidoReducer,
      items: itemReducer,
      itensEstoque: itemEstoqueReducer,
      clientes: clienteReducer,
      usuarios: usuarioReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
    MatSidenavModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideStore(appReducers),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
