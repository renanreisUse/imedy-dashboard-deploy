<template>
  <div class="card col-lg-12">
    <div class="card-header">
      <h3 class="title">Criar Notificações</h3>
    </div>

    <div class="card-content">
      <div class="row">
        <div class="content-inputs col-lg-6">
          <label for="notification-title">Título da Notificação</label>
          <textarea 
            class="form-control" 
            rows="3" 
            v-model="pushTitle" 
            :maxlength="titleMax"
          />
          <p class="textCounter">0/{{(titleMax - pushTitle.length)}}</p>

          <label for="notification-title">Conteúdo da Notificação</label>
          <textarea 
            class="form-control" 
            rows="3"
            v-model="pushContent" 
            :maxlength="contentMax"
          />
          <p class="textCounter">0/{{(contentMax - pushContent.length)}}</p>
        </div>

        <div class="notification-destiny col-lg-4">
          <p>Destino da notificação</p>
          <div class="radio" v-for="(item, index) in names" :key="index">
            <input 
              type="radio"
              v-model="checkedCategories"  
              :value="item.name" 
              :id="item.name" 
              @change="check($event)"
            >
            <label>{{ item.name }}</label>
          </div>
        </div>

        <div class="search-user col-lg-12">
          <label for="search">Buscar Usuário</label> <br>
           <el-tag
            :key="tag"
            class="el-tag"
            v-for="tag in tags.dynamicTags"
            type="imedy"
            :closable="true"
            :close-transition="false"
            @close="handleClose(tag)"
          >
            {{tag}}
          </el-tag> <br/>
          <input 
            type="text" 
            name="search" 
            placeholder="Insira o nome de um usuário" 
            :disabled="disabled"
            v-model="tags.inputValue"
            ref="saveTagInput"
            size="mini"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          <button class="save-btn" @click="savePush">SALVAR</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import {Tag} from 'element-ui'
import 'sweetalert2/dist/sweetalert2.css'
export default {
  components: {
    [Tag.name]: Tag
  },
  data () {
    return {
      names: [
        { name: 'Usuário', checked: false },
        { name: 'Todos os pacientes', checked: false },
        { name: 'Todos os profissionais', checked: false },
        { name: 'Profissionais Associados', checked: false },
        { name: 'Profissionais não associados', checked: false },
        { name: 'Pacientes benefíciarios', checked: false },
        { name: 'Pacientes não benefíciarios', checked: false }
      ],
      tags: {
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      },
      checkedCategories: [],
      disabled: true,
      pushTitle: '',
      titleMax: 30,
      pushContent: '',
      contentMax: 100
    }
  },
  methods: {
    savePush () {
      const data = {
        title: this.pushTitle,
        body: this.pushContent,
        recipients: this.checkedCategories,
        users: this.tags.dynamicTags
      }
      if (this.checkedCategories.length === 0 || this.pushContent === '' || this.pushTitle === '') {
        Swal({
          type: 'warning',
          title: 'Ops...!',
          text: 'Preencha todos os campos',
          confirmButtonColor: '#EF0028',
          confirmButtonText: 'OK'
        })
      } else {
        Swal({
          type: 'success',
          title: 'Sucesso!',
          text: `Sua notificação foi enviada com sucesso. `,
          confirmButtonColor: '#19B128',
          confirmButtonText: 'OK'
        })
        console.log(data)
      }
    },
    check (e) {
     // mudar a cor do botao salvar aqui
      const checkedCategories = this.checkedCategories
      if (checkedCategories === 'Usuário') {
        this.disabled = false
      }
    },
    handleClose (tag) {
      this.tags.dynamicTags.splice(this.tags.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.tags.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.tags.inputValue
      if (inputValue) {
        this.tags.dynamicTags.push(inputValue)
      }
      this.tags.inputVisible = false
      this.tags.inputValue = ''
    }
  }
}
</script>

<style scoped>
label, p{
  color: #262626;
}
p.textCounter{
  margin-top: 5px;
  color: #FA8C16;
}
.content-inputs label{
  margin-bottom: 10px;
}
.content-inputs p{
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