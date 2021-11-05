<template>
  <div class="row">
    <div class="col-lg-4 col-md-5">
      <user-card
        :user="user"
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
      <profissional-form
        title="Perfil Profissional"
        :form="form"
      />
    </div>
  </div>
</template>

<script>
import api from 'src/services/api.js'
import ProfissionalForm from 'src/components/UIComponents/ProfissionalForm.vue'
import DocumentsCard from '../../../../UIComponents/Cards/DocumentsCard.vue'
import UserCard from '../../../../UIComponents/UserCard.vue'
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
        api
          .delete(`/profissionais/${id}`)
          .then(() => {
            this.$router.push(`/usuarios/profissional`)
          })
      })
    }
  },
  mounted () {
    const id = this.$route.params.id
    if (id) {
      api
      .get(`/profissionais/${id}`)
      .then((result) => {
        const userData = result.data
        this.user = {
          name: userData.name,
          email: userData.email,
          birthday: userData.birthday,
          image: userData.image
        }
        this.form = {
          specialty: userData.specialty,
          registration: userData.registration,
          email: userData.email,
          fullName: userData.name,
          birthday: userData.birthday,
          fantasyName: userData.fantasyName,
          address: userData.address,
          city: userData.city,
          country: userData.country,
          postalCode: userData.postalCode,
          secretaryName: userData.secretaryName,
          secretaryMail: userData.secretaryMail
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
</style>
