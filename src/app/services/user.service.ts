import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSource = new BehaviorSubject<UserData | null>(null);
  user$ = this.userSource.asObservable();

  this.userService.salvarUsuario(dados);

this.dadosParaExibir = dados;
this.displayModal = true;
  }
}
