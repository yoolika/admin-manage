//向外输出数据的方法
const getters = {
    getUserinfo: state => state.user.userinfo,
    headerIcon: state => state.user.headerIcon,
    getMenu: state => state.user.menu
}

export default getters