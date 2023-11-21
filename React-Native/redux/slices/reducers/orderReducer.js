export default orderReducer = (state, action) => {
    switch (action.type) {
      case 'loadOrders' :
        return action.payload;
      default: {
        console.log('==============' + action + '==============')
        return state;
      }
    }
  };