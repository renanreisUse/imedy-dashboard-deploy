<template>
  <div class="card card-user">
    <div class="card-content">
      <div class="author">
        <img class="avatar border-white" :src="user.image" alt="Imagem do Usuario.">
        <h4 class="title">{{user.name}}</h4>
      </div>
      <div class="text-center">
        <div class="description-group">
          <img class="description-icon" src="static/img/icons/Letter.svg" alt="Icone de Carta.">
          <a :href="'mailto:'+ user.email">
            {{user.email}}
          </a>
        </div>
        <div class="description-group">
          <img class="description-icon" src="static/img/icons/Cake.svg" alt="Icone de Bolo.">
          <p>{{user.birthDate}}</p>
        </div>
      </div>

       <div class="account-status">
          <div class="account-title">
            <h4>Status da conta</h4>
          </div>
          <div class="account-switchs">
           <p-switch @click.native="changePatientStatus(user.status)" v-model="user.status" type="primary" on-text="ATIVA" off-text="INATIVA" id="switchs"></p-switch>
           <p-switch @click.native="changeElKadriStatus(user.elKadriStatus)" v-model="user.elKadriStatus" v-show="showElKadriStatus" type="primary" on-text="EL KADRI" off-text="EL KADRI"></p-switch>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import PSwitch from 'src/components/UIComponents/Switch.vue'
  import PatientService from 'src/services/patient.service.js'
  export default {
    props: {
      user: {
        type: Object,
        required: true
      },
      showElKadriStatus: Boolean
    },
    components: {
      PSwitch
    },
    data () {
      return {
        switches: {
          defaultOn: true,
          plainOn: true,
          withIconsOn: true,
          value: true
        },
      }
    },
    methods:{
      changePatientStatus(value){
        this.$emit('account-switch', value)
      },
      changeElKadriStatus(value){
        this.$emit('elKadri-switch', value)
      }
    },
  }

</script>
<style scoped>
.title{
  margin-top: 0;
}
.card-user .author{
  margin-bottom: 25px;
}
.description-icon{
  height: 30px;
  width: 30px;
  cursor: pointer;
  margin-left: 30px;
  margin-bottom: 10px;
}
.description-group{
  align-items: center;
  display: flex;
}
.description-group p{
 margin-left: 10px;
 color: #987BEC;
}
.description-group a{
 margin-left: 10px;
 text-decoration: underline;
 color: #987BEC;
}
.account-title h4{
  font-size: 22px;
  font-weight: 400;
}
.account-status{
  margin-left: 20px;
}
</style>