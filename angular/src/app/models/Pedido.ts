export class Pedido {
  constructor(
    public id: number,
    public desPedido: string,
    public createAt: Date,
    public updateAt: Date,
    public selected: boolean
  ) {}
}