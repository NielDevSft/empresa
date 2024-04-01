import { createReducer, on } from "@ngrx/store";
import { Cliente } from "../../models/Cliente";
import {
  createCliente,
  deleteCliente,
  getAllClientesByUser,
  getAllClientesByUserFailure,
  getAllClientesByUserSuccess,
  updateCliente,
  setCurrentCliente,
  setOperation,
} from "./clientes.actions";

import { StatusEnum } from "../../models/enum/StatusEnum";
import { OperationEnum } from "../../models/enum/OperationEnum";
import { v4 as uuidv4 } from "uuid";

export interface ClienteState {
  clienteList: Cliente[];
  currentCliente: Cliente | null;
  currentOperation: OperationEnum;
  status: StatusEnum;
  errors: string | null;
}

export const initialState: ClienteState = {
  clienteList: [],
  currentOperation: OperationEnum.listing,
  currentCliente: null,
  status: StatusEnum.pending,
  errors: null,
};

export const clienteReducer = createReducer(
  initialState,
  on(getAllClientesByUser, (state) => ({
    ...state,
    status: StatusEnum.pending,
  })),
  on(getAllClientesByUserSuccess, (state, { clientes }) => ({
    ...state,
    clienteList: clientes,
    error: null,
    status: StatusEnum.success,
  })),
  on(getAllClientesByUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.error,
  })),
  on(getAllClientesByUser, (state) => ({
    ...state,
    status: StatusEnum.pending,
  })),
  on(createCliente, (state, { cliente }) => ({
    ...state,
    clienteList: [...state.clienteList, { ...cliente, uuid: uuidv4() }],
  })),
  on(setCurrentCliente, (state, { uuid }) => ({
    ...state,
    currentCliente:
      state.clienteList.find((p) => {
        return p.uuid == uuid;
      }) || null,
  })),
  on(updateCliente, (state, { cliente }) => ({
    ...state,
    clienteList: state.clienteList.map((p) => {
      if (!!cliente && p.uuid === cliente.uuid) {
        return cliente;
      }
      return p;
    }),
  })),
  on(deleteCliente, (state, { uuid }) => ({
    ...state,
    clienteList: state.clienteList.filter((p) => p.uuid !== uuid),
    currentCliente: null,
  })),
  on(setOperation, (state, { op }) => ({
    ...state,
    currentOperation: op,
  }))
);
