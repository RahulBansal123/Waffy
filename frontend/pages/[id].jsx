import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import LoanContainer from '../containers/loan';

function Loan(props) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-2">
      <Head>
        <title>Waffy | Loans </title>
        <meta
          name="description"
          content="Waffy is a NFT collateralized lending platform that allows you to lend your NFTs to people who need them."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <LoanContainer contract={props.contract} />
      <Footer />
    </div>
  );
}
export default Loan;
