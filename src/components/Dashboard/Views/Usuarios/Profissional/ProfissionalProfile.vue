<template>
  <div class="row">
    <div class="col-lg-4 col-md-5">
      <user-card
        userName="Mariana Lima"
        userEmail="analisboaso@gmail.com"
        userBirthday="13/10"
      />
      <documents-card  
        cardName="Documentos"
        :showStatus=true
        />
    </div>

    <div class="col-lg-4 col-sm-6"  v-for="stats in statsCards" :key="stats.id">
        <stats-card>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
    </div>

    <div class="col-lg-8 col-md-7">
      <ProfissionalForm/>
    </div>
  </div>
</template>

<script>
import ProfissionalForm from 'src/components/Dashboard/Views/Forms/ProfissionalForm.vue'
import DocumentsCard from '../../../../UIComponents/Cards/DocumentsCard.vue'
import UserCard from '../../Pages/UserProfile/UserCard.vue'
import MembersCard from '../../Pages/UserProfile/MembersCard.vue'
import EditProfileForm from '../../Pages/UserProfile/EditProfileForm.vue'
import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'

export default {
  components: {
    UserCard,
    MembersCard,
    EditProfileForm,
    StatsCard,
    DocumentsCard,
    ProfissionalForm
  },
  data () {
    return {
      statsCards: [
        {
          type: '',
          icon: '',
          title: 'Atendimentos Realizados',
          value: '458',
          footerText: 'Todos',
          footerIcon: '',
          id: 1
        },
        {
          type: '',
          icon: '',
          title: 'Avaliação',
          value: '4,8',
          footerText: 'Todos',
          footerIcon: '',
          id: 2
        }
      ]
    }
  }
}
</script>

<style scoped>
.numbers p{
  font-size: 15px;
  color: #8C8C8C;
}
</style>
