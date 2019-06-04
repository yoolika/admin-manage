
import {post,get } from '@/config/http'



export const getUserInfo = data => get('/getRouter',data)

export const login = data => post('/login',data)

export const getUserList = data => get('/getUserList',data)

export const addUser = data => post('/addUser',data)

export const getRoleList = data => get('/getRoleList',data)

export const getMenu = data => get('/getMenu',data)