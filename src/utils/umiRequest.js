/**
 * @author lzh
 * @desc: 1、request 网络请求工具
 *        2、更详细的 api 文档: https://github.com/umijs/umi-request
 * @date:2020-12-09
 */

import {extend} from 'umi-request';
import {notification} from 'antd';
import router from 'umi/router';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const {response = {}} = error;
  let errortext = codeMessage[response.status] || response.statusText;
  const {status} = response;
  // console.log(`response${JSON.stringify(response)}`)
  if (status === 400 && !window.sessionStorage.getItem('token')) {
    errortext = '账户名或密码错误'
  }
  if (status === 401) {
    notification.error({
      message: `登录已过期，请重新登录`,
      duration: 2,
    });
    window.sessionStorage.clear();
    // router.replace({
    //   pathname: 'user/login'
    // });
    return
  }
  notification.error({
    message: `请求错误 ${status}`,
    description: errortext,
  });
  return error
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    token: sessionStorage.getItem("token")
  },
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  return (
    {
      url: url,
      options: {
        ...options
      },
    }
  );
});

// response拦截器, 处理response
request.interceptors.response.use(async (response) => {
  return response
});

export default request;
