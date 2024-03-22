import { Item } from "./Item";

export class Pedido {
  constructor(
    public uuid: string,
    public profissionalResponsavel: string,
    public itensPedido: { item: Item; qtd: number }[],
    public valorTotal: number,
    public createAt: Date,
    public updateAt: Date
  ) {}
}
