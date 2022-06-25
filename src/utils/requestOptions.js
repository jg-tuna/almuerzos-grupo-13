const requestOptions = (method, currentUser) => {
  return {
    method: method,
    headers: {
      Authorization: `Bearer ${currentUser?.token}`,
    },
  };
};

export default requestOptions;
