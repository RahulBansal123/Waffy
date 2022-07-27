import * as ActionTypes from './constants';
import { toast } from 'react-toastify';
import axios from 'axios';

export const fetchNFTs = (account) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_NFTS_REQUEST });
    try {
      const response = await axios.get(
        `https://api.covalenthq.com/v1/80001/address/${account}/balances_v2/?nft=true&key=ckey_0f61c33f81884e5cb35ed669e17`
      );
      if (response.data) {
        dispatch({
          type: ActionTypes.FETCH_NFTS_SUCCESS,
        });
        return response.data?.data?.items;
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
