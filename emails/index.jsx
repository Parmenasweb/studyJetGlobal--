import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";


export const EmailTemplate = ({
  name,email,subject,message
}) => (
  <Html>
    <Head />
    <Preview>
      studyJetGlobal a study abroad consultaion and agency
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="/public/logotrans.jpeg"
          width="170"
          height="50"
          alt="studyjetglobal Logo"
          style={logo}
        />
        <Text style={paragraph}>From: {email},</Text>
        <Text style={paragraph}>Subject: {subject}</Text>
        <Text style={paragraph}>
          message : {message}
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="/onBoarding/consultationForm">
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best Regards,
          <br />
          sender name: {name}
        </Text>
        <Hr style={hr} />
        
      </Container>
    </Body>
  </Html>
);



export default EmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" ,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" ,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
