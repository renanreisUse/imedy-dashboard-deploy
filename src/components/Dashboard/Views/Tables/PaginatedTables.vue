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
          <p>Visualizando:</p>
          <el-select
            class="select-default"
            v-model="pagination.perPage"
            placeholder="Per page"
            @change="pageValue"
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
          <div class="registerByDash" v-show="registerByDash">
            <img src="static/img/icons/dashboard-icon.svg" />
            <p>Cadastro via Dashboard</p>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="pull-right">
            <label>
              <input 
                type="search" 
                class="form-control input-sm" 
                placeholder="Buscar..." 
                v-model="searchQuery" 
                aria-controls="datatables">
            </label>
          </div>
        </div>
        <div class="col-sm-12">
          <el-table
            class="table-striped"
            :data="queriedData"
            border
            style="width: 100%"
          >
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
                <a
                  class="btn btn-simple btn-xs btn-warning btn-icon edit"
                  @click="eyeButton(props.$index, props.row.id)"
                  ><i class="ti-eye"></i
                ></a>
                <a
                  v-show="deleteBtn"
                  class="btn btn-simple btn-xs btn-danger btn-icon remove"
                  @click="handleDelete(props.$index, props.row.id)"
                  ><i class="ti-close"></i
                ></a>
                <p-switch
                  v-show="showSwitch"
                  @click.native="changeSwitch(props.$index, props.row.status, props.row.id)"
                  v-model="props.row.status"
                  type="primary"
                  on-text="ATIVA"
                  off-text="INATIVA"
                ></p-switch>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="col-sm-6 pagination-info">
          <p class="category">Página {{pagination.currentPage}} de {{totalPages}} páginas</p>
        </div>
        <div class="col-sm-6 pagination-icons">
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
    queriedData() {
      if (!this.searchQuery) {
        this.pagination.total = this.tableData.length;
        return this.pagedData;
      }
      let result = this.tableData.filter(row => {
        let isIncluded = false;
        for (let key of this.propsToSearch) {
          let rowValue = row[key].toString();
          if (rowValue.includes && rowValue.includes(this.searchQuery)) {
            isIncluded = true;
          }
        }
        return isIncluded;
      });
      this.pagination.total = result.length;
      return result.slice(this.from, this.to);
    },
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
      searchQuery: ""
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
    showActions: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    changeSwitch(index, status, id){
      this.$emit('switch-value', status, id)
    },
    pageValue(page) {
      this.$emit("page-value", { limit: this.pagination.perPage, page: page });
    },
    eyeButton(index, id) {
      this.$emit("eye-btn", id);
    },
    handleDelete(index, id) {
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
        Swal("Sucesso!", "Cadastro excluido com sucesso", "success");
        this.$emit("delete-row", id);
      });
    }
  }
};
</script>
<style scoped>
p.category {
  margin-top: 3.5rem;
  color: #222;
}
.category h3 {
  color: #262626;
}
#table-itens {
  color: #8c8c8c;
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
.registerByDash {
  display: flex;
}
.ti-eye {
  padding: 5px;
  background-color: #718efa;
  color: #fff;
  border-radius: 3px;
}
.ti-close {
  padding: 5px;
  background-color: #ef0028;
  border-radius: 5px;
  color: #fff;
}
.pagination-icons {
  display: flex;
}
</style>
