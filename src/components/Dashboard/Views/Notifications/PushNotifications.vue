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
import api from 'src/services/api.js'
import PaginatedTables from '../Tables/PaginatedTables.vue'
export default {
  components: {
    PaginatedTables
  },
  data () {
    return {
      users: [],
      propsToSearch: ['recipients', 'body'],
      tableColumns: [
        {
          prop: 'recipients',
          label: 'DESTINATÁRIO',
          minWidth: 220
        },
        {
          prop: 'body',
          label: 'MENSAGEM',
          minWidth: 300
        }
      ]
    }
  },
  methods: {
    async deleteUser (id) {
      const token = localStorage.getItem('token')
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      api
        .delete(`/notification${id}`, config)
        .then(() => this.getPush())
    },
    async getPush () {
      api
      .get('/notification')
      .then((res) => {
        this.users = res.data.notifications
        console.log(res.data)
      })
    }
  },
  mounted () {
    this.getPush()
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