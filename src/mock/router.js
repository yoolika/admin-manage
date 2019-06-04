import Mock from 'mockjs';

// mock一组数据
const routerData = function (opt) {
    return {
        result: 200,
        data: {
            router: [{
                path: "/system",
                component: "Layout",
                name: "系统管理",
                meta: {
                    title: "系统管理",
                    icon: "el-icon-setting",
                    type: '1'
                },
                children: [{
                    path: "userList",
                    name: "用户列表",
                    component: "user/index",
                    meta: {
                        title: "用户列表",
                        icon: "el-icon-tickets",
                        permission: ['add', 'edit', 'delete']
                    }
                }, {
                    path: "permission",
                    name: "权限管理",
                    component: "permission/index",
                    meta: {
                        title: "权限管理",
                        icon: "el-icon-bell",
                        permission: ['add', 'edit', 'delete']
                    }
                }, {
                    path: "menu",
                    name: "菜单管理",
                    component: "menu/index",
                    meta: {
                        title: "菜单管理",
                        icon: "el-icon-bell",
                        permission: ['edit']
                    }
                }]
            },
            {
                path: "/manage",
                component: "Layout",
                name: "基础管理",
                meta: {
                    title: "基础管理",
                    icon: "el-icon-setting",
                    type: '0'
                },
                children: [{
                    path: "product",
                    name: "商品列表",
                    component: "product/index",
                    meta: {
                        title: "商品列表",
                        icon: "el-icon-star-off"
                    }
                }]
            },
            ]
        }
    };
    // for (let i = 0; i < 100; i++) {
    //     let newArticleObject = {
    //         title: Random.csentence(5, 30), //  Random.csentence( min, max )
    //         thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
    //         author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
    //         date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    //     }
    //     routers.push(newArticleObject)
    // }

    
}

const menuData = function(){
    return {
        "result": 200,
        "data": [{
            "id": 11,
            "name": "系统管理",
            "path": "/system",
            "component": "Layout",
            "icon": "el-icon-setting",
            "type": '1',
            "children": [{
              "id": 112,
              "name": "用户列表",
              "path": "userList",
              "component": "user/index",
              "icon": "el-icon-tickets",
              "permission": ['add', 'edit', 'delete'],
              "type": '0'
            }, {
              "id": 113,
              "name": "权限管理",
              "path": "permission",
              "component": "permission/index",
              "icon": "el-icon-bell",
              "permission": ['add', 'edit', 'delete'],
              "type": '0'
            }, {
              "id": 114,
              "name": "菜单管理",
              "component": "menu/index",
              "icon": "el-icon-bell",
              "permission": ['edit'],
              "type": '0'
            }]
          },
          {
            "id": 22,
            "name": "商品列表",
            "component": "product/index",
            "icon": "el-icon-star-off",
            "type": '0'
          }
        ]
      
      }
}
export default {
    getRouter: () => routerData(),
    getMenu: () => menuData()
};