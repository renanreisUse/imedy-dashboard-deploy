<template>
  <div class="row">
    <div class="col-lg-4 col-md-5">
      <user-card
        :user="user"
        :showElKadriStatus="true"
        :userRole="userRole"
        @account-switch="changePatientStatus"
        @elKadri-switch="changeElKadriStatus"
      />
      <documents-card
        cardName="Validação da carteirinha"
        :cardDocs="true"
        :documents="documents"
      />
    </div>

    <div
      class="col-lg-4 col-sm-6"
      v-for="(stats, index) in statsCards"
      :key="index"
    >
      <stats-card>
        <div class="numbers" slot="content">
          <p>{{ stats.title }}</p>
          {{ stats.value }}
        </div>
        <div class="stats" slot="footer">
          {{ stats.footerText }}
        </div>
      </stats-card>
    </div>

    <div class="col-lg-8 col-md-7">
      <PacienteForm :form="form" :dependents="dependents" />
    </div>

    <div class="col-lg-12 col-md-12 deletePatient">
      <delete-profile-button
        class="deleteBtn"
        @click.native="deletePatientProfile"
      />
    </div>
  </div>
</template>

<script>
import PatientService from "src/services/patient.service.js";
import DocumentsCard from "../../../../UIComponents/Cards/DocumentsCard.vue";
import PacienteForm from "src/components/UIComponents/PacienteForm.vue";
import UserCard from "../../../../UIComponents/UserCard.vue";
import StatsCard from "src/components/UIComponents/Cards/StatsCard.vue";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import DeleteProfileButton from "src/components/UIComponents/DeleteProfileButton.vue";
export default {
  components: {
    UserCard,
    StatsCard,
    DocumentsCard,
    DeleteProfileButton,
    PacienteForm
  },
  data() {
    return {
      user: {},
      form: {},
      dependents: [],
      documents: [],
      userRole: null,
      statsCards: [
        {
          title: "Atendimentos Realizados",
          value: 0,
          footerText: "Todos"
        },
        {
          title: "Avaliação",
          value: 0,
          footerText: "Referente a todos os atendimentos"
        }
      ]
    };
  },
  methods: {
    getPatientInfo() {
      const id = this.$route.params.id;
      if (id) {
        PatientService.getPatient(id)
          .then(result => {
            const userData = result.data;
            this.statsCards[0].value = userData.attendance;
            this.statsCards[1].value = userData.rating;
            if (userData.elKadriImage === null) {
              this.documents = [{
                type: "Não possui a carteirinha"
              }]
            }else {
              this.documents = [{
                type: 'Validação da carteirinha',
                image: userData.elKadriImage
              }]
            }
            this.user = {
              name: userData.name,
              email: userData.email,
              birthDate: userData.birthDate.split('-').reverse().join('/'),
              image: !userData.userImage ? "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" : userData.userImage ,
              status: userData.status,
              elKadriStatus: userData.elKadriStatus
            };
            this.form = {
              email: userData.email,
              cpf: userData.cpf,
              fullName: userData.name,
              birthDate: userData.birthDate.split('-').reverse().join('/')
            };
            for (let i = 0; i < userData.dependents.length; i++) {
              userData.dependents[i].birthDate = userData.dependents[i].birthDate.split('-').reverse().join('/')
              this.dependents = userData.dependents
            }
          })
          .catch(error => console.log(error));
      }
    },
    checkUserRole() {
     const user = localStorage.getItem("user"),
      role = user.length > 0 ? JSON.parse(user).roles[0] : null
      if (!user || !role) {
        localStorage.clear();
        this.$router.push("/");
      }
      return role
    },
    deletePatientProfile() {
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
        PatientService.deletePatient(id)
          .then(() => {
            this.$router.push("/usuarios/paciente");
          })
          .catch(() =>
            Swal("Ops!", "Ocorreu um erro ao excluir paciente.", "warning")
          );
      });
    },
    changePatientStatus(value) {
      const data = {
        id: this.$route.params.id,
        status: value
      };
      PatientService.updateStatus(data)
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
    changeElKadriStatus(value) {
      const data = {
        id: this.$route.params.id,
        elKadriStatus: value
      };
      PatientService.updateElKadriStatus(data)
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
    }
  },
  mounted() {  
    this.userRole = this.checkUserRole();
    this.getPatientInfo();
  }
};
</script>

<style scoped>
.deletePatient {
  margin-bottom: 20px;
}
</style>
