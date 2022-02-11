<template>
  <div>
    <div class="register_button">
      <button class="text-uppercase myBtn" @click="confirm">Finalizar</button>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12">
        <paginated-tables
          tableName="Pré cadastro de profissionais (.CSV)"
          @delete-row="deleteUser"
          :deleteBtn="true"
          :showActions="false"
          :tableData="users"
          :propsToSearch="propsToSearch"
          :tableColumns="tableColumns"
        />
      </div>
      <div class="col-lg-12 col-md-12">
        <complete-register-card :registerWarning="true" />
      </div>
    </div>
  </div>
</template>

<script>
import PaginatedTables from "../Dashboard/Views/Tables/PaginatedTables.vue";
import CompleteRegisterCard from "./Cards/CompleteRegisterCard.vue";
import { mapState } from "vuex";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import DoctorService from 'src/services/doctor.service.js'

export default {
  components: {
    PaginatedTables,
    CompleteRegisterCard
  },
  computed: {
    ...mapState({ stateDoctors: state => state.stateDoctors })
  },
  data() {
    return {
      users: [],
      propsToSearch: ["name", "registration", "birthDate", "email"],
      tableColumns: [
        {
          prop: "name",
          label: "NOME",
          minWidth: 250
        },
        {
          prop: "registration",
          label: "MATRÍCULA",
          minWidth: 150
        },
        {
          prop: "birthDate",
          label: "DATA DE NASCIMENTO",
          minWidth: 150
        },
        {
          prop: "email",
          label: "E-MAIL",
          minWidth: 150
        }
      ]
    };
  },
  methods: {
    getUser() {
      this.users = this.stateDoctors;
    },
    async deleteUser(id) {
      DoctorService.deleteDoctor(id)
      .then(() => {
          this.getUser();
        });
    },
    confirm() {
      Swal({
        type: "success",
        title: "Sucesso!",
        text: `${this.users.length} profissionais cadastrados com sucesso`,
        confirmButtonColor: "##19B128",
        confirmButtonText: "OK"
      }).then(() => this.$router.push("/usuarios/profissional"))
    }
  },
  async created() {
    this.users = this.stateDoctors.succeeded;
    for (let i = 0; i < this.users.length; i++) {
      const newdate = new Date(this.users[i].birthDate)
      const newdate2 = newdate.toISOString().substring(0, 10)
      this.users[i].birthDate = newdate2.split('-').reverse().join('/')
    }
  }
};
</script>

<style scoped>
.register_button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.myBtn {
  font-weight: 700;
  padding: 15px 35px;
  background-color: #718efa;
  color: #fff;
  border-radius: 3px;
  border: none;
  letter-spacing: 0.5px;
}
</style>
