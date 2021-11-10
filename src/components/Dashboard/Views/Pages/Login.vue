<template>
  <div>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page" data-image="">
        <div class="content" >
          <div class="container" >
            <div class="row">
              <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                <form method="POST" @submit="formSubmit">
                  <div class="card" data-background="color" data-color="blue">
                    <div class="card-header text-center">
                      <h3 class="card-title">Login</h3>
                    </div>
                    <div class="card-content">

                      <div class="form-group">  
                        <input type="email" v-model="data.email" placeholder="Insira o e-mail" class="form-control input-no-border">
                        <img src="static/img/icons/Single.svg" alt="Icone de Usuario">
                      </div>

                      <div class="form-group">
                        <input type="password" v-model="data.password" placeholder="Senha" class="form-control input-no-border">
                        <img src="static/img/icons/Key.svg" alt="Icone de Chave">
                        <div class="forgot">
                          <!--<router-link to="/register">
                            Esqueci a senha
                          </router-link>-->
                        </div>
                        <span class="error-message" v-show="setError">Dados inválidos</span>
                      </div>

                    </div>
                    <div class="card-footer text-center">
                      <button type="submit" class="btn btn-fill btn-wd send-btn">Acessar</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div 
          class="full-page-background" 
          style="background-image: url(static/img/background/background-imed.png)">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        data: {
          password: null,
          email: null
        },
        setError: false
      }
    },
    methods: {
      clearInputs () {
        this.data.password = ''
        this.data.email = ''
      },
      async formSubmit (e) {
        e.preventDefault()
        axios
          .post('https://api.imedyapp.com.br/auth', this.data)
          .then((res) => {
            console.log(res)
            localStorage.setItem('token', res.data.token.accessToken)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            this.$router.push('/admin')
          })
          .catch((error) => {
            this.setError = true
            this.clearInputs()
            console.log(error)
          })
      },
      closeMenu () {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      },
      toggleNavbar () {
        document.body.classList.toggle('nav-open')
      }
    },
    beforeDestroy () {
      this.closeMenu()
    }
  }
</script>

<style scoped>
.card {
  height: 370px;
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.card .card-header{
  padding: 20px 15px 0px;
}
@media (max-width:780px) {
  .card{
    width: 100%;
    height: 100%;
  }
}
.card h3, a, button, input::placeholder{
  color: #8C8C8C;
}
.card input{
  background-color: transparent;
  border: 1px solid #8C8C8C;
}
.card .card-title{
  color: #262626;
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: 400;
}
.forgot{
  margin-top: 10px;
}
span.error-message{
  color: #EF0028;
  font-weight: 400;
  margin-top: 15px;
  margin-bottom: 30px;
}
.card-footer button{
  margin-bottom: 35px;
  width: 100%;
  background-color: #718EFA;
  border: none;
  letter-spacing: 1px;
  padding: 10px;
  transition: 0.4s ease;
}
.card-footer button:hover, .card-footer button:focus{
  background-color: #718EFA;
  box-shadow: 0px 15px 10px -15px #111;    
}
.form-group input{
  padding-left: 35px;
}
.form-group{
  position: relative;
}
.form-group img{
  position: absolute;
  left: 0;
  top: 12px;
  padding-left: 10px;
}
</style>
