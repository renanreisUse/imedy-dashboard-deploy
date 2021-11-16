<template>
  <div class="user">
    <div class="photo">
      <img src="static/img/femaleUser.jpg"/>
    </div>
    <div class="info">
      <a data-toggle="collapse" @click="toggleMenu" href="javascript:void(0)">
           <span>
             Cassiane Kadri
             <b class="caret"></b>
          </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <el-collapse-transition>
          <ul class="nav" v-show="!isClosed">
            <li>
              <a href="javascript:void(0)">
                <router-link to="/login" class="logout" @click.native="clearStorage">Sair</router-link>
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
  export default {
    components: {
      [CollapseTransition.name]: CollapseTransition
    },
    data () {
      return {
        isClosed: true
      }
    },
    methods: {
      toggleMenu () {
        this.isClosed = !this.isClosed
      },
      clearStorage () {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        console.log('sucessohh')
      }
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
