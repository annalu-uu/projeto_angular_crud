import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Cliente {
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  uf: string;
  municipio: string;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaServiceService {
  private listaClientes: Cliente[] = [];
  
  // O BehaviorSubject mantém o histórico dos dados salvos na memória
  private clientesSubject = new BehaviorSubject<Cliente[]>(this.listaClientes);
  clientes$ = this.clientesSubject.asObservable();

  adicionarCliente(cliente: Cliente): void {
    this.listaClientes.push(cliente);
    // Dispara a nova lista para todos os componentes inscritos (como a Lista)
    this.clientesSubject.next([...this.listaClientes]);
  }

  excluirCliente(indice: number): void {
    this.listaClientes.splice(indice, 1);
    this.clientesSubject.next([...this.listaClientes]);
  }
}