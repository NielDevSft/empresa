import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Item } from "../models/Item";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  private readonly apiUrl = `${environment.apiUrl}api/itens`;

  constructor(private http: HttpClient) {}
  public create(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}`, item);
  }

  public update(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${item.uuid}`, item);
  }

  public getAllByUsuario(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}`);
  }

  public getByUuid(uuid: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/${uuid}`);
  }

  public delete(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uuid}`);
  }
}
