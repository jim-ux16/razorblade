import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import "dotenv/config.js";
import { EmisorDataDTO } from "./validators/emisor-data-dto.js";
import { RazorbladeConfigurationError } from "../exceptions/razorblade-configuration.error.js";



export default class Razorblade{

    private static razorblade:Razorblade;

    private readonly _emisorConfiguration = {
        tipo_documento: process.env.EMISOR_TIPO_DOCUMENTO,
        ruc : process.env.EMISOR_RUC,
        razon_social  : process.env.EMISOR_RAZON_SOCIAL,
        nombre_comercial  : process.env.EMISOR_NOMBRE_COMERCIAL,
        departamento  : process.env.EMISOR_DEPARTAMENTO,
        provincia  : process.env.EMISOR_PROVINCIA,
        distrito  : process.env.EMISOR_DISTRITO,
        direccion  : process.env.EMISOR_DIRECCION,
        ubigeo  : process.env.EMISOR_UBIGEO,
        usuario  : process.env.EMISOR_USUARIO,
        clave  :process.env.EMISOR_CLAVE,
        anexo_sucursal: process.env.EMISOR_ANEXO_SUCURSAL
    }

    private constructor(){
        this.validateEmisorConfig();
    }

    static getInstance(){

        if(!this.razorblade){
            this.razorblade = new Razorblade();
        }

        return this.razorblade;

    }

    private async validateEmisorConfig(){

        const emisorDataDTO = plainToInstance(EmisorDataDTO, this._emisorConfiguration);
        const errors = await validate(emisorDataDTO);
        if(errors.length > 0){
            throw new RazorbladeConfigurationError("\n"+errors.map(error => (Object.values(error.constraints || {})).join('\n')).join('\n')  || '');
        }

    }

    get emisor_data(){
        return this._emisorConfiguration as {
            tipo_documento: string;
            ruc: string;
            razon_social: string;
            nombre_comercial: string;
            departamento: string;
            provincia: string;
            distrito: string;
            direccion: string;
            ubigeo: string;
            usuario: string;
            clave: string;
            anexo_sucursal: string;
        };
    }


}