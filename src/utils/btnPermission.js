import Vue from 'vue'

/**权限指令**/
Vue.directive('has', {
    inserted: function (el, binding, vnode) {
        let permissionList = vnode.context.$route.meta.permission;
        if (!permissionList || !permissionList.includes(binding.value.role)) {
            el.parentNode.removeChild(el)
        }
    }
})
export { has }