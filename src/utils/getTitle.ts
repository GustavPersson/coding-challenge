const getAddressTitle = (path: string) => {
  return path.split("/").pop()?.split("?")[0] || "Home";
};

export default getAddressTitle;
