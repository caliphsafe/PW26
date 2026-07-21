# Paperweight — Panther Patrol T Shirt

A complete one-page Next.js storefront styled like a vintage Black Panther newspaper front page.

## Stripe-only release setup

This version does not use Supabase or any other database. It uses eight Stripe Payment Links—one for every cut and size combination. Each link receives its own payment limit in Stripe and automatically deactivates when that edition sells through.

### Final 30-shirt allocation

| Cut | S | M | L | XL | Total |
|---|---:|---:|---:|---:|---:|
| Classic | 2 | 3 | 5 | 5 | 15 |
| Cropped | 3 | 2 | 5 | 5 | 15 |
| Total | 5 | 5 | 10 | 10 | 30 |

## 1. Create the products in Stripe

In Stripe Dashboard, switch on **Test mode** first.

Create eight one-time products priced at **$20 USD**:

1. Panther Patrol T Shirt — Classic — S
2. Panther Patrol T Shirt — Classic — M
3. Panther Patrol T Shirt — Classic — L
4. Panther Patrol T Shirt — Classic — XL
5. Panther Patrol T Shirt — Cropped — S
6. Panther Patrol T Shirt — Cropped — M
7. Panther Patrol T Shirt — Cropped — L
8. Panther Patrol T Shirt — Cropped — XL

Keep the cut and size in each product name so every Stripe order is immediately clear.

## 2. Create two shipping rates

In Stripe Dashboard, create:

- **Local delivery — New Bedford/Boston area:** $0
- **Standard US shipping:** $5

The local option should explain that the address must be in New Bedford, Boston, or an agreed surrounding area. Because Stripe cannot determine your custom local-delivery zone by itself, review local orders before delivery and contact the customer if their address is outside your service area.

## 3. Create eight Payment Links

Create one Payment Link for each product. For every link:

- Quantity must remain fixed at 1.
- Collect the customer’s name, email, phone number, billing address, and shipping address.
- Add both shipping choices: free local delivery and $5 standard shipping.
- Set the after-payment redirect to `https://YOUR-DOMAIN.com/success`.
- Turn on Stripe receipts if desired.
- Use **Limit the number of payments** and enter the exact allocation below.
- Set the deactivation message to: `This Panther Patrol edition has sold out. Return to Paperweight to check another size or cut.`

Payment limits:

- Classic S: 2
- Classic M: 3
- Classic L: 5
- Classic XL: 5
- Cropped S: 3
- Cropped M: 2
- Cropped L: 5
- Cropped XL: 5

Copy the `https://buy.stripe.com/...` URL from each Payment Link.

## 4. Add the Stripe links to Vercel

In Vercel, open **Project → Settings → Environment Variables** and add:

```text
NEXT_PUBLIC_STRIPE_LINK_CLASSIC_S
NEXT_PUBLIC_STRIPE_LINK_CLASSIC_M
NEXT_PUBLIC_STRIPE_LINK_CLASSIC_L
NEXT_PUBLIC_STRIPE_LINK_CLASSIC_XL
NEXT_PUBLIC_STRIPE_LINK_CROPPED_S
NEXT_PUBLIC_STRIPE_LINK_CROPPED_M
NEXT_PUBLIC_STRIPE_LINK_CROPPED_L
NEXT_PUBLIC_STRIPE_LINK_CROPPED_XL
```

Paste the matching Payment Link URL into each variable. Apply them to Production, Preview, and Development, then redeploy.

These are public checkout URLs, not secret API keys. This build does not require `STRIPE_SECRET_KEY`, a webhook secret, Supabase, or any server API route.

## 5. Upload to GitHub and deploy

1. Create a new empty GitHub repository.
2. Upload every file and folder from this project, preserving the structure.
3. Do not upload `node_modules` or `.next`.
4. In Vercel, select **Add New → Project** and import the repository.
5. Add the eight environment variables.
6. Deploy.

Vercel detects the Next.js project automatically.

## 6. Test before going live

While Stripe is in Test mode:

1. Open every cut and size combination from the website.
2. Confirm it opens the correct Stripe Payment Link.
3. Confirm the shirt is $20.
4. Confirm free local delivery and $5 shipping are both offered.
5. Complete at least one test order with Stripe’s standard test card.
6. Confirm the cut, size, customer address, phone number, and shipping selection appear in Stripe.
7. Confirm each link’s payment limit matches the allocation table.

When ready, recreate or copy the products and Payment Links in Stripe Live mode, replace the eight Vercel variables with the live Payment Link URLs, and redeploy.

## Inventory behavior to understand

Stripe enforces the final sales cap on each Payment Link and automatically deactivates that link when the limit is reached. The numbers shown on the newspaper page are the launch allocations; the website does not display a live countdown. A sold-out option is stopped at Stripe Checkout, where the buyer sees your deactivation message.

This removes the database and keeps the release simple, but a buyer can still select an edition on the front page just before it sells out and then discover at Stripe that the last one was already purchased.

## Replace the product image

Replace:

```text
public/panther-patrol-shirt.svg
```

You can keep the same filename, or update the image path in `app/page.js`. A vertical 4:5 product image works best.
