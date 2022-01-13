<template>
  <div class="row">
    <div class="col-lg-4 col-md-5">
      <user-card :user="user" />
    </div>

    <div class="col-lg-8 col-md-7">
      <div class="card">
        <div class="card-header">
          <h3 class="title">Editar Perfil</h3>
        </div>
        <div class="card-content">
          <div class="row">
            <div class="col-md-8">
              <fg-input
                type="email"
                label="E-mail de acesso"
                :disabled="true"
                placeholder="Email"
                v-model="email"
              >
              </fg-input>
            </div>
            <div class="col-md-4">
              <fg-input
                type="password"
                label="Senha de Acesso"
                :disabled="true"
                placeholder="Senha de acesso"
                v-model="password"
              >
              </fg-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <fg-input
                type="text"
                label="Nome"
                placeholder="Nome"
                v-model="name"
              >
              </fg-input>
            </div>
            <div class="col-md-6">
              <fg-input
                type="text"
                label="Sobrenome"
                placeholder="Sobrenome"
                v-model="lastName"
              >
              </fg-input>
            </div>
          </div>
          <div class="saveEditBtn">
            <button @click="changeName" class="imedy-btn text-uppercase">
              Salvar
            </button>
          </div>
        </div>
      </div>
      <div class="col-lg-13">
        <div class="card">
          <div class="card-header">
            <h3 class="title">Alterar senha de acesso</h3>
            <p class="subtitle">
              Insira seu e-mail de acesso Imedy para poder alterar sua senha.
            </p>
          </div>
          <div class="card-content">
            <div class="change-password">
              <fg-input
                type="email"
                class="alteredEmail"
                label="E-mail de acesso"
                placeholder="email@exemplo.com.br"
                v-model="alteredEmail"
              >
              </fg-input>
              <button @click="changePassword" class="imedy-btn text-uppercase">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from "../../../UIComponents/UserCard.vue";
export default {
  components: {
    UserCard
  },
  data() {
    return {
      user: {},
      email: "",
      password: "",
      name: "",
      lastName: "",
      alteredEmail: ""
    };
  },
  methods: {
    getAdminInfo() {
      this.email = "kleysonjohnny2016@gmail.com";
      this.password = "123456";
      this.user = {
        name: "Ana lisboa",
        email: "kleysonjohnny2016@gmail.com",
        birthDate: "10/05/2002"
      };
    },
    changePassword() {
      console.log(this.alteredEmail);
    },
    changeName() {
      const data = {
        id: this.$route.params.id,
        name: `${this.name} ${this.lastName}`
      };
      console.log(data);
    }
  },
  mounted() {
    this.getAdminInfo();
    this.alteredEmail = this.email;
  }
};
</script>

<style scoped>
.saveEditBtn {
  display: flex;
  justify-content: flex-end;
  margin: 30px 0 30px 0;
}
.change-password {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-group.alteredEmail {
  width: 60%;
}
</style>
