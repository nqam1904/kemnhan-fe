import type { User } from './user';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  tokens: Tokens;
}
export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  code: number;
  data: {
    token: string;
    refreshToken: string;
  };
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  email: string;
}

export interface VerifySignUpResponse {
  data: SignInResponse['data'] & {
    user: User;
  };
}

export interface ResendSignUpRequest {
  email: string;
}

export interface ResendSignUpResponse {
  email: string;
}

export interface RefreshTokenResponse extends VerifySignUpResponse {}
