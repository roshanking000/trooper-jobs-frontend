import { SERVER_API_URL } from "../config";
import { getErrorDetail } from "../apiUtils";
import axios from "axios";
import jwt_decode from 'jwt-decode';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const STORAGE_KEY = "accessToken";

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log('error >>> ', error);
  if (error.response.status == 401 && error.response.data.status == 'fail' && error.response.data.message.name == 'TokenExpiredError') {
    window.location.href = '/auth';
  } else {
    return Promise.reject(error);
  }
});

axios.interceptors.request.use(function (config) {
  const accessToken = sessionStorage.getItem(STORAGE_KEY);
  if (accessToken != null) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

class AccountApi {
  async processWithGoogle(access_token) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_API_URL}/accounts/processWithGoogle`,
          {
            token: access_token
          }
        )
        if (response.status === 200) {
          resolve({
            processResult: response.data
          })
        } else {
          reject(new Error("Process with Google failed"));
        }
      } catch (err) {
        console.error('Account Api Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }

  async processWithWallet(wallet, injector) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_API_URL}/accounts/processWithWallet`,
          {
            wallet: wallet,
            injector: injector
          }
        )
        if (response.status === 200) {
          resolve({
            processResult: response.data
          })
        } else {
          reject(new Error("Process With Wallet failed"));
        }
      } catch (err) {
        console.error('Account Api Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }

  async checkEmail(email) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_API_URL}/accounts/checkEmail`,
          {
            email: email
          }
        )
        if (response.status === 200) {
          resolve({
            checkResult: response.data
          })
        } else {
          reject(new Error("Check email failed"));
        }
      } catch (err) {
        console.error('Account Api Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }

  async checkUsername(username) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_API_URL}/accounts/checkUsername`,
          {
            username: username
          }
        )
        if (response.status === 200) {
          resolve({
            checkResult: response.data
          })
        } else {
          reject(new Error("Check username failed"));
        }
      } catch (err) {
        console.error('Account Api Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }
  async createAccount(userData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_API_URL}/accounts`,
          userData
        )
        if (response.status === 201) {
          resolve(response.data)
        } else {
          reject(new Error("Create user failed"));
        }
      } catch (err) {
        console.error('Account Api Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }

  async loginWithEmail(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_API_URL}/accounts/loginWithEmail`,
          {
            email: email,
            password: password,
          }
        )
        if (response.status === 200) {
          resolve({
            loginResult: response.data
          })
        } else {
          reject(new Error("Check email failed"));
        }
      } catch (err) {
        console.error('Account Api Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }

  me(request) {
    const { accessToken } = request

    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        const decodedToken = jwt_decode(accessToken)
        console.log(' >>> decodeToken >>> ', decodedToken);

        const currrentTime = Date.now() / 1000;

        if (decodedToken.exp < currrentTime) {
          // Token has expired
          reject(new Error('Token expired'));
        } else {
          const { account_id, username, email, name, avatar_file, short_description, is_official } = decodedToken;
          resolve({
            account_id: account_id,
            username: username,
            email: email,
            name: name,
            avatar: avatar_file,
            description: short_description,
            is_official: is_official
          });
        }
      } catch (err) {
        console.error('[Account Api]: ', err)
        reject(new Error('Internal server error'))
      }
    })
  }

  async getAccountProfile() {
    return new Promise(async (resolve, reject) => {
      try {

        const accessToken = sessionStorage.getItem(STORAGE_KEY);
        if (accessToken == null) {
          return reject(new Error("Invalid access token"));
        }

        const response = await axios.get(
          `${SERVER_API_URL}/account`,
        )
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error("Check email failed"));
        }
      } catch (err) {
        console.error('Account Api Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }

  async updateAccountProfile(profile) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(
          `${SERVER_API_URL}/account`,
          profile,
        )
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error("Update account profile failed"));
        }
      } catch (err) {
        console.error('Account Api Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }

  async getAllAccounts(profile_type) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `${SERVER_API_URL}/accounts/${profile_type}`,
        )
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error("Get account list failed"));
        }
      } catch (err) {
        console.error('Account Api Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }

  async getAccountWithUsername(username) {
    return new Promise(async (resolve, reject) => {
      try {

        const response = await axios.get(
          `${SERVER_API_URL}/account/${username}`,
        )
        if (response.status === 200) {
          if (response.data.status == 'success')
            resolve(response.data);
          else
            reject(new Error("Get account with username failed"));
        } else {
          reject(new Error("Get account with username failed"));
        }
      } catch (err) {
        console.error('Account Api Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }

  async resetPassword(email) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_API_URL}/account/reset-password`,
          {
            email: email
          }
        )
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error("Reset password failed"));
        }
      } catch (err) {
        console.error('Account Api Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }

  async updatePassword(token, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(
          `${SERVER_API_URL}/account/update-password`,
          {
            reset_token: token,
            password: password
          }
        )
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error("Update password failed"));
        }
      } catch (err) {
        console.error('Account Api Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }

}

export const accountApi = new AccountApi()