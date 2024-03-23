import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";
import { Pedido } from "../models/Pedido";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PedidoService {
  private readonly apiUrl = `${environment.apiUrl}api/pedidos`;

  constructor(private http: HttpClient) {}

  public create(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}`, pedido);
  }

  public update(pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${pedido.uuid}`, pedido);
  }

  public getAllByUsuario(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}`);
  }

  public getByUuid(uuid: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/${uuid}`);
  }

  public delete(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uuid}`);
  }
}
