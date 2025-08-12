export interface ISaleDetail {

    codProducto:string;
    unidad:string;
    cantidad:number;
    montoValorUnitario:number;
    descripcion:string;
    montoBaseIgv:number;
    porcentajeIgv:number;
    igv:number;
    tipAfeIgv:string;
    totalImpuestos:number;
    mtoValorVenta:number;
    mtoPrecioUnitario:number;
}