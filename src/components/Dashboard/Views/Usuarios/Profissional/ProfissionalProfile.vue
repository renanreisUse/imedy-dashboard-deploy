<template>
  <div class="row">
    <div class="col-lg-4 col-md-5 userCard">
      <user-card
        :user="user"
      />
      <!--<documents-card  
        cardName="Documentos"
        :showStatus=true
        :cardDocs="showInfo"
      />-->
    </div>

    <div class="col-lg-4 col-sm-6"  v-for="stats in statsCards" :key="stats.id">
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

    <div class="col-lg-8 col-md-7">
      <profissional-form
        title="Perfil Profissional"
        :form="form"
        :showSecondInfo="showInfo"
      />
    </div>

    <div class="col-lg-12 col-md-12 completeRegister">
      <complete-register-card 
        :registerWarning="registerWarning"
      />
      <delete-profile-button class="deleteBtn" 
        @click.native="deleteUserProfile"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import UserCard from '../../../../UIComponents/UserCard.vue'
import DocumentsCard from '../../../../UIComponents/Cards/DocumentsCard.vue'
import ProfissionalForm from 'src/components/UIComponents/ProfissionalForm.vue'
import DeleteProfileButton from 'src/components/UIComponents/DeleteProfileButton.vue'
import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
import CompleteRegisterCard from 'src/components/UIComponents/Cards/CompleteRegisterCard.vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export default {
  components: {
    UserCard,
    StatsCard,
    DocumentsCard,
    ProfissionalForm,
    DeleteProfileButton,
    CompleteRegisterCard
  },
  data () {
    return {
      user: {},
      form: {},
      showInfo: null,
      registerWarning: null,
      statsCards: [
        {
          title: 'Atendimentos Realizados',
          value: '0',
          footerText: 'Todos',
          id: 1
        },
        {
          title: 'Avaliação',
          value: '0,0',
          footerText: 'Todos',
          id: 2
        }
      ]
    }
  },
  methods: {
    deleteUserProfile () {
      const id = this.$route.params.id
      Swal({
        title: 'Excluir cadastro',
        text: 'Deseja mesmo excluir este perfil?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#19B128',
        cancelButtonColor: '#EF0028',
        confirmButtonText: 'SIM, EXCLUIR',
        cancelButtonText: 'CANCELAR'
      }).then(() => {
        Swal(
          'Sucesso!',
          'Cadastro excluido com sucesso',
          'success'
        )
        const token = localStorage.getItem('token')
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        }
        axios
          .delete(`https://api.imedyapp.com.br/doctor/${id}`, config)
          .then(() => {
            this.getUser()
          })
        this.$router.push('/usuarios/profissional')
      })
    }
  },
  async mounted () {
    const id = this.$route.params.id
    const token = localStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    if (id) {
      axios
      .get(`https://api.imedyapp.com.br/doctor/${id}`, config)
      .then((result) => {
        const userData = result.data
        const newBirthDate = userData.birthDate.split('-').reverse().join('/')
        this.user = {
          name: userData.name,
          email: userData.email,
          birthDate: newBirthDate,
          image: userData.image
        }
        this.form = {
          specialty: userData.specialty,
          registration: userData.registration,
          email: userData.email,
          fullName: userData.name,
          birthDate: newBirthDate
        }
        if (userData.createdThroughCsv === true) {
          this.showInfo = false
          this.registerWarning = true
        } else {
          this.registerWarning = false
          this.showInfo = true
          this.form = {
            specialty: userData.specialty,
            registration: userData.registration,
            email: userData.email,
            fullName: userData.name,
            birthDate: newBirthDate,
            fantasyName: userData.fantasyName,
            address: userData.address,
            city: userData.city,
            country: userData.country,
            postalCode: userData.postalCode,
            secretaryName: userData.secretaryName,
            secretaryMail: userData.secretaryMail
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.numbers p{
  font-size: 15px;
  color: #8C8C8C;
}
.deleteBtn{
  margin-top: 35px;
}
.completeRegister{
  margin-bottom: 30px;
}
.card.card-user{
  height: 410px;
}
</style>