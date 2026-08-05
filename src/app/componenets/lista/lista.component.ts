import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PessoaServiceService, Cliente } from '../../service/pessoa-service.service';import { PessoaServiceService } from '../../service/pessoa-service.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {

  // LISTA DE CLIENTES EXIBIDA NA TABELA
  clientesFiltrados: Cliente[] = [];

  // CONSTRUTOR
  constructor(private pessoaService: PessoaServiceService) {}

  // CARREGA A LISTA DE CLIENTES
  ngOnInit(): void {

    this.pessoaService.clientes$.subscribe(clientes => {

      this.clientesFiltrados = clientes;

    });

  }

  // FUNÇÃO PARA EDITAR CLIENTE
  editar(indice: number) {

    console.log('Editar cliente:', indice);

  }

  // FUNÇÃO PARA EXCLUIR CLIENTE
  excluir(indice: number) {

    this.pessoaService.excluirCliente(indice);

  }

}