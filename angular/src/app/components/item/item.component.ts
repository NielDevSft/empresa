import { Component, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";

import { ThemePalette, provideNativeDateAdapter } from "@angular/material/core";

import { combineLatest, map, Observable, of, take } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { currentOperation } from "../../store/itens/itens.selector";
import { setOperation } from "../../store/itens/itens.actions";
import { OperationEnum } from "../../models/enum/OperationEnum";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrl: "./item.component.css",
  providers: [provideNativeDateAdapter()],
})
export class ItemComponent implements OnInit {
  links = ["Consulta", "Dados", "Deleção"];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
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
              this.router.navigate(["item/"]);
              return this.links[0];
            case OperationEnum.updating:
            case OperationEnum.seeing:
              return this.links[1];
            case OperationEnum.creating:
              this.router.navigate(["item/new"]);
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
