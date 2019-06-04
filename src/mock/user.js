import Mock from 'mockjs'
import { param2Obj } from '@/utils'
// 获取 mock.Random 对象
const Random = Mock.Random;


const userData = function (opt) {
    const { page, pageSize } = param2Obj(opt.url)
    let len = (1000 - pageSize * (page - 1)) < pageSize ? (1000 - pageSize * (page - 1)) : pageSize;
    let _data = []
    let i = 0;
    for (i; i < len; i++) {
        _data.push(
            Mock.mock({
                "id": "@id",
                "dateTime": "@now()",
                "name": "@name()",
                "address": "上海市普陀区金沙江路 1518 弄",
                "state": "@integer(0, 1)"
            })
        );
    }
    return _data;
}

const roleData = function (opt) {
    const { page, pageSize } = param2Obj(opt.url)
    let len = (1000 - pageSize * (page - 1)) < pageSize ? (1000 - pageSize * (page - 1)) : pageSize;
    let i = 0;
    let _data = []
    for (i; i < len; i++) {
        _data.push(
            Mock.mock({
                "id": "@id",
                "dateTime": "@now()",
                "name": "@name()",
                "describe": "管理员"
            })
        );
    }
    return _data;
}

export default {
    getUserList: opt => {
        return {
            result: 200,
            data: {
                data: userData(opt),
                count:1000
            }
        }
    },
    addUser: () => {
        return {
            "result": 200,
            "data": {},
            "msg": "请求成功"
        }
    },
    getRoleList: opt => {
        return {
            result: 200,
            data: {
                data: roleData(opt),
                count: 1000
            }
        }
    }
}