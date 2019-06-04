import Vuex from 'vuex'
import Vue from 'vue'
import test from '@/store/modules/test'
import user from '@/store/modules/user'
import getters from '@/store/getters'

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        test,
        user
    },
    getters
})