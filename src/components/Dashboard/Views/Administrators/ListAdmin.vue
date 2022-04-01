<template>
  <div>
    <div class="add-btn">
      <button
        class="myBtn imedy-btn"
        @click="() => this.$router.push('/admin/create')"
      >
        ADICIONAR ADMINISTRADOR
      </button>
    </div>
    <paginated-tables
      tableName="Lista de Administradores"
      @delete-row="deleteUser"
      @eye-btn="eyeBtn"
      @page-value="changePagination"
      @search-table="updateSearchQuery"
      :totalPages="totalPages"
      :registerByDash="false"
      :deleteBtn="true"
      :tableData="users"
      :propsToSearch="propsToSearch"
      :tableColumns="tableColumns"
    >
    </paginated-tables>
  </div>
</template>

<script>
import PaginatedTables from "src/components/Dashboard/Views/Tables/PaginatedTables.vue";
import UserService from "src/services/user.service.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default {
  components: {
    PaginatedTables
  },
  data() {
    return {
      users: [],
      totalPages: 0,
      searchQuery: '',
      pagination: {
        page: 1,
        limit: 10,
      },
      propsToSearch: ["name", "email", "role", "status"],
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
          prop: "role",
          label: "CONTA",
          minWidth: 150
        },
        {
          prop: "status",
          label: "STATUS",
          minWidth: 100
        }
      ]
    };
  },
  methods: {
    getAdmins() {
      const queryParams = this.getQueryParamsString({...this.pagination, query: this.searchQuery})
      UserService.getAdmins(queryParams).then(({ data }) => {
        this.totalPages = data.totalPages;
        this.users = data.users;
        for (var i = 0; i < this.users.length; i++) {
          switch (this.users[i].role[0]) {
            case "MANAGER":
              this.users[i].role = "ADM SÊNIOR";
              break;
            case "REGISTER":
              this.users[i].role = "CADASTRO";
              break;
          }
          this.users[i].status = !this.users[i].status ? "INATIVO" : "ATIVO";
        }
      });
    },
    changePagination({ page, limit}) {
      this.pagination.page = page
      this.pagination.limit = limit
      this.getAdmins();
    },
    updateSearchQuery(value){
      this.searchQuery = value
      this.getAdmins()
    },
    getQueryParamsString(data){
      const dataStep = new Object()
      for(let key in data){
        if(data[key])dataStep[key] = data[key];
      }
      return new URLSearchParams(dataStep);
    },
    deleteUser(id) {
      UserService.deleteAdmin(id)
      .then(() => {
        Swal("Sucesso!", "Cadastro excluido com sucesso", "success");
        this.getAdmins(1, 10);
      })
      .catch(()=>{
        Swal(
          "Ops!", 
          "Ocorreu um erro, tente novamente.", 
          "warning"
        );
      })
    },
    eyeBtn(id) {
      this.$router.push(`/admin/profile/${id}`);
    }
  },
  mounted() {
    this.getAdmins();
  }
};
</script>

<style scoped>
.add-btn {
  margin-bottom: 50px;
  display: flex;
  justify-content: right;
}
</style>
