import { ArrayNotEmpty, IsArray, IsDefined, IsEnum, IsNotEmpty, IsNumber, IsOptional, Matches, Validate, ValidateNested } from "class-validator";

import { ClienteForm } from "./cliente-form.js";
import { InvoiceItem } from "./invoice-item.js";
import { IInvoiceType01 } from "../enums/invoice-type.enum.js";
import { IOperationType51 } from "../enums/operation-type.enum.js";
import { Type } from "class-transformer";

export class InvoiceForm{

    @IsEnum(IInvoiceType01)
    tipo_comprobante:IInvoiceType01;

    @IsEnum(IOperationType51)
    tipo_operacion:IOperationType51;

    @IsNotEmpty()
    moneda:string = "PEN";

    @IsNotEmpty()
    serie:string;

    @IsNotEmpty()
    correlativo:string;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    total_op_gravadas:number;

    @IsOptional({groups: ['anom_client']})
    @IsDefined({groups: ['required_client']})
    @ValidateNested()
    @Type(() => ClienteForm)
    cliente:ClienteForm;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    igv:number;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    icbper: number;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    total_op_exoneradas:number;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    total_op_inafectas:number;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    total_antes_impuestos:number;
    
    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    total_impuestos:number;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    total_despues_impuestos:number;

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    total_a_pagar:number;
    
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
        message: `El campo 'fecha_emision' tiene un formato incorrecto (dd/MM/yyyy)`
    })
    fecha_emision:string;

    @Matches(/^(?:[01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
        message: `El campo 'hora_emision' tiene un formato incorrecto (HH:mm:ss)`
    })
    hora_emision:string;
    
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
        message: `El campo 'fecha_vencimiento' tiene un formato incorrecto (dd/MM/yyyy)`
    })
    fecha_vencimiento:string;
    
    @IsNotEmpty()
    forma_pago:string = "Contado";

    @IsNumber({allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6})
    monto_credito = 0.00;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    items:InvoiceItem[];

}