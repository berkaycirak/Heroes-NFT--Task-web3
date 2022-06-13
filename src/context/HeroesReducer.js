// If there is no action, you will not change state, so as a default you return state.
const heroesReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CONTRACT_DATA':
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case 'GET_USER_NFTs':
      return {
        ...state,
        tokensOwner: action.payload,
      };
    case 'GET_USER_BALANCE':
      return {
        ...state,
        balance: action.payload,
      };

    case 'GET_USER_ADDRESS':
      return {
        ...state,
        walletAddress: action.payload,
        isLogged: true,
      };
    case 'SHOW_USER_NFTs':
      return {
        ...state,
        filteredTokens: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default heroesReducer;
