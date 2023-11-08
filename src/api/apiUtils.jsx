
export const getErrorDetail = (err) => {
  if (err.response != undefined && err.response.data != undefined) {
    return new Error(err.response.data.message == undefined ? err.response.data : err.response.data.message);
  } else {
    return new Error(err.message == undefined ? err : err.message);
  }
}