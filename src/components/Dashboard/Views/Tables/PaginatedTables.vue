<template>
  <div class="">
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">
          <h3>{{ tableName }}</h3>
        </div>
      </div>
      <div class="card-content row">
        <div class="col-sm-6" id="table-itens">
          
          <slot name="filter"></slot>
          
          <div v-if="showVisualization" class="paginationItem">
            <p>Visualizando:</p>
            <el-select
              class="select-default"
              v-model="pagination.perPage"
              placeholder="Per page"
              @input="pageValue"
            >
              <el-option
                class="select-default"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>

            <div class="registerByDash" v-if="registerByDash">
              <img :src="iconsPath + 'dashboard-icon.svg'" />
              <p>Cadastro via Dashboard</p>
            </div>
          </div>
          <div class="pull-right searchDiv">
            <label>
              <input 
              v-model="searchQuery"
               @input="updateSearchData"
                type="text" 
                class="searchBar" 
                placeholder="Buscar..." >
            </label>
          </div>
        </div>
       
        <div class="col-sm-12">
          <el-table
            class="table-striped"
            :data="tableData"
            border
            style="width: 100%"
          >
          <div slot="append" v-if="!tableData.length" class="EmptyTable">
            <img src="static\img\Flower.svg">
            <p>Não há nada para mostrar</p>
          </div>
            <!--Coluna com icone para medicos criado por CSV-->
            <el-table-column 
              v-for="edits in editTableColums" 
              :key="edits.prop" 
              :prop="edits.prop" 
              :min-width="edits.minWidth"
            >
              <template slot="header">
                {{edits.label}}
              </template>
              <template slot-scope="props">
                <img :src="iconsPath + 'createCsv.svg'" v-if="props.row.createdThroughCsv">
                <span style="margin-left:13px;">
                  {{props.row[edits.prop]}}
                </span>
              </template>
            </el-table-column>

            <!--Coluna para inserir bagde coloridos em destinatarios-->
            <el-table-column 
              v-for="badge in badgeColumn" 
              :key="badge.prop" 
              :prop="badge.prop" 
              :min-width="badge.minWidth"
            >
              <template slot="header">
                {{badge.label}}
              </template>
              <template slot-scope="props">
                <span v-if="props.row.recipients === 'PACIENTES NÃO BENEFICIÁRIOS'" class="blue-badge">
                  {{props.row[badge.prop]}}
                </span>
                <span v-else-if="props.row.recipients  === 'PACIENTES BENEFICIÁRIOS'" class="imedy-badge">
                   {{props.row[badge.prop]}}
                </span>
                <span v-else-if="props.row.recipients  === 'TODOS OS PACIENTES' || props.row.recipients  === 'CADASTRO'" class="purple-badge">
                  {{props.row[badge.prop]}}
                </span>
                <span v-else-if="props.row.recipients  === 'TODOS OS PROFISSIONAIS' || props.row.recipients  === 'EDITOR'" class="golden-badge">
                  {{props.row[badge.prop]}}
                </span>
                <span v-else-if="props.row.recipients  === 'PROFISSIONAIS ASSOCIADOS' || props.row.recipients  === 'ADM SÊNIOR'" class="green-badge">
                  {{props.row[badge.prop]}}
                </span>
                 <span v-else-if="props.row.recipients === 'PROFISSIONAIS NÃO ASSOCIADOS'" class="red-badge">
                  {{props.row[badge.prop]}}
                </span>
                 <span v-else-if="props.row.recipients === 'Usuários'" class="select-users">
                  {{props.row[badge.prop]}}
                </span>
                 <span v-else>
                  {{props.row[badge.prop]}}
                </span>
                
              </template>
            </el-table-column>

            <el-table-column
              v-for="column in tableColumns"
              :key="column.label"
              :min-width="column.minWidth"
              :prop="column.prop"
              :label="column.label"
            >
            </el-table-column>

            <el-table-column
              :min-width="120"
              fixed="right"
              label="AÇÕES"
              v-if="showActions"
            >
              <template slot-scope="props">
                <div class="actionIcons">
                  <button
                    v-if="showProfile"
                    class="btn-icons btn-blue"
                    @click="profileButton(props.$index, props.row.id)"
                  ><img :src="iconsPath + 'table/user-profile.svg'" /></button>

                  <button
                    class="btn-icons btn-blue"
                    v-if="showEye"
                    @click="eyeButton(props.$index, props.row.id)"
                  ><img :src="iconsPath + (showProfile ? 'table/medic.svg' : 'table/eye.svg')" /></button>

                  <button
                    class="btn-icons btn-purple"
                    v-if="showEdit"
                    @click="editButton(props.$index, props.row.id)"
                  ><img :src="iconsPath + 'table/edit.svg'" /></button>

                  <button
                    class="btn-icons btn-red"
                    v-if="deleteBtn"
                    @click="handleDelete(props.$index, props.row.id)"
                  ><img :src="iconsPath + 'table/close.svg'" /></button>

                  <p-switch
                    v-if="showSwitch"
                    @click.native="changeSwitch(props.$index, props.row.status, props.row.id)"
                    v-model="props.row.status"
                    type="primary"
                    on-text="ATIVA"
                    off-text="INATIVA"
                  ></p-switch>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="showPageCount" class="col-sm-6 pagination-info">
          <p class="category">Página {{pagination.currentPage}} de {{totalPages}} páginas</p>
        </div>
        <div class="col-sm-12 pagination-icons">
          <p-pagination
            class="pull-right"
            @input="pageValue"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="rows"
          >
          </p-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import PSwitch from "src/components/UIComponents/Switch.vue";
import { Table, TableColumn, Select, Option } from "element-ui";
import PPagination from "src/components/UIComponents/Pagination.vue";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
export default {
  components: {
    PPagination,
    PSwitch
  },
  computed: {
    pagedData() {
      return this.tableData.slice(this.from, this.to);
    },
    /***
     * Searches through table data and returns a paginated array.
     * Note that this should not be used for table with a lot of data as it might be slow!
     * Do the search and the pagination on the server and display the data retrieved from server instead.
     * @returns {computed.pagedData}
     */
    rows() {
      return this.totalPages * this.pagination.perPage;
    }
  },
  data() {
    return {
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50]
      },
      debounce: null,
      searchQuery: '',
      iconsPath: 'static/img/icons/'
    };
  },
  props: {
    switches: Object,
    totalPages: Number,
    showSwitch: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      required: true
    },
    propsToSearch: {
      type: Array,
      required: true
    },
    tableColumns: {
      type: Array,
      required: true
    },
    tableName: {
      type: String,
      required: false
    },
    registerByDash: {
      type: Boolean,
      required: false
    },
    deleteBtn: {
      type: Boolean,
      required: false
    },
    showVisualization: {
      type: Boolean,
      default: true
    },
    showPageCount: {
      type: Boolean,
      default: false
    },
    showActions: {
      type: Boolean,
      default: true
    },
    showProfile: {
      type: Boolean,
      default: false
    },
    showEye: {
      type: Boolean,
      default: true
    },
    showEdit: {
      type: Boolean,
      default: false
    },
    editTableColums: {
      type: Array,
      default: () => {}
    },
    badgeColumn: {
      type: Array,
      default: () => {}
    }
  },
  methods: {
    updateSearchData(){
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
         this.$emit('search-table', this.searchQuery)
      }, 500)
    },
    changeSwitch(index, status, id) {
      this.$emit('switch-value', status, id)
    },
    pageValue(page) {
      this.$emit("page-value", { limit: this.pagination.perPage, page: page });
    },
    profileButton(index, id) {
      this.$emit("profile-btn", id);
    },
    eyeButton(index, id) {
      this.$emit("eye-btn", id);
    },
    editButton(index, id) {
      this.$emit("edit-btn", id);
    },
    handleDelete(index, id) {
      if (this.showProfile) {
        this.$emit("delete-row", id);
      } else {
        Swal({
          title: "Excluir cadastro",
          text: "Deseja mesmo excluir este cadastro?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#19B128",
          cancelButtonColor: "#EF0028",
          confirmButtonText: "SIM, EXCLUIR",
          cancelButtonText: "CANCELAR"
        }).then(() => {
          this.$emit("delete-row", id);
        });
      }
    }
  }
};
</script>

<style scoped>
.actionIcons{
  display: flex;
  justify-content: space-evenly;
}
.EmptyTable{
  display: flex;
  justify-content: center;
  padding: 30px;
  flex-direction: column;
  text-align: center;
}
.EmptyTable img{
  height: 135px;
  margin-bottom: 20px;
}
.EmptyTable p {
font-size: 24px;
  color: #262626;
}
p.category {
  margin-top: 3.5rem;
  color: #262626;
  line-height: 17.07px;
}
.category h3 {
  font-size: 24px;
  line-height: 29.26px;
  color: #262626;
}
.card-content p{
  font-size: 14px;
}
#table-itens {
  color: #8c8c8c;
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  justify-content: space-between;
}
.paginationItem{
  display: flex;
}
#table-itens p,
.select-default {
  margin-right: 12px;
}
#table-itens img {
  cursor: pointer;
  margin-right: 5px;
  width: 15px;
  height: 20px;
}
@media (max-width: 600px) {
  #table-itens{
    flex-direction: column;
  }
  .searchDiv label input{
    width: 100%;
  }
}
.registerByDash {
  display: flex;
}
.pagination-icons {
  display: flex;
  justify-content: center;
}
.searchBar {
  padding: 2px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #C0C0C0;
  color: #262626;
}
</style>
<style>
span.el-input__suffix-inner{
  display: none;
}
tr th:nth-child(6) {  
  text-align: right;
}
.el-table__empty-block{
  display: none !important;
}
.el-table--border {
  border:1px solid #C0C0C0;
}
.select-default.el-select .el-input input{
  line-height: 17.07px;
  color: #595555;
}
</style>