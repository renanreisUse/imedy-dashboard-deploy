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
            maxlength="30"
          />
          <p class="textCounter">0/{{(30 - pushTitle.length)}}</p>

          <label for="notification-title">Conteúdo da Notificação</label>
          <textarea 
            class="form-control" 
            rows="3"
            v-model="pushContent" 
            :maxlength="100"
          />
          <p class="textCounter">0/{{(100 - pushContent.length)}}</p>
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
            v-for="tag in dynamicTags"
            :key="tag"
            :closable="true"
            :close-transition="false"
            @close="handleClose(tag)"
          >
            {{tag}}
          </el-tag> <br/>
          <div class="inputArea">
           <newDropdown
              v-model="searchUser"
              v-on:selected="validateSelection"
              :options="queryUsers"
              :disabled="disabled"
              name="search"
              ref="saveTagInput"
              placeholder="Insira o nome de um usuário"
            />
          <button class="save-btn text-uppercase" @click="savePush">Enviar</button>
          </div>

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
      dynamicTags: [],
      checkedCategories: [],
      queryUsers: [],
      disabled: true,
      pushTitle: '',
      pushContent: '',
      searchUser: ''
    }
  },
  methods: {
    savePush () {
      const data = {
        title: this.pushTitle,
        body: this.pushContent,
        recipients: this.checkedCategories,
        users: this.dynamicTags
      }
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
        NotificationService.createNotification(data)
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
      }
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    cleanInputs () {
      this.pushTitle = ''
      this.pushContent = ''
      this.checkedCategories = ''
      this.dynamicTags = ''
    },
    validateSelection(selection) {
      let selectedValue = selection.name
      if (selectedValue) {
        this.dynamicTags.push(selectedValue)
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
.inputArea{
  display: flex;
  justify-content: space-between;
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