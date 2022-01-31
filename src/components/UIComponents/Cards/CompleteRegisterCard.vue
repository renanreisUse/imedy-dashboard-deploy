<template>
  <div class="card" v-show="registerWarning">
    <div class="card-content">
      <div class="conteudo">
        <div class="title">
            <img src="static/img/icons/Bulb.svg"/>
        </div>
        <div class="card-header">
            <h3 class="">Completar cadastro profissional</h3>
            <span>O pré cadastro de profissionais via dashboard (Arquivo .CSV)
             não <br/>isenta da obrigatoriedade do mesmo ao completar o cadastro com <br/>dados da <span class="blue">clínica, 
             secretária(o), modalidade e horários <br/> de atendimentos</span> no App Imedy.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    registerWarning: {
      type: Boolean,
      required: false
    }
  }
}
</script>
<style scoped>
.conteudo{
  display: flex;
  margin: 20px 30px;
}
.title img{
  margin-top: 4px;
}
.card-header{
  font-weight: 600;
}
.card-header h3{
  margin-top: 0;
}
.blue{
  color: #7CB4FB ;
}
</style>
