export class Usuario {
  constructor(
    public email: string,
    public username: string,
    public uuid: string,
    public createAt: Date,
    public updateAt: Date
  ) {}
}
