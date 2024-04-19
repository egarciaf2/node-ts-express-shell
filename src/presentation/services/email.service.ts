import nodemailer, { Transporter } from "nodemailer";

export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    fromName: string;
    fromEmail: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
    contentType: string;
}

export interface EmailConfig {
    service: string;
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };

}

export class EmailService {

    private transporter: Transporter;


    constructor(
        options: EmailConfig
    ) {
        this.transporter = nodemailer.createTransport( options );
    }

    /**
     * Sends an email with the given options.
     * @param {SendEmailOptions} options - The options for sending the email.
     * @param {string} options.to - The email address to send the email to.
     * @param {string} options.subject - The subject of the email.
     * @param {string} options.htmlBody - The HTML content of the email body.
     * @param {Attachment[]} [options.attachments] - The attachments to include in the email.
     *
     * @returns {Promise<boolean>} A promise that resolves to true if the email was sent successfully, or false if an
     *     error occurred.
     */
    async sendEmail( options: SendEmailOptions ): Promise<boolean> {

        const { to, subject, htmlBody, fromName, fromEmail, attachments = [] } = options;

        try {

            const sentInformation = await this.transporter.sendMail( {
                to,
                subject,
                html: htmlBody,
                from: `${ fromName } <${ fromEmail }>`,
                attachments,
            } );
            console.log( 'Email sent:', sentInformation)

            return true;
        } catch ( error ) {
            return false;
        }

    }

    /**
     * Sends an email with system logs attached as attachments.
     * @param {string | string[]} to - The recipient(s) of the email.
     * @return {void}
     */
    async sendEmailWithFileSystemLogs( to: string | string[] ): Promise<boolean> {
        const subject: string = 'Logs del servidor' + new Date().toISOString();
        const htmlBody: string = `
            <h1>Logs del servidor</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus ipsum iusto maxime quisquam, velit veritatis! Aliquid beatae dicta dolorum fugiat, impedit minus nisi officia omnis perferendis possimus quo saepe veniam.</p>
            <p>Ver logs adjuntos</p>
        `;

        const attachments: Attachment[] = [
            {
                filename:    'logs-all.log',
                path:        './logs/logs-all.log',
                contentType: 'text/plain',
            },
            {
                filename:    'logs-high.log',
                path:        './logs/logs-high.log',
                contentType: 'text/plain',
            },
            {
                filename:    'logs-medium.log',
                path:        './logs/logs-medium.log',
                contentType: 'text/plain',
            },
        ];

        return this.sendEmail( {
            to,
            subject,
            htmlBody,
            attachments,
            fromEmail: "",
            fromName: "",
        } );

    }
}
