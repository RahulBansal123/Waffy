import * as ActionTypes from './constants';
import { toast } from 'react-toastify';
import axios from 'axios';

export const fetchNFT = (address, id) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_NFT_REQUEST });
    try {
      const response = await axios.get(
        `https://api.covalenthq.com/v1/80001/tokens/${address}/nft_metadata/${id}/?quote-currency=USD&format=JSON&key=ckey_0f61c33f81884e5cb35ed669e17`
      );

      if (response.data) {
        dispatch({
          type: ActionTypes.FETCH_NFT_SUCCESS,
        });
        return response.data.data.items[0];
      }
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: ActionTypes.FETCH_NFT_FAILURE,
        message: 'Please try again',
      });
    }
  };
};

export const fetchPoaps = (address) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_POAP_REQUEST });
    try {
      const response = await axios.get(
        `https://api.poap.tech/actions/scan/${address}`,
        {
          headers: {
            Accept: 'application/json',
            'X-API-Key': process.env.NEXT_PUBLIC_POAP_API_KEY,
          },
        }
      );

      if (response.data) {
        dispatch({
          type: ActionTypes.FETCH_POAP_SUCCESS,
        });
        return response.data;
      }
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: ActionTypes.FETCH_POAP_FAILURE,
        message: 'Please try again',
      });
    }
  };
};
