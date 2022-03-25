<template>
  <div class="row">
    <div class="col-lg-4 col-md-5 userCard">
      <user-card
        :user="user"
        :userRole="userRole"
        :showBirthdate="false"
        :showElKadriStatus="false"
        :badgeRole="adminRole"
        :badgeClass="badgeClass"
        @account-switch="switchStatus"
      />
    </div>

    <div class="col-lg-8 col-md-7">
      <AdminProfileCard :profile="profile"/>
    </div>

    <div class="col-lg-12 col-md-12 deleteBtn" v-if="isManager">
      <delete-profile-button @click.native="deleteAdminProfile"/>
    </div>
  </div>
</template>

<script>
import UserCard from "../../../UIComponents/UserCard.vue";
import AdminProfileCard from "src/components/UIComponents/Cards/AdminProfileCard.vue";
import DeleteProfileButton from "src/components/UIComponents/DeleteProfileButton.vue";
import UserService from "src/services/user.service.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default {
  components: {
    UserCard,
    DeleteProfileButton,
    AdminProfileCard
  },
  data() {
    return {
      user: {},
      profile: {},
      userRole:'',
      adminRole:'',
      badgeClass:'',
      isManager: false
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
        })
      })
    },
    async getAdminInfo() {
      const id = this.$route.params.id;
      UserService.getAdmin(id).then(({ data }) => {
        const fullName = data.name;
        const name = fullName.split(" ");
        this.profile = {
          name: name[0],
          lastName: name[1],
          email: data.email
        };
        data.image === null ? "https://imedy-upload-dev.s3.amazonaws.com/7c86873c-ab88-4350-80cf-d696db3e7c9d-default-avatar.png" : data.image
        switch (data.role[0]) {
          case "MANAGER":
            this.adminRole = "ADM SÊNIOR";
            this.badgeClass = 'green-bagde'
            break;
          case "REGISTER":
            this.adminRole = "CADASTRO";
            this.badgeClass = 'purple-badge'
            break;
          case "EDITOR":
            this.adminRole = "EDITOR";
            this.badgeClass = 'golden-badge'
          break;
        }
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
        UserService.deleteAdmin(id)
          .then(() => {
            Swal("Sucesso!", "Cadastro excluido com sucesso", "success");
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
    this.userRole = data.roles[0] 
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
.deleteBtn {
  margin-top: 45px;
}
</style>
