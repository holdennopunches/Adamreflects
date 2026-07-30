import "./globals.css";
import { Topbar, Footer } from "../components/Shared";

export const metadata = {
  title: "Adam Reflects — building things in the in-between hours",
  description:
    "I run a small shop in Cork. In the quiet hours, I build things with AI — tools, games, and honest experiments. This is where I share them all.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Topbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
