import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";
import { Pedido } from "../models/Pedido";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PedidoService implements OnInit {
  private readonly apiUrl = `${environment.apiUrl}api/pedido`;

  constructor(private http: HttpClient) {}

  public create(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}`, pedido);
  }

  public update(pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}`, pedido);
  }

  public getAllByUsuario(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/get-by-usuario`);
  }

  public getById(id: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/${id}`);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
}
