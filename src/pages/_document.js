import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark scroll-smooth">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="Itzfizz Digital - Premium Scroll-Driven Hero Animation & Automotive Interactive Experience." />
        <meta name="theme-color" content="#060709" />
      </Head>
      <body className="bg-[#060709] text-zinc-100 font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
