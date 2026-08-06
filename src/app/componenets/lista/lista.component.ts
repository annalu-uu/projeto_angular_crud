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

  //LISTA DE CLIENTES EXIBIDA NA TABELA
  clientes: Cliente [] = [];
  clientesFiltrados: Cliente[] = [];
  nomePesquisa: string = ''

  //CONSTRUTOR
  constructor(
    private router: Router,
    private pessoaService: PessoaServiceService
    ) {}

//EXECUTADO AUTOMATICAMENTE QUANDO O COMPONENTE É INICIADO.
ngOnInit(): void {

  //ESCUTA AS ALTERAÇÕES NA LISTA DE CLIENTES DO SERVIÇO.
  //SEMPRE QUE A LISTA FOR ALTERADA, ESTE CÓDIGO SERÁ EXECUTADO.
  this.pessoaService.clientes$.subscribe(clientes => {

    //ATUALIZA A LISTA DE CLIENTES EXIBIDA NO COMPONENTE.
    this.clientesFiltrados = clientes;

  });

}

  //FUNÇÃO PARA EDITAR CLIENTE
  editar(indice: number) {

    console.log('Editar cliente:', indice);

  }

  // FUNÇÃO PARA EXCLUIR CLIENTE
  excluir(indice: number) {

    this.pessoaService.excluirCliente(indice);

  }

}