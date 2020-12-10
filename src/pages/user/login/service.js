/**
 * @author lzh
 * @desc:
 * @date:2020-12-09
 */

import request from '@/utils/umiRequest'

export async function fakeAccountLogin(params) {
  return request('/admin-Api/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(params) {
  return request('/admin-Api/auth/code', {
    method: 'GET',
    data: params,
  });
}
