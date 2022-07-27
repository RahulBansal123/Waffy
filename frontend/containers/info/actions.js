import { createClient } from 'urql';

const APIURL = 'https://api.thegraph.com/subgraphs/name/rahulbansal123/waffy';

export const fetchUserData = async () => {
  const tokensQuery = `
  query {
    accounts {
      id
      owner
      name
      date
    }
  }
`;

  const client = createClient({
    url: APIURL,
  });

  const data = await client.query(tokensQuery).toPromise();
  return data;
};

export const fetchBidsData = async () => {
  const tokensQuery = `
  query {
    bids {
      id
      totalBidsCreated
      bidsVolumeMATIC
      interestPaidMATIC
    }
  }
`;

  const client = createClient({
    url: APIURL,
  });

  const data = await client.query(tokensQuery).toPromise();
  return data;
};

export const fetchSeizedData = async () => {
  const tokensQuery = `
  query {
    seizeds {
      id
      index
      blockNumber
      seizer
      date
    }
  }
`;

  const client = createClient({
    url: APIURL,
  });

  const data = await client.query(tokensQuery).toPromise();
  return data;
};
