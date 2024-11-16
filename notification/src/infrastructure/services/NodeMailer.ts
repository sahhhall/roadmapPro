import { IEmailService } from '../../domain/interfaces/IEmailService'; 
import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config()

export class NodeMailerService implements IEmailService {
    private readonly transporter;
    constructor(){
        if (!process.env.EMAIL_USER ) {
            throw new Error( `${process.env.EMAIL_USER }  you `)
        }
        this.transporter = nodemailer.createTransport({
            service:'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.EMAIL_USER ,
                pass: process.env.EMAIL_PASS 
            }
        })
    }

    async sendMail(to: string, subject: string, body: string): Promise<void> {
        console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
        const mailOptions = {
            from: "RoadmapPro.sh",
            to,
            subject,
            text:body
        }
        await this.transporter.sendMail(mailOptions)
    }
}