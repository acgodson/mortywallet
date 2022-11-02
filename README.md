# Morty Wallet

## An attempt to create a utlity algorand wallet for the common internet user

One of the challenges hindering largescale adoption of blockchain is security, storage and transfer of seed-phrases/private keys [read]()

Morty Wallet is a flexible wallet that permits users to receive/send money or assets across the world, and pay for utility bills (via an integrated social marketplace)

Leveraging [Firebase JWT]() & custom [web3auth](), morty abolishes the struggle of writing down private keys and seed phrases. Hence users can easily create recoverable web & mobile wallets, with a touch of web2 user experience (email/password & social logins)

### [Youtube Video]()

### [Website Demo]()

## Features

- **Web2-like Onboarding** - Sign up and manage your wallet using your familiar email and password

- **Data Visualization** - See **Trading Charts** from ALGO closing prices within last 5 days, and also **Pie Charts** illustrating personal expenditure and income over time 

- **Decentralized Storage** - Pin asset metadata securly on IPFS on serverside and control signatures allowed to modify data

- **Social Marketplace** - Pay for services listed on the timeline Twitter or Facebook pages/profiles of your interest using your algowallet

- **Social Marketplace for businesses and Social Media Infuencers** - Create a verifiable wallet/store by signing in with your Twitter of Facebook pages, and let your users pay for assets or services posted on your timeline from [mortystore]()

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

