<template>
  <div>
    <div class="register_button">
      <button class="text-uppercase myBtn" @click="confirm">Finalizar</button>
    </div>

    <paginated-tables
      tableName="Pré cadastro de profissionais (.CSV)"
      @delete-row="deleteUser"
      :tableData="users"
      :propsToSearch="propsToSearch"
      :tableColumns="tableColumns"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import PaginatedTables from '../Dashboard/Views/Tables/PaginatedTables.vue'
import axios from 'axios'

export default {
  components: {
    PaginatedTables
  },
  computed: {
    ...mapState({ stateDoctors: state => state.stateDoctors })
  },
  data () {
    return {
      users: [],
      propsToSearch: ['name', 'specialty', 'registration', 'birthDate', 'email'],
      tableColumns: [
        {
          prop: 'name',
          label: 'NOME',
          minWidth: 250
        },
        {
          prop: 'specialty',
          label: 'ESPECIALIDADE',
          minWidth: 200
        },
        {
          prop: 'registration',
          label: 'MATRÍCULA',
          minWidth: 150
        },
        {
          prop: 'birthDate',
          label: 'DATA DE NASCIMENTO',
          minWidth: 150
        },
        {
          prop: 'email',
          label: 'E-MAIL',
          minWidth: 150
        }
      ]
    }
  },
  methods: {
    getUser () {
      this.users = this.stateDoctors
    },
    async deleteUser (id) {
      const token = localStorage.getItem('token')
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      axios
        .delete(`https://api.imedyapp.com.br/doctor/${id}`, config)
        .then(() => {
          this.getUser()
        })
    },
    confirm () {
      if (this.users === null) {
        Swal({
          type: 'warning',
          title: 'Ops, algo deu errado',
          text: 'Não foi possível efetuar o cadastro',
          confirmButtonColor: '##19B128'
        })
      } else {
        Swal({
          type: 'success',
          title: 'Sucesso!',
          text: `${this.users.length} profissionaiss cadastrado com sucesso`,
          confirmButtonColor: '##19B128',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
        this.$router.push('/usuarios/profissional')
      }
    }
  },
  async created () {
    this.users = this.stateDoctors
    console.log(this.users)
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