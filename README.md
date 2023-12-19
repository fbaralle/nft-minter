# NFT Minting App

## How to run

Create environment variables.

```
# .env

PINATA_API_KEY=
NEXT_PUBLIC_PINATA_GATEWAY=
PINATA_GATEWAY_TOKEN=
NEXT_PUBLIC_WALLET_CONNECT_PROJ_ID=
INFURA_API_KEY=
```

Install packages:

```bash
npm install
# or
yarn
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Optionally, `NETWORK` can be overrided at command line level

```bash
# example

NETWORK=sepolia yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
