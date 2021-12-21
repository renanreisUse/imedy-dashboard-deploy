<template>
  <div class="row">
   <div class="col-lg-4 col-md-5">
      <user-card
        :user="user"
      />
      <documents-card  
        cardName="Validação da carteirinha"
        :cardDocs="true"
        :documentLink="documentLink"
      />
      <!--<delete-profile-button class="deleteBtn" 
        @click.native="deleteUserProfile"
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
      <PacienteForm :form="form"/>
    </div>
  </div>
</template>

<script>
import PatientService from 'src/services/patient.service.js'
import DocumentsCard from '../../../../UIComponents/Cards/DocumentsCard.vue'
import PacienteForm from 'src/components/UIComponents/PacienteForm.vue'
import UserCard from '../../../../UIComponents/UserCard.vue'
import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
import DeleteProfileButton from 'src/components/UIComponents/DeleteProfileButton.vue'
export default {
  components: {
    UserCard,
    StatsCard,
    DocumentsCard,
    DeleteProfileButton,
    PacienteForm
  },
  data () {
    return {
      user: {},
      form: {},
      dependents: [],
      documentLink: '',
      statsCards: [
        {
          title: 'Atendimentos Realizados',
          value: 0,
          footerText: 'Todos',
          id: 1
        },
        {
          title: 'Avaliação',
          value: 0,
          footerText: 'Referente a todos os atendimentos',
          id: 2
        }
      ]
    }
  },
  async mounted () {
    const id = this.$route.params.id
    if (id) {
      PatientService.getPatient(id)
        .then((result) => {
          const userData = result.data
          this.statsCards[0].value = userData.attendance
          this.statsCards[1].value = userData.rating
          this.documentLink = userData.elKadriImage
          this.user = {
            name: userData.name,
            email: userData.email,
            birthDate: userData.birthDate,
            image: userData.image
          }
          this.form = {
            email: userData.email,
            cpf: userData.cpf,
            fullName: userData.name,
            birthDate: userData.birthDate
          }
          for (let i = 0; i < userData.dependents.length; i++) {
            this.dependents = [{
              name: userData.dependents[i].name,
              birthDate: userData.dependents[i].birthDate,
            }]
          }
      })
    }
  }
}
</script>

<style>

</style>