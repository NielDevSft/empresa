import { Pipe, PipeTransform } from "@angular/core";
import { Item } from "../models/Item";

@Pipe({
  name: "numeroItensPedido",
})
export class NumeroItensPedidoPipe implements PipeTransform {
  transform(
    value: { item: Item; qtdItem: number }[],
    ...args: unknown[]
  ): number {
    let numTotalItens = 0;
    value.forEach((value) => {
      numTotalItens += value.qtdItem;
    });
    return numTotalItens;
  }
}
