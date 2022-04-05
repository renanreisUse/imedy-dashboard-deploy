<template>
  <div>
    <div class="row">
      <div
        class="col-lg-6 col-sm-6"
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
    </div>

    <paginated-tables
      tableName="Lista de Pacientes"
      @delete-row="deleteUser"
      @eye-btn="eyeBtn"
      @search-table="updateSearchQuery"
      @page-value="changePagination"
      :totalPages="totalPages"
      :showSwitch="false"
      :deleteBtn="userRole"
      :tableData="users"
      :propsToSearch="propsToSearch"
      :tableColumns="tableColumns"
      >
    </paginated-tables>
  </div>
</template>
<script>
import StatsCard from "src/components/UIComponents/Cards/StatsCard.vue";
import PaginatedTables from "src/components/Dashboard/Views/Tables/PaginatedTables.vue";
import PatientService from "src/services/patient.service.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default {
  components: {
    StatsCard,
    PaginatedTables
  },
  data() {
    return {
      users: [],
      userRole: false,
      totalPages: 0,
      searchQuery: '',
      pagination: {
        page: 1,
        limit: 10,
      },
      propsToSearch: ["name", "email", "birthDate", "status", "attendance"],
      statsCards: [
        {
          title: "Beneficiários El Kadri",
          value: 0,
          footerText: "Pacientes"
        },
        {
          title: "Não beneficiários El Kadri",
          value: 0,
          footerText: "Pacientes"
        }
      ],
      tableColumns: [
        {
          prop: "name",
          label: "NOME",
          minWidth: 300
        },
        {
          prop: "email",
          label: "E-MAIL",
          minWidth: 250
        },
        {
          prop: "birthDate",
          label: "ANIVERSÁRIO",
          minWidth: 150
        },
        {
          prop: "status",
          label: "STATUS",
          minWidth: 100
        },
        {
          prop: "attendance",
          label: "ATENDIMENTOS",
          minWidth: 150
        }
      ]
    };
  },
  methods: {
    eyeBtn(id) {
      this.$router.push(`/usuarios/profile2/${id}`);
    },
    checkUserRole() {
      const user = localStorage.getItem("user"),
      role = user.length > 0 ? JSON.parse(user).roles[0] : null
      if (!user || !role) {
        localStorage.clear();
        this.$router.push("/");
      }
      return role === "MANAGER";
    },
    async getPatients() {
      const queryParams = this.getQueryParamsString({...this.pagination, query: this.searchQuery})
      PatientService.getPatients(queryParams)
        .then(res => {
          this.users = res.data.users;
          this.totalPages = res.data.totalPages;
          for (var i = 0; i < this.users.length; i++) {
            this.users[i].birthDate = this.users[i].birthDate.split('-').reverse().join('/')
            switch (this.users[i].status) {
              case false:
                this.users[i].status = "INATIVO";
                break;
              case true:
                this.users[i].status = "ATIVO";
                break;
            }
          }
        })
        .catch(error => console.log(error));
    },
    getQueryParamsString(data){
      const dataStep = new Object()
      for(let key in data){
        if(data[key])dataStep[key] = data[key];
      }
      return new URLSearchParams(dataStep);
    },
    changePagination({ page, limit}) {
      this.pagination.page = page
      this.pagination.limit = limit
      this.getPatients();
    },
    updateSearchQuery(value){
      this.searchQuery = value
      this.getPatients()
    },
    async deleteUser(id) {
      PatientService.deletePatient(id)
      .then(() => {
        Swal("Sucesso!", "Cadastro excluido com sucesso", "success");
        this.getPatients(1,10)
      })
      .catch(()=>{
        Swal(
          "Ops!", 
          "Não é possivel deletar paciente que possua dependentes.", 
          "warning"
        );
      })
    }
  },
  mounted() {
    this.userRole = this.checkUserRole()
    this.getPatients();
  }
};
</script>
<style scoped></style>
