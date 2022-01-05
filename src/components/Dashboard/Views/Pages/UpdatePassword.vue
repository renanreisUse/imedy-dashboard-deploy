<template>
  <div class="conteudo">
    <div class="image">
    </div>
    <div class="password-form">
      <form method="">
        <div>
          <div class="card-header text-center">
            <h2 class="card-title">Configurar nova senha</h2>
            <h3 class="card-title">Redefina sua senha para ter acesso ao APP Imedy</h3>
          </div>
          <div class="card-content">
            <div class="form-group recovery-input">
              <input
                type="password"
                placeholder="Insira o e-mail"
                class="form-control input-no-border"
                required
                v-model="password"
              />
              <img src="static/img/icons/Single.svg" />
            </div>
            <div class="form-group recovery-input">
              <input
                type="password"
                placeholder="Insira o e-mail"
                class="form-control input-no-border"
                required
                v-model="confirmPassword"
              />
              <img src="static/img/icons/Single.svg" />
              <span>Use pelo menos 8 caracteres</span>
              <span class="error-message" v-show="setError">
                Não foi possível encontrar seu e-mail
              </span>
            </div>
          </div>
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-fill btn-wd"
              @click.prevent="updatePassword"
            >
              Concluir
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import AuthService from "src/services/auth.service.js";
export default {
  data() {
    return {
      password: "",
      confirmPassword: "",
      setError: false
    };
  },
  methods: {
    updatePassword(){
      if(this.password !== this.confirmPassword){
        alert('senhas erradaias')
      }
    }
  }
};
</script>
<style scoped>
.conteudo {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
}
.image {
  height: 100%;
  width: 100%;
  background-image: url(/static/img/background/recovery-professional.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
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
