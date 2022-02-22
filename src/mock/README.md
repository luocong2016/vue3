[mockjs examples](http://mockjs.com/examples.html)

### 数据类型
```
/* 正确响应 */
{
  code: number; // 200
  data: any;
}

/* 错误响应 */
{
  code: number; // !200
  message: string;
}

```

### 接口
> /login
```
url: '/login'
method: 'POST'
@data
{
  account: string;
  password: string;
}
@returns
{
  account: string;
  expireAt: string;
  permissions: { id: string; operation: string[] }[];
  roles: { id: string; operation: string[] }[];
  token: string;
}
```
> /userInfo
```
url: '/user/info'
method: 'GET'
@params
{
  token: string;
}
@returns
{
  IDCard: string;
  account: string;
  address: string;
  avatar: string;
  email: string;
  id: string;
  lastTime: string;
  mobile: string;
  name: string;
  zip: string;
}
```