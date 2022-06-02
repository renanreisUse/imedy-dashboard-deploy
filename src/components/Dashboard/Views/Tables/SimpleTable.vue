<template>
  <div class="">
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">
          <h3>{{ tableName }}</h3>
        </div>
      </div>
      <div class="card-content row">
        <div class="col-sm-12">
          <el-table
            class="table-striped"
            :data="tableData"
            border
            style="width: 100%"
          >
            <div slot="append" v-if="!tableData.length" class="EmptyTable">
              <img src="static\img\Flower.svg" />
              <p>Não há nada para mostrar</p>
            </div>

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
                  <a
                    class="btn btn-simple btn-xs btn-warning btn-icon edit"
                    v-if="canShow"
                    @click="showItem(props.$index, props.row.id)"
                    ><i class="ti-eye"></i
                  ></a>
                  <a
                    class="btn btn-simple btn-xs btn-warning btn-icon edit"
                    v-if="canEdit"
                    @click="editItem(props.$index, props.row.id)"
                    ><i class="ti-pencil-alt"></i
                  ></a>
                  <a
                    v-if="canDelete"
                    class="btn btn-simple btn-xs btn-danger btn-icon remove"
                    @click="deleteItem(props.$index, props.row.id)"
                    ><i class="ti-close"></i
                  ></a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Table, TableColumn, Select, Option } from "element-ui";

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
export default {
	data() {
		return {
		}
	},
	props: {
		tableName: {
      type: String,
      required: false
    },
		tableColumns: {
      type: Array,
      required: true
    },
		tableData: {
      type: Array,
      required: true
    },
		showActions: {
      type: Boolean,
      default: true
    },
    canShow: {
      type: Boolean,
      default: true
    },
    canEdit: {
      type: Boolean,
      default: false
    },
		canDelete: {
      type: Boolean,
      required: false
    },
	},
  computed: {
    rows() {
      return this.totalPages * this.pageQuantity;
    }
  },
	methods: {
    showItem(index, id) {
      this.$emit("show-item", id);
    },
    editItem(index, id) {
      this.$emit("edit-item", id);
    },
    deleteItem(index, id) {
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
        this.$emit("delete-item", id);
      });
    }
	}
};
</script>

<style scoped>
.actionIcons {
  height: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.actionIcons i {
  color: #fff;
  padding: 5px;
  border-radius: 5px;
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
}
.ti-eye, .ti-user {
  background-color: #718efa;
}
.ti-close, .ti-pencil-alt {
  background-color: #ef0028;
}
.ti-pencil-alt{ 
  background-color: #987BEC;
}
/*  */
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