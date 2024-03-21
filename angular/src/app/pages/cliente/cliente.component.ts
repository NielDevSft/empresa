import { Component, OnInit, inject } from "@angular/core";
import { Observable, combineLatest, map, of, take } from "rxjs";
import { OperationEnum } from "../../models/enum/OperationEnum";
import { currentOperation } from "../../store/pedidos/pedidos.selector";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import { ThemePalette } from "@angular/material/core";
import { setOperation } from "../../store/pedidos/pedidos.actions";

@Component({
  selector: "app-cliente",
  templateUrl: "./cliente.component.html",
  styleUrl: "./cliente.component.css",
})
export class ClienteComponent implements OnInit {
  links = ["Consulta", "Dados", "Deleção"];
  activeLink = this.links[0];
  background: ThemePalette = "primary";
  store = inject(Store);
  router = inject(Router);
  routerAct = inject(ActivatedRoute);
  activeRoute: any;
  currentOperation = this.store.select(currentOperation);

  ngOnInit(): void {
    this.currentOperation
      .pipe(
        map((op) => {
          switch (op) {
            case OperationEnum.listing:
              this.router.navigate(["cliente/"]);
              return this.links[0];
            case OperationEnum.updating:
            case OperationEnum.seeing:
              return this.links[1];
            case OperationEnum.creating:
              this.router.navigate(["cliente/new"]);
              return this.links[1];
            case OperationEnum.deleting:
              return this.links[2];
            default:
              return this.links[0];
          }
        })
      )
      .subscribe((act) => {
        this.activeLink = act;
      });
  }

  onTabChange(link: string) {
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

  disabledLink(link: string): Observable<boolean> {
    return combineLatest([of(link), this.currentOperation]).pipe(
      take(1),
      map(([act, op]) => {
        return act === this.links[2] && op !== OperationEnum.deleting;
      })
    );
  }
  setlectActiveLink(link: string) {
    return link === this.activeLink;
  }
}
