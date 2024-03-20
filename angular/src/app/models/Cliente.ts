export class Cliente {
  constructor(
    public nomeComleto: string,
    public dtaNascimento: Date,
    public valRenda: number,
    public cpf: string,
    public userUuid: string,
    public createAt: Date,
    public updateAt: Date,
    public uuid: string
  ) {}
}
