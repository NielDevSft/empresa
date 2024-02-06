import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { CoreModule } from "./core/core.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { DemoApisComponent } from "./demo-apis/demo-apis.component";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { SharedModule } from "./core/commom-modules/shared.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { StoreModule, provideStore } from "@ngrx/store";
import { pedidoReducer } from "./store/pedidos/pedidos.reducer";
import { PedidosEffects } from "./store/pedidos/pedidos.effects";
import { EffectsModule } from "@ngrx/effects";
import { appReducers } from "./store/app.reducers";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DemoApisComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
    MatSidenavModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot({ pedido: pedidoReducer }),
    EffectsModule.forRoot([PedidosEffects]),
  ],
  providers: [provideAnimationsAsync(), provideStore(appReducers)],
  bootstrap: [AppComponent],
})
export class AppModule {}
