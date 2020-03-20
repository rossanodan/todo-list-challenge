const playHistory = () => {
  return dispatch => {
    dispatch({ type: 'TODO_CLEAR' });

    const history = JSON.parse(localStorage.getItem('history'));
    if (history.length > 0) {
      let i = 0;
      const interval = setInterval(() => {
        let action = history[i++];
        dispatch(action);
        if (i >= history.length) clearInterval(interval);
      }, 1000);
    }
  };
};

export { playHistory };