import type { Invoice } from "../invoice.interface.js";


export class FacturaInvoice implements Invoice{

    private readonly emisorData = {
        tipo_documento: "6",
        ruc : "20607599727",
        razon_social  : "INSTITUTO INTERNACIONAL DE SOFTWARE S.A.C.",
        nombre_comercial  : "ACADEMIA DE SOFTWARE",
        departamento  : "LAMBAYEQUE",
        provincia  : "CHICLAYO",
        distrito  : "CHICLAYO",
        direccion  : "CALLE OCHO DE OCTUBRE 123",
        ubigeo  : "140101",
        usuario_emisor  : "MODDATOS",
        clave_emisor  : "MODDATOS"
    }

    private readonly clienteData = {
        tipo_documento : "6",
        ruc : "20605145648",
        razon_social : "AGROINVERSIONES Y SERVICIOS AJINOR S.R.L. - AGROSERVIS AJINOR S.R.L.",
        direccion : "MZA. C LOTE. 46 URB. SAN ISIDRO LA LIBERTAD - TRUJILLO - TRUJILLO"
    }

    private readonly cuotas = [];

    private readonly cabecera = {
        tipo_operacion :  "0101",
        tipo_comprobante:  "01",
        moneda         :  "PEN",
        serie          :  "F001",
        correlativo    :  176,
        total_op_gravadas:  50.17,
        igv         :  9.03,
        icbper      :  0.50,
        total_op_exonerada:  140.00,
        total_op_inafectas:  270.00,
        total_antes_impuestos:  460.17,
        total_impuestos   :  9.53,
        total_despues_impuesto:  469.70,
        total_a_pagar     : 469.70,
        fecha_emision      : "2023-02-02",
        hora_emision    : "19:48:00",
        fecha_vencimiento : "2023-02-02",
        forma_pago     :  "Contado",
        monto_credito  :  0.00,
        anexo_sucursal :  "0000" 
    }

    private readonly items = [
        {
            item   : 1,
            cantidad   : 1,
            unidad   : "NIU",
            nombre : "MOCHILA",
            valor_unitario : 50.00,          
            precio_lista : 59.00,
            valor_total : 50.00,
            igv  : 9.00,
            icbper  : 0.00,
            factor_icbper   : 0.50, 
            total_antes_impuestos : 50.00,
            total_impuestos : 9.00,
            codigos :["S","10","1000","IGV","VAT"]
        }
    ];


    buildXML():string{

        let xml = `<?xml version="1.0" encoding="utf-8"?>
<Invoice xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ccts="urn:un:unece:uncefact:documentation:2" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2" xmlns:qdt="urn:oasis:names:specification:ubl:schema:xsd:QualifiedDatatypes-2" xmlns:udt="urn:un:unece:uncefact:data:specification:UnqualifiedDataTypesSchemaModule:2" xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
   <ext:UBLExtensions>
      <ext:UBLExtension>
         <ext:ExtensionContent/>
      </ext:UBLExtension>
   </ext:UBLExtensions>
   <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
   <cbc:CustomizationID schemeAgencyName="PE:SUNAT">2.0</cbc:CustomizationID>
   <cbc:ProfileID schemeName="Tipo de Operacion" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo17">${this.cabecera.tipo_operacion}</cbc:ProfileID>
   <cbc:ID>${this.cabecera.serie}-${this.cabecera.correlativo}</cbc:ID>
   <cbc:IssueDate>${this.cabecera.fecha_emision}</cbc:IssueDate>
   <cbc:IssueTime>${this.cabecera.hora_emision}</cbc:IssueTime>
   <cbc:DueDate>${this.cabecera.fecha_vencimiento}</cbc:DueDate>
   <cbc:InvoiceTypeCode listAgencyName="PE:SUNAT" listName="Tipo de Documento" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo01" listID="0101" name="Tipo de Operacion">${this.cabecera.tipo_comprobante}</cbc:InvoiceTypeCode>
   <cbc:DocumentCurrencyCode listID="ISO 4217 Alpha" listName="Currency" listAgencyName="United Nations Economic Commission for Europe">${this.cabecera.moneda}</cbc:DocumentCurrencyCode>
            <cbc:LineCountNumeric>${this.items.length}</cbc:LineCountNumeric>
    <cac:Signature>
      <cbc:ID>${this.cabecera.serie}-${this.cabecera.correlativo}</cbc:ID>
      <cac:SignatoryParty>
         <cac:PartyIdentification>
            <cbc:ID>${this.emisorData.ruc}</cbc:ID>
         </cac:PartyIdentification>
         <cac:PartyName>
            <cbc:Name><![CDATA[${this.emisorData.razon_social}]]></cbc:Name>
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
            <cbc:ID schemeID="${this.emisorData.tipo_documento}" schemeName="Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">${this.emisorData.ruc}</cbc:ID>
         </cac:PartyIdentification>
         <cac:PartyName>
            <cbc:Name><![CDATA[${this.emisorData.razon_social}]]></cbc:Name>
         </cac:PartyName>
         <cac:PartyTaxScheme>
            <cbc:RegistrationName><![CDATA[${this.emisorData.razon_social}]]></cbc:RegistrationName>
            <cbc:CompanyID schemeID="${this.emisorData.tipo_documento}" schemeName="SUNAT:Identificador de Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">${this.emisorData.ruc}</cbc:CompanyID>
            <cac:TaxScheme>
               <cbc:ID schemeID="${this.emisorData.tipo_documento}" schemeName="SUNAT:Identificador de Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">${this.emisorData.ruc}</cbc:ID>
            </cac:TaxScheme>
         </cac:PartyTaxScheme>
         <cac:PartyLegalEntity>
            <cbc:RegistrationName><![CDATA[${this.emisorData.razon_social}]]></cbc:RegistrationName>
            <cac:RegistrationAddress>
               <cbc:ID schemeName="Ubigeos" schemeAgencyName="PE:INEI">${this.emisorData.ubigeo}</cbc:ID>
               <cbc:AddressTypeCode listAgencyName="PE:SUNAT" listName="Establecimientos anexos">${this.cabecera.anexo_sucursal}</cbc:AddressTypeCode>
               <cbc:CityName><![CDATA[${this.emisorData.provincia}]]></cbc:CityName>
               <cbc:CountrySubentity><![CDATA[${this.emisorData.departamento}]]></cbc:CountrySubentity>
               <cbc:District><![CDATA[${this.emisorData.distrito}]]></cbc:District>
               <cac:AddressLine>
                  <cbc:Line><![CDATA[${this.emisorData.direccion}]]></cbc:Line>
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
            <cbc:ID schemeID="${this.clienteData.tipo_documento}" schemeName="Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">${this.clienteData.ruc}</cbc:ID>
         </cac:PartyIdentification>
         <cac:PartyName>
            <cbc:Name><![CDATA[${this.clienteData.razon_social}]]></cbc:Name>
         </cac:PartyName>
         <cac:PartyTaxScheme>
            <cbc:RegistrationName><![CDATA[${this.clienteData.razon_social}]]></cbc:RegistrationName>
            <cbc:CompanyID schemeID="${this.clienteData.tipo_documento}" schemeName="SUNAT:Identificador de Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">${this.clienteData.ruc}</cbc:CompanyID>
            <cac:TaxScheme>
               <cbc:ID schemeID="${this.clienteData.tipo_documento}" schemeName="SUNAT:Identificador de Documento de Identidad" schemeAgencyName="PE:SUNAT" schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">${this.clienteData.ruc}</cbc:ID>
            </cac:TaxScheme>
         </cac:PartyTaxScheme>
         <cac:PartyLegalEntity>
            <cbc:RegistrationName><![CDATA[${this.clienteData.razon_social}]]></cbc:RegistrationName>
            <cac:RegistrationAddress>
               <cbc:ID schemeName="Ubigeos" schemeAgencyName="PE:INEI"/>
               <cbc:CityName><![CDATA[]]></cbc:CityName>
               <cbc:CountrySubentity><![CDATA[]]></cbc:CountrySubentity>
               <cbc:District><![CDATA[]]></cbc:District>
               <cac:AddressLine>
                  <cbc:Line><![CDATA[${this.clienteData.direccion}]]></cbc:Line>
               </cac:AddressLine>                                        
               <cac:Country>
                  <cbc:IdentificationCode listID="ISO 3166-1" listAgencyName="United Nations Economic Commission for Europe" listName="Country"/>
               </cac:Country>
            </cac:RegistrationAddress>
         </cac:PartyLegalEntity>
      </cac:Party>
   </cac:AccountingCustomerParty>`;

   xml += `<cac:PaymentTerms>
      <cbc:ID>FormaPago</cbc:ID>
      <cbc:PaymentMeansID>${this.cabecera.forma_pago}</cbc:PaymentMeansID>
      <cbc:Amount currencyID="${this.cabecera.moneda}">${this.cabecera.monto_credito}</cbc:Amount>
   </cac:PaymentTerms>`;

//    for(const cuota of this.cuotas){
//     xml += `<cac:PaymentTerms>
//                   <cbc:ID>FormaPago</cbc:ID>
//                   <cbc:PaymentMeansID>Cuota'.$v['numero'].'</cbc:PaymentMeansID>
//                   <cbc:Amount currencyID="'.$cabecera['moneda'].'">'.$v['importe'].'</cbc:Amount>
//                   <cbc:PaymentDueDate>'.$v['vencimiento'].'</cbc:PaymentDueDate>
//             </cac:PaymentTerms>
//     `
//    }

        xml +=`<cac:TaxTotal>
            <cbc:TaxAmount currencyID="${this.cabecera.moneda}">${this.cabecera.total_impuestos}</cbc:TaxAmount>
            <cac:TaxSubtotal>
                <cbc:TaxableAmount currencyID="${this.cabecera.moneda}">${this.cabecera.total_op_gravadas}</cbc:TaxableAmount>
                <cbc:TaxAmount currencyID="${this.cabecera.moneda}">${this.cabecera.igv}</cbc:TaxAmount>
                <cac:TaxCategory>
                    <cbc:ID schemeID="UN/ECE 5305" schemeName="Tax Category Identifier" schemeAgencyName="United Nations Economic Commission for Europe">S</cbc:ID>
                    <cac:TaxScheme>
                    <cbc:ID schemeID="UN/ECE 5153" schemeAgencyID="6">1000</cbc:ID>
                    <cbc:Name>IGV</cbc:Name>
                    <cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>
                    </cac:TaxScheme>
                </cac:TaxCategory>
            </cac:TaxSubtotal>`;

        if(this.cabecera.total_op_exonerada >0){
            xml+=`<cac:TaxSubtotal>
                    <cbc:TaxableAmount currencyID="${this.cabecera.moneda}">${this.cabecera.total_op_exonerada}</cbc:TaxableAmount>
                    <cbc:TaxAmount currencyID="${this.cabecera.moneda}">0.00</cbc:TaxAmount>
                    <cac:TaxCategory>
                        <cbc:ID schemeID="UN/ECE 5305" schemeName="Tax Category Identifier" schemeAgencyName="United Nations Economic Commission for Europe">E</cbc:ID>
                        <cac:TaxScheme>
                        <cbc:ID schemeID="UN/ECE 5153" schemeAgencyID="6">9997</cbc:ID>
                        <cbc:Name>EXO</cbc:Name>
                        <cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>
                        </cac:TaxScheme>
                    </cac:TaxCategory>
                </cac:TaxSubtotal>`;
        }

        if(this.cabecera.total_op_inafectas >0){
            xml+=`<cac:TaxSubtotal>
                <cbc:TaxableAmount currencyID="${this.cabecera.moneda}">${this.cabecera.total_op_inafectas}</cbc:TaxableAmount>
                <cbc:TaxAmount currencyID="${this.cabecera.moneda}">0.00</cbc:TaxAmount>
                <cac:TaxCategory>
                    <cbc:ID schemeID="UN/ECE 5305" schemeName="Tax Category Identifier" schemeAgencyName="United Nations Economic Commission for Europe">O</cbc:ID>
                    <cac:TaxScheme>
                    <cbc:ID schemeID="UN/ECE 5153" schemeAgencyID="6">9998</cbc:ID>
                    <cbc:Name>INA</cbc:Name>
                    <cbc:TaxTypeCode>FRE</cbc:TaxTypeCode>
                    </cac:TaxScheme>
                </cac:TaxCategory>
            </cac:TaxSubtotal>`;
            
            
        }

        if(this.cabecera.icbper > 0 ){
            xml +=`<cac:TaxSubtotal>
                    <cbc:TaxAmount currencyID="${this.cabecera.moneda}">${this.cabecera.icbper}}</cbc:TaxAmount>
                    <cac:TaxCategory>
                        <cac:TaxScheme>
                        <cbc:ID schemeID="UN/ECE 5153" schemeAgencyID="6">7152</cbc:ID>
                        <cbc:Name>ICBPER</cbc:Name>
                        <cbc:TaxTypeCode>OTH</cbc:TaxTypeCode>
                        </cac:TaxScheme>
                    </cac:TaxCategory>
                </cac:TaxSubtotal>`;          
        }

        xml +=`</cac:TaxTotal>
        <cac:LegalMonetaryTotal>
            <cbc:LineExtensionAmount currencyID=">${this.cabecera.moneda}">${this.cabecera.total_antes_impuestos}</cbc:LineExtensionAmount>
            <cbc:TaxInclusiveAmount currencyID=">${this.cabecera.moneda}">${this.cabecera.total_despues_impuesto}</cbc:TaxInclusiveAmount>
            <cbc:PayableAmount currencyID=">${this.cabecera.moneda}">${this.cabecera.total_a_pagar}</cbc:PayableAmount>
        </cac:LegalMonetaryTotal>`;

    for(const item of this.items){

   xml+=`<cac:InvoiceLine>
      <cbc:ID>${item.item}</cbc:ID>
      <cbc:InvoicedQuantity unitCode="${item.unidad}" unitCodeListID="UN/ECE rec 20" unitCodeListAgencyName="United Nations Economic Commission for Europe">${item.cantidad}</cbc:InvoicedQuantity>
      <cbc:LineExtensionAmount currencyID="${this.cabecera.moneda}">${item.total_antes_impuestos}</cbc:LineExtensionAmount>
      <cac:PricingReference>
         <cac:AlternativeConditionPrice>
            <cbc:PriceAmount currencyID="${this.cabecera.moneda}">${item.precio_lista}</cbc:PriceAmount>
            <cbc:PriceTypeCode listName="Tipo de Precio" listAgencyName="PE:SUNAT" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo16">01</cbc:PriceTypeCode>
         </cac:AlternativeConditionPrice>
      </cac:PricingReference>
      <cac:TaxTotal>
         <cbc:TaxAmount currencyID="${this.cabecera.moneda}">${item.total_impuestos}</cbc:TaxAmount>
         <cac:TaxSubtotal>
            <cbc:TaxableAmount currencyID="${this.cabecera.moneda}">${item.valor_total}</cbc:TaxableAmount>
            <cbc:TaxAmount currencyID="${this.cabecera.moneda}">${item.igv}</cbc:TaxAmount>
            <cac:TaxCategory>
               <cbc:ID schemeID="UN/ECE 5305" schemeName="Tax Category Identifier" schemeAgencyName="United Nations Economic Commission for Europe">${item.codigos[0]}</cbc:ID>
               <cbc:Percent>18</cbc:Percent>
               <cbc:TaxExemptionReasonCode listAgencyName="PE:SUNAT" listName="Afectacion del IGV" listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo07">${item.codigos[1]}</cbc:TaxExemptionReasonCode>
               <cac:TaxScheme>
                  <cbc:ID schemeID="UN/ECE 5153" schemeName="Codigo de tributos" schemeAgencyName="PE:SUNAT">${item.codigos[2]}</cbc:ID>
                  <cbc:Name>${item.codigos[3]}</cbc:Name>
                  <cbc:TaxTypeCode>${item.codigos[4]}</cbc:TaxTypeCode>
               </cac:TaxScheme>
            </cac:TaxCategory>
         </cac:TaxSubtotal>`;

         if(item.icbper>0){
            xml +=`<cac:TaxSubtotal>
                   <cbc:TaxAmount currencyID="${this.cabecera.moneda}">${item.icbper}</cbc:TaxAmount>
                   <cbc:BaseUnitMeasure unitCode="${item.unidad}">${item.cantidad}</cbc:BaseUnitMeasure>            
                   <cac:TaxCategory>
                          <cbc:PerUnitAmount currencyID="${this.cabecera.moneda}">${item.factor_icbper}</cbc:PerUnitAmount>
                          <cac:TaxScheme>
                                <cbc:ID>7152</cbc:ID>
                                <cbc:Name>ICBPER</cbc:Name>
                                <cbc:TaxTypeCode>OTH</cbc:TaxTypeCode>
                          </cac:TaxScheme>
                   </cac:TaxCategory>
            </cac:TaxSubtotal>`;          
         }

      xml +=`</cac:TaxTotal>
      <cac:Item>
         <cbc:Description><![CDATA[${item.nombre}]]></cbc:Description>
         <cac:SellersItemIdentification>
            <cbc:ID><![CDATA[195]]></cbc:ID>
         </cac:SellersItemIdentification>
         <cac:CommodityClassification>
            <cbc:ItemClassificationCode listID="UNSPSC" listAgencyName="GS1 US" listName="Item Classification">10191509</cbc:ItemClassificationCode>
         </cac:CommodityClassification>
      </cac:Item>
      <cac:Price>
         <cbc:PriceAmount currencyID="${this.cabecera.moneda}">${item.valor_unitario}</cbc:PriceAmount>
      </cac:Price>
   </cac:InvoiceLine>`;
   
   }

        xml+='</Invoice>';



        return xml;

    }


}