import { ItemState } from "./itens/itens.reducer";
import { PedidoState } from "./pedidos/pedidos.reducer";

export interface AppState {
  pedidos: PedidoState;
  items: ItemState;
}
