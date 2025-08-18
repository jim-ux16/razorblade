import { IsNotEmpty, IsNumberString, IsOptional, Length } from "class-validator";

export class EmisorDataDTO{

    @IsNotEmpty({message: `El campo 'tipo de documento' no esta definido o esta vacío`})
    tipo_documento:string;

    @IsNotEmpty({message: `El campo 'ruc' no esta definido o esta vacío`})
    @IsNumberString({no_symbols: true}, {message: `El campo 'ruc' debe ser una cadena de números`})
    @Length(11, 11, {message: `El campo 'ruc' debe contener 11 dígitos`})
    ruc:string;

    @IsNotEmpty({message: `El campo 'razon_social' no esta definido o esta vacío`})
    razon_social:string;

    @IsNotEmpty({message: `El campo 'nombre_comercial' no esta definido o esta vacío`})
    @IsOptional()
    nombre_comercial:string;

    @IsNotEmpty({message: `El campo 'departamento' no esta definido o esta vacío`})
    departamento:string;

    @IsNotEmpty({message: `El campo 'provincia' no esta definido o esta vacío`})
    provincia:string;

    @IsNotEmpty({message: `El campo 'distrito' no esta definido o esta vacío`})
    distrito:string;

    @IsNotEmpty({message: `El campo 'direccion' no esta definido o esta vacío`})
    direccion:string;

    @IsNotEmpty({message: `El campo 'ubigeo' no esta definido o esta vacío`})
    ubigeo:string;

    @IsNotEmpty({message: `El campo 'usuario' no esta definido o esta vacío`})
    usuario:string;

    @IsNotEmpty({message: `El campo 'clave' no esta definido o esta vacío`})
    clave:string;

    @IsNotEmpty({message: `El campo 'anexo_sucursal' no esta definido o esta vacío`})
    anexo_sucursal:string

}