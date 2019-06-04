import Mock from 'mockjs';
// 获取 mock.Random 对象
const Random = Mock.Random;
const loginData = function (opt) {
    console.log(opt)
    // let datas = 
    return {
        result: 200,
        data: {
            uid:Random.id(),
            type: 1,
            uname:Random.cname(),
            expire_in: "63666",
            token: Random.guid(),
            logintime: Random.now()
        }
    }
}
Mock.mock('/loginApi', 'post', loginData);