const fetcher = async (url: string, token: string) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json', token }),
      credentials: 'same-origin',
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export default fetcher;
