const request = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.error) return [false, data.message];

    return [true, data];
  } catch (error) {
    console.error(error);
    return [false, error];
  }
};

export { request };
