const headers = {
  "Content-Type": "application/json",
};

export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const websocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

export const getItems = async () => {
  const data = await fetch(`${serverUrl}/items`, {
    method: "GET",
    headers: headers,
  });
  const response = await data.json();
  return response;
};

export const getUserById = async (id: string) => {
  const data = await fetch(`${serverUrl}/users/${id}`, {
    method: "GET",
    headers: headers,
  });
  const response = await data.json();
  return response;
};

export const signIn = async (email: string, password: string) => {
  const data = await fetch(`${serverUrl}/auth/sign-in`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  });
  const response = await data.json();
  return response;
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const data = await fetch(`${serverUrl}/auth/register`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, email, password }),
  });
  const response = await data.json();
  return response;
};

export const deposit = async (id: string, balanceAmount: number) => {
  const data = await fetch(`${serverUrl}/users/deposit`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({ id, balanceAmount }),
  });
  const response = await data.json();
  return response;
};

export const createItem = async (
  itemName: string,
  price: number,
  durationInMinutes: number
) => {
  const data = await fetch(`${serverUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      itemName,
      price,
      durationInMinutes,
      belongsTo: "",
      expired: false,
    }),
  });
  const response = await data.json();
  return response;
};

export const bidItem = async (
  price: number,
  itemId: string,
  bidderName: string,
  userId: string
) => {
  const data = await fetch(`${serverUrl}/bids/${userId}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ price, itemId, bidderName }),
  });
  const response = await data.json();
  return response;
};

export const getListOfBidsItemId = async (itemId: string) => {
  const data = await fetch(`${serverUrl}/bids/items/${itemId}`, {
    method: "GET",
    headers: headers,
  });
  const response = await data.json();
  return response;
};

export const expireItem = async (itemId: string) => {
  const data = await fetch(`${serverUrl}/items/expire/${itemId}`, {
    method: "PUT",
    headers: headers,
  });
  const response = await data.json();
  return response;
};

export const nominateBidWinner = async (itemId: string) => {
  const data = await fetch(`${serverUrl}/bids/nominate/${itemId}`, {
    method: "PUT",
    headers: headers,
  });
  const response = await data.json();
  return response;
};
