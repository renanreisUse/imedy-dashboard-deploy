<template>
  <div class="row">
    <div class="col-lg-4 col-md-5">
      <user-card 
        :user="user"
      />
      <documents-card
        cardName="Validação da carteirinha"
        :cardDocs="true"
        :documentLink="documentLink"
      />
    </div>

    <div class="col-lg-4 col-sm-6" v-for="(stats, index) in statsCards" :key="index">
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
      <PacienteForm 
        :form="form"
        :dependents="dependents"
      />
    </div>

    <div class="col-lg-4 col-md-12 deletePatient">
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
      documentLink: "",
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
          this.$router.push("/usuarios/profissional");
        });
      });
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id) {
      PatientService.getPatient(id).then(result => {
        console.log(result);
        const userData = result.data;
        this.statsCards[0].value = userData.attendance;
        this.statsCards[1].value = userData.rating;
        this.documentLink = userData.elKadriImage;
        this.user = {
          name: userData.name,
          email: userData.email,
          birthDate: userData.birthDate,
          image: userData.userImage,
          status: userData.status
        };
        this.form = {
          email: userData.email,
          cpf: userData.cpf,
          fullName: userData.name,
          birthDate: userData.birthDate
        };
        for (let i = 0; i < userData.dependents.length; i++) {
          this.dependents = [
            {
              name: userData.dependents[i].name,
              birthDate: userData.dependents[i].birthDate
            }
          ];
        }
      });
    }
  }
};
</script>

<style scoped>
.deletePatient{
  margin-bottom: 20px;
}
</style>
