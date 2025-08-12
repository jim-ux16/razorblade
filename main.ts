export class InvoiceCreationError extends Error{

    constructor(message: string) {
        super(message);
        this.name = "InvoiceCreationError";
    }

}