export class ItemEstoque {
  constructor(
    public id: number,
    public idItem: number,
    public nomItem: string,
    public qtdItem: number,
    public createAt: Date,
    public updateAt: Date
  ) {}
}
