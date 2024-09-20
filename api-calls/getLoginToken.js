import * as nodeFetch from "node-fetch";

export const getLoginToken = async (username, password) => {
  const respose = await nodeFetch("http://localhost:2221/api/login", {
    method: "POST",
    body: JSON.stringify({"username": username, "password": password}),
  });
  if (respose.status != 200){
    throw new Error("Failed to get login token");
  }
  const body = await respose.json();
  return body.token;
};
