import type { IAddress } from "./address.interface.js";

export interface ICompany{

    ruc:string;
    razon_social:string;
    nombre_comercial: string | null;
    direccion: IAddress;

}