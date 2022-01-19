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
      @page-value="changePagination"
      @page-limit="changePagination"
      @eye-btn="eyeBtn"
      :showSwitch="false"
      :deleteBtn="true"
      :tableData="users"
      :totalPages="totalPages"
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
export default {
  components: {
    StatsCard,
    PaginatedTables
  },
  data() {
    return {
      users: [],
      totalPages: 0,
      propsToSearch: ["name", "email", "birthDate", "status", "attendance"],
      statsCards: [
        {
          title: "Beneficiarios El Kadri",
          value: 0,
          footerText: "Pacientes"
        },
        {
          title: "Não beneficiarios El Kadri",
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
          label: "ANIVÉRSARIO",
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
    async getPatients(page, limit) {
      PatientService.getPatients(page, limit)
        .then(res => {
          this.users = res.data.users;
          this.totalPages = res.data.totalPages;
          for (var i = 0; i < this.users.length; i++) {
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
    changePagination({ page, limit }) {
      this.getPatients(page, limit);
    },
    async deleteUser(id) {
      PatientService.deletePatient(id).then(() => this.getPatients());
    }
  },
  mounted() {
    this.getPatients(1,10);
  }
};
</script>
<style scoped></style>
