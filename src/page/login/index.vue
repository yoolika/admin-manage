<template>
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer">
                <div class="manage_tip">
                    <p>后台管理系统</p>
                </div>
                <el-form ref="loginForm" :model="loginForm" :rules="rules">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
                    </el-form-item>
                </el-form>
                <p class="tip">温馨提示：</p>
				<p class="tip">用户名：admin 密码：123456</p>
				<p class="tip"></p>
            </section>
        </transition>
    </div>
</template>
<script>
import { login } from "@/api/getData"
import { mapActions,mapGetters } from "vuex"

export default {
  data() {
    return {
        loginForm: {
            username: '',
            password: ''
        },
        rules: {
            username : [
                { required: true, message: '请输入用户名',trigger: 'blur'}
            ],
            password: [
                { required: true, message: '请输入密码',trigger: 'blur'},
                { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
            ]
        }
    };
  },
  mounted() {
    // this.test();
  },
  methods: {
      ...mapActions(['loginUser']),
       submitForm(loginForm){
          this.$refs[loginForm].validate((valid) =>{
            if(valid){
               this.loginUser(loginForm).then(()=>{
                   this.$message('登录成功！');
                   this.$router.push('manage')
               }).catch(error=>{
                   console.log('error submit!!'+error);
                   this.$message.error('出错了哦！');
               })
            //  this.$router.push('manage')
            }else{
                // this.$message.error('错了哦，这是一条错误消息');
                console.log('error submit!!!');
                return false;
            }
          })
      },
    async test() {
      const res = await login({
        user: "13621928272",
        password: "babyer860818"
      });
      if ((res.result = 200)) {
        console.log(res);
      }
    }
  
  }
};
</script>
<style lang="scss" scoped>
    @import "@/style/mixin";
    .login_page{
        background-color: #324057;
    }
    .manage_tip{
        position: absolute;
        width:100%;
        top: -100px;
        left:0;
        p{
            font-size: 34px;
            color:#fff
        }
    }
    .form_contianer{
        @include wh(320px, 210px);
        @include ctp(320px, 210px);
        padding: 30px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
        .submit_btn{
            width: 100%;
            font-size: 16px;
        }
    }
    .tip{
		font-size: 12px;
		color: red;
	}
    .form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
