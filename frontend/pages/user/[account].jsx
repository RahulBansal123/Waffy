import Head from 'next/head';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

import UserContainer from '../../containers/user';

function User(props) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-2">
      <Head>
        <title>Waffy | User </title>
        <meta
          name="description"
          content="Waffy is a NFT collateralized lending platform that allows you to lend your NFTs to people who need them."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <UserContainer contract={props.contract} />

      <Footer />
    </div>
  );
}
export default User;
