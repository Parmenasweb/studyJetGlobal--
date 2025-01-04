import { ConsultationViewProvider } from "./components/ConsultationViewContext";

export default function ConsultationsLayout({ children }) {
  return (
    <ConsultationViewProvider>
      {children}
    </ConsultationViewProvider>
  );
} 