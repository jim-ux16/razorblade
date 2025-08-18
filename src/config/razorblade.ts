import type { IRazorConfig } from "../interfaces/razor-config.js";
import z from "zod";

const configSchema = z.object({
    mode: z.enum(['development', 'production']).optional(),
    pfxPath: z.string().min(1, "La ruta del certificado PFX es requerido."),
    pfxPassword: z.string().min(1, "La contraseña del certificado PFX es requerido.")
})

export default class RazorBlade{

    private configuration:IRazorConfig = {
        mode: 'development',
        pfxPath: '',
        pfxPassword: ''
    }

    config(options:IRazorConfig){
        try {
            configSchema.parse(options);
            this.configuration = options;
        } catch (error) {
            console.error("Error en la configuración de RazorBlade:", error);
        }
        
    }

}