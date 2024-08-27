import { NextResponse } from "next/server"
import { Resend } from "resend";
import EmailTemplate from "@/emails";

const resend = new Resend(process.env.RESEND_API_KEY);




export async function POST (req, res) {
    const {name, email, subject, message} = await req.json();
    if(!name || !email || !subject || !message) {
        return NextResponse.json({error: "all fields are required"}, {status: 400})
    } else {
        
            const { data, error } = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: "info.studyjetglobal@gmail.com",
                subject: subject,
                react: EmailTemplate({ name, email,subject,message }),
              });

       if (error) {
        return NextResponse.json(error, {status: 400})
 
       }

       return NextResponse.json({message: "message sent successfully"}, {status: 200})

    }
}