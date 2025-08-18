import RazorBlade from "./config/razorblade.js";
import { InvoiceFactory } from "./factories/invoice-factory.js";

const razorblade = new RazorBlade();
razorblade.config({
    pfxPassword: 'hello',
    pfxPath: 'uhhh',
});

const invoice = new InvoiceFactory("factura");

console.log(invoice.getXML());
