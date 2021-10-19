<template>
  <div>
    <div class="page-title">
      <h3>Visão geral</h3>
    </div>

    <div class="add-btn">
      <button @click="addProfessional">CADASTRAR PROFISSIONAIS</button>
    </div>

    <!--Stats cards-->
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
    
    <!--Table-->
    <paginated-tables 
        @delete-row="deleteUser"
        :tableData="users" 
        :propsToSearch="propsToSearch"
        :tableColumns="tableColumns"
        tableName="Lista de Profissionais">
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
            title: 'Associadoss El Kadri',
            value: '458',
            footerText: 'Profissionais',
            footerIcon: '',
            id: 1
          },
          {
            type: '',
            icon: '',
            title: 'Não Associadoss El Kadri',
            value: '150',
            footerText: 'Profissionais',
            footerIcon: '',
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
        ],
        users: []
      }
    },
    methods: {
      async getUsers () {
        axios
          .get('http://localhost:3000/profissionais')
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
          .delete(`http://localhost:3000/profissionais/${id}`)
          .then((result) => {
            console.log(result)
          })
        this.getUsers()
      },
      addProfessional () {
        console.log('clicadoh')
      }
    },
    created () {
      console.log('criado')
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
  font-size: 14px;
  font-weight: 700;
  padding: 11px 35px;
  background-color: #718EFA;
  color:#fff;
  border-radius: 3px;
  border: none;
  letter-spacing: 0.5px;
  font-family: Montserrat, sans-serif;
}
</style>
