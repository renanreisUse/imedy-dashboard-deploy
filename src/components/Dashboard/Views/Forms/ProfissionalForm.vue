<template>
  <div class="card">
    <div class="card-header">
      <h3 class="title">Perfil Profissional</h3>
    </div>
    <div class="card-content">
      <form>
        <div class="row">
          <div class="col-md-5">
            <fg-input type="text"
                      label="Especialidade"
                      :disabled="true"
                      placeholder="Paper dashboard"
                      v-model="user.company">
            </fg-input>
          </div>
          <div class="col-md-3">

            <fg-input type="text"
                      label="Mátricula"
                      placeholder="Username"
                      v-model="user.username">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="email"
                      label="E-mail"
                      placeholder="Email"
                      v-model="user.email">
            </fg-input>
          </div>
        </div>
        <h3>Dados da Clínica</h3>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Nome completo"
                      placeholder="First Name"
                      v-model="user.firstName">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Data de nascimento"
                      placeholder="Last Name"
                      v-model="user.lastName">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <fg-input type="text"
                      label="Nome fantasia"
                      placeholder="Home Address"
                      v-model="user.fantasyName">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <fg-input type="text"
                      label="Endereço da Clínica"
                      placeholder="Home Address"
                      v-model="user.address">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      label="Cidade"
                      placeholder="City"
                      v-model="user.city">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="Estado(UF)"
                      placeholder="Country"
                      v-model="user.country">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="number"
                      label="CEP"
                      placeholder="ZIP Code"
                      v-model="user.postalCode">
            </fg-input>
          </div>
        </div>

        <h3>Dados da(o) Secrétaria(o)</h3>

        <div class="row">
          <div class="col-md-12">
            <fg-input type="text"
                      label="Nome completo"
                      placeholder="Home Address"
                      v-model="user.secretaryName">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <fg-input type="text"
                      label="E-mail"
                      placeholder="Home Address"
                      v-model="user.secretaryMail">
            </fg-input>
          </div>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        user: {
          especialidade: 'Testerr',
          matricula: 'michael23',
          email: '',
          lastName: 'Faker',
          fantasyName: 'Clínica Mais Saúde',
          address: 'Melbourne, Australia',
          city: 'melbourne',
          postalCode: '',
          secretaryName: 'Marciah',
          secretaryMail: 'Marciah@gmails.comm'
        }
      }
    }
  }

</script>
<style scoped>
.title h3{
    margin-top: 30px;
}

</style>
