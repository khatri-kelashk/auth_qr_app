// constants/token.ts
export const getHeadersForHttpReq = () => {
  return {
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
};

export const getEmptyHeadersForHttpReq = () => {
  return {
    headers: {
      "Authorization": "",
      "Content-Type": "application/json",
    },
  };
};
