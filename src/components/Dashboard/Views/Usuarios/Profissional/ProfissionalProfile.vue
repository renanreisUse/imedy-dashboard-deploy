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
      <ProfissionalForm
        title="Perfil Profissional"
        specialty="Cardiologista"
        registration='00372'
        email='johnny@gmail.com'
        fullName='johnny kleyson de oliveira'
        birthday='15/06/2002'
        fantasyName='teste gaga'
        address='rua sideropliss'
        city='natall'
        country='brasilzs'
        postalCode='5911015'
        secretaryName='maria joselzda'
        secretaryMail='mariokojsla@ninterndo.com'
      />
    </div>
  </div>
</template>

<script>

import ProfissionalForm from 'src/components/Dashboard/Views/Forms/ProfissionalForm.vue'
import DocumentsCard from '../../../../UIComponents/Cards/DocumentsCard.vue'
import UserCard from '../../Pages/UserProfile/UserCard.vue'
import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
import DeleteProfileButton from 'src/components/UIComponents/DeleteProfileButton.vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export default {
  components: {
    UserCard,
    StatsCard,
    DocumentsCard,
    ProfissionalForm,
    DeleteProfileButton
  },
  data () {
    return {
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
  methods: {
    deleteUserProfile () {
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
        // inserir função axioss de delção aquii
        console.log('inserir função axioss de delção aqui')
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
</style>
