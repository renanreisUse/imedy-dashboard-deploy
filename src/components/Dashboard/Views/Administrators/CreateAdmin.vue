<template>
  <div>
    <div class="step-one" v-show="currentStep === 1">
      <div class="row">
        <div class="col-lg-4 md-5">
          <div class="card card-user">
            <div class="card-content">
              <div class="author">
                <img
                  class="avatar border-white"
                  :src="image"
                  alt="Imagem do Usuario."
                />
                <span>FOTO PERFIL</span>
                <label for="file" class="imedy-btn imageBtn"
                  >ADICIONAR FOTO
                  <input
                    type="file"
                    id="file"
                    class="btn-csv"
                    @change="linkImg"
                  />
                </label>
              </div>
              <div class="text-center">
                <div class="description-group email">
                  <p>E-mail de acesso</p>
                  <img
                    class="description-icon"
                    src="static/img/icons/Letter.svg"
                    alt="Icone de Carta."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8 md-7">
          <div class="card">
            <div class="card-content">
              <div class="title">
                <h3>Adicionar Administrador</h3>
              </div>
              <div class="row">
                <div class="col-lg-12 input-field">
                  <label for="email">E-mail de acesso</label><br />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail de acesso"
                    v-model="email"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6 input-field">
                  <label for="email">Nome</label><br />
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    v-model="name"
                  />
                </div>
                <div class="col-lg-6 input-field">
                  <label for="email">Sobrenome</label><br />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Sobrenome"
                    v-model="lastName"
                  />
                </div>
              </div>

              <div class="accessLevel">
                <div class="title">
                  <h3>Nivel de acesso</h3>
                </div>
                <div class="selectOptions">
                  <div
                    class="radio"
                    v-for="(item, index) in recipients"
                    :key="index"
                  >
                    <input
                      type="radio"
                      v-model="checkedCategories"
                      :value="item.value"
                      :id="item.name"
                    />
                    <label>{{ item.name }}</label>
                  </div>
                </div>
                <div class="registerBtn">
                  <button class="imedy-btn nextStep" @click="nextStep">
                    Proximo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="step-two" v-show="currentStep === 2">
      <div class="col-lg-12 md-7">
        <div class="card">
          <div class="card-content">
            <div class="title">
              <h3>Senha de Acesso</h3>
            </div>
            <div class="row">
              <div class="col-lg-3 input-field">
                <label for="password">Senha</label><br />
                <input
                  type="password"
                  name="password"
                  placeholder="Senha"
                  v-model="password"
                />
                <span v-show="errorMessage">As senhas não coincidem</span><br/>
                <span>Use no mínimo 8 caracteres</span>
              </div>
              <div class="col-lg-3 input-field">
                <label for="confirmPassword">Confirmar senha</label><br />
                <input
                  type="password"
                  name="password"
                  placeholder="Confirmar senha"
                  v-model="confirmPassword"
                />
              </div>
            </div>
            <div class="registerBtn">
              <button
                @click="createAdmin"
                class="imedy-btn"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "src/services/user.service.js";
import FileService from "src/services/file.service.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
export default {
  data() {
    return {
      imageData: null,
      image:
        "https://imedy-upload-dev.s3.amazonaws.com/7c86873c-ab88-4350-80cf-d696db3e7c9d-default-avatar.png",
      email: "",
      name: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      errorMessage:false,
      spanText: "",
      currentStep: 1,
      checkedCategories: [],
      recipients: [
        { name: "ADM Sênior", value: "MANAGER", checked: false },
        { name: "Editor", value: "EDITOR", checked: false },
        { name: "Cadastro", value: "REGISTER", checked: false }
      ]
    };
  },
  methods: {
    async linkImg(event) {
      this.imageData = event.target.files[0];
      const data = new FormData();
      data.append("file", this.imageData);
      FileService.getImageUrl(data).then(res => {
        this.image = res.data.url;
      });
    },
    nextStep() {
      const inputs = this.name && this.email && this.lastName;
      if (inputs === "" || !this.checkedCategories.length) {
        Swal("Ops!", "Preencha todos os campos", "warning");
      } else {
        this.currentStep++;
      }
    },
    createAdmin() {
      const data = {
        name: `${this.name} ${this.lastName}`,
        image: this.image,
        email: this.email,
        role: this.checkedCategories,
        password: this.password
      };
      if (this.password != this.confirmPassword) {
        this.errorMessage = true
      } else {
      UserService.createUserAdmin(data)
        .then(() => {
          Swal({
            type: "success",
            title: "Sucesso!",
            text: "Cadastra realizado com sucesso!",
            confirmButtonColor: "#19B128",
            confirmButtonText: "OK"
          });
          this.$router.push("/admin/list");
        })
        .catch(() => {
          Swal({
            type: "warning",
            title: "Ops, algo deu errado",
            text: "Verifique os dados inseridos e tente novamente.",
            confirmButtonColor: "#EF0028",
            confirmButtonText: "OK"
          });
        });
      }
    }
  }
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}
.imageBtn {
  cursor: pointer;
}
.card-user .author {
  margin-bottom: 25px;
}
.description-icon {
  height: 30px;
  width: 30px;
  cursor: pointer;
  margin-left: 30px;
  margin-bottom: 10px;
}
.description-group {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 43px;
}
.description-group p {
  margin-left: 10px;
  color: #8c8c8c;
  margin-bottom: 10px;
}
.author {
  color: #8c8c8c;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.author label {
  margin-top: 20px;
}
.input-field input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #8c8c8c;
  margin-bottom: 32px;
}
.selectOptions {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}
.registerBtn {
  display: flex;
  justify-content: flex-end;
}
.email {
  margin-bottom: 11.7rem;
}
</style>
