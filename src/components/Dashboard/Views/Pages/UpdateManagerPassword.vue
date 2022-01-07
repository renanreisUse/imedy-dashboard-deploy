<template>
  <div>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page" data-image="">
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                <form method="POST" @submit.prevent="formSubmit">
                  <div class="card" data-background="color" data-color="blue">
                    <div class="card-header text-center">
                      <h3 class="card-title">Criar Senha</h3>
                    </div>

                    <div class="card-content">
                      <div class="form-group">
                        <input
                          type="password"
                          placeholder="Senha"
                          class="form-control input-no-border"
                          v-model="data.password"
                        />
                        <img
                          src="static/img/icons/Key.svg"
                          alt="Icone de Chave"
                        />
                      </div>

                      <div class="form-group">
                        <input
                          type="password"
                          placeholder="Confirmar senha"
                          class="form-control input-no-border"
                          v-model="confirmPassword"
                          @keypress="passwordValidation"
                          @blur="passwordValidation"
                        />
                        <img
                          src="static/img/icons/Key.svg"
                          alt="Icone de Chave"
                        />
                        <span class="error-message" v-show="setError">
                          {{ errorText }}
                        </span>
                      </div>
                    </div>

                    <div class="card-footer text-center">
                      <button
                        type="submit"
                        class="btn btn-fill btn-wd send-btn"
                        :disabled="disabled"
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          class="full-page-background"
          style="background-image: url(static/img/background/background-imed.png)"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthService from "src/services/auth.service.js";

export default {
  data() {
    return {
      data: {
        password: null,
        email: null,
        token: null
      },
      confirmPassword: null,
      setError: false,
      errorText: "",
      disabled: true
    };
  },
  methods: {
    passwordValidation() {
      if (this.data.password.length && this.confirmPassword.length >= 8) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    async formSubmit() {
      if (this.password !== this.confirmPassword) {
        this.errorText = "As senhas não coincidem";
        this.setError = true;
      } else {
        AuthService.updatePassword(this.data)
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  mounted() {
    const url = this.$route.query;
    this.data.email = url.email;
    this.data.token = url.token;
  }
};
</script>

<style scoped>
.card {
  height: 370px;
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.card .card-header {
  padding: 20px 15px 0px;
}
@media (max-width: 780px) {
  .card {
    width: 100%;
    height: 100%;
  }
}
.card h3,
a,
button,
input::placeholder {
  color: #8c8c8c;
}
.card input {
  background-color: transparent;
  border: 1px solid #8c8c8c;
}
.card .card-title {
  color: #262626;
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: 400;
}
.forgot {
  margin-top: 10px;
}
span.error-message {
  color: #ef0028;
  font-weight: 400;
  margin-top: 15px;
  margin-bottom: 30px;
}
.card-footer button {
  margin-bottom: 35px;
  width: 100%;
  background-color: #718efa;
  border: none;
  letter-spacing: 1px;
  padding: 10px;
  transition: 0.4s ease;
}
.card-footer button:hover,
.card-footer button:focus {
  background-color: #718efa;
  box-shadow: 0px 15px 10px -15px #111;
}
.form-group input {
  padding-left: 35px;
}
.form-group {
  position: relative;
}
.form-group img {
  position: absolute;
  left: 0;
  top: 12px;
  padding-left: 10px;
}
</style>
