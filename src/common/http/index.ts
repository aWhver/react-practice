import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import queryString from "query-string";

const defaultOptions = {
  timeout: 10000,
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : '',
}
interface AjaxReturnType<T> extends AxiosResponse {
  data: {
    data: T;
    code: number;
    message: string;
  }
}

function ajaxObserver<T>(config: AxiosRequestConfig) {
  return new Observable<AjaxReturnType<T>>(subscribe => {
    const instance = axios.create({
      ...defaultOptions,

    });
    const task = instance.request<AxiosRequestConfig, AjaxReturnType<T>>(config);
    task.then((res) => {
      subscribe.next(res);
      subscribe.complete();
    }).catch(err => {
      console.log('err', err);
    });
  })
}

function createAjax<T>(url: string, ajaxConfig: AxiosRequestConfig) {
  const token = localStorage.getItem('token');
  const ajaxSetting = Object.assign({}, ajaxConfig, {
    url,
    headers: Object.assign({}, {
      'Content-type': 'application/json',
      Authorization: token || 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMjc1NGNjNC0wNzJiLTQ2OWYtYThhOC00YmZiMWIyZjk0ZDciLCJ1c2VybmFtZSI6Iui1teS_iua9vCIsImlhdCI6MTcyMDUxMTc4MiwiZXhwIjoxNzIwNTQ3NzgyfQ.mKMaB8eTXJfZfg4wWuVYYvNqxupMj7fS6mRXChvMhyg',
    }, ajaxConfig.headers),
  })
  return ajaxObserver<T>(ajaxSetting).pipe(
    catchError(err => {
      return of({
        data: err.errMsg || { code: null, message: '网络错误' },
        code: err.errCode,
        status: err.status,
      })
    }),
    map(res => {
      const { code, message } = res.data;
      // console.log('code, message', code, message);
      return {
        data: res.data.data,
        code,
        message,
        status: res.status
      }
    })
  );
};

export const GET = function<T>(url: string, params = {}, headers = {}) {
  const search = queryString.stringify(params);
  const char = url.indexOf('?') > -1 ? '&' : search ? '?' : '';
  // return ;
  return createAjax<T>(url + char + search, { method: 'GET', ...headers })
}
