export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export interface UserAddress {
  cep: string;
  estado: string;
  rua: string;
  bairro: string;
  numero: string;
  complemento?: string;
}

export interface UserData {
  nome: string;
  sobrenome: string;
  genero: string;
  endereco: UserAddress;
}