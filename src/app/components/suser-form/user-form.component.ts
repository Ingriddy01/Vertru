import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CepService } from '../../services/cep.service';
import { UserService } from '../../services/user.service';

import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabViewModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    KeyFilterModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  activeIndex: number = 0;
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