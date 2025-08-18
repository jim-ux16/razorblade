import type { InvoiceForm } from "../form-data/invoice-form.js";
import type { InvoiceXML } from "../interfaces/invoice-xml.interface.js";

export interface Invoice{

    buildXML(data:InvoiceForm) :Promise<InvoiceXML>;

}