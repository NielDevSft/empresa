import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Subscription } from "rxjs";
import { Utils } from "../../utils/utils";
import { Store } from "@ngrx/store";
import { logginWithEmailNPassword } from "../../store/authentications/authentications.actions";
import { userLogged } from "../../store/authentications/authentications.selectors";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  busy = false;
  username = "";
  password = "";
  loginError = false;
  private subscription: Subscription | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}
  store = inject(Store);
  public userLogged$ = this.store.select(userLogged);

  ngOnInit(): void {
    this.subscription = this.userLogged$.subscribe((x) => {
      if (this.route.snapshot.url[0].path === "login") {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        if (x && accessToken && refreshToken) {
          const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "";
          this.router.navigate([returnUrl]);
        }
      } // optional touch-up: if a tab shows login page, then refresh the page to reduce duplicate login
    });
  }

  login() {
    if (!this.username || !this.password) {
      return;
    }
    this.busy = true;
    const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "";

    this.store.dispatch(
      logginWithEmailNPassword({
        email: this.username,
        password: Utils().encrypt(this.password),
      })
    );
    this.userLogged$.subscribe({
      next: () => {
        this.router.navigate([returnUrl]);
      },
      error: () => {
        this.loginError = true;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
