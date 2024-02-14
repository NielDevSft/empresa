import { Component } from "@angular/core";
import { AuthService } from "./core";

@Component({
  selector: "app-root",
  template: `
    <mat-toolbar class="mat-toolbar">
      <span id="title">New Hair</span>
      <span class="example-spacer"></span>
      <nav *ngIf="authService.user$ | async as user">
        <button mat-button [routerLink]="['/item-estoque']">
          Itens Estoque
        </button>
      </nav>
      <nav *ngIf="authService.user$ | async as user">
        <button mat-button [routerLink]="['/item']">Itens</button>
      </nav>
      <nav *ngIf="authService.user$ | async as user">
        <button mat-button [routerLink]="['/pedido']">Pedidos</button>
      </nav>

      <button
        mat-button
        color="accent"
        type="button"
        *ngIf="authService.user$ | async as user"
        (click)="logout()"
      >
        Logout
      </button>
    </mat-toolbar>
    <!-- <main class="d-flex flex-column flex-grow-1 h-100 w-100"></main> -->
    <mat-drawer-container class="example-container">
      <mat-drawer-content><router-outlet></router-outlet></mat-drawer-content>
    </mat-drawer-container>
    <div></div>
  `,
  styles: [
    `
      .example-container {
        margin: 1% 10%;
        height: 100%;
        border: 1px solid #555;
      }
    `,
  ],
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
