import Head from 'next/head';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InfoContainer from '../containers/info';

function Analytics(props) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-2">
      <Head>
        <title>Waffy | Analytics </title>
        <meta name="description" content="Analytics of Waffy Protocol" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header contract={props.contract} web3={props.web3} />
      <InfoContainer contract={props.contract} />
      <Footer />
    </div>
  );
}
export default Analytics;
