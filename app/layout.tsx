import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Александр — электрик с опытом 21 год",
  description:
    "Премиальный сайт электрика: Telegram, Max, форма заявки и отправка в Telegram.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <Script id="yandex-metrika" strategy="afterInteractive">
  {`
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) { return; }
      }
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],
      k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108750173','ym');

    ym(108750173, 'init', {
      webvisor:true,
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true
    });
  `}
</Script>

        {children}
      </body>
    </html>
  );
}
