import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { MessageService } from 'primeng/api';

import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';

import { CepService } from '../../services/cep.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

    ToastModule,
    TabViewModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    KeyFilterModule
  ],
  providers: [MessageService],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;

  activeIndex = 0;

  displayModal = false;

  dadosParaExibir: any = null;

  generos = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Não-binário', value: 'Não-binário' },
    { label: 'Prefiro não responder', value: 'Prefiro não responder' }
  ];

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(): void {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],

      sobrenome: ['', Validators.required],

      genero: [null, Validators.required],

      endereco: this.fb.group({
        cep: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\d{5}-?\d{3}$/)
          ]
        ],

        rua: [{ value: '', disabled: true }, Validators.required],

        bairro: [{ value: '', disabled: true }, Validators.required],

        estado: [{ value: '', disabled: true }, Validators.required],

        numero: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[0-9]+$/)
          ]
        ],

        complemento: ['']
      })
    });
  }

  avancarAba(): void {

    const nomeValido =
      this.userForm.get('nome')?.valid;

    const sobrenomeValido =
      this.userForm.get('sobrenome')?.valid;

    const generoValido =
      this.userForm.get('genero')?.valid;

    if (
      nomeValido &&
      sobrenomeValido &&
      generoValido
    ) {
      this.activeIndex = 1;
      return;
    }

    this.userForm.get('nome')?.markAsTouched();
    this.userForm.get('sobrenome')?.markAsTouched();
    this.userForm.get('genero')?.markAsTouched();

    this.messageService.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Preencha todos os campos obrigatórios.'
    });
  }

  buscarCep(): void {

    const cepControl =
      this.userForm.get('endereco.cep');

    const cep =
      cepControl?.value?.replace(/\D/g, '');

    if (!cep || cep.length !== 8) {
      return;
    }

    this.cepService.buscarCep(cep)
      .subscribe({
        next: (response: any) => {

          if (response.erro) {
            this.exibirErroCep();
            return;
          }

          this.userForm.patchValue({
            endereco: {
              rua: response.logradouro,
              bairro: response.bairro,
              estado: response.uf
            }
          });
        },

        error: () => {
          this.exibirErroCep();
        }
      });
  }

  exibirErroCep(): void {

    this.messageService.add({
      severity: 'error',
      summary: 'CEP inválido',
      detail: 'Não foi possível localizar o CEP informado.'
    });

    this.userForm.patchValue({
      endereco: {
        rua: '',
        bairro: '',
        estado: ''
      }
    });
  }

  submeterFormulario(): void {

    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();

      this.messageService.add({
        severity: 'warn',
        summary: 'Formulário inválido',
        detail: 'Preencha todos os campos obrigatórios.'
      });

      return;
    }

    const dados = this.userForm.getRawValue();

    this.userService.salvarUsuario(dados)
      .subscribe({
        next: () => {

          this.dadosParaExibir = dados;

          this.displayModal = true;

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuário cadastrado com sucesso.'
          });
        },

        error: () => {

          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao salvar usuário.'
          });
        }
      });
  }

  isFieldInvalid(fieldPath: string): boolean {

    const field = this.userForm.get(fieldPath);

    return !!(
      field &&
      field.invalid &&
      (field.touched || field.dirty)
    );
  }
}  activeIndex: number = 0;
  displayModal: boolean = false;
  dadosParaExibir: any = null;

  generos = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Não-binário', value: 'Não-binário' },
    { label: 'Prefiro não responder', value: 'Prefiro não responder' }
  ];

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      sobrenome: ['', Validators.required],
      genero: ['', Validators.required],
      endereco: this.fb.group({
        cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
        estado: [{ value: '', disabled: true }, Validators.required],
        rua: [{ value: '', disabled: true }, Validators.required],
        bairro: [{ value: '', disabled: true }, Validators.required],
        numero: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
        complemento: ['']
      })
    });
  }

  isFieldInvalid(path: string): boolean {
    const control = this.userForm.get(path);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  avancarAba(): void {
    const nome = this.userForm.get('nome');
    const sobrenome = this.userForm.get('sobrenome');
    const genero = this.userForm.get('genero');

    if (nome?.valid && sobrenome?.valid && genero?.valid) {
      this.activeIndex = 1;
    } else {
      this.userForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Atenção',
        detail: 'Preencha todos os campos obrigatórios da primeira etapa.'
      });
    }
  }

  buscarCep(): void {
    const cepControl = this.userForm.get('endereco.cep');
    if (!cepControl || cepControl.invalid) return;

    this.cepService.consultarCep(cepControl.value).subscribe({
      next: (dados) => {
        if (!dados || dados.erro) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Erro no CEP',
            detail: 'O CEP digitado não foi encontrado.'
          });
          this.limparCamposEndereco();
        } else {
          this.userForm.get('endereco')?.patchValue({
            rua: dados.logradouro,
            bairro: dados.bairro,
            estado: dados.uf
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Falha de Conexão',
          detail: 'Não foi possível consultar o CEP.'
        });
      }
    });
  }

  limparCamposEndereco(): void {
    this.userForm.get('endereco')?.patchValue({
      rua: '',
      bairro: '',
      estado: ''
    });
  }

  submeterFormulario(): void {
    if (this.userForm.valid) {
      const dadosCompletos = this.userForm.getRawValue();
      this.userService.salvarUsuario(dadosCompletos);
      this.dadosParaExibir = dadosCompletos;
      this.displayModal = true;
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
