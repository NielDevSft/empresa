import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Cliente } from "../models/Cliente";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  private readonly apiUrl = `${environment.clienteApiUrl}api/clientes`;

  constructor(private http: HttpClient) {}
  public create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}`, cliente);
  }

  public update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.uuid}`, cliente);
  }

  public getAllByUsuario(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}`);
  }

  public getById(uuid: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/${uuid}`);
  }

  public delete(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uuid}`);
  }
}
