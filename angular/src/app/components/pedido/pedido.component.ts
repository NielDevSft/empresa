import { Component, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  currentOperation,
  selectAllPedidos,
} from "../../store/pedidos/pedidos.selector";
import { ThemePalette, provideNativeDateAdapter } from "@angular/material/core";

import { filter, map, Observable } from "rxjs";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { OperationEnum } from "../../store/pedidos/pedidos.reducer";
import { setOperation } from "../../store/pedidos/pedidos.actions";

@Component({
  selector: "app-pedido",
  templateUrl: "./pedido.component.html",
  styleUrl: "./pedido.component.css",
  providers: [provideNativeDateAdapter()],
})
export class PedidoComponent implements OnInit {
  links = ["Consulta", "Dados"];
  activeLink = new Observable<string>((sub) => sub.next(this.links[0]));
  background: ThemePalette = undefined;
  store = inject(Store);
  router = inject(Router);
  routerAct = inject(ActivatedRoute);
  activeRoute: any;
  currentOperation = this.store.select(currentOperation);
  ngOnInit(): void {
    this.activeLink = this.currentOperation.pipe(
      map((op) => {
        switch (op) {
          case OperationEnum.listing:
            this.router.navigate(["pedido/"]);
            return this.links[0];
          case OperationEnum.updating:
          case OperationEnum.seeing:
            return this.links[1];
          case OperationEnum.creating:
            this.router.navigate(["pedido/new"]);
            return this.links[1];
        }
        return "";
      })
    );
  }

  onTabChange(link: string) {
    // this.activeLink = link;
    switch (link) {
      case "Consulta":
        this.store.dispatch(setOperation({ op: OperationEnum.listing }));
        break;
      case "Dados":
        this.store.dispatch(setOperation({ op: OperationEnum.creating }));
        break;
      default:
        break;
    }
  }
  updateLink(link: string) {}
}
