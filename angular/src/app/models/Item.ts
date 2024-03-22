export class Item {
  constructor(
    public uuid: string,
    public nomItem: string,
    public valItem: number,
    public desItem: string,
    public createAt: Date,
    public updateAt: Date
  ) {}
}
