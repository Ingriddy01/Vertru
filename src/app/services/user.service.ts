import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSource = new BehaviorSubject<UserData | null>(null);
  user$ = this.userSource.asObservable();

  salvarUsuario(user: UserData): void {
    this.userSource.next(user);
    console.log('Usuário salvo com sucesso:', user);
  }
}