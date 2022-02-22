import { mock, Random } from 'mockjs';

const baseUrl = process.env.VUE_APP_MOCK_BASE_URL;

const userAccounts = {
  admin: {
    password: '888888',
    permissions: [{ id: 'queryForm', operation: ['add', 'edit'] }],
    roles: [{ id: 'admin', operation: ['add', 'edit', 'delete'] }],
  },
  tourist: {
    password: '888888',
    permissions: [{ id: 'queryForm', operation: ['add', 'edit'] }],
    roles: [{ id: 'tourist', operation: ['add', 'edit', 'delete'] }],
  },
};

mock(`${baseUrl}/login`, 'post', ({ body }) => {
  const { account, password } = JSON.parse(body);
  const item = userAccounts[account];
  if (!item) {
    return {
      code: 401,
      message: '帐号不存在',
    };
  }
  const { password: pwd, ...data } = item;
  if (pwd !== password) {
    return {
      code: 401,
      message: '密码错误',
    };
  }
  return {
    code: 200,
    data: {
      ...data,
      account,
      token: `${account}`,
      expireAt: new Date(new Date().getTime() + 30 * 60 * 1000),
    },
  };
});

mock(new RegExp(`${baseUrl}/user/info.*`), 'get', ({ url }) => {
  const params = new URLSearchParams(url.split('?')[1]);
  const token = params.get('token');
  if (!token) {
    return {
      code: 401,
      message: '未登录',
    };
  }
  return {
    code: 200,
    data: {
      account: token,
      avatar: Random.dataImage('120x120', '#FF6600'),
      id: mock('@id'),
      IDCard: mock('@IDCard'),
      email: mock('@email'),
      mobile: mock('@mobile'),
      name: mock('@cname'),
      zip: mock('@zip'),
      address: mock('@county(true)'),
      lastTime: mock('@datetime'),
    },
  };
});
