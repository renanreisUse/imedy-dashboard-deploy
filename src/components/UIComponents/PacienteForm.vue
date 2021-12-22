<template>
  <div class="card">
    <div class="card-header">
      <h3 class="title">Perfil paciente</h3>
    </div>
    <div class="card-content">
      <form>
        <div class="row">
          <div class="col-md-6">
            <fg-input
              type="email"
              label="E-mail de acesso"
              :disabled="true"
              placeholder="Email"
              :value="form.email"
            >
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              type="cpf"
              label="CPF"
              :disabled="true"
              placeholder="CPF"
              :value="form.cpf"
            >
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Nome Completo"
              :disabled="true"
              :value="form.fullName"
            >
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Data de nascimento"
              :disabled="true"
              placeholder="Last Name"
              :value="form.birthDate"
            >
            </fg-input>
          </div>
        </div>

        <h3 id="dependent">Dependentes</h3>

        <div
          class="row lastInput"
          v-for="(dependent, index) in dependents"
          :key="index"
          :v-show="dependents.length > 0"
        >
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Nome fantasia"
              placeholder="Home Address"
              :disabled="true"
              :value="dependent.name"
            >
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Data de nascimento"
              placeholder="Last Name"
              :disabled="true"
              :value="dependent.birthDate"
            >
            </fg-input>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: false
    },
    dependents: {
      type: Array,
      required: false
    }
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.title h3 {
  margin-top: 30px;
}
.card-content input[type="text"] {
  color: black;
}
#dependent {
  margin-bottom: 31px;
}
.lastInput {
  margin-bottom: 58.5px;
}
</style>
