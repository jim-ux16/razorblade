import "reflect-metadata";
import { IAccountId06 } from "./enums/account-id.js";
import { IInvoiceType01 } from "./enums/invoice-type.enum.js";
import { IUnitCode03 } from "./enums/item-unit.enum.js";
import { IOperationType51 } from "./enums/operation-type.enum.js";
import { InvoiceFactory } from "./factories/invoice-factory.js";
import { ClienteForm } from "./form-data/cliente-form.js";
import { InvoiceForm} from "./form-data/invoice-form.js";
import { InvoiceItem } from "./form-data/invoice-item.js";
import { XmlSignature } from "@supernova-team/xml-sunat";
import * as  fs from 'fs/promises';
import * as path from 'path';
import JSZip from "jszip";
import { RazorbladeHttp } from "./classes/razorblade-http.class.js";
import unzipper from "unzipper";

// //#region INVOICE DATA
// //Invoice Factories
// const invoiceFactory = new InvoiceFactory("boleta_venta");

// const invoiceForm = new InvoiceForm();

// //Invoice Data
// invoiceForm.tipo_comprobante = IInvoiceType01.BOLETA_VENTA;
// invoiceForm.tipo_operacion = IOperationType51.VENTA_INTERNA;
// invoiceForm.serie = "B001";
// invoiceForm.correlativo = "176";
// invoiceForm.total_op_gravadas = 10.00;
// invoiceForm.igv =  0.00;
// invoiceForm.icbper =  0.00;
// invoiceForm.total_op_exoneradas = 0.00;
// invoiceForm.total_op_inafectas=  0.00;
// invoiceForm.total_antes_impuestos=  10.00;
// invoiceForm.total_impuestos   =  0.00;
// invoiceForm.total_despues_impuestos = 10.00;
// invoiceForm.total_a_pagar     = 10.00;
// invoiceForm.fecha_emision     = "2023-02-02";
// invoiceForm.hora_emision   = "19:48:00";
// invoiceForm.fecha_vencimiento = "2023-02-02";
// invoiceForm.forma_pago     =  "Contado";
// invoiceForm.monto_credito  =  0.00;

// //Invoice Client Data
// const clientForm = new ClienteForm();
// clientForm.direccion = "";
// clientForm.nombre_razon_social = "CLIENTE GENERAL"
// clientForm.tipo_documento = IAccountId06.DNI;
// clientForm.num_documento = "00000000";

// //Invoice items
// const invoiceItem1 = new InvoiceItem();
// invoiceItem1.id   = 1,
// invoiceItem1.cantidad   = 1,
// invoiceItem1.unidad   = IUnitCode03.UNIDAD,
// invoiceItem1.nombre = "MOCHILA",
// invoiceItem1.valor_unitario = 10.00,          
// invoiceItem1.precio_lista = 10.00,
// invoiceItem1.valor_total = 10.00,
// invoiceItem1.igv  = 0.00,
// invoiceItem1.icbper  = 0.00,
// invoiceItem1.factor_icbper   = 0.50, 
// invoiceItem1.total_antes_impuestos = 10.00,
// invoiceItem1.total_impuestos = 0.00,
// invoiceItem1.codigos = ["S","10","1000","IGV","VAT"]

// invoiceForm.cliente = clientForm;
// invoiceForm.items = [
//     invoiceItem1
// ];

// const {data, xmlBody} = await invoiceFactory.getXML(invoiceForm)
// //#endregion INVOICE DATA
// await fs.writeFile(
//     path.join(process.cwd(), `${data.filename}.xml`),
//     xmlBody
// )

 const nombre = "20607599727-03-B001-176";

const xmlSignature = new XmlSignature(
    path.join(process.cwd(), 'certificado-firma.pfx'),
    'envio_prueba',
    await fs.readFile(path.join(process.cwd(), `${nombre}.xml`), 'utf-8'),
);

const xmlFirmado = await xmlSignature.getSignedXML();


const jsZIP = new JSZip();
jsZIP.file(`${nombre}.xml`, xmlFirmado);

const bufferZIP = await jsZIP.generateAsync({type: 'nodebuffer'});

await fs.writeFile(
    path.join(process.cwd(), `${nombre}.zip`),
    bufferZIP
);

const _http = new RazorbladeHttp('development');
const cdrBase64 = await _http.sendBill(path.join(process.cwd(), `${nombre}.zip`), nombre);

await fs.writeFile(
    path.join(process.cwd(),"cdr", `R-${nombre}.zip`),
    Buffer.from(cdrBase64, 'base64')
);


