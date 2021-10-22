<template>
  <div class="card card-user">
    <div class="card-content">
      <div class="author">
        <img class="avatar border-white" src="static/img/faces/Image_Cassiane.png" alt="Imagem do Usuario.">
        <h4 class="title">{{userName}}</h4>
      </div>
      <div class="text-center">
        <div class="description-group">
          <img class="description-icon" src="static/img/icons/Letter.svg" alt="Icone de Carta.">
          <p>{{userEmail}}</p>
        </div>
        <div class="description-group">
          <img class="description-icon" src="static/img/icons/Cake.svg" alt="Icone de Bolo.">
          <p>{{userBirthday}}</p>
        </div>
      </div>

        <div class="account-status">
          <div class="account-title">
            <h4>Status da conta</h4>
          </div>
          <div class="account-switchs">
           <p-switch v-model="switches.defaultOn" type="primary" on-text="ATIVA" off-text="EL KADRI" id="switchs"></p-switch>
           <p-switch v-model="switches.defaultOff" type="primary" on-text="ATIVA" off-text="EL KADRI"></p-switch>
          </div>
      </div>
    </div>
    
    
  </div>
</template>
<script>
  import PSwitch from 'src/components/UIComponents/Switch.vue'
  export default {
    components: {
      PSwitch
    },
    data () {
      return {
        switches: {
          defaultOn: true,
          plainOn: true,
          withIconsOn: true
        }
      }
    },
    props: {
      userName: {
        type: String,
        required: true
      },
      userEmail: {
        type: String,
        required: true
      },
      userBirthday: {
        type: String,
        required: true
      }
    }
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
.account-title h4{
  font-size: 22px;
  font-weight: 400;
}
.account-status{
  margin-left: 20px;
}
</style>