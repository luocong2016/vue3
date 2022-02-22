// http://mockjs.com/examples.html
import { Random, mock, setup } from 'mockjs';

Random.extend({
  mobile: function () {
    return mock(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/);
  },
  IDCard: function () {
    const suffix = ['X', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'x'];
    return (
      (Math.random() > 0.1
        ? mock(
            /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
          )
        : mock(/^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{2}$/)) +
      this.pick(suffix)
    );
  },
});

import './user';

// 设置全局延时
setup({
  timeout: '200-1800',
});
