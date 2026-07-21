'use client';

import { useMemo, useState } from 'react';

const sizes = ['S', 'M', 'L', 'XL'];
const cuts = ['Classic', 'Cropped'];

const inventory = {
  Classic: { S: 2, M: 3, L: 5, XL: 5 },
  Cropped: { S: 3, M: 2, L: 5, XL: 5 },
};

const paymentLinks = {
  Classic: {
    S: process.env.NEXT_PUBLIC_STRIPE_LINK_CLASSIC_S,
    M: process.env.NEXT_PUBLIC_STRIPE_LINK_CLASSIC_M,
    L: process.env.NEXT_PUBLIC_STRIPE_LINK_CLASSIC_L,
    XL: process.env.NEXT_PUBLIC_STRIPE_LINK_CLASSIC_XL,
  },
  Cropped: {
    S: process.env.NEXT_PUBLIC_STRIPE_LINK_CROPPED_S,
    M: process.env.NEXT_PUBLIC_STRIPE_LINK_CROPPED_M,
    L: process.env.NEXT_PUBLIC_STRIPE_LINK_CROPPED_L,
    XL: process.env.NEXT_PUBLIC_STRIPE_LINK_CROPPED_XL,
  },
};

export default function HomePage() {
  const [size, setSize] = useState('L');
  const [cut, setCut] = useState('Classic');
  const [error, setError] = useState('');

  const allocation = useMemo(() => inventory[cut][size], [cut, size]);

  function beginCheckout() {
    setError('');
    const link = paymentLinks[cut][size];

    if (!link || !link.startsWith('https://')) {
      setError(`The Stripe link for ${cut} / ${size} has not been added yet.`);
      return;
    }

    window.location.href = link;
  }

  return (
    <main>
      <div className="top-strip">
        <span>Paperweight Special Edition</span>
        <span>New Bedford · Massachusetts</span>
        <span>One Item Release</span>
      </div>

      <article className="newspaper-shell">
        <header className="masthead">
          <div className="issue-box">VOL. 01<br />ISSUE 01</div>
          <div>
            <p className="eyebrow">Paperweight Community Goods</p>
            <h1>PAPERWEIGHT</h1>
            <p className="submast">Independent clothing, printed with purpose.</p>
          </div>
          <div className="price-box">$20<br /><small>+ shipping</small></div>
        </header>

        <div className="rule-row">
          <span>THE PANTHER PATROL EDITION</span>
          <span>LIMITED TO 30 SHIRTS</span>
        </div>

        <section className="lead-grid">
          <div className="headline-column">
            <p className="kicker">New Release</p>
            <h2>PANTHER<br />PATROL<br />T SHIRT</h2>
            <p className="deck">A wearable newspaper headline about organized observation, community protection, and the people-powered programs that made history.</p>
          </div>

          <figure className="product-photo">
            <img src="/panther-patrol-shirt.svg" alt="Panther Patrol T Shirt placeholder mockup" />
            <figcaption>Paperweight Panther Patrol T Shirt · replace this placeholder with the final product image.</figcaption>
          </figure>

          <aside className="order-panel" id="order">
            <p className="panel-label">Order Copy</p>
            <h3>Choose your edition</h3>

            <fieldset>
              <legend>Cut</legend>
              <div className="choice-grid two">
                {cuts.map((option) => (
                  <button key={option} type="button" className={cut === option ? 'choice active' : 'choice'} onClick={() => setCut(option)}>{option}</button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Size</legend>
              <div className="choice-grid four">
                {sizes.map((option) => (
                  <button key={option} type="button" className={size === option ? 'choice active' : 'choice'} onClick={() => setSize(option)}>
                    {option}<small>{inventory[cut][option]} released</small>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="selection-summary">
              <span>Selected edition</span>
              <strong>{cut} · {size}</strong>
              <small>{allocation} available at launch</small>
            </div>

            <div className="total-line"><span>Shirt</span><strong>$20.00</strong></div>
            <button className="checkout" onClick={beginCheckout}>Continue to Secure Checkout</button>
            {error && <p className="error" role="alert">{error}</p>}
            <p className="fineprint">Stripe Checkout will collect your address and let you choose free local delivery or $5 standard shipping. Each edition automatically closes when its allotted quantity sells.</p>
          </aside>
        </section>

        <section className="story-grid">
          <div className="story story-large">
            <h3>Patrol Was Only Part of the Story</h3>
            <p className="byline">A short historical note for this Paperweight release</p>
            <p>The Black Panther Party for Self Defense was founded in Oakland in 1966. Its members became known for confronting political power, challenging abusive policing, and organizing to protect Black citizens from brutality.</p>
            <p>But the movement was also built around practical community care. Its “survival programs” provided essentials such as food, clothing, transportation, health support, and education. The work connected self-determination to everyday needs.</p>
            <p>This shirt takes its name from the organized patrols that helped make the party visible, while the full piece honors the larger idea: community safety includes watching power, sharing resources, and serving people.</p>
          </div>

          <div className="story quote-story">
            <span className="black-box">COMMUNITY / ACTION</span>
            <blockquote>Protection meant more than observation. It also meant food, clothing, transportation, education, health, and organized care.</blockquote>
          </div>

          <div className="story inventory-story">
            <h3>Press Run: 30</h3>
            <p><strong>Classic — 15</strong><br />S: 2 · M: 3 · L: 5 · XL: 5</p>
            <p><strong>Cropped — 15</strong><br />S: 3 · M: 2 · L: 5 · XL: 5</p>
            <p>Each cut and size has its own limited Stripe checkout link. When that edition reaches its sales limit, Stripe automatically closes the link.</p>
            <a href="#order">Order from the front page →</a>
          </div>
        </section>

        <footer>
          <span>© Paperweight</span>
          <span>Panther Patrol T Shirt · Limited Release</span>
          <a href="https://nmaahc.si.edu/explore/stories/black-panther-party-challenging-police-and-promoting-social-change" target="_blank" rel="noreferrer">Historical source: NMAAHC</a>
        </footer>
      </article>
    </main>
  );
}
