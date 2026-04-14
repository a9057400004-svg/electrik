import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Александр — электрик с опытом 21 год",
  description:
    "Премиальный сайт электрика: Telegram, Max, форма заявки и отправка в Telegram.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
