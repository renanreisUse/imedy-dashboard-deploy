<template>
  <div>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page" data-color="" data-image="static/img/background/background-2.jpg">
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                <form method="">
                  <div class="card" data-background="color" data-color="blue">
                    <div class="card-header text-center">
                      <h3 class="card-title">Recuperar senha</h3>
                    </div>
                    <div class="card-content">
                      <div class="form-group recovery-input">  
                        <input 
                          type="email"
                          placeholder="Insira o e-mail" 
                          class="form-control input-no-border"
                          required
                          v-model="email"
                        >
                        <img src="static/img/icons/Single.svg">
                      </div>
                    </div>
                    <div class="card-footer text-center">
                      <button 
                        type="submit"
                        class="btn btn-fill btn-wd"
                        @click.prevent="recoveryBtn" 
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      <div class="full-page-background" style="background-image: url(static/img/background/background-imed.png)"></div>
    </div>
  </div>
</div>
</template>
<script>
  import Swal from 'sweetalert2'
  import 'sweetalert2/dist/sweetalert2.css'
  import AuthService from  'src/services/auth.service.js'
  export default {
    data () {
      return {
        email: null
      }
    },
    methods: {
      recoveryBtn () {
        if(!this.email) {
           Swal("Ops!", "Preencha o campo.", "warning")
        } else{
          AuthService.recoveryPassword({ email: this.email })
          .then(() => {
            Swal({
            type: 'success',
            title: 'E-mail enviado!',
            text: 'Verifique a sua caixa de e-mail e siga as instruções para recuperação de senha.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#19B128'
            })
            this.$router.push('/')
          })
          .catch(() => {
            Swal("Ops!", "Ocorreu um erro, tente novamente.", "warning");
          })
        }
      }
    }
  }
</script>
<style scoped>
.card{
  height: 370px;
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media (max-width:780px) {
  .card{
  width: 100%;
  height: 100%;
  }
}
.card .recovery-input{
  margin-bottom: 139px;
}
.card .card-title{
  font-weight: 400;
  color: #262626;
  font-size: 28px;
  margin-bottom: 30px;
  margin-top: 30px;
}
.card-footer button{
  margin-bottom: 35px;
  width: 100%;
  background-color: #718EFA;
  border: none;
  letter-spacing: 1px;
  padding: 10px;
}
.card input{
  background-color: transparent;
  border: 1px solid #8C8C8C;
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
span.error-message{
  color: #EF0028;
  font-weight: 400;
  margin-top: 15px;
  margin-bottom: 30px;
}
</style>
