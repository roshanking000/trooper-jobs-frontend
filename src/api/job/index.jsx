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

class JobApi {
  async createJob(job_data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${SERVER_API_URL}/jobs`,
          job_data
        )
        if (response.status == 201) {
          resolve(response.data);
        } else {
          reject(new Error("Create job failed"));
        }
      } catch (err) {
        console.log('Job API Error >>> ', err);
        reject(getErrorDetail(err));
      }
    })
  }
  async updateJobPaymentStatus(job_id, payment_status, transaction) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(
          `${SERVER_API_URL}/jobs/${job_id}`,
          {
            payment_status: payment_status,
            transaction : transaction
          }
        );
        if (response.status == 200) {
          resolve(response.data);
        } else {
          reject(new Error("Update job failed"));
        }
      } catch (err) {
        console.log('Job API Error >>> ', err);
        reject(getErrorDetail(err));
      }
    })
  }

  async getAllJobs() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `${SERVER_API_URL}/jobs`
        );
        if (response.status == 200) {
          resolve(response.data);
        } else {
          reject(new Error('Get all job failed'));
        }
      } catch (err) {
        console.log('Job API Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }

  async deleteJob(job_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete(
          `${SERVER_API_URL}/jobs/${job_id}`
        );
        if (response.status == 200) {
          resolve(response.data);
        } else {
          reject(new Error('Delete job failed'));
        }
      } catch (err) {
        console.log('Job API Error >>>', err);
        reject(getErrorDetail(err));
      }
    })
  }
}

export const jobApi = new JobApi()