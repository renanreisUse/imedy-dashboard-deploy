<template>
  <div>
    <div class="register_button">
      <button class="text-uppercase imedy-btn" @click="confirm">Finalizar</button>
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
          prop: "specialty",
          label: "ESPECIALIDADE",
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
    getDoctors() {
      this.users = this.stateDoctors.succeeded;
      for (let i = 0; i < this.users.length; i++) {
        const newdate = new Date(this.users[i].birthDate);
        const newdate2 = newdate.toISOString().substring(0, 10);
        this.users[i].birthDate = newdate2.split("-").reverse().join("/");
        this.users[i].specialty = this.users[i].specialty.name;
      }
    },
    updateTable() {
      this.users = this.stateDoctors;
    },
    async deleteUser(id) {
      DoctorService.deleteDoctor(id).then(() => this.updateTable())
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
  created() {
    this.getDoctors();
  }
};
</script>

<style scoped>
.register_button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>
