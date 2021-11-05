<template>
  <div class="row">
   <div class="col-lg-4 col-md-5">
      <user-card
        :user="user"
      />
      <documents-card  
        cardName="Validação da carteirinha"
        :showStatus="false"
      />
      <delete-profile-button class="deleteBtn" 
        @click.native="deleteUserProfile"
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
      <PacienteForm :form="form"/>
    </div>
  </div>
</template>

<script>
import api from 'src/services/api.js'
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
      statsCards: [
        {
          title: 'Atendimentos Realizados',
          value: '458',
          footerText: 'Todos',
          id: 1
        },
        {
          title: 'Avaliação',
          value: '4,8',
          footerText: 'Todos',
          id: 2
        }
      ]
    }
  },
  mounted () {
    const id = this.$route.params.id
    if (id) {
      api
      .get(`/pacientes/${id}`)
      .then((result) => {
        const userData = result.data
        this.user = {
          name: userData.name,
          email: userData.email,
          birthday: userData.birthday,
          image: userData.image
        }
        this.form = {
          email: userData.email,
          cpf: userData.cpf,
          fullName: userData.name
        }
      })
    }
  }
}
</script>

<style>

</style>