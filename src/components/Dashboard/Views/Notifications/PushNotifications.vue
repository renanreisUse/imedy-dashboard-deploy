<template>
<div>
  <div class="register_button">
  <router-link to="/notifications/create"><button class="text-uppercase myBtn">Criar Notificação</button></router-link>
  </div>

  <div class="row">
    <div class="col-lg-12 col-md-12">
      <paginated-tables
        tableName="Lista de Notificações"
        @delete-row="deleteUser"
        :tableData="users"
        :propsToSearch="propsToSearch"
        :tableColumns="tableColumns"
      />
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import PaginatedTables from '../Tables/PaginatedTables.vue'
export default {
  components: {
    PaginatedTables
  },
  data () {
    return {
      users: [],
      propsToSearch: ['addressee', 'message'],
      tableColumns: [
        {
          prop: 'addressee',
          label: 'DESTINATÁRIO',
          minWidth: 220
        },
        {
          prop: 'message',
          label: 'MENSAGEM',
          minWidth: 300
        }
      ]
    }
  },
  methods: {
  },
  mounted () {
    axios
    .get('http://localhost:3000/push')
    .then((res) => {
      this.users = res.data
    })
  }
}
</script>

<style scoped>
.register_button{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.myBtn{
  font-weight: 700;
  padding: 15px 35px;
  background-color: #718EFA;
  color:#fff;
  border-radius: 3px;
  border: none;
  letter-spacing: 0.5px;
}
</style>