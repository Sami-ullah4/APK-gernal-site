import "./globals.css";
import NavBar from "./components/header/page";
// import MediaIcons from "./components/media-Icons/page";
import { ReduxProvider } from "./store/Providers";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import(`./footer/page`));
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body>
        <ReduxProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
