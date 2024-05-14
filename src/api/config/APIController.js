// import axios from 'axios';
// import instance from './config/Interceptor';
import qs from 'qs';
import instance from './Interceptor';
export function post(endPoint, params, isStringfy = true) {
  return instance.post(
    endPoint,
    isStringfy ? JSON.stringify(params) : qs.stringify(params),
  );
}

export function get(endPoint) {
  // console.log("endPoint", endPoint);
  return instance.get(endPoint);
}

export function deleteCall(endPoint) {
  return instance.delete(endPoint);
}

export function putCall(endPoint, params) {
  return instance.put(endPoint, params);
}
