import { ClienteState } from "./clientes/clientes.reducer";
import { ItemEstoqueState } from "./itens-estoque/itens-estoque.reducer";
import { ItemState } from "./itens/itens.reducer";
import { PedidoState } from "./pedidos/pedidos.reducer";
import { UsuarioState } from "./usuarios/usuarios.reducer";

export interface AppState {
  pedidos: PedidoState;
  items: ItemState;
  itensEstoque: ItemEstoqueState;
  clientes: ClienteState;
  usuarios: UsuarioState;
}
