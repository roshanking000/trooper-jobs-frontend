import { SERVER_API_URL } from "../config";
import { getErrorDetail } from "../apiUtils";
import axios from "axios";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

class CommonApi {
  async getTokenInfo(access_token) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_API_URL}/verify_token`,
          {
            token: access_token
          }
        )
        if (response.status === 200) {
          resolve({
            payload: response.data.payload
          })
        } else {
          reject(new Error("Verify token failed"));
        }
      } catch (err) {
        console.error('Common Api Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }

  async uploadFile(formdata) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_API_URL}/accounts/upload`,
          formdata,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        if (response.status === 200) {
          resolve(
            response.data.data
          )
        } else {
          reject(new Error("Upload file failed"));
        }
      } catch (err) {
        console.error('Common Api Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }
}

export const commonApi = new CommonApi()