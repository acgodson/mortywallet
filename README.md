# Morty Wallet

## An attempt to create a utlity algorand wallet for the common internet user

One of the challenges hindering largescale adoption of blockchain is security, storage and transfer of seed-phrases/private keys.

Morty Wallet is a flexible wallet that permits users to receive/send money or assets across the world, and pay for utility bills (via an integrated social marketplace)

Leveraging [Firebase JWT]() & custom [web3auth](), morty abolishes the struggle of writing down private keys and seed phrases. Hence users can easily create recoverable web & mobile wallets, with a touch of web2 user experience (email/password & social logins)

### [Youtube Video](https://youtu.be/rZywcRB9Q6k)

### [Website Demo](https://mortywallet.vercel.app)

## Features

- **Web2-like Onboarding** - Sign up and manage a blockchain wallet using your familiar email and password

- **Sign & Send Transactions** - Sign and Send transactions on the algorand blockchain (testnet)

- **Data Visualization** - **Trading Charts** from ALGO closing prices within last 5 days, and also **Pie Chart** illustrating personal expenditure and income over time

- **Social Marketplace** - Pay for services or assets listed on the Twitter or Facebook feeds of your interest using your algowallet

- **Social Marketplace for businesses and Social Media Infuencers** - Create a verifiable wallet/store by signing in with your Twitter or Facebook account, and let your users pay for assets or services posted on your timeline from [mortystore]()

## Tools and Frameworks

Morty-frontend-web is currently built on [Nextjs]() and styled with [Chakra UI]()

### Major Integrations

- [AlgoSdk]() - Javascript SDK for connecting clientside to algorand blockchain
- [Web3Auth]() - Web3 Authentication and Key storage
- [Algo Indexer]() - Transaction Queries
- [Firebase Auth]() - Custom JWT
- [Firestore db]() - Optional, centralized db
- [Facebook Login]() - Social Media Profile and Page Permission
- [Twitter Login]() - Social Media Profile and Page Permission
- [Apex Charts]() - Blockchain Data visualization

## Testing

- Run `npm install` and `npm run dev` and you're ready to go!

- Additionally, you may need to run `npm run dev-ssl` to create https proxy for accesing facebook API

## Design Architecture

![Logo](/screenshots/logo_inspiration.PNG)

## ScreensShots

- Welome to MortyWallet
  ![Morty Wallet](/screenshots/welcome.png)

- HomePage
  ![home](/screenshots/home.png)

- Secure Wallet
  ![send](/screenshots/nomoney.png)

- Send Transcations
  ![recieve](/screenshots/send.png)

- Access Morty Store
  ![marketplace](/screenshots/shop.png)

- Transactions
  ![transactions](/screenshots/transactions.png)

## Challenges we faced

- low CPU power and struggled with WSL, as we initially tried to create stateful smart contract with Reach for rewarding users with morty tokens over each bill completed on the morty store as an additional feature

- Twitter API access has not been granted. So we were only able to implement custom facebook login for merchants

## What Next for Morty Wallet

- **Morty Store**
  Sellers who have to create verifable merchant wallet, can programmatically share links of assets listed for sale on algo blockchain via morty

- **Morty Token**
  Sellers can create promos and reward customers with redeemable tokens as they make transactions

- **Morty App**
  Implementing web3auth share brings the possiblity of logging into the same wallet on multiple platforms. During this hack, we already started an Android implementation using flutter Check out [morty-wallet-android](https://github.com/acgodson/morty-waller-android)

## Contributors

- Product & Design: [Stacy]()
- Dev : [Tinybird](https://github.com/acgodson)
