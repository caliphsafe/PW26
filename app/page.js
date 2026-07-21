'use client';

import { useState } from 'react';

const sizes = ['S', 'M', 'L', 'XL'];
const cuts = ['Classic', 'Cropped'];

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

const productImages = [
  { src: '/shirt1.png', alt: 'Panther Patrol T Shirt front view' },
  { src: '/shirt2.png', alt: 'Panther Patrol T Shirt detail view' },
  { src: '/panther-patrol-shirt.png', alt: 'Paperweight Panther Patrol T Shirt' },
];

export default function HomePage() {
  const [size, setSize] = useState('L');
  const [cut, setCut] = useState('Classic');
  const [activeImage, setActiveImage] = useState(0);
  const [error, setError] = useState('');

  function beginCheckout() {
    setError('');
    const link = paymentLinks[cut][size];

    if (!link || !link.startsWith('https://')) {
      setError('This edition is temporarily unavailable. Please choose another option.');
      return;
    }

    window.location.href = link;
  }

  return (
    <main className="site-wrap">
      <article className="newspaper-shell">
        <header className="masthead">
          <div className="issue-art">
            <img src="/pwman.png" alt="Paperweight issue artwork" />
          </div>

          <div className="masthead-center">
            <p className="edition-line">Paperweight Community Goods · New Bedford, Massachusetts</p>
            <img className="masthead-logo" src="/PW.png" alt="Paperweight" />
            <p className="edition-line bottom">Independent clothing printed with purpose</p>
          </div>

          <div className="price-stamp" aria-label="Price twenty dollars plus shipping">
            <strong>$20</strong>
            <span>plus shipping</span>
          </div>
        </header>

        <div className="date-rule">
          <span>THE PANTHER PATROL EDITION</span>
          <span>ONE ITEM RELEASE</span>
        </div>

        <section className="hero-grid">
          <div className="headline-column">
            <p className="section-slug">New Release</p>
            <h1><span>Panther</span><span>Patrol</span><span>T Shirt</span></h1>
            <p className="lead-copy">A wearable front-page statement honoring organized observation, community defense, and the broader tradition of serving people through direct action.</p>
          </div>

          <div className="gallery-column" aria-label="Panther Patrol product gallery">
            <div className="gallery-frame">
              {productImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className={`product-slide ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage((index + 1) % productImages.length)}
                  aria-label={`${image.alt}. View next product image.`}
                >
                  <img src={image.src} alt={image.alt} />
                </button>
              ))}

              <div className="gallery-counter">{String(activeImage + 1).padStart(2, '0')} / 03</div>
            </div>

            <div className="gallery-nav" aria-label="Choose product image">
              {productImages.map((image, index) => (
                <button
                  key={`nav-${image.src}`}
                  type="button"
                  className={activeImage === index ? 'active' : ''}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View product image ${index + 1}`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>

          <aside className="order-panel" id="order">
            <p className="section-slug dark">Order Form</p>
            <h2>Choose Your Shirt</h2>

            <fieldset>
              <legend>Cut</legend>
              <div className="choice-grid two">
                {cuts.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={cut === option ? 'choice active' : 'choice'}
                    onClick={() => setCut(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Size</legend>
              <div className="choice-grid four">
                {sizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={size === option ? 'choice active' : 'choice'}
                    onClick={() => setSize(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="selection-summary">
              <span>Selected</span>
              <strong>{cut} · {size}</strong>
            </div>

            <div className="total-line"><span>Panther Patrol T Shirt</span><strong>$20.00</strong></div>
            <button className="checkout" onClick={beginCheckout}>Order The Shirt</button>
            {error && <p className="error" role="alert">{error}</p>}
            <p className="delivery-copy">Free local delivery is available in New Bedford, Boston, and surrounding areas. Standard shipping is $5.</p>
          </aside>
        </section>

        <section className="story-grid">
          <div className="story story-main">
            <h2>Patrol Was Only Part of the Story</h2>
            <p className="byline">The history behind the Panther Patrol release</p>
            <div className="article-columns">
              <p>The Black Panther Party for Self Defense was founded in Oakland in 1966. Its members became known for confronting political power, challenging abusive policing, and organizing to protect Black citizens from brutality.</p>
              <p>The party also built practical community programs around everyday needs. These “survival programs” provided food, clothing, transportation, health support, and education while connecting self-determination to direct service.</p>
              <p>The Panther Patrol T Shirt takes its name from the organized patrols that made the party visible, while recognizing the larger idea behind the movement: community safety also means sharing resources, caring for people, and building power together.</p>
            </div>
          </div>

          <div className="story story-quote">
            <p className="section-slug">Community / Action</p>
            <blockquote>Protection was not only about watching power. It was also about feeding, educating, transporting, and caring for the community.</blockquote>
          </div>

          <figure className="story-art">
            <img src="/pw1.png" alt="Paperweight Panther Patrol artwork" />
          </figure>
        </section>

        <footer>
          <span>© Paperweight</span>
          <span>Panther Patrol T Shirt</span>
          <a href="https://nmaahc.si.edu/explore/stories/black-panther-party-challenging-police-and-promoting-social-change" target="_blank" rel="noreferrer">Historical source: NMAAHC</a>
        </footer>
      </article>
    </main>
  );
}
