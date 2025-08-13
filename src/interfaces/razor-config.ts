export interface IRazorConfig{

    /**
     * The environment mode for RazorBlade.
     */
    mode?: 'development' | 'production';
    /**
     * The path of your certificate file.
     * This is user to sign the invoices.
     */
    pfxPath: string;
    /**
     * The password for the PFX certificate.
     * Can you pass by and environment variable.
     * @example process.env.PFX_PASSWORD
     */
    pfxPassword: string;


}