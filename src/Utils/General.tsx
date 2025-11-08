export const GetImageUrl = (image: string) => {
  // const baseUrl = "http://localhost:8080/api/v1/files";
  const baseUrl = "https://api.filipsiri.se/api/v1/files"
  return image ? `${baseUrl}/${image}` : `https://api.filipsiri.se/api/v1/files/default.png`;
};