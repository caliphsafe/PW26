import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="success-page">
      <section className="success-card">
        <p className="panel-label">Order Confirmed</p>
        <h1>YOUR COPY IS SECURED.</h1>
        <p>Thank you for ordering the Panther Patrol T Shirt. A Stripe receipt will be sent to your email. Paperweight will follow up with local-delivery customers to coordinate drop-off.</p>
        <Link href="/">Return to the front page</Link>
      </section>
    </main>
  );
}
