<template>
  <div class="card">
    <div class="card-header">
      <h3 class="title">{{title}}</h3>
    </div>
    <div class="card-content">
      <form>
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      label="Especialidade"
                      :disabled="true"
                      :value="form.specialty">
            </fg-input>
          </div>
          <div class="col-md-2">

            <fg-input type="text"
                      label="Mátricula"
                      :disabled="true"
                      :value="form.registration">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="email"
                      label="E-mail"
                      :disabled="true"
                      placeholder="Email"
                      :value="form.email">
            </fg-input>
          </div>
          
          <div class="col-md-6">
            <fg-input type="text"
                      label="Nome completo"
                      :disabled="true"
                      :value="form.fullName">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Data de nascimento"
                      :disabled="true"
                      placeholder="Last Name"
                      :value="form.birthDate">
            </fg-input>
          </div>
        </div>

        <div v-show="showSecondInfo" class="otherInformations">
          <h3>Dados da Clínica</h3>
          
          <div class="row">
            <div class="col-md-12">
              <fg-input type="text"
                        label="Nome fantasia"
                        :disabled="true"
                        placeholder="Home Address"
                        :value="form.fantasyName">
              </fg-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <fg-input type="text"
                        label="Endereço da Clínica"
                        :disabled="true"
                        placeholder="Home Address"
                        :value="form.address">
              </fg-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <fg-input type="text"
                        label="Cidade"
                        :disabled="true"
                        placeholder="City"
                        :value="form.city">
              </fg-input>
            </div>
            <div class="col-md-4">
              <fg-input type="text"
                        label="Estado(UF)"
                        :disabled="true"
                        placeholder="Country"
                        :value="form.country">
              </fg-input>
            </div>
            <div class="col-md-4">
              <fg-input type="number"
                        label="CEP"
                        :disabled="true"
                        placeholder="ZIP Code"
                        :value="form.postalCode">
              </fg-input>
            </div>
          </div>

          <h3>Dados da(o) Secrétaria(o)</h3>

          <div class="row">
            <div class="col-md-12">
              <fg-input type="text"
                        label="Nome completo"
                        :disabled="true"
                        placeholder="Home Address"
                        :value="form.secretaryName">
              </fg-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <fg-input type="text"
                        label="E-mail"
                        :disabled="true"
                        placeholder="Home Address"
                        :value="form.secretaryMail">
              </fg-input>
            </div>
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
        required: true
      },
      title: {
        type: String,
        required: true
      },
      showSecondInfo: {
        type: Boolean
      }
    },
    data () {
      return {
      }
    }
  }
</script>
<style scoped>
.title h3{
    margin-top: 30px;
}
.card-content input[type=text]{
  color: black;
}
</style>