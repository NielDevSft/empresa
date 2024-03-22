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
      `${this.apiUrl}/${itemEstoque.uuid}`,
      itemEstoque
    );
  }

  public getAllByUsuario(): Observable<ItemEstoque[]> {
    return this.http.get<ItemEstoque[]>(`${this.apiUrl}`);
  }

  public getByUuid(uuid: string): Observable<ItemEstoque[]> {
    return this.http.get<ItemEstoque[]>(`${this.apiUrl}/${uuid}`);
  }

  public delete(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uuid}`);
  }
}
