//初始化数据
const state = {
    shoplist: [{
        id: 11,
        name: "商品1",
        price: 10.00
    },{
        id: 22,
        name: "商品2",
        price: 20.00
    },{
        id: 33,
        name: "商品3",
        price: 30.00
    }],
    //已选商品
    added: []
}
//向外输出数据的方法
const getters = {
    // shoplist: (state) => {
    //     return state.shoplist
    // }
    //商品列表
    shoplist: state => state.shoplist,
    //购物车列表
    cartlist: state =>{
        return state.added.map(({id, num}) =>{
            let _n = state.shoplist.find(n => n.id === id)
            return {
                ..._n,
                num
            }
        })
    },
    // cartlist: state =>{
    //     return state.added
    // }
    totalNum: (state, getters) =>{
        let _totalNum = 0
        getters.cartlist.forEach(item => {
            _totalNum+= item.num
        })
        return _totalNum
    },
    totalPrice: (state, getters) =>{
        let _totalPrice = 0
        getters.cartlist.forEach(item => {
            _totalPrice+= (item.num * item.price)
        })
        return _totalPrice
    }
}
//事件  同步、异步
//第一个参数{commit}或是同步异步的提交方式 dispatch
//一般网络请求在这里

const actions = {
    addToCart({ commit },shop){
        // console.log(shop);
        commit('add',{
            id: shop.id
        })
        // commit('add', {shop})
    },
    clearAllCart({ commit }){
        commit('clearAllCart')
    },
    delGoods({ commit }, cart){
        commit('delGoods', cart)
    }
}

//更改状态的逻辑，是一些操作数据的js逻辑 
const mutations = {
    add(state,{id}){
        //查找列表里有没有 修改后触发getters
       let _n = state.added.find(item => item.id === id)
       if(!_n){
            state.added.push({
                id,
                num:1
            })
       }else{
            _n.num++ ;
       }
    },
    //另一种写法
    // add(state,{shop}){
    //    let _n = state.added.find(item => item.id === shop.id)
    //    console.log(_n);
    //    if(!_n){
    //        shop.num = 1
    //        state.added.push(shop)
    //    }else{
    //         _n.num++ 
    //         //需要深度拷贝 不然无法触发getter
    //         let temp=JSON.parse(JSON.stringify(state.added));
    //         state.added = temp
    //    }
    // }
    //清空购物车
    clearAllCart(state){
        state.added = []
    },
    delGoods(state, cart) {
        state.added.forEach((item,index) =>{
            if(item.id === cart.id){
                state.added.splice(index,1)
            }
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}