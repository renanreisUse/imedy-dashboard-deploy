<template>
  <div>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page" data-image="">
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
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
                        />
                        <img
                          src="static/img/icons/Key.svg"
                          alt="Icone de Chave"
                        />
                      </div>
                    </div>

                    <div class="card-footer text-center">
                      <button
                        type="submit"
                        class="btn btn-fill btn-wd send-btn"
                        @click.prevent="formSubmit"
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
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
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
export default {
  data() {
    return {
      data: {
        password: null,
        email: null,
        token: null
      },
      confirmPassword: null,
    };
  },
  methods: {
    async formSubmit() {
      if (this.data.password.length && this.confirmPassword.length < 8) {
        Swal("Ops!!", "A senha precisam ter 8 caracteres", "warning");
      }
      else if (this.data.password !== this.confirmPassword) {
        Swal("Ops!!", "As senhas não coincidem", "warning");
      } else {
        AuthService.updatePassword(this.data)
          .then(() => {
            Swal(
              "Senha criada",
              "Sua senha para acessar a Dashboard Imedy foi criada com sucesso!",
              "success"
            );
            this.$router.push("/");
          })
          .catch(() => {
            Swal("Ops!", "Não foi possivel efetuar a criação.", "warning");
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
