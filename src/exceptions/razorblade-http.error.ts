export class RazorbladeHttpError extends Error{

    statusCode:string;
    message:string;

    constructor(message:string, statusCode:string){
        super(message)
        this.message = message;
        this.statusCode = statusCode;
    }

}