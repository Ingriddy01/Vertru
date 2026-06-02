import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ViaCepResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private baseUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  consultarCep(cep: string): Observable<ViaCepResponse | null> {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      return of(null);
    }

    return this.http.get<ViaCepResponse>(`${this.baseUrl}/${cleanCep}/json/`).pipe(
      catchError(() => of(null))
    );
  }
}