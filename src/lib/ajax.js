import storage from './storage';
import { env } from '../config';
import axios from 'axios';
import Vue from 'vue';
import router from '../router';

export function ajax({
  apiPath,
  method = 'get',
  data = null,
  isFormData = false,
  isDownloadFile = false,
}) {
  // api地址
  let url = `${env.api}/${env.apiVersion}/${apiPath}`;

  let headers = {
    Joke: 'seastart!',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: storage.get('token') || '',
  };

  // form data ajax
  if (isFormData) {
    headers['Content-Type'] = 'multipart/form-data';
    let tempFrom = new FormData();
    Object.keys(data).forEach(key => {
      tempFrom.append(key, data[key]);
    });
    data = tempFrom;
  }

  return new Promise((resolve, reject) => {
    axios({
      headers,
      method,
      url,
      [method === 'get' ? 'params' : 'data']: data,
      responseType: isDownloadFile ? 'blob' : 'json',
    })
      .then(response => response.data)
      .then(data => {
        if (data.api_code !== 200) {
          Vue.prototype.$toast(data.api_msg, 2500, {
            color: '#ffffff',
            backgroundColor: 'rgba(244, 104, 104, .8)',
          });
        }
        if (data.api_code === 200) {
          resolve(data);
        } else if (data.api_code === 599 || data.api_code === 598) {
          // 重新登录处理
          storage.remove('token');
          router.push('/login');
        } else {
          reject(data);
          console.error(data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
}

export function ajaxGet(apiPath, data, isFormData = false, isDownloadFile = false) {
  return ajax({
    apiPath,
    method: 'get',
    data,
    isFormData,
    isDownloadFile,
  });
}

export function ajaxPost(apiPath, data, isFormData = false, isDownloadFile = false) {
  return ajax({
    apiPath,
    method: 'post',
    data,
    isFormData,
    isDownloadFile,
  });
}
