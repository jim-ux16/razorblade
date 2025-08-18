import { IsEnum, IsNotEmpty, IsNumberString, Length } from "class-validator";
import { IAccountId06 } from "../enums/account-id.js";

export class ClienteForm{

    @IsEnum(IAccountId06)
    tipo_documento:IAccountId06;

    @IsNumberString()
    @Length(8,8 , {message: `El campo 'num_documento' debe tener 8 dígitos`, groups: ['doc_dni']})
    @Length(12, 12 , {message: `El campo 'num_documento' debe tener 12 dígitos`, groups: ['doc_carne_ext, doc_pasaporte']})
    @Length(11,11 , {message: `El campo 'num_documento' debe tener 11 dígitos`, groups: ['doc_ruc']})
    num_documento:string;

    @IsNotEmpty()
    nombre_razon_social:string;

    @IsNotEmpty()
    direccion:string;   

}