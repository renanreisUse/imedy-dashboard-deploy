<template>
  <div class="user">
    <div class="photo">
      <img :src="image"/>
    </div>
    <div class="info">
      <a data-toggle="collapse" @click="toggleMenu" href="javascript:void(0)">
           <span>
             {{userName}}
             <b class="caret"></b>
          </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <el-collapse-transition>
          <ul class="nav" v-show="!isClosed">
          <li>
              <a href="javascript:void(0)">
                <router-link to="/my-profile" class="logout">Meu Perfil</router-link>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <router-link to="/" class="logout" @click.native="clearStorage">Sair</router-link>
              </a>
            </li>
          </ul>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  import AuthService from "src/services/auth.service.js";
  export default {
    components: {
      [CollapseTransition.name]: CollapseTransition
    },
    data () {
      return {
        isClosed: true,
        userName: null,
        image: null,
      }
    },
    methods: {
      toggleMenu () {
        this.isClosed = !this.isClosed
      },
      clearStorage () {
        AuthService.logout()
      }
    },
    mounted () {
      const user = JSON.parse(localStorage.getItem('user'))
      this.userName = user.name
      this.image = user.image
    }
  }
</script>
<style>
  .collapsed {
    transition: opacity 1s;
  }
  .logout{
    margin-left: 20px;
  }
</style>
