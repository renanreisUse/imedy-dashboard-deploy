<template>
  <div>
    <div class="add-btn">
      <button
        class="text-uppercase imedy-btn"
        @click="() => {this.displayModal = true}"
      >
        Pré cadastro de profissionais (.CSV)
      </button>

      <bootstrap-modal-no-jquery
        v-if="displayModal"
        @close-modal-event="() => {this.displayModal = false}"
        @change-input-event="onFileChanged"
      />
    </div>

    <div class="row">
      <div
        class="col-lg-6 col-sm-6"
        v-for="stats in statsCards"
        :key="stats.id"
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
      tableName="Lista de Profissionais"
      :editTableColums="editTableColums"
      :registerByDash="true"
      @delete-row="deleteUser"
      @search-table="updateSearchQuery"
      :deleteBtn="userRole"
      @eye-btn="eyeBtn"
      @page-value="changePagination"
      :totalPages="totalPages"
      :tableData="users"
      :propsToSearch="propsToSearch"
      :tableColumns="tableColumns"
    >
    </paginated-tables>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DoctorService from "src/services/doctor.service.js";
import StatsCard from "src/components/UIComponents/Cards/StatsCard.vue";
import PaginatedTables from "src/components/Dashboard/Views/Tables/PaginatedTables.vue";
import BootstrapModalNoJquery from "src/components/UIComponents/BootstrapModalNoJquery.vue";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default {
  components: {
    StatsCard,
    PaginatedTables,
    BootstrapModalNoJquery
  },
  data() {
    return {
      selectedFile: null,
      csvInfo: null,
      displayModal: false,
      users: [],
      userRole: false,
      totalPages: 0,
      searchQuery: '',
      pagination: {
        page: 1,
        limit: 10,
      },
      statsCards: [
        {
          title: "Associados El Kadri",
          value: "0",
          footerText: "Profissionais",
          id: 1
        },
        {
          title: "Não Associados El Kadri",
          value: "0",
          footerText: "Profissionais",
          id: 2
        }
      ],
      propsToSearch: [
        "name",
        "specialty",
        "registration",
        "status",
        "attendance"
      ],
      editTableColums: [{
        prop: "name",
        label: "NOME",
        minWidth: 250
      }],
      tableColumns: [
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
  computed: {
    ...mapState({ stateDoctors: state => state.stateDoctors })
  },
  methods: {
    eyeBtn(id) {
      this.$router.push(`/usuarios/profile/${id}`);
    },
    async getUsers() {
      const queryParams = this.getQueryParamsString({...this.pagination, query: this.searchQuery})
      DoctorService.getDoctors(queryParams)
        .then(res => {
          this.totalPages = res.data.totalPages;
          this.users = res.data.doctors
          for (var i = 0; i < this.users.length; i++) {
            this.users[i].specialty = this.users[i].specialty.name;
            this.users[i].attendance = 0
            switch (this.users[i].status) {
              case "INACTIVE":
                this.users[i].status = "INATIVO";
                break;
              case "ACTIVE":
                this.users[i].status = "ATIVO";
                break;
            }
          }
        })
        .catch(err => console.log(err));
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
      this.getUsers();
    },
    updateSearchQuery(value){
      this.searchQuery = value
      this.getUsers()
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
    deleteUser(id) {
      DoctorService.deleteDoctor(id)
      .then(() => {
        Swal("Sucesso!", "Cadastro excluido com sucesso", "success");
        this.getUsers(1,10);
      })
      .catch(()=>{
        Swal(
          "Ops!", 
          "Ocorreu um erro, tente novamente.", 
          "warning"
        );
      })
    },
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
      const formData = new FormData();
      formData.append("doctors", this.selectedFile);
      DoctorService.batchDoctor(formData)
        .then(res => {
          this.csvInfo = res.data;
          this.$store.dispatch("storeDoctors", this.csvInfo);
          this.$router.push(`/usuarios/batch`);
        })
        .catch(() => {
          Swal({
            type: "warning",
            title: "Ops, algo deu errado",
            text: "Não foi possível efetuar o cadastro",
            confirmButtonColor: "#19B128",
            confirmButtonText: "FECHAR"
          });
        });
    }
  },
  mounted() {
    this.userRole = this.checkUserRole()
    this.getUsers();
  }
};
</script>

<style scoped>
.add-btn {
  margin-bottom: 50px;
  display: flex;
  justify-content: right;
}
.card .numbers p {
  font-size: 14px;
  color: #8c8c8c;
}
.card .stats{
  font-weight: 400;
  line-height: 22px;
  color: #8c8c8c;
}
</style>