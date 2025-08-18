import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { IUnitCode03 } from "../enums/item-unit.enum.js";


export class InvoiceItem{

    @IsNumber()
    @IsPositive()
    id: number;

    @IsNumber()
    @IsPositive()
    cantidad: number;

    @IsEnum(IUnitCode03)
    unidad: IUnitCode03;

    @IsNotEmpty()
    nombre:string;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    valor_unitario: number;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    precio_lista:number;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    valor_total: number;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    igv:number;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    icbper: number;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    factor_icbper: number;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    total_antes_impuestos: number;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    total_impuestos: number;

    @ArrayNotEmpty()
    @IsArray()
    codigos:string[]

}