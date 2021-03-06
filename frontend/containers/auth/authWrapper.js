import React from 'react';

import Web3Container from '../../lib/Web3Container';

function Web3Wrapper({ children }) {
  return (
    <Web3Container
      render={({ web3, account, contract }) => (
        <>
          {React.cloneElement(children, {
            web3,
            account,
            contract,
          })}
        </>
      )}
    />
  );
}

export default Web3Wrapper;
