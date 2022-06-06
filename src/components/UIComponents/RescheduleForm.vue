<template>
  <div class="content col-md-12">
		<p>Selecione o novo dia da consulta</p>
		<div class="row form-content">
			<div class="col-md-6">
				<label>Data</label>
				<select v-model="date" class="default-select">
					<option
						v-for="item in dates"
						:key="item"
						:label="item"
						:value="item"
					></option>
				</select>
			</div>
			<div v-if="step == 2" class="col-md-6 form-data">
				<label>Horário</label>
				<select v-model="hour" class="default-select">
					<option
						v-for="item in hours"
						:key="item"
						:label="item"
						:value="item"
					></option>
				</select>
			</div>
		</div>
    <div class="row">
			<div class="buttons">
				<button class="close-btn" @click="close">Fechar</button>
				<button class="imedy-btn" @click="save" :disabled="getBtnConfig.isDisabled">{{ getBtnConfig.desc }}</button>
			</div>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		dates: {
			type: Array,
			required: true,
		},
		hours: {
			type: Array,
			default: () => ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30"]
		},
	},
  data() {
    return {
      date: '',
      hour: '',
			step: 1,
    };
  },
	computed: {
		getBtnConfig() {
			let check = false;
			if (this.step == 1 && !this.date) {
				check = true;
			} else if (this.step == 2 && !this.hour) {
				check = true;
			}

			return {
				isDisabled: check,
				desc: this.step == 1 ? 'Próximo' : 'Salvar',
			}
		}
	},
  methods: {
    save() {
			this.step == 1
			? this.step = 2
			: this.$emit("reschedule-save", { date: this.date, hour: this.hour });
    },
		close() {
			this.date = '';
			this.hour = '';
			this.$emit("reschedule-close");
		}
  },
};
</script>

<style scoped>
.content {
	width: 400px;
	height: 200px;

	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 300;
	font-size: 18px;
	line-height: 22px;
	letter-spacing: -0.3px;
	color: #595555;
}

.content p {
	margin-top: 18px;
	font-size: 18px;
	text-align: center;
}

.content .row {
	margin-top: 20px;
}

.form-content {
	display: flex;
	justify-content: center;
}

.form-content div:nth-child(n) {
	display: grid;
}

.default-select {
	height: 40px;
}

.buttons {
	display: flex;
	justify-content: space-between;
	max-width: 65%;
	margin: auto;
	margin-top: 10px;
}

.buttons button {
	width: 120px;
	height: 40px;
	padding: 0px;
}

.close-btn {
	border: none;
	background: none;
	color: #718EFA;
}

.imedy-btn:disabled {
	background-color: #c0c0c0;
}
</style>