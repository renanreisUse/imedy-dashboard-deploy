<template>
  <div>
  
    <div class="page-title">
      <h3>Pacientes</h3>
    </div>

    <div class="row">
      <div class="col-lg-6 col-sm-6" v-for="stats in statsCards" :key="stats.id">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>

    <paginated-tables 
      @delete-row="deleteUser"
      :tableData="users" 
      :propsToSearch="propsToSearch"
      :tableColumns="tableColumns"
      tableName="Lista de Pacientes">
    </paginated-tables>
  </div>
</template>
<script>
  import axios from 'axios'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import PaginatedTables from 'src/components/Dashboard/Views/Tables/PaginatedTables.vue'

  export default {
    components: {
      StatsCard,
      PaginatedTables
    },
    data () {
      return {
        statsCards: [
          {
            type: '',
            icon: '',
            title: 'Beneficiarios El Kadri',
            value: '458',
            footerText: 'Pacientes',
            footerIcon: '',
            id: 1
          },
          {
            type: '',
            icon: '',
            title: 'Não beneficiarios El Kadri',
            value: '150',
            footerText: 'Pacientes',
            footerIcon: '',
            id: 2
          }
        ],
        propsToSearch: ['name', 'email', 'birthday', 'status', 'attendance'],
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
        ],
        users: []
      }
    },
    methods: {
      async getUsers () {
        axios
          .get('http://localhost:3000/pacientes')
          .then((res) => {
            this.users = res.data
            console.log(this.users)
          })
          .catch((error) => {
            console.log(error)
          })
      },
      async deleteUser (id) {
        axios
          .delete(`http://localhost:3000/pacientes/${id}`)
          .then((result) => {
            console.log(result)
          })
        this.getUsers()
      }
    },
    created () {
      this.getUsers()
    }
  }
</script>
<style scoped>
.page-title{
margin-bottom: 20px;
}
</style>