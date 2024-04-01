import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/authentication.service";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          if (err.statusText === "Unauthorized") {
            this.toast.error({
              detail: "Erro",
              summary: "Por favor refaça o login na plicação.",
              sticky: true,
            });
          } else {
            console.log(err);
            this.toast.error({
              detail: "Erro",
              summary: err.message,
              sticky: true,
            });
          }
          this.authService.clearLocalStorage();
          this.router.navigate(["login"], {
            queryParams: { returnUrl: this.router.routerState.snapshot.url },
          });
        }

        if (!environment.production) {
          console.error(err);
        }
        const error = (err && err.error && err.error.message) || err.statusText;
        throw Error(error);
      })
    );
  }
}
