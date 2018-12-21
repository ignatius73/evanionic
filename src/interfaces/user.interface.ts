import { Contrataciones } from "./contrataciones.interface";
import { Skills } from "./skills.interface";
import { WorksHistory } from "./works.interface";
import { Valoraciones } from "./valoraciones.interface";


export interface User {
    name?: string;
    surname?: string;
    email?: string;
    imagen?: string;
    uid?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    church?: string;
    role?: number;
    age?: number;
    skills?: Skills[];
    phone?: number,
    celular?: number,
    worksDone?: WorksHistory[];
    valor?: Valoraciones[];
    contracts?: Contrataciones[];
    password?: string;
  }