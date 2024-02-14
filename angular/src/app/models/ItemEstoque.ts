import { Item } from "./Item";

export class ItemEstoque {
  constructor(
    public id: number,
    public item: Item,
    public qtdItem: number,
    public createAt: Date,
    public updateAt: Date
  ) {}
}
