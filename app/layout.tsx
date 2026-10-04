import "./globals.css";

export const metadata = {
  title: "TradeMind AI",
  description: "AI-powered advertising and market education platform MVP"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}