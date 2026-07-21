import './styles.css';

export const metadata = {
  title: 'Panther Patrol T Shirt — Paperweight',
  description: 'The Panther Patrol T Shirt, a one-item release from Paperweight.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
