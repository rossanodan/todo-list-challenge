// The classic AJAX call - dispatch before the request, and after it comes back
const actionCreator = () => {
  return dispatch => {
    dispatch({ type : "ACTION_CREATOR" });   
  };
};

export { actionCreator };