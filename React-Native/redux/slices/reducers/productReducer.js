export default productReducer = (state, action) => {
    switch (action.type) {
      case 'deposit':
        return state + action.payload;
      case 'withdraw':
        return state - action.payload;
      case 'loadProducts' :
        return action.payload;
      default: {

        console.log('======================================================================' + action + '==============')
        return state;
      }
    }
  };