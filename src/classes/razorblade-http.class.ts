import fetch from 'node-fetch';
import Razorblade from '../config/razorblade.js';
import fs from "fs/promises";
import { RazorbladeHttpError } from '../exceptions/razorblade-http.error.js';
import {DOMParser} from "@xmldom/xmldom";

export class RazorbladeHttp{

    private mode: "development" | "production";
    private readonly datosEmisor = Razorblade.getInstance().emisor_data;

    //URL's
    private readonly API_FACTURAS_DEV = "https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService";
    private readonly API_RETENCIONES_DEV = "https://e-beta.sunat.gob.pe/ol-ti-itemision-otroscpe-gem-beta/billService";

    private readonly API_FACTURAS_PROD = "https://e-factura.sunat.gob.pe/ol-ti-itcpfegem/billService?wsdl";

    constructor(mode: "development" | "production" = "development"){
        this.mode = mode;
    }


    async sendBill(zippedFilePath:string, filenameWithoutExtension:string):Promise<string>{

        try {

            const xmlComprimido = await fs.readFile(
                zippedFilePath,
                'base64'
            );

            const requestBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.sunat.gob.pe" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext1.0.xsd"><soapenv:Header><wsse:Security><wsse:UsernameToken><wsse:Username>${this.datosEmisor.ruc}${this.datosEmisor.usuario}</wsse:Username><wsse:Password>${this.datosEmisor.clave}</wsse:Password></wsse:UsernameToken></wsse:Security></soapenv:Header><soapenv:Body><ser:sendBill><fileName>${filenameWithoutExtension}.zip</fileName><contentFile>${xmlComprimido}</contentFile></ser:sendBill></soapenv:Body></soapenv:Envelope>`;

            const headers = {
                'Content-Type': 'text/xml; charset="utf-8"',
                'Accept': 'text/xml',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'SOAPAction': "",
                'Content-Length': Buffer.byteLength(xmlComprimido),
            };

            const response = await fetch(this.mode === "development" ? this.API_FACTURAS_DEV : this.API_FACTURAS_PROD, {
                method: 'POST',
                headers: headers as any,
                body: requestBody
            });

            if(!response.ok){
                throw new RazorbladeHttpError(response.statusText ,response.status + "");
            }

            const responseInText = await response.text();

            const convertedXML = new DOMParser().parseFromString(responseInText, "text/xml");

            const sunatResponse = convertedXML.getElementsByTagName("applicationResponse")[0];

            if(sunatResponse){

                return sunatResponse.textContent;

            }else{

                const sunatCode = convertedXML.getElementsByTagName("faultcode")[0]!.textContent || '';
                const sunatMessage = convertedXML.getElementsByTagName("faultstring")[0]!.textContent || '';
                throw new RazorbladeHttpError(sunatMessage, sunatCode);
            }
            
            
        } catch (error) {
            
            throw error;

        }

    }



}