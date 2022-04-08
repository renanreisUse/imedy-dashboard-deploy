<template>
    <div class="modal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <h3>Pré cadastrar profissionais</h3>
            <p>Cadastro via CSV</p>
            <label for="file" class="imedy-btn">ANEXAR ARQUIVO .CSV
              <input type="file" id="file" class="btn-csv" @change="changed">
            </label>
            <a href="static/files/Imedy_Modelo Cadastro de Profissionais.csv" download >Baixar modelo
              <el-popover
                placement="top-start"
                width="300"
                trigger="hover"
                content="Baixar e seguir o modelo do arquivo.">
                <img slot="reference" src="static/img/icons/Info.svg"/> 
              </el-popover>
            </a>
          </div>
          <div class="modal-footer">
            <button type="button" class="closeModal" @click="closeModal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { Popover } from "element-ui"; 
import Vue from "vue";
Vue.use(Popover)
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
    padding: 0px 55px;
  }
  .modal-body p{
   font-weight: 300;
   font-size: 18px;
   line-height: 21.2px;
   color: #595555;
  }
  .modal-body label{
    font-weight: 600;
    font-size: 12px;
    line-height: 14.63px;
    width: 317.7px;
    text-align: center;
  }
  .modal-dialog{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content h3{
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 30px;
    line-height: 35.79px;
    color: #595555;
    font-family: 'HelveticaNeue';
  }
  .modal-content, .btn-csv, p, a {
    margin-bottom: 20px;
  }
  .closeModal{
    color: #718EFA;
    background: none;
    border: none;
    font-size: 18px;
    font-weight: 300;
  }
  .modal-footer{
    display: flex;
    border-top: none;
    justify-content: center;
  }
  a{
    margin-top: 30px;
    color: #987BEC;
    font-size: 18px;
    cursor: pointer;
    line-height: 21.2px;
    font-weight: 300;
  }
  .modal-body img{
    width: 20px;
    height: 18px;
    color: #987BEC;
  }
  input[type="file"] {
    display: none;
  }
</style>
<style>
.el-popover{
  background: rgb(124, 180, 251) !important;
  border: none;
  color: rgb(38, 38, 38);
  opacity: 0.8;
}
</style>