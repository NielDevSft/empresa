import { Injectable, OnInit } from "@angular/core";
import { Usuario } from "../models/Usuario";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private readonly apiUrl = `${environment.authenticationApiUrl}api/usuarios`;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  public getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}`);
  }
}
