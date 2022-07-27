import * as ActionTypes from './constants';
import { toast } from 'react-toastify';
import axios from 'axios';
import { createClient } from 'urql';

const APIURL = 'https://api.thegraph.com/subgraphs/name/rahulbansal123/waffy';

export const fetchNFTs = (account) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_NFTS_REQUEST });
    try {
      const response = await axios.get(
        `https://testnets-api.opensea.io/api/v1/assets?owner=${account}&order_direction=desc&offset=0&limit=20&include_orders=false`
      );

      if (response.data) {
        dispatch({
          type: ActionTypes.FETCH_NFTS_SUCCESS,
        });
        return response.data?.assets;
      }
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: ActionTypes.FETCH_NFTS_FAILURE,
        message: 'Please try again',
      });
    }
  };
};

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

export const fetchSeizeData = async (account) => {
  const tokensQuery = `
  query {
    seizeds {
      index
      seizer
      id
      date
    }
  }
`;

  const client = createClient({
    url: APIURL,
  });

  const data = await client.query(tokensQuery).toPromise();
  let total = 0;

  if (Array.isArray(data.data.accounts)) {
    data.data.accounts.forEach((account) => {
      if (account.owner === account) {
        total += 1;
      }
    });
  }
  return total;
};
