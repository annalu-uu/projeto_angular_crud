import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PessoaServiceService, Cliente } from '../../service/pessoa-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})

export class ListaComponent implements OnInit {

  // LISTA DE CLIENTES EXIBIDA NA TABELA
  clientes: Cliente[] = [];

  // LISTA DE CLIENTES APÓS FILTROS
  clientesFiltrados: Cliente[] = [];

  // TEXTO USADO NA PESQUISA
  nomePesquisa: string = '';


  // CONSTRUTOR
  constructor(
    private router: Router,
    private pessoaService: PessoaServiceService
  ) {}


  // EXECUTADO AUTOMATICAMENTE QUANDO O COMPONENTE É INICIADO
  ngOnInit(): void {

    // ESCUTA AS ALTERAÇÕES NA LISTA DE CLIENTES DO SERVICE
    this.pessoaService.clientes$.subscribe(clientes => {

      // ATUALIZA A LISTA EXIBIDA
      this.clientesFiltrados = clientes;

    });

  }


  // FUNÇÃO PARA EDITAR CLIENTE
  editar(indice: number) {

    // PEGA O CLIENTE SELECIONADO NA LISTA
    const cliente = this.clientesFiltrados[indice];

    // ENVIA O CLIENTE E O ÍNDICE PARA A TELA DE CADASTRO
    this.router.navigate(['/cadastro'], {

      state: {

        // ENVIA OS DADOS DO CLIENTE
        cliente: cliente,

        // ENVIA A POSIÇÃO DO CLIENTE NA LISTA
        indice: indice

      }

    });

  }


  // FUNÇÃO PARA EXCLUIR CLIENTE
  excluir(indice: number) {

    // REMOVE O CLIENTE PELO ÍNDICE
    this.pessoaService.excluirCliente(indice);

  }

}