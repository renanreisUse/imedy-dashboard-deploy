<template>
  <SimpleTable
    tableName="Próximas Consultas"
    :tableColumns="tableColumns"
    :tableData="users"
    :showEdit="true"
    :showDelete="true"
  />
</template>

<script>
import SimpleTable from "../../Tables/SimpleTable.vue";

export default {
  components: {
    SimpleTable,
  },
  data() {
    return {
      professinalId: '',
			users: [
				{
					patientName: 'Joao',
					specialization: 'Clínico Geral',
					date: '27/05/2022 - 10:00',
					value: 'R$ 200,00'
				}
			],
      tableColumns: [
				{
          prop: "patientName",
          label: "Paciente",
          minWidth: 250,
        },
        {
          prop: "specialization",
          label: "Especialidade",
          minWidth: 250,
        },
        {
          prop: "date",
          label: "Data",
          minWidth: 150,
        },
        {
          prop: "value",
          label: "Valor",
          minWidth: 100,
        },
      ],
    };
  },
  mounted() {
    this.professinalId = this.$route.params.id;
  }
};
</script>

<style>
</style>