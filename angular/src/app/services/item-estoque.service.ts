import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ItemEstoque } from "../models/ItemEstoque";

@Injectable({
  providedIn: "root",
})
export class ItemEstoqueService {
  private readonly apiUrl = `${environment.apiUrl}api/itensestoque`;

  constructor(private http: HttpClient) {}
  public create(itemEstoque: ItemEstoque): Observable<ItemEstoque> {
    return this.http.post<ItemEstoque>(`${this.apiUrl}`, itemEstoque);
  }

  public update(itemEstoque: ItemEstoque): Observable<ItemEstoque> {
    return this.http.put<ItemEstoque>(
      `${this.apiUrl}/${itemEstoque.id}`,
      itemEstoque
    );
  }

  public getAllByUsuario(): Observable<ItemEstoque[]> {
    return this.http.get<ItemEstoque[]>(`${this.apiUrl}`);
  }

  public getById(id: number): Observable<ItemEstoque[]> {
    return this.http.get<ItemEstoque[]>(`${this.apiUrl}/${id}`);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
