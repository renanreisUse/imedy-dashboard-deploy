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
          <h3 class="title">Perfil</h3>
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

          <div class="row inputs">
            <div class="col-md-6">
              <fg-input
                type="text"
                label="Nome"
                :disabled="true"
                placeholder="Nome"
                v-model="name"
              >
              </fg-input>
            </div>
            <div class="col-md-6">
              <fg-input
                type="text"
                label="Sobrenome"
                :disabled="true"
                placeholder="Sobrenome"
                v-model="lastName"
              >
              </fg-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-12 col-md-12 deleteBtn" v-if="isManager">
      <delete-profile-button
        class="deleteBtn"
        @click.native="deleteAdminProfile"
      />
    </div>
  </div>
</template>

<script>
import UserCard from "../../../UIComponents/UserCard.vue";
import DeleteProfileButton from "src/components/UIComponents/DeleteProfileButton.vue";
import UserService from "src/services/user.service.js";
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
      isManager: false
    };
  },
  methods: {
    switchStatus(status) {
      const data = {
        id: this.$route.params.id,
        status: status
      };
      UserService.updateAdminStatus(data).catch(() => {
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
    deleteAdminProfile() {
      const id = this.$route.params.id;
      Swal({
        title: "Excluir cadastro",
        text: "Deseja mesmo excluir este perfil?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#19B128",
        cancelButtonColor: "#EF0028",
        confirmButtonText: "SIM, EXCLUIR",
        cancelButtonText: "CANCELAR"
      }).then(() => {
        Swal("Sucesso!", "Cadastro excluido com sucesso", "success");
        UserService.deleteAdmin(id)
          .then(() => {
            this.$router.push("/admin/list");
          })
          .catch(() =>
            Swal("Ops!", "Ocorreu um erro ao excluir este perfil.", "warning")
          );
      });
    }
  },
  mounted() {
    this.getAdminInfo();
    const data = JSON.parse(localStorage.getItem("user"));
    if (data.roles[0] === "MANAGER") {
      this.isManager = true;
    }
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
.inputs {
  margin-bottom: 9.5rem;
}
.deleteBtn {
  margin-top: 45px;
}
</style>
