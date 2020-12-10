/**
 * @author lzh
 * @desc:
 * @date:2020-12-09
 */

import {message} from 'antd';
import axios from 'axios';
import {MainStore} from '../configs/MainStore'

export function getHeader() {
  let auth;
  try {
    auth = JSON.parse(sessionStorage.getItem('Authorization'));
  } catch (e) {
    console.log(e);
  }
  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': auth ? (auth.accessToken ? auth.accessToken : '') : ''
  }
}


export default function request() {
  return axios({
    method: method || 'POST',
    url: objctUrl,
    data: objecData,
    headers: getHeader()
  })
}
