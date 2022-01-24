<template>
  <div class="card">
    <div class="card-header">
      <h3 class="title">Perfil</h3>
    </div>
    <div class="card-content">
      <div class="row">
        <div class="col-lg-12">
          <fg-input
            type="email"
            label="E-mail de acesso"
            :disabled="true"
            placeholder="Email"
            v-model="profile.email"
          >
          </fg-input>
        </div>
      </div>

      <div class="row inputs">
        <div class="col-md-6">
          <fg-input
            type="text"
            label="Nome"
            :disabled="true"
            placeholder="Nome"
            v-model="profile.name"
          >
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-input
            type="text"
            label="Sobrenome"
            :disabled="true"
            placeholder="Sobrenome"
            v-model="profile.lastName"
          >
          </fg-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: Object
  }
};
</script>

<style scoped>
.inputs {
  margin-bottom: 9.5rem;
}
</style>
