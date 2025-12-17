import "./globals.css";
import NavBar from "./components/header/page";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
