import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CepService } from '../../services/cep.service';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent, HttpClientTestingModule],
      providers: [CepService]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve bloquear o avanço de aba se o formulário for inválido', () => {
    component.userForm.get('nome')?.setValue('');
    component.avancarAba();
    expect(component.activeIndex).toBe(0);
  });
});