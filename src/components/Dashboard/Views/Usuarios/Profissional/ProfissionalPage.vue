<template>
  <div>
    <div class="add-btn">
      <button class="text-uppercase myBtn" @click="showModal">
        Cadastrar Profissionais
      </button>
      <bootstrap-modal-no-jquery 
        v-if="displayModal" 
        @close-modal-event="hideModal" 
        @change-input-event="onFileChanged"
      />
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
  import axios from 'axios'
  import {mapState} from 'vuex'
  import api from 'src/services/api.js'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import PaginatedTables from 'src/components/Dashboard/Views/Tables/PaginatedTables.vue'
  import BootstrapModalNoJquery from 'src/components/UIComponents/BootstrapModalNoJquery.vue'

  export default {
    components: {
      StatsCard,
      PaginatedTables,
      BootstrapModalNoJquery
    },
    data () {
      return {
        selectedFile: null,
        csvInfo: null,
        displayModal: false,
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
    computed: {
      ...mapState({ stateDoctors: state => state.stateDoctors })
    },
    methods: {
      async getUsers () {
        const token = localStorage.getItem('token')
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        }
        axios
          .get('https://api.imedyapp.com.br/doctor/', config)
          .then((res) => {
            console.log(res.data[0])
            this.users = res.data[0]
            /* for (var i = 0; i < res.data.length; i++) {
              var registed = res.data[i].createdByDash
              var nome = this.users[i].name
              if (registed === true) {
                this.users[i].name = `SVG ${nome}`
              }
            } */
          })
          .catch((error) => {
            console.log(error)
          })
      },
      async deleteUser (id) {
        const token = localStorage.getItem('token')
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        }
        axios
          .delete(`https://api.imedyapp.com.br/doctor/${id}`, config)
          .then(() => {
            this.getUsers()
          })
      },
      onFileChanged (event) {
        this.selectedFile = event.target.files[0]
        const formData = new FormData()
        formData.append('doctors', this.selectedFile)
        axios
        .post('https://api.imedyapp.com.br/doctor/batch', formData)
        .then((res) => {
          this.csvInfo = res.data
          this.$store.dispatch('storeDoctors', this.csvInfo)
          this.$router.push(`/usuarios/batch`)
        })
        .catch((error) => {
          console.log(error)
        })
      },
      showModal () {
        this.displayModal = true
      },
      hideModal () {
        this.displayModal = false
      }
    },
    created () {
      this.getUsers()
      console.log(localStorage.getItem('token'))
    }
  }
</script>

<style scoped>
.add-btn{
  margin-bottom:50px;
  display: flex;
  justify-content: right;
}
.myBtn{
  font-weight: 700;
  padding: 11px 35px;
  background-color: #718EFA;
  color:#fff;
  border-radius: 3px;
  border: none;
  letter-spacing: 0.5px;
}
</style>
