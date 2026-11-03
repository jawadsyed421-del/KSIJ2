import '../scrollcraft.css';
import '../topbar.css';

export const metadata = {
  title: 'KSIJ Mumbai · Khoja Shia Ithna Asheri Jamaat',
  description: 'The Khoja Shia Ithna Asheri Jamaat, Mumbai. Projects, bookings, membership and donations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#08170F" />
        <link rel="icon" type="image/png" href="/assets/img/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Geist:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
