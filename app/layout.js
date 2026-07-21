import './styles.css';

export const metadata = {
  title: 'Panther Patrol T Shirt — Paperweight',
  description: 'A one-item release from Paperweight. Available cropped or classic cut while supplies last.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
