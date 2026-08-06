// IMPORTA AS DIRETIVAS DO *ngFor
import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';

// IMPORTA AS FERRAMENTAS DO FORMULÁRIO REATIVO

import {
  //IMPORTA O MÓDULO DE FORMULÁRIOS REATIVOS DO ANGULAR
  ReactiveFormsModule,
  //CRIA E MONTA A ESTRUTURA DO FORMULÁRIO
  FormBuilder,
  //REPRESENTA O FORMULÁRIO COMPLETO E CONTROLA SEUS CAMPOS
  FormGroup,
  //REGRAS DE VALIDAÇÃO DOS CAMPOS
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

//iMPORTA A CLASSE CLIENTE
import { Cliente } from '../cliente';

//IMPORTA O HTTP E O SERVICE DE CLIENTES
//PERMITE FAZER REQUISIÇÕES PARA APIS 
import { HttpClient } from '@angular/common/http';
import { PessoaServiceService } from '../../service/pessoa-service.service';

//INTERFACE QUE DEFINE OS DADOS DOS MUNICÍPIOS
interface Municipio {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-clientes.component.html',
  styleUrl: './cadastro-clientes.component.css'
})

export class CadastroClientesComponent implements OnInit {

  //ARMAZENA O FORMULÁRIO REATIVO
  formulario: FormGroup;

  //GUARDA O ÍNDICE DO CLIENTE QUE ESTÁ SENDO EDITADO
  indiceEdicao: number = -1;

  //ARMAZENA A LISTA DE MUNICÍPIOS RECEBIDOS DA API
  municipios: Municipio[] = [];

  //CONTROLA SE A BUSCA DOS MUNICÍPIOS ESTÁ EM ANDAMENTO
  carregandoMunicipios = false;

  // ARMAZENA MENSAGEM DE ERRO CASO A BUSCA FALHE
  erroMunicipios = '';

  // LISTA TODAS AS UNIDADES FEDERATIVAS DISPONÍVEIS
  ufs: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF',
    'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];


  // CONSTRUTOR RESPONSÁVEL POR RECEBER AS DEPENDÊNCIAS
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private pessoaService: PessoaServiceService,
    private router: Router
  ) {

    

    // CRIA A ESTRUTURA DO FORMULÁRIO COM SUAS VALIDAÇÕES
    this.formulario = this.fb.group({

      // CAMPO NOME OBRIGATÓRIO
      nome: ['', Validators.required],

      // CAMPO EMAIL OBRIGATÓRIO E COM VALIDAÇÃO DE EMAIL
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      // CAMPO CPF OBRIGATÓRIO
      cpf: ['', Validators.required],

      // CAMPO DATA DE NASCIMENTO OBRIGATÓRIO
      dataNascimento: ['', Validators.required],

      // CAMPO UF OBRIGATÓRIO
      uf: ['', Validators.required],

      // CAMPO MUNICÍPIO OBRIGATÓRIO
      municipio: ['', Validators.required]

    });

  }

  // CARREGA OS DADOS DO CLIENTE QUANDO VEM DA TELA DE LISTA
ngOnInit(): void {

  // RECEBE OS DADOS ENVIADOS PELO ROUTER
  const dados = history.state;


  // VERIFICA SE EXISTE CLIENTE PARA EDITAR
  if (dados.cliente) {

    //PREENCHE O FORMULÁRIO COM OS DADOS DO CLIENTE
    this.formulario.patchValue(dados.cliente);


    //GUARDA O ÍNDICE PARA SABER QUAL CLIENTE ATUALIZAR
    this.indiceEdicao = dados.indice;

  }

}


  //BUSCA OS MUNICÍPIOS DE ACORDO COM A UF ESCOLHIDA
  buscarMunicipios() {

    //PEGA O VALOR SELECIONADO NO CAMPO UF
    const uf = this.formulario.get('uf')?.value;

    //LIMPA OS MUNICÍPIOS ANTIGOS
    this.municipios = [];

    //VERIFICA SE UMA UF FOI SELECIONADA
    if (!uf) {

      //CASO NÃO TENHA UF, FINALIZA A FUNÇÃO
      return;
    }


    //ATIVA O CARREGAMENTO ENQUANTO BUSCA OS DADOS
    this.carregandoMunicipios = true;


    //FAZ UMA REQUISIÇÃO PARA A API DO IBGE BUSCANDO OS MUNICÍPIOS
    this.http.get<Municipio[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    )

    //AGUARDA O RETORNO DA API
    .subscribe({

      //EXECUTA QUANDO A BUSCA FUNCIONA
      next: (dados) => {

        //SALVA OS MUNICÍPIOS RECEBIDOS
        this.municipios = dados;

        //FINALIZA O CARREGAMENTO
        this.carregandoMunicipios = false;

      },


      //EXECUTA QUANDO OCORRE ALGUM ERRO
      error: () => {

        // MOSTRA A MENSAGEM DE ERRO
        this.erroMunicipios = 'Erro ao carregar municípios';

        // FINALIZA O CARREGAMENTO
        this.carregandoMunicipios = false;

      }

    });

  }


// SALVA OU EDITA O CLIENTE
salvar() {

  if (this.formulario.valid) {

    const cliente: Cliente = this.formulario.value;


    // VERIFICA SE EXISTE UM CLIENTE SENDO EDITADO
    if (this.indiceEdicao >= 0) {

      // ATUALIZA O CLIENTE EXISTENTE
      this.pessoaService.editarCliente(
        this.indiceEdicao,
        cliente
      );


      // LIMPA O ÍNDICE DE EDIÇÃO
      this.indiceEdicao = -1;


    } else {

      // CASO SEJA UM NOVO CLIENTE, ADICIONA NA LISTA
      this.pessoaService.adicionarCliente(cliente);

    }


    // LIMPA O FORMULÁRIO
    this.formulario.reset();


    // LIMPA A LISTA DE MUNICÍPIOS
    this.municipios = [];


  } else {

    alert('Preencha os campos obrigatórios!');

  }

}


  // LIMPA TODOS OS CAMPOS DO FORMULÁRIO
  limpar() {

    // RESETAR O FORMULÁRIO PARA OS VALORES INICIAIS
    this.formulario.reset();


    // APAGA OS MUNICÍPIOS CARREGADOS
    this.municipios = [];

  }

}