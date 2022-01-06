<template>
  <div class="conteudo">
    <div class="image"></div>
    <div class="password-form">
      <form>
        <div v-if="!sucessMessage">
          <div class="text-container">
            <h4 class="title">
              Configurar nova senha
            </h4>
            <p class="subtitle">
              Defina sua senha para ter acesso ao APP Imedy
            </p>
          </div>
          <div class="card-content">
            <div class="form-group recovery-input">
              <label for="password">Senha</label>
              <input
                type="password"
                class="form-control"
                required
                v-model="data.password"
              />
              <img src="static/img/icons/Single.svg" />
            </div>
            <div class="form-group recovery-input">
              <label for="password">Confirmar senha</label>
              <input
                type="password"
                class="form-control"
                required
                v-model="confirmPassword"
              />
              <img src="static/img/icons/Single.svg" />
              <span class="error-message" v-show="setError">
                As senhas não correspondem
              </span>
            </div>
            <span class="hint">Use pelo menos 8 caracteres.</span>
          </div>
          <div class="buttonContainer text-center">
            <button
              type="submit"
              class="btn btn-fill btn-wd"
              @click.prevent="updatePassword"
            >
              Concluir
            </button>
          </div>
        </div>
        <div class="sucess-message" v-else>
          <div class="success-container">
            <img src="static\img\icons\Sucesso.svg" />
            <h4 class="success-title">
              Senha definida com sucesso!
            </h4>
            <p class="success-subtitle">
              Sua senha Imedy foi definida. <br/>
              Acesse o App agora mesmo e agende
              uma consulta
            </p>
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
      confirmPassword: "",
      sucessMessage: false,
      setError: false,
      endpoint: null,
      data: {
        email: null,
        password: null,
        token: null
      }
    };
  },
  methods: {
    updatePassword() {
      const endpoint = this.endpoint;
      const data = this.data;
      if (this.data.password !== this.confirmPassword) {
        this.setError = true;
      } else {
        AuthService[endpoint](data).then(res => {
          console.log(res);
          this.sucessMessage = true;
        });
      }
    },
    checkRoles() {
      const url = this.$route.query;
      const roles = url.role;
      this.data.email = url.email;
      this.data.token = url.token;
      switch (roles) {
        case "MANAGER":
          this.$router.push("/");
          break;
        case "DOCTOR":
          this.endpoint = "updatePasswordDoctor";
          break;
        case "USER":
          this.endpoint = "updatePasswordPatient";
          break;
      }
    }
  },
  mounted() {
    this.checkRoles();
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
.password-form {
  width: 650px;
}
.title {
  font-size: 24px;
}
.subtitle,
.title {
  margin-bottom: 25px;
}
label {
  color: #718efa;
  font-weight: 400;
  position: absolute;
  top: -10px;
  left: 19px;
  background: white;
  padding: 0 5px;
}
@media (max-width: 780px) {
  .image {
    display: none;
  }
  .conteudo {
    display: flex;
  }
}
.card .recovery-input {
  margin-bottom: 139px;
}
.buttonContainer button {
  margin-bottom: 35px;
  width: 200px;
  background-color: #718efa;
  border-radius: 12px;
  border: none;
  letter-spacing: 1px;
  padding: 10px;
}
.recovery-input input {
  background-color: transparent;
  border: 1px solid #718efa;
  border-radius: 12px;
  margin-bottom: 30px;
}
.form-group {
  position: relative;
}
.form-group img {
  position: absolute;
  right: 0;
  top: 12px;
  padding-right: 12px;
}
span.error-message {
  color: #ef0028;
  font-weight: 400;
  margin-top: 15px;
  margin-bottom: 30px;
}
.buttonContainer {
  display: flex;
  justify-content: flex-end;
}
.card-title {
  display: flex;
  justify-content: flex-start;
}
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
