import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserFormComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [MessageService]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente de formulário', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar na primeira aba do cadastro (Dados Pessoais)', () => {
    expect(component.activeIndex).toBe(0);
  });

  it('deve validar os campos obrigatórios da primeira aba antes de avançar', () => {
    component.nextStep();
    expect(component.activeIndex).toBe(0); // Não deve avançar se estiver inválido
  });
});
