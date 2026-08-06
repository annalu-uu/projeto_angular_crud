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

  // LISTA QUE ARMAZENA OS CLIENTES EM MEMÓRIA
  private listaClientes: Cliente[] = [];

  // MANTÉM A LISTA ATUALIZADA E ENVIA AS ALTERAÇÕES PARA OS COMPONENTES
  private clientesSubject = new BehaviorSubject<Cliente[]>(this.listaClientes);

  // OBSERVABLE UTILIZADO PELOS COMPONENTES PARA RECEBER A LISTA
  clientes$ = this.clientesSubject.asObservable();

  // ADICIONA UM NOVO CLIENTE À LISTA
  adicionarCliente(cliente: Cliente): void {

    this.listaClientes.push(cliente);

    // ATUALIZA A LISTA E NOTIFICA OS COMPONENTES
    this.clientesSubject.next([...this.listaClientes]);

  }

  // EDITA UM CLIENTE JÁ EXISTENTE
  editarCliente(indice: number, cliente: Cliente): void {

    // SUBSTITUI O CLIENTE ANTIGO PELOS NOVOS DADOS
    this.listaClientes[indice] = cliente;

    // ATUALIZA A LISTA E NOTIFICA OS COMPONENTES
    this.clientesSubject.next([...this.listaClientes]);

  }

  // REMOVE UM CLIENTE DA LISTA
  excluirCliente(indice: number): void {

    this.listaClientes.splice(indice, 1);

    // ATUALIZA A LISTA E NOTIFICA OS COMPONENTES
    this.clientesSubject.next([...this.listaClientes]);

  }

}