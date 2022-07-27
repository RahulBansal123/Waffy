import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import LendContainer from '../containers/lend';

const Lend = (props) => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-2">
      <Head>
        <title>Waffy | Lend NFT </title>
        <meta
          name="description"
          content="Get loans against your NFTs on a fixed interest rate."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <LendContainer contract={props.contract} web3={props.web3} />
      <Footer />
    </div>
  );
};

export default Lend;
