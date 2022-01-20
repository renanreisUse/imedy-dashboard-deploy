<template>
  <div class="row">
    <div class="col-lg-4 col-md-5 userCard">
      <user-card
        :user="user"
        :showBirthdate="false"
        @account-switch="switchStatus"
      />
    </div>

    <div class="col-lg-8 col-md-7">
      <div class="card">
        <div class="card-header">
          <h3 class="title">Editar Perfil</h3>
        </div>
        <div class="card-content">
          <div class="row">
            <div class="col-lg-12">
              <fg-input
                type="email"
                label="E-mail de acesso"
                :disabled="true"
                placeholder="Email"
                v-model="email"
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
import DeleteProfileButton from "src/components/UIComponents/DeleteProfileButton.vue";
import AuthService from "src/services/auth.service.js";
import UserService from "src/services/user.service.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
export default {
  components: {
    UserCard,
    DeleteProfileButton
  },
  data() {
    return {
      user: {},
      email: "",
      name: "",
      lastName: "",
      alteredEmail: ""
    };
  },
  methods: {
    switchStatus(status) {
      const data = {
        id: this.$route.params.id,
        status: status
      };
      UserService.updateAdminStatus(data)
        .catch(() => {
          this.$notify({
            component: {
              template: `ERRO - <span>Ops, algo deu errado! Não foi possivél atualizar status.</span>`
            },
            icon: "",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "warning"
          });
        });
    },
    getAdminInfo() {
      const id = this.$route.params.id;
      UserService.getAdmin(id).then(({ data }) => {
        console.log(data);
        const fullName = data.name;
        const name = fullName.split(" ");
        this.name = name[0];
        this.lastName = name[1];
        this.email = data.email;
        this.user = {
          name: data.name,
          email: data.email,
          image: data.image,
          status: data.status
        };
      });
    },
    changePassword() {
      AuthService.recoveryPassword({ email: this.alteredEmail }).then(res => {
        console.log(res);
      });
    },
    changeName() {
      const data = {
        id: this.$route.params.id,
        name: `${this.name} ${this.lastName}`
      };
      UserService.updateAdminName(data)
        .then(() => {
          Swal({
            type: "success",
            title: "Sucesso!",
            text: "Nome atualizado com sucesso.",
            confirmButtonColor: "#19B128",
            confirmButtonText: "OK"
          });
          this.$router.push("/admin/list");
        })
        .catch(() => {
          Swal({
            type: "warning",
            title: "Ops, algo deu errado",
            text: "Não foi possivel efetuar essa alteração.",
            confirmButtonColor: "#EF0028",
            confirmButtonText: "OK"
          });
        });
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
