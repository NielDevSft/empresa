import { Item } from "./Item";

export class Pedido {
  constructor(
    public id: number,
    public profissionalResponsavel: string,
    public itensPedido: { item: Item; qtd: number }[],
    public valorTotal: number,
    public dataAgendamento: Date,
    public createAt: Date,
    public updateAt: Date
  ) {}
}
