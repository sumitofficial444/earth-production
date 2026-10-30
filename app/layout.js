import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: 'The Earth Production & Rental Podcast Studio | Professional Recording Studio',
  description: 'The Earth Production — Premium Podcast Recording, Video Editing & Rental Studio in Indore. Record, produce, and grow your content with professional-grade equipment.',
  keywords: 'podcast studio, rental studio, video editing, production studio, The Earth Production, Indore',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-style-mode" content="1" />
        <link rel="shortcut icon" type="image/jpeg" href="/logo.jpg" />
        {/* Original Template CSS */}
        <link rel="stylesheet" href="/assets/css/plugins/fontawesome-6.css" />
        <link rel="stylesheet" href="/assets/css/plugins/swiper.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor/metismenu.css" />
        <link rel="stylesheet" href="/assets/css/plugins/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body className="index-one">
        {children}

        {/* Original Template Scripts — loaded after page using next/script */}
        <Script src="/assets/js/vendor/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/plugins/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/waypoint.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/swiper.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/resizer-sensor.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/sticky-sidebar.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/isotop.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/smoothscroll-varticle.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/gsap.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/scrolltiger.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/scrolltoplugin.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/splittext.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/smoothscroll.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/scrollmagic.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/animate-scrollmagic.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/tilt.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/counterup.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/waw.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
