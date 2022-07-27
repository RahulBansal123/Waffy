<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/RahulBansal123/PreMarket/blob/main/public/assets/images/logo.png">
    <img src="https://user-images.githubusercontent.com/64414414/176496553-4a87def8-f11e-4ba0-85bb-86765762832a.png" alt="Logo" width="350" height="100">
  </a>

  <h3 align="center">Waffy</h3>

  <p align="center">
Waffy is a decentralized non-custodial NFT lending protocol where users can participate as lenders or bidders.
    <br />
    <br />
    <a href="https://waffy.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/RahulBansal123/waffy/issues">Report Bug</a>
    ·
    <a href="https://github.com/RahulBansal123/waffy/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

#### Make sure you are on Polygon testnet for the DApp to work correctly.

The Waffy Protocol is a decentralized non-custodial NFT lending protocol where users can participate as lenders or bidders. Lenders can lend out their ERC721 NFTs at a fixed interest rate, while bidders can outbid the highest bidders. The protocol is designed to be a low-risk, low-fee, and secured protocol.

Anyone can lend out their ERC721 NFTs at a fixed interest rate for a specified time. During the loan period, anyone can bid on the NFTs, and the lender can draw any amount from the highest bid. To outbid the highest bidder, the user must repay the last amount drawn from the bid along with interest to the previous highest bidder.

Waffy uses the fast and low-cost network of polygons to connect with its smart contracts to store all the data and data from the lenders' markets in a decentralized manner.

Waffy additionally leverages the Covalent APIs to retrieve ERC721 NFTs from users as well as NFT metadata.

To build up its analytics platform, track the number of users signed up and the number of NFTs seized, Waffy uses The Graph protocol to build subgraph and query them.

Waffy also leverages Valist to safely publish this waffy software on a decentralised platform in addition to HyperDApp, which it uses to create the verifiable frontends and enable anyone to incorporate Waffy in their DApp.

In order to evaluate the lender's reliability on-chain, Waffy also employs POAP to lay out the POAP of the lender.

All smart contracts are analyzed by Solhint which provides linting solutions for detecting code vulnerabilities of the Solidity smart contracts.

The Waffy website is currently hosted on Vercel.

Contracts are deployed at: [0x3214Efe095BD5457B546C655D6BaBDA4E75aB0Ce](https://mumbai.polygonscan.com/address/0x3214Efe095BD5457B546C655D6BaBDA4E75aB0Ce)<br/>

Spheron: https://waffy-ay392b.spheron.app/

Subgraphs: https://thegraph.com/hosted-service/subgraph/rahulbansal123/waffy

Valist: https://gateway.valist.io/ipfs/QmYDgPtvziyis5a3HbsG223163MxXAnqo6xzbZ1NMqeT9j

Link to video: https://www.dropbox.com/s/u7r1hl33fxbei74/waffyDemo.mov?dl=0

Slide Deck: https://www.canva.com/design/DAFFBdl5LuY/5IEGOm-bSHs5DLR4CoEhnA/view?utm_content=DAFFBdl5LuY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

<p align="right">(<a href="#top">back to top</a>)</p>

### Features:

This section lists all the unique features/oppurtunities provided by waffy:

- Lend out ERC721 NFTs
- NFT Seizing bots
- NFT repayment by anyone
- Dashboard for every lender

### Built With

This section lists all the major frameworks/libraries used to bootstrap your project:

- Next.js
- Web3.js
- Polygon
- The Graph
- Valist
- HyperDApp
- POAP
- Spheron
- Solidity
- Solhint
- UAuth
- Covalent API
- Truffle

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm, truffle

### Installation

1. Clone the repo
   ```sh
   git clone [https://github.com/RahulBansal123/waffy.git](https://github.com/RahulBansal123/waffy)
   ```
2. Install NPM packages
   ```sh
   cd frontend && npm install
   ```
3. Enter your private key in `.secret` to deploy contracts on polygon testnet
4. Copy .env.example in frontend/ to .env with appropriate values
5. Start the development server
   ```sh
    npm run dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Deploying on Polygon
- [x] Integrating Graph Protocol
- [x] Listing User's POAPs
- [x] Integrated HyperDApp and Valist
- [ ] Rewarding seize NFT bots
- [ ] Multi-language Support
  - [ ] French
  - [ ] Spanish

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Name: Rahul
Mail: rbbansal558@gmail.com
Discord: RahulBan#4539
Twitter: https://twitter.com/rahulbansal_eth
Unstoppable Domain: rahulbansal.crypto

Project Link: [https://github.com/RahulBansal123/waffy](<[https://github.com/RahulBansal123/waffy](https://github.com/RahulBansal123/waffy)>)

<p align="right">(<a href="#top">back to top</a>)</p>
