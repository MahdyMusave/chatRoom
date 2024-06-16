const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDIER_CLOUD_NAME}/auto/upload`;

console.log(url);
const uploadFile = async (file) => {
  const fromData = new FormData();
  fromData.append("file", file);
  fromData.append("upload_preset", "chat-app-file");

  const response = await fetch(url, {
    method: "post",
    body: fromData,
  });
  const responseData = await response.json();
  // console.log(responseData, "responseData");
  return responseData;
};

export default uploadFile;
