
import { BoletaVentaInvoice } from "./impl/boleta-venta.js";
import { FacturaInvoice } from "./impl/factura.js";
import type { Invoice } from "./invoice.interface.js";

export class InvoiceFactory {

    private invoice!:Invoice;

    constructor(invoiceType:"factura" | "boleta_venta") {

        switch (invoiceType) {
            case "factura":
                this.invoice = new FacturaInvoice();
                break;
            case "boleta_venta":
                this.invoice = new BoletaVentaInvoice();
                break;
            default:
                throw new Error("Tipo de comprobante no soportado");
        }

    }

    getXML():string{
        return this.invoice.buildXML();
    }



}