<template>
  <div class="card">
    <div class="card-header">
      <h3 class="title">Perfil profissional</h3>
    </div>
    <div class="card-content">
      <form>
        <div class="row">
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Nome Completo"
              :disabled="true"
              placeholder="Insira seu nome"
              >
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Data de nascimento"
              :disabled="true"
              placeholder="INsira a data de nascimento"
              >
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-5">
            <fg-input
              type="text"
              label="Especialidade"
              :disabled="true"
              placeholder=""
              >
            </fg-input>
          </div>
          <div class="col-md-2">
            <fg-input 
              type="text"
              label="Mátricula"
              :disabled="true"
              >
            </fg-input>
          </div>
          <div class="col-md-5">
             <fg-input 
               type="email"
               label="E-mail de acesso"
               :disabled="true"
               placeholder="Email"
               >
            </fg-input>
          </div>
        </div>
      </form>
      <div class="status">
        <div class="account-status">
            <h3>Status da conta</h3>
        </div>
        <div class="documents-status">
            <h3>Status dos documentos</h3>
            <span class="text-uppercase">Aprovado</span>
            <p>Documentos aprovados fisicamente pelo administrador.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: false
    }
  }
}
</script>

<style scoped>
.status{
    display: flex;
    justify-content: space-between;
    
}
.documents-status span{
    font-size: 14px;
    background-color: #19B128;
    padding: 5px 40px;
    border-radius: 20px;
    font-family: Montserrat, sans-serif;
    color: white;
}
</style>
