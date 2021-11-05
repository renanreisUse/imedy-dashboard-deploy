<template>
  <div>
    <div class="page-title">
      <h3>Visão geral</h3>
    </div>

    <div class="add-btn">
      <button class="text-uppercase" @click="addProfessional">Cadastrar Profissionais</button>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-6" v-for="stats in statsCards" :key="stats.id">
        <stats-card>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
               {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>
    
    <paginated-tables 
      tableName="Lista de Profissionais"
      @delete-row="deleteUser"
      :isProfessional="true"
      :registerByDash="true"
      :tableData="users"
      :propsToSearch="propsToSearch"
      :tableColumns="tableColumns">
    </paginated-tables>
  </div>
</template>
<script>
  import api from 'src/services/api.js'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import PaginatedTables from 'src/components/Dashboard/Views/Tables/PaginatedTables.vue'
  export default {
    components: {
      StatsCard,
      PaginatedTables
    },
    data () {
      return {
        users: [],
        statsCards: [
          {
            title: 'Associadoss El Kadri',
            value: '458',
            footerText: 'Profissionais',
            id: 1
          },
          {
            title: 'Não Associadoss El Kadri',
            value: '150',
            footerText: 'Profissionais',
            id: 2
          }
        ],
        propsToSearch: ['name', 'specialty', 'registration', 'status', 'attendance'],
        tableColumns: [
          {
            prop: 'name',
            label: 'NOME',
            minWidth: 250
          },
          {
            prop: 'specialty',
            label: 'ESPECIALIDADE',
            minWidth: 250
          },
          {
            prop: 'registration',
            label: 'MATRÍCULA',
            minWidth: 150
          },
          {
            prop: 'status',
            label: 'STATUS',
            minWidth: 100
          },
          {
            prop: 'attendance',
            label: 'ATENDIMENTOS',
            minWidth: 150
          }
        ]
      }
    },
    methods: {
      async getUsers () {
        api
          .get('/profissionais')
          .then((res) => {
            this.users = res.data
          })
          .catch((error) => {
            console.log(error)
          })
      },
      async deleteUser (id) {
        api
          .delete(`/profissionais/${id}`)
          .then(() => {
            this.getUsers()
          })
      },
      addProfessional () {
        alert('Clicado!')
      }
    },
    created () {
      this.getUsers()
    }
  }
</script>
<style scoped>
.page-title{
  margin-bottom: 15px;
}
.add-btn{
  margin-bottom:50px;
  display: flex;
  justify-content: right;
}
.add-btn button{
  font-weight: 700;
  padding: 11px 35px;
  background-color: #718EFA;
  color:#fff;
  border-radius: 3px;
  border: none;
  letter-spacing: 0.5px;
}
</style>
