import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import DashboardContainer from '../containers/dashboard';

function Dashboard(props) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-2">
      <Head>
        <title>Waffy | Dashboard </title>
        <meta
          name="description"
          content="View and manage your created NFT-collateralized loans."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <DashboardContainer contract={props.contract} web3={props.web3} />
      <Footer />
    </div>
  );
}
export default Dashboard;
