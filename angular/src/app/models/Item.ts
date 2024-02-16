export class Item {
  constructor(
    public id: number,
    public nomItem: string,
    public valItem: number,
    public desItem: string,
    public createAt: Date,
    public updateAt: Date
  ) {}
}
