<template>
  <div>
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
      tableName="Lista de Pacientes"
      @delete-row="deleteUser"
      :registerByDash="false"
      :isPacient="true"
      :tableData="users" 
      :propsToSearch="propsToSearch"
      :tableColumns="tableColumns"
      >
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
        propsToSearch: ['name', 'email', 'birthday', 'status', 'attendance'],
        statsCards: [
          {
            title: 'Beneficiarios El Kadri',
            value: null,
            footerText: 'Pacientes',
            id: 1
          },
          {
            title: 'Não beneficiarios El Kadri',
            value: '150',
            footerText: 'Pacientes',
            id: 2
          }
        ],
        tableColumns: [
          {
            prop: 'name',
            label: 'NOME',
            minWidth: 300
          },
          {
            prop: 'email',
            label: 'E-MAIL',
            minWidth: 250
          },
          {
            prop: 'birthday',
            label: 'ANIVÉRSARIO',
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
          .get('/pacientes')
          .then((res) => {
            this.users = res.data
            this.statsCards[0].value = res.data.length
          })
          .catch((error) => {
            console.log(error)
          })
      },
      async deleteUser (id) {
        api
          .delete(`/pacientes/${id}`)
          .then(() => {
            this.getUsers()
          })
      }
    },
    created () {
      this.getUsers()
    }
  }
</script>
<style scoped>
</style>