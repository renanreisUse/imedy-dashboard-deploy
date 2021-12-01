<template>
  <div>
    <div class="add-btn">
      <button class="text-uppercase myBtn" @click="showModal">
        Pré cadastro de profissionais (.CSV)
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
      :tableData="users"
      :propsToSearch="propsToSearch"
      :tableColumns="tableColumns">
    </paginated-tables>
  </div>
</template>

<script>
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
            value: '0',
            footerText: 'Profissionais',
            id: 1
          },
          {
            title: 'Não Associadoss El Kadri',
            value: '0',
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
        this.axios
          .get('doctor', config)
          .then((res) => {
            this.users = res.data[0]
            for (var i = 0; i < this.users.length; i++) {
              if (this.users[i].status === 'INACTIVE') {
                this.users[i].status = 'INATIVO'
              }
            }
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
        api
          .delete(`doctor/${id}`, config)
          .then(() => {
            this.getUsers()
          })
      },
      onFileChanged (event) {
        this.selectedFile = event.target.files[0]
        const formData = new FormData()
        formData.append('doctors', this.selectedFile)
        api
        .post('doctor/batch', formData)
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
