<template>
  <div class="row">
    <div class="col-lg-4 col-md-5 userCard">
      <user-card
        :user="user"
        :showElKadriStatus="true"
        @account-switch="changeAccountStatus"
      />
      <documents-card  
        v-if="profileStage"
        cardName="Documentos"
        :showComponent="showComponent"
        :showStatus=true
        :cardDocs="showInfo"
        :documents="mocks"
        :profileStage="profileStage"
      />
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
        :clinic="clinic"
        :secretaries="secretaries"
        :showSecondInfo="showInfo"
        :showSecreteries="hasSecretaries"
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
import DoctorService from 'src/services/doctor.service.js'
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
      clinic:{},
      secretaries:[],
      profileStage: '',
      mocks:[
        {
          name: 'Documento oficial com foto',
          link: "https://youtube.com.br/"
        },
        {
          name: 'Registro/Matricula Nacional',
          link: "https://youtube.com.br/"
        }
      ],
      showInfo: null,
      hasSecretaries:null,
      registerWarning: null,
      showComponent: true,
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
        DoctorService.deleteDoctor(id)
          .then(() => {
            this.getUser()
          })
        this.$router.push('/usuarios/profissional')
      })
    },
    changeAccountStatus(status){
      const data = {
        id: this.$route.params.id,
        status: status
      }
      DoctorService.updateStatus(data)
        .catch(() => {
          this.$notify({
            component: {
              template: `ERRO - <span>Ops, algo deu errado! Não foi possivél atualizar status.</span>`
            },
            icon: "",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "warning"
          });
        });
    },
     async getProfessional(){
      const id = this.$route.params.id
      if (id) {
      DoctorService.getDoctor(id)
      .then((result) => {
        const userData = result.data
        const newBirthDate = userData.birthDate.split('-').reverse().join('/')
        this.profileStage = userData.profileStage
        this.user = {
          name: userData.name,
          email: userData.email,
          birthDate: newBirthDate,
          image: "https://imedy-upload-dev.s3.amazonaws.com/7c86873c-ab88-4350-80cf-d696db3e7c9d-default-avatar.png",
          status: userData.status
        }
        this.form = {
          specialty: userData.specialty.name,
          registration: userData.registration,
          email: userData.email,
          fullName: userData.name,
          birthDate: newBirthDate
        }
        if (userData.createdThroughCsv) {
          this.showInfo = false
          this.showComponent = false
          this.registerWarning = true
        }
        const clinic = userData.clinic
        const secretarie = userData.secretaries.secretaries
        this.showInfo = true
        this.clinic = {
          fantasyName: clinic.fantasyName,
          address: clinic.address.address,
          city: clinic.address.city,
          state: clinic.address.state,
          zipCode: clinic.address.zipCode
        }
        if (secretarie.length > 0) {
          this.hasSecretaries = true
          for (let i = 0; i < secretarie.length; i++) {
            this.secretaries = secretarie
          }
        }
      })
    }
    }
  },
  mounted () {
    this.getProfessional()
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