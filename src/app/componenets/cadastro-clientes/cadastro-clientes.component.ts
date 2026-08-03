import { Component } from '@angular/core';
//IMPORTA AS FERRAMENTAS PRA CRIAR O FORMULÁRIO REATIVO
//ReactiveFormsModule: permite usar formulário reativo no HTML
//FormBuilder: ajuda a criar o formulário
//FormGroup: representa o formulário inteiro
//Validators: cria regras de validação dos campos
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
//IMPORTA A CLASSE CLIENTE
//REPRENSENTA O OBJETO CLIENTE
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true,
  //PERMITE USAR O formGroup E O formControlName NO HTML
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-clientes.component.html',
  styleUrl: './cadastro-clientes.component.css'
})


export class CadastroClientesComponent {


  //FORMULÁRIO DE CADASTRO
  formulario: FormGroup;


  //LISTA DE CLIENTES CADASTRADOS
  listaClientes: Cliente[] = []



  //CONSTRUTOR QUE CRIA O FORMULÁRIO
  //recebe o FormBuilder pra criar o formulário
  constructor(private fb: FormBuilder) {

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



  //FUNÇÃO PARA SALVAR CLIENTE
  salvar() {

    //VERIFICA SE PASSARAM NAS VALIDAÇÕES
    if (this.formulario.valid) {

      //PEGA OS VALORES DIG E TRANSFORMA NO OBJ CLIENTE
      const cliente: Cliente = this.formulario.value

      //ADICIONA O CLIENTE DENTRO DA LISTA
      this.listaClientes.push(cliente)

      //SALVA E LIMPA PARA OUTROS CADASTROS
      this.formulario.reset()

    } else {

      alert('Preencha os campos obrigatórios!')

    }

  }



  //FUNÇÃO PARA LIMPAR FORMULÁRIO
  limpar() {

    this.formulario.reset();

  }


}