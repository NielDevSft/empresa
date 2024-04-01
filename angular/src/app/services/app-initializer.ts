import { Observable } from "rxjs";
import { AuthService } from "./authentication.service";

export function appInitializer(
  authService: AuthService
): () => Observable<any> {
  return () => authService.refreshToken();
}
