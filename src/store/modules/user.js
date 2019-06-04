import { resolve } from "path";
import { login, getUserInfo } from "@/api/getData"
import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from "constants";
import { getToken, setToken, removeToken } from '@/utils/auth'

//初始化数据
const state = {
    userinfo: {
        type: '',
        expire_in: '',
        token: '',
        logintime: ''
    },
    headerIcon: 'default.jpg',
    menu: []
}

//事件  同步、异步
//第一个参数{commit}或是同步异步的提交方式 dispatch
const actions = {
    loginUser({ commit }, userinfo) {
        return new Promise((resolve, reject) => {
            login({
                user: "admin",
                password: "123456"
            }).then(response => {
                console.log(response)
                if (response.result == 200 && response.data) {
                    commit('SET_TOKEN', response.data)
                    setToken(response.data.token)
                    resolve()
                } else {
                    reject("登录失败")
                }
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    GetUserInfo({ commit }, token) {
        return new Promise((resolve, reject) => {
            getUserInfo(token).then(response => {
                if (response.result == 200 && response.data) {
                    resolve(response)
                    commit('SET_MENU', response.data.router)
                } else {
                    reject("error")
                }
            }).catch(error => {
                console.log("获取路由失败" + error)
                reject(error)
            })
        })
    },
    // 前端 登出
    FedLogOut({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            removeToken()
            resolve()
        })
    },
}
//更改状态的逻辑，是一些操作数据的js逻辑
const mutations = {
    SET_TOKEN(state, user) {
        state.userinfo = {
            token: user.token,
            isLogin: true
        }
    },
    SET_MENU(state, menu) {
        state.menu = menu
    }
}

export default {
    state,
    // getters,
    actions,
    mutations
}