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
      :registerByDash="false"
      :tableData="users"
      :propsToSearch="propsToSearch"
      :tableColumns="tableColumns"
    >
    </paginated-tables>
  </div>
</template>

<script>
import PaginatedTables from "src/components/Dashboard/Views/Tables/PaginatedTables.vue";
import UserService from 'src/services/user.service.js'
export default {
  components: {
    PaginatedTables
  },
  data() {
    return {
      users: [],
      propsToSearch: ["name", "email", "account", "status"],
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
          prop: "account",
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
      UserService.getAdmins().then(({data}) => {
        this.users = data.users
      });
    },
    deleteUser(id){
      UserService.deleteAdmin(id).then(res => {
        console.log(res);
      })
    }
  },
  mounted(){
    this.getAdmins()
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
