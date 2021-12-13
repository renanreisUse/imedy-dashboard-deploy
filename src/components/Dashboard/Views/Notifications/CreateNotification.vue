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
              :value="item.value" 
              :id="item.name" 
              @change="check($event)"
            >
            <label>{{ item.name }}</label>
          </div>
        </div>

        <div class="search-user col-lg-12">
          <label for="search">Buscar Usuário</label> <br>
           <el-tag
            class="el-tag"
            type="imedy"
            v-for="tag in tags.dynamicTags"
            :key="tag"
            :closable="true"
            :close-transition="false"
            @close="handleClose(tag)"
          >
            {{tag}}
          </el-tag> <br/>
          <newDropdown
            ref="saveTagInput"
            v-model="searchUser"
            :options="queryUsers"
            v-on:selected="validateSelection"
            name="search"
            :disabled="disabled"
            placeholder="Insira o nome de um usuário"
          />
          <button class="save-btn text-uppercase" @click="savePush">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationService from "src/services/notification.service";
import UserService from "src/services/user.service";
import Swal from 'sweetalert2'
import {Tag} from 'element-ui'
import newDropdown from 'src/components/UIComponents/newDropdown.vue'
import 'sweetalert2/dist/sweetalert2.css'
export default {
  components: {
    [Tag.name]: Tag,
    newDropdown
  },
  data () {
    return {
      names: [
        { name: 'Todos', value: 'ALL', checked: false },
        { name: 'Usuário', value: 'SELECTED_USERS', checked: false },
        { name: 'Todos os pacientes', value: 'PATIENTS', checked: false },
        { name: 'Todos os profissionais', value: 'DOCTORS', checked: false },
        { name: 'Profissionais Associados', value: 'ASSOCIATED_DOCTORS', checked: false },
        { name: 'Profissionais não associados', value: 'NOT_ASSOCIATED_DOCTORS', checked: false },
        { name: 'Pacientes benefíciarios', value: 'BENEFICIARY_PATIENT', checked: false },
        { name: 'Pacientes não benefíciarios', value: 'NOT_BENEFICIARY_PATIENT', checked: false }
      ],
      tags: {
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      },
      checkedCategories: [],
      queryUsers: [],
      disabled: true,
      pushTitle: '',
      titleMax: 30,
      pushContent: '',
      contentMax: 100,
      searchUser: ''
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
      console.log(data)
      if (this.checkedCategories.length === 0 || this.pushContent === '' || this.pushTitle === '') {
        Swal({
          type: 'warning',
          title: 'Ops, algo deu errado',
          text: 'Preencha todos os campos.',
          confirmButtonColor: '#EF0028',
          confirmButtonText: 'OK'
        })
      } else {
        this.$router.push('/notifications/list')
        NotificationService.createNotifications(data)
        .then(() => {
          Swal({
            type: 'success',
            title: 'Sucesso!',
            text: `Sua notificação foi enviada com sucesso. `,
            confirmButtonColor: '#19B128',
            confirmButtonText: 'OK'
          })
          this.cleanInputs()
        })
        .catch(() => {
          Swal({
            type: 'warning',
            title: 'Ops, algo deu errado',
            text: 'Notificação não enviada. Tente novamente.',
            confirmButtonColor: '#19B128',
            confirmButtonText: 'FECHAR'
          })
          this.cleanInputs()
        })
      }
    },
    check () {
      const checkedCategories = this.checkedCategories
      if (checkedCategories === 'SELECTED_USERS') {
        this.disabled = false
        this.$refs.saveTagInput.focus()
      }
    },
    handleClose (tag) {
      this.tags.dynamicTags.splice(this.tags.dynamicTags.indexOf(tag), 1)
    },
/*     handleInputConfirm () {
      let inputValue = this.tags.inputValue
      if (inputValue) {
        this.tags.dynamicTags.push(inputValue)
      }
      this.tags.inputVisible = false
      this.tags.inputValue = ''
      console.log('ola')
    }, */
    cleanInputs () {
      this.pushTitle = ''
      this.pushContent = ''
      this.checkedCategories = ''
      this.tags.dynamicTags = ''
    },
    validateSelection(selection) {
      let selectedValue = selection.name
      if (selectedValue) {
        this.tags.dynamicTags.push(selectedValue)
      }
    },
  },
  mounted () {
    UserService.queryUsers(this.searchUser)
    .then(({data})=>{this.queryUsers = data.users})
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
  background-color: #718EFA;
  color:#fff;
  border-radius: 3px;
  border: none;
  letter-spacing: 0.5px;
}
</style>