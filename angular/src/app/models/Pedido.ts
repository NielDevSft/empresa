export class Pedido {
  constructor(
    public id: number,
    public desPedido: string,
    public profissionalResponsavel: string,
    public valorConsulta: number,
    public dataAgendamento: Date,
    public createAt: Date,
    public updateAt: Date,
    public selected: boolean
  ) {}
}
