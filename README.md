# Paperweight — Panther Patrol V3

Customer-ready one-page Stripe storefront for the Panther Patrol T Shirt.

## Required images in `public/`

- `PW.png`
- `pwman.png`
- `pw1.png`
- `shirt1.png`
- `shirt2.png`
- `panther-patrol-shirt.png`

The product gallery displays the images in this order:

1. `shirt1.png`
2. `shirt2.png`
3. `panther-patrol-shirt.png`

## Stripe environment variables

Keep the existing Vercel environment variables:

- `NEXT_PUBLIC_STRIPE_LINK_CLASSIC_S`
- `NEXT_PUBLIC_STRIPE_LINK_CLASSIC_M`
- `NEXT_PUBLIC_STRIPE_LINK_CLASSIC_L`
- `NEXT_PUBLIC_STRIPE_LINK_CLASSIC_XL`
- `NEXT_PUBLIC_STRIPE_LINK_CROPPED_S`
- `NEXT_PUBLIC_STRIPE_LINK_CROPPED_M`
- `NEXT_PUBLIC_STRIPE_LINK_CROPPED_L`
- `NEXT_PUBLIC_STRIPE_LINK_CROPPED_XL`

## GitHub / Vercel

Upload the full contents of this folder to the existing GitHub repository, replacing matching files. This project intentionally does not include `package-lock.json`. It uses the package manager declared in `package.json`.
