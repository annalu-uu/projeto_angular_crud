////IMPORTA AS DIRETIVAS DO *ngFor
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
//IMPORTA AS FERRAMENTAS PRA CRIAR O FORMULÁRIO REATIVO
//ReactiveFormsModule: permite usar formulário reativo no HTML
//FormBuilder: ajuda a criar o formulário
//FormGroup: representa o formulário inteiro
//Validators: cria regras de validação dos campos
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//IMPORTA A CLASSE CLIENTE
//REPRENSENTA O OBJETO CLIENTE
import { Cliente } from '../cliente'
import { HttpClient } from '@angular/common/http'
import { PessoaServiceService } from '../../service/pessoa-service.service';

interface Municipio{
  id: number
  nome: string
}

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true,
  //PERMITE USAR O *ngFor E O FORMULÁRIO REATIVO NO HTML
  //PERMITE USAR O formGroup E O formControlName NO HTML
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-clientes.component.html',
  styleUrl: './cadastro-clientes.component.css'
})


export class CadastroClientesComponent {

  


  //FORMULÁRIO DE CADASTRO
  formulario: FormGroup;

  campoPesquisa = new FormControl('')


  //LISTA DE CLIENTES CADASTRADOS
  listaClientes: Cliente[] = []

  //GUARDA A POSIÇÃO DO CLIENTE QUE ESTÁ SENDO EDITADO
  indiceEdicao: number = -1

  clientesFiltrados: Cliente[] = []

  //lista de municípios
  municipios: Municipio[] = []

  carregandoMuncipios = false

  //não encontrados, se vire ;/
  erroMunicipios = ''

  private numeroConsultaMunicipio = 0

  // null significa "novo cadastro"; um id significa "edição em andamento".
   clienteEditandoId: string | null = null;

  // Lista fixa das siglas das 27 unidades federativas brasileiras.
  ufs: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF',
    'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS',
    'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];
 
  

  //CONSTRUTOR QUE CRIA O FORMULÁRIO
  //recebe o FormBuilder pra criar o formulário
  constructor(
    private pessoaService: PessoaServiceService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {

    //CRIANDO O FORMULÁRIO E SEUS CAMPOS
    //começa vazio e possui uma regra de validação.

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

    })

  }

// BUSCA OS MUNICÍPIOS DE ACORDO COM A UF ESCOLHIDA
buscarMunicipios() {

  // PEGA A UF SELECIONADA NO FORMULÁRIO
  const uf = this.formulario.get('uf')?.value;


  // LIMPA OS MUNICÍPIOS ANTES DE BUSCAR NOVOS
  this.municipios = [];


  // SE NÃO TIVER UF SELECIONADA, NÃO FAZ A BUSCA
  if (!uf) {
    return;
  }


  // ATIVA O CARREGAMENTO
  this.carregandoMuncipios = true;


  // CONSULTA A API DO IBGE
  this.http.get<Municipio[]>(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
  )
  .subscribe({

    next: (dados) => {

      // SALVA OS MUNICÍPIOS RECEBIDOS DA API
      this.municipios = dados;

      this.carregandoMuncipios = false;

    },

    error: () => {

      // MOSTRA ERRO CASO A CONSULTA FALHE
      this.erroMunicipios = 'Erro ao carregar municípios';

      this.carregandoMuncipios = false;

    }

  });

}

//FUNÇÃO PARA PESQUISAR CLIENTES PELO NOME
pesquisar() {

  //PEGA O TEXTO DIGITADO NA PESQUISA
  const nome = this.campoPesquisa.value?.toLowerCase();


  //FILTRA OS CLIENTES PELO NOME
  this.clientesFiltrados = this.listaClientes.filter(cliente =>

    cliente.nome.toLowerCase().includes(nome || '')

  );

}

 //FUNÇÃO PARA SALVAR CLIENTE
salvar() {

  //VERIFICA SE PASSARAM NAS VALIDAÇÕES
  if (this.formulario.valid) {

    //PEGA OS VALORES DIGITADOS E TRANSFORMA NO OBJETO CLIENTE
    const cliente: Cliente = this.formulario.value

    //VERIFICA SE É CADASTRO OU EDIÇÃO
    if (this.indiceEdicao == -1) {

      //ADICIONA UM NOVO CLIENTE
      this.listaClientes.push(cliente)

    } else {

      //ATUALIZA O CLIENTE EDITADO
      this.listaClientes[this.indiceEdicao] = cliente

      //FINALIZA A EDIÇÃO
      this.indiceEdicao = -1

    }

    // ATUALIZA A LISTA QUE APARECE NA TABELA
    this.clientesFiltrados = this.listaClientes;

    //LIMPA O FORMULÁRIO
    this.formulario.reset()

  } else {

    alert('Preencha os campos obrigatórios!')

  }

}



  //FUNÇÃO PARA LIMPAR FORMULÁRIO
  limpar() {

    this.formulario.reset()

  }

  //FUNÇÃO PARA EXCLUIR CLIENTE
excluir(indice: number) {

//REMOVE O CLIENTE DA LISTA USANDO A POSIÇÃO RECEBIDA
//INDICE = POSIÇÃO DO CLIENTE NA LISTA
//1 = QUANTIDADE DE CLIENTES QUE SERÁ REMOVIDA
this.listaClientes.splice(indice, 1);

}

  //FUNÇÃO PARA EDITAR CLIENTE
  editar(indice: number) {

  //GUARDA A POSIÇÃO DO CLIENTE
  this.indiceEdicao = indice;

  //COLOCA OS DADOS DO CLIENTE NO FORMULÁRIO
  this.formulario.patchValue(this.listaClientes[indice]);

}


}