<template>
  <div class="card col-lg-12">
    <div class="card-header">
      <h3 class="title">Criar Notificações</h3>
    </div>

    <div class="card-content">
    <div class="row">
      <div class="content-inputs col-lg-6">
        <label for="notification-title">Título da Notificação</label>
        <textarea class="form-control" rows="3" v-model="pushTitle"></textarea>
        <label for="notification-title">Conteúdo da Notificação</label>
        <textarea class="form-control" rows="3" v-model="pushContent"></textarea>
      </div>

      <div class="notification-destiny col-lg-4">
        <p>Destino da notificação</p>
        <p-checkbox  v-model="unchecked">Usuário</p-checkbox>
        <p-checkbox  v-model="unchecked">Todos os pacientes</p-checkbox>
        <p-checkbox  v-model="unchecked">Todos os profissionais</p-checkbox>
        <p-checkbox  v-model="unchecked">Profissionais Associados</p-checkbox>
        <p-checkbox  v-model="unchecked">Profissionais não associados</p-checkbox>
        <p-checkbox  v-model="unchecked">Pacientes benefíciarios</p-checkbox>
        <p-checkbox  v-model="unchecked">Pacientes não benefíciarios</p-checkbox>
      </div>

      <div class="search-user col-lg-12">
        <label for="search">Buscar Usuário</label> <br>
        <input type="text" name="search" placeholder="Insira o nome de um usuário" :disabled="disabled">
        <button class="save-btn" @click="savePush">SALVAR</button>
      </div>

    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      unchecked: false,
      checked: true,
      disabled: true,
      pushTitle: '',
      pushContent: ''
    }
  },
  methods: {
    savePush () {
      const data = {
        title: this.pushTitle,
        content: this.pushContent
      }
      alert(`${data.title} - ${data.content} `)
    }
    /* tester () {
      if (usuario === active){
        this.disabled = false
      }
    } */
  }
}
</script>

<style scoped>
label, p{
  color: #262626;
}
.content-inputs label{
  margin-bottom: 10px;
}
.content-inputs textarea{
  margin-bottom: 30px;
}
.search-user {
  margin-bottom: 50px;
}
.search-user input{
  margin-top: 10px;
  margin-right: 90px;
  margin-bottom: 10px;
  width: 70%;
  background-color: #EEEEEE;
  border-radius: 4px;
  height: 40px;
  padding: 12px;
  color: #8C8C8C;
  border: none;
}
.search-user button{
  font-weight: 700;
  padding: 10px 35px;
  background-color: #8C8C8C;
  color:#fff;
  border-radius: 3px;
  border: none;
  letter-spacing: 0.5px;
}
</style>