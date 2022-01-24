<template>
  <div class="card" v-show="registerWarning">
    <div class="card-content">
      <div class="conteudo">
        <div class="title">
            <img src="static/img/icons/Bulb.svg"/>
        </div>
        <div class="card-header">
            <h3 class="">{{title}}</h3>
            <span>{{content}}</span>
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
    },
    title: String,
    content: String
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
.card-header span{
  color: #7CB4FB ;
}
</style>
