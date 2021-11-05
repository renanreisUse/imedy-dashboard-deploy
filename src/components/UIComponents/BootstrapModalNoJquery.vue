<template>
    <div class="modal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <h3>Cadastrar profissionais</h3>
            <p>Cadastro via CSV</p>
            <label for="file" class="myBtn">ANEXAR ARQUIVO .CSV
              <input type="file" id="file" class="btn-csv" @change="changed">
            </label>
            <a href="static/files/Imedy_Modelo Cadastro de Profissionais.csv" download>Baixar modelo <img src="static/img/icons/Info.svg"></a>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="closeModal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    methods: {
      closeModal () {
        this.$emit('close-modal-event')
      },
      changed (event) {
        this.$emit('change-input-event', event)
      }
    }
  }
</script>

<style scoped>
  .modal {
    display: block;
  }
  .modal-body{
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .modal-content h3{
    margin-bottom: 10px;
    font-weight: 800;
  }
  .modal-content, .btn-csv, p, a {
    margin-bottom: 20px;
  }
  a{
    margin-top: 30px;
    color: #987BEC;
    font-size: 18px;
  }
  .modal-body img{
    width: 20px;
    height: 18px;
    color: #987BEC;
  }
  input[type="file"] {
    display: none;
  }
  .myBtn{
  font-weight: 700;
  padding: 11px 35px;
  background-color: #718EFA;
  color:#fff;
  border-radius: 3px;
  border: none;
  letter-spacing: 0.5px;
  cursor: pointer;
}
</style>