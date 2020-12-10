/**
 * @author lzh
 * @desc: 登录
 * @date:2020-12-09
 */

import {history} from 'umi';
import {message} from 'antd';
import modelExtend from 'dva-model-extend';
import model from '@/models/global'
import {parse} from 'qs';
import {fakeAccountLogin, getFakeCaptcha} from './service';

// qs.parse()将URL解析成对象的形式
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export default modelExtend(model, {
  namespace: 'userLogin',
  state: {
    status: undefined, // 登录状态
    img: undefined, // 验证图片
    uuid: undefined, // uuid
    rememberMe: false, // 记住当前登录状态
  },
  subscriptions: {
    setupHistory({dispatch, history}) {
      history.listen(location => {
        if (location.pathname.includes('/'))
          dispatch({
            type: 'fetchImgCaptcha',
          });
      });
    },
  },
  effects: {
    * fetchImgCaptcha({payload}, {call, put}) {
      const response = yield call(getFakeCaptcha);
      const {img, uuid} = response;
      yield put({
        type: 'updateState',
        payload: {
          img, uuid
        }
      })
    },

    * login({payload}, {call, put, select}) {
      const response = yield call(fakeAccountLogin, payload);
      const {token, user} = response;

      if(user){
        if (yield select(state => state.rememberMe)) {
          sessionStorage.setItem('token', token);
        }

        yield put({
          type: 'global/updateState',
          payload: {
            loginUser: user
          },
        });

        history.replace('/')
      }

      history.replace('/');
    },

    * redirectLogin({select}) {
      const global = yield select(_ => _.global);
      const {locationPathName, locationQuery} = global;
      let location = locationPathName;
      if (location.indexOf('/user/login') !== -1) {
        location = locationQuery.from || '/';
      }
      history.replace({
        pathname: '/user/login',
      });
    },

    * getCaptcha({payload}, {call}) {
      yield call(getFakeCaptcha, payload);
    },
  },
});
