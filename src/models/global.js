/**
 * @author lzh
 * @desc: 全局model
 * @date:2020-12-09
 */

export default {
  namespace: 'global',
  state: {
    loginUser:undefined // 当前登录用户信息
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathName: location.pathname,
            locationQuery: location.query,
          },
        });
      });
    },
  },
  effects: {

  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
