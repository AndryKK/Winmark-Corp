const BASE_URL = 'http://jsonplaceholder.typicode.com/photos';

export const getData = async (endpoint: string = '') => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);

    return await response.json();
  } catch (error) {
    throw new Error();
  }
};

export const removeData = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`,
      {
        method: 'DELETE',
      });
      console.log(response);
    return await response.json();
  } catch (error) {
    throw new Error();
  }
};