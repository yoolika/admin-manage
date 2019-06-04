import Mock from 'mockjs';
import { randomFillSync } from 'crypto';
// 获取 mock.Random 对象
const Random = Mock.Random;
const loginData = function (opt) {
    const { user } = JSON.parse(opt.body)
    return  {
        result: 200,
        data: {
            uid:Random.id(),
            type: 1,
            uname:user,
            expire_in: "63666",
            token: Random.guid(),
            logintime: Random.now()
        }
    }
}
export default {
    login: opt => loginData(opt)
};