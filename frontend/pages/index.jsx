import Head from 'next/head';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import LandingContainer from '../containers/landing';

function Landing(props) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-2">
      <Head>
        <title>Waffy | NFT Lending </title>
        <meta
          name="description"
          content="Waffy is a NFT collateralized lending platform that allows you to lend your NFTs to people who need them."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header contract={props.contract} web3={props.web3} />
      <LandingContainer contract={props.contract} />
      <Footer />
    </div>
  );
}
export default Landing;
