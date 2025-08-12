import { IInvoiceType01 } from "../enums/invoice-type.enum.js"
import { IOperationType51 } from "../enums/operation-type.enum.js"
import type { IClient } from "../interfaces/client.interface.js"
import type { ICompany } from "../interfaces/company.interface.js"
import type { ISaleDetail } from "../interfaces/sale-detail.interface.js";

export default class Invoice{

    private ublVersion: string | null = null;
    private tipoOperacion: IOperationType51 | null = null;
    private tipoDoc: IInvoiceType01 | null = null;
    private serie: string | null = null;
    private correlativo: string | null = null;
    private fechaEmision: Date | null = null;
    private tipoMoneda: string | null = null;
    private company: ICompany | null = null;
    private client: IClient | null = null;
    private mtoOperGravadas: number | null = null;
    private mtoIGV: number | null = null;
    private totalImpuestos: number | null = null;
    private valorVenta: number | null = null;
    private subTotal: number | null = null;
    private mtoImpVenta: number | null = null;
    private saleDetails: ISaleDetail[] = [];
    

    setUblVersion(version:string){
        this.ublVersion = version;
        return this;
    };

    setTipoOperacion(tipo:IOperationType51){
        this.tipoOperacion = tipo;
        return this;
    };

    setTipoDoc(tipo:IInvoiceType01){
        this.tipoDoc = tipo;
        return this;
    };

    setSerie(serie:string){
        this.serie = serie;
        return this;
    };

    setCorrelativo(correlativo:string){
        this.correlativo = correlativo;
        return this;
    };

    setFechaEmision(fecha:Date){
        this.fechaEmision = fecha;
        return this;
    };

    setTipoMoneda(moneda:string){
        this.tipoMoneda = moneda;
        return this;
    };

    setCompany(companyData:ICompany){
        this.company = companyData;
        return this;
    };

    setClient(clientData:IClient){
        this.client = clientData;
        return this;
    };

    setMtoOperGravadas(monto:number){
        this.mtoOperGravadas = monto;
        return this;
    };

    setMtoIGV(monto:number){
        this.mtoIGV = monto;
        return this;
    };

    setTotalImpuestos(monto:number){
        this.totalImpuestos = monto;
        return this;
    };

    setValorVenta(monto:number){
        this.valorVenta = monto;
        return this;
    };

    setSubTotal(monto:number){
        this.subTotal = monto;
        return this;
    };

    setMtoImpVenta(monto:number){
        this.mtoImpVenta = monto;
        return this;
    };

    getXML():string{

        const xmlContent = `<?xml version="1.0" encoding="utf-8"?>
    <Invoice xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ccts="urn:un:unece:uncefact:documentation:2" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2" xmlns:qdt="urn:oasis:names:specification:ubl:schema:xsd:QualifiedDatatypes-2" xmlns:udt="urn:un:unece:uncefact:data:specification:UnqualifiedDataTypesSchemaModule:2" xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
        <ext:UBLExtensions>
            <ext:UBLExtension>
                <ext:ExtensionContent/>
            </ext:UBLExtension>
        </ext:UBLExtensions>
        <cbc:UBLVersionID>${this.ublVersion}</cbc:UBLVersionID>
        <cbc:CustomizationID schemeAgencyName="PE:SUNAT">2.0</cbc:CustomizationID>
        <cbc:ProfileID schemeName="Tipo de Operacion" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo17">${this.tipoOperacion}</cbc:ProfileID>
        <cbc:ID>${this.serie}-${this.correlativo}</cbc:ID>
        <cbc:IssueDate>2021-08-07</cbc:IssueDate>
        <cbc:IssueTime>00:00:00</cbc:IssueTime>
        <cbc:DueDate>2021-08-07</cbc:DueDate>
        <cbc:InvoiceTypeCode listAgencyName="PE:SUNAT" listName="Tipo de Documento" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo01" listID="0101" name="Tipo de Operacion">${this.tipoDoc}</cbc:InvoiceTypeCode>
        <cbc:DocumentCurrencyCode listID="ISO 4217 Alpha" listName="Currency" listAgencyName="United Nations Economic Commission for Europe">${this.tipoMoneda}</cbc:DocumentCurrencyCode>
                <cbc:LineCountNumeric>7</cbc:LineCountNumeric>
        <cac:Signature>
            <cbc:ID>${this.serie}-${this.correlativo}</cbc:ID>
            <cac:SignatoryParty>
                <cac:PartyIdentification>
                    <cbc:ID>${this.company!.ruc}</cbc:ID>
                </cac:PartyIdentification>
                <cac:PartyName>
                    <cbc:Name><![CDATA[${this.company!.razon_social}]]></cbc:Name>
                </cac:PartyName>
            </cac:SignatoryParty>
            <cac:DigitalSignatureAttachment>
                <cac:ExternalReference>
                    <cbc:URI>#SignatureSP</cbc:URI>
                </cac:ExternalReference>
            </cac:DigitalSignatureAttachment>
        </cac:Signature>
        <cac:AccountingSupplierParty>
            <cac:Party>
                <cac:PartyIdentification>
                    <cbc:ID schemeID="6" schemeName="Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">${this.company!.ruc}</cbc:ID>
                </cac:PartyIdentification>
                <cac:PartyName>
                    <cbc:Name><![CDATA[${this.company!.razon_social}]]></cbc:Name>
                </cac:PartyName>
                <cac:PartyTaxScheme>
                    <cbc:RegistrationName><![CDATA[${this.company!.razon_social}]]></cbc:RegistrationName>
                    <cbc:CompanyID schemeID="6" schemeName="SUNAT:Identificador de Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">${this.company!.ruc}</cbc:CompanyID>
                    <cac:TaxScheme>
                        <cbc:ID schemeID="6" schemeName="SUNAT:Identificador de Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">${this.company!.ruc}</cbc:ID>
                    </cac:TaxScheme>
                </cac:PartyTaxScheme>
                <cac:PartyLegalEntity>
                    <cbc:RegistrationName><![CDATA[${this.company!.razon_social}]]></cbc:RegistrationName>
                    <cac:RegistrationAddress>
                        <cbc:ID schemeName="Ubigeos" schemeAgencyName="PE:INEI">${this.company!.direccion.ubigeo}</cbc:ID>
                        <cbc:AddressTypeCode listAgencyName="PE:SUNAT" listName="Establecimientos anexos">${this.company!.direccion.codigo_local}</cbc:AddressTypeCode>
                        <cbc:CityName><![CDATA[${this.company!.direccion.distrito}]]></cbc:CityName>
                        <cbc:CountrySubentity><![CDATA[${this.company!.direccion.provincia}]]></cbc:CountrySubentity>
                        <cbc:District><![CDATA[LAMBAYEQUE]]></cbc:District>
                        <cac:AddressLine>
                            <cbc:Line><![CDATA[8 DE OCTUBRE N 123 - LAMBAYEQUE - LAMBAYEQUE - LAMBAYEQUE]]></cbc:Line>
                        </cac:AddressLine>
                        <cac:Country>
                            <cbc:IdentificationCode listID="ISO 3166-1" listAgencyName="United Nations Economic Commission for Europe" listName="Country">PE</cbc:IdentificationCode>
                        </cac:Country>
                    </cac:RegistrationAddress>
                </cac:PartyLegalEntity>
                <cac:Contact>
                    <cbc:Name><![CDATA[]]></cbc:Name>
                </cac:Contact>
            </cac:Party>
        </cac:AccountingSupplierParty>
        <cac:AccountingCustomerParty>
            <cac:Party>
                <cac:PartyIdentification>
                    <cbc:ID schemeID="6" schemeName="Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">20605145648</cbc:ID>
                </cac:PartyIdentification>
                <cac:PartyName>
                    <cbc:Name><![CDATA[AGROINVERSIONES Y SERVICIOS AJINOR S.R.L. - AGROSERVIS AJINOR S.R.L.]]></cbc:Name>
                </cac:PartyName>
                <cac:PartyTaxScheme>
                    <cbc:RegistrationName><![CDATA[AGROINVERSIONES Y SERVICIOS AJINOR S.R.L. - AGROSERVIS AJINOR S.R.L.]]></cbc:RegistrationName>
                    <cbc:CompanyID schemeID="6" schemeName="SUNAT:Identificador de Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">20605145648</cbc:CompanyID>
                    <cac:TaxScheme>
                        <cbc:ID schemeID="6" schemeName="SUNAT:Identificador de Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">20605145648</cbc:ID>
                    </cac:TaxScheme>
                </cac:PartyTaxScheme>
                <cac:PartyLegalEntity>
                    <cbc:RegistrationName><![CDATA[AGROINVERSIONES Y SERVICIOS AJINOR S.R.L. - AGROSERVIS AJINOR S.R.L.]]></cbc:RegistrationName>
                    <cac:RegistrationAddress>
                        <cbc:ID schemeName="Ubigeos" schemeAgencyName="PE:INEI"/>
                        <cbc:CityName><![CDATA[]]></cbc:CityName>
                        <cbc:CountrySubentity><![CDATA[]]></cbc:CountrySubentity>
                        <cbc:District><![CDATA[]]></cbc:District>
                        <cac:AddressLine>
                            <cbc:Line><![CDATA[MZA. C LOTE. 46 URB. SAN ISIDRO LA LIBERTAD - TRUJILLO - TRUJILLO]]></cbc:Line>
                        </cac:AddressLine>                                        
                        <cac:Country>
                            <cbc:IdentificationCode listID="ISO 3166-1" listAgencyName="United Nations Economic Commission for Europe" listName="Country"/>
                        </cac:Country>
                    </cac:RegistrationAddress>
                </cac:PartyLegalEntity>
            </cac:Party>
        </cac:AccountingCustomerParty>
        <cac:PaymentTerms>
        <cbc:ID>FormaPago</cbc:ID>
        <cbc:PaymentMeansID>Contado</cbc:PaymentMeansID>
    </cac:PaymentTerms>  
        <cac:TaxTotal>
            <cbc:TaxAmount currencyID="PEN">28.22</cbc:TaxAmount>
            <cac:TaxSubtotal>
                <cbc:TaxableAmount currencyID="PEN">156.78</cbc:TaxableAmount>
                <cbc:TaxAmount currencyID="PEN">28.22</cbc:TaxAmount>
                <cac:TaxCategory>
                    <cbc:ID schemeID="UN/ECE 5305" schemeName="Tax Category Identifier" schemeAgencyName="United Nations Economic Commission for Europe">S</cbc:ID>
                    <cac:TaxScheme>
                        <cbc:ID schemeID="UN/ECE 5153" schemeAgencyID="6">1000</cbc:ID>
                        <cbc:Name>IGV</cbc:Name>
                        <cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>
                    </cac:TaxScheme>
                </cac:TaxCategory>
            </cac:TaxSubtotal>          
        </cac:TaxTotal>
        <cac:LegalMonetaryTotal>
            <cbc:LineExtensionAmount currencyID="PEN">156.78</cbc:LineExtensionAmount>
            <cbc:TaxInclusiveAmount currencyID="PEN">185.00</cbc:TaxInclusiveAmount>
            <cbc:PayableAmount currencyID="PEN">185.00</cbc:PayableAmount>
        </cac:LegalMonetaryTotal>
        <cac:InvoiceLine>
            <cbc:ID>1</cbc:ID>
            <cbc:InvoicedQuantity unitCode="NIU" unitCodeListID="UN/ECE rec 20" unitCodeListAgencyName="United Nations Economic Commission for Europe">1</cbc:InvoicedQuantity>
            <cbc:LineExtensionAmount currencyID="PEN">156.78</cbc:LineExtensionAmount>
            <cac:PricingReference>
                <cac:AlternativeConditionPrice>
                    <cbc:PriceAmount currencyID="PEN">185.00</cbc:PriceAmount>
                    <cbc:PriceTypeCode listName="Tipo de Precio" listAgencyName="PE:SUNAT" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo16">01</cbc:PriceTypeCode>
                </cac:AlternativeConditionPrice>
            </cac:PricingReference>
            <cac:TaxTotal>
                <cbc:TaxAmount currencyID="PEN">28.22</cbc:TaxAmount>
                <cac:TaxSubtotal>
                    <cbc:TaxableAmount currencyID="PEN">156.78</cbc:TaxableAmount>
                    <cbc:TaxAmount currencyID="PEN">28.22</cbc:TaxAmount>
                    <cac:TaxCategory>
                        <cbc:ID schemeID="UN/ECE 5305" schemeName="Tax Category Identifier" schemeAgencyName="United Nations Economic Commission for Europe">S</cbc:ID>
                        <cbc:Percent>18</cbc:Percent>
                        <cbc:TaxExemptionReasonCode listAgencyName="PE:SUNAT" listName="Afectacion del IGV" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo07">10</cbc:TaxExemptionReasonCode>
                        <cac:TaxScheme>
                            <cbc:ID schemeID="UN/ECE 5153" schemeName="Codigo de tributos" schemeAgencyName="PE:SUNAT">1000</cbc:ID>
                            <cbc:Name>IGV</cbc:Name>
                            <cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>
                        </cac:TaxScheme>
                    </cac:TaxCategory>
                </cac:TaxSubtotal></cac:TaxTotal>
            <cac:Item>
                <cbc:Description><![CDATA[FENA X L]]></cbc:Description>
                <cac:SellersItemIdentification>
                    <cbc:ID><![CDATA[195]]></cbc:ID>
                </cac:SellersItemIdentification>
                <cac:CommodityClassification>
                    <cbc:ItemClassificationCode listID="UNSPSC" listAgencyName="GS1 US" listName="Item Classification">10191509</cbc:ItemClassificationCode>
                </cac:CommodityClassification>
            </cac:Item>
            <cac:Price>
                <cbc:PriceAmount currencyID="PEN">156.78</cbc:PriceAmount>
            </cac:Price>
        </cac:InvoiceLine>
    </Invoice>`

    }

}