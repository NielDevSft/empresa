import { Item } from "./Item";

export class ItemEstoque {
  constructor(
    public uuid: string,
    public item: Item,
    public qtdItem: number,
    public createAt: Date,
    public updateAt: Date
  ) {}
}
