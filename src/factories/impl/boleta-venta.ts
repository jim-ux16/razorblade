import type { Invoice } from "../invoice.interface.js";


export class BoletaVentaInvoice implements Invoice{

    buildXML(): string {
        return '<BoletaVenta>XML</BoletaVenta>';
    }

}