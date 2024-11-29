import { Role } from "./usuario";

export interface TokenClaims {
  aud: string;
  /** Vencimiento token */
  exp: number;
  /** Apellido */
  family_name: string;
  /** Nombre */
  given_name: string;
  iss: string;
  nbf: number;
  role: Role;
  /** ID de base de datos del usuario */
  sub: string;
}
