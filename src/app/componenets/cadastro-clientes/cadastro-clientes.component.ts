////IMPORTA AS DIRETIVAS DO *ngFor
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

//IMPORTA AS FERRAMENTAS DO FORMULÁRIO REATIVO
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

//IMPORTA A CLASSE CLIENTE
import { Cliente } from '../cliente';

//IMPORTA O HTTP E O SERVICE
import { HttpClient } from '@angular/common/http';
import { PessoaServiceService } from '../../service/pessoa-service.service';

//INTERFACE DOS MUNICÍPIOS
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
export class CadastroClientesComponent {

  //FORMULÁRIO
  formulario: FormGroup;

  //GUARDA O ÍNDICE DO CLIENTE EM EDIÇÃO
  indiceEdicao: number = -1;

  //LISTA DE MUNICÍPIOS
  municipios: Municipio[] = [];

  //CONTROLA O CARREGAMENTO
  carregandoMunicipios = false;

  //MENSAGEM DE ERRO
  erroMunicipios = '';

  //LISTA DAS UFS
  ufs: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF',
    'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS',
    'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  //CONSTRUTOR
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private pessoaService: PessoaServiceService
  ) {

    //CRIA O FORMULÁRIO
    this.formulario = this.fb.group({

      nome: ['', Validators.required],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      cpf: ['', Validators.required],

      dataNascimento: ['', Validators.required],

      uf: ['', Validators.required],

      municipio: ['', Validators.required]

    });

  }

  //BUSCA OS MUNICÍPIOS DA UF
  buscarMunicipios() {

    const uf = this.formulario.get('uf')?.value;

    this.municipios = [];

    if (!uf) {
      return;
    }

    this.carregandoMunicipios = true;

    this.http.get<Municipio[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    )
    .subscribe({

      next: (dados) => {

        this.municipios = dados;
        this.carregandoMunicipios = false;

      },

      error: () => {

        this.erroMunicipios = 'Erro ao carregar municípios';
        this.carregandoMunicipios = false;

      }

    });

  }

  //SALVA O CLIENTE
  salvar() {

    if (this.formulario.valid) {

      const cliente: Cliente = this.formulario.value;

      this.pessoaService.adicionarCliente(cliente);

      this.formulario.reset();

      this.municipios = [];

    } else {

      alert('Preencha os campos obrigatórios!');

    }

  }

  //LIMPA O FORMULÁRIO
  limpar() {

    this.formulario.reset();

    this.municipios = [];

  }

}