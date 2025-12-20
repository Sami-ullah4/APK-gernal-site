import "./globals.css";
import NavBar from "./components/header/page";
import Footer from "./footer/page";
import MediaIcons from "./components/media-Icons/page";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body>
        <NavBar />
        <main>
          {children} <MediaIcons />
        </main>
        <Footer />
      </body>
    </html>
  );
}
