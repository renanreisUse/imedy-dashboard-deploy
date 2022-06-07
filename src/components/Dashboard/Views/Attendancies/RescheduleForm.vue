<template>
  <div class="content col-md-12">
		<p>Selecione o novo dia da consulta</p>
		<div class="row form-content">
			<div class="col-md-6">
				<label>Data</label>
				<el-date-picker
					class="date-picker"
					v-model="date"
					type="date"
					format="dd-MM-yyyy"
					value-format="yyyy-MM-dd"
					:picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<div v-if="step == 2" class="col-md-6 form-data">
				<label>Horário</label>
				<select v-model="hour" class="default-select">
					<option
						v-for="(item, index) in hours"
						:key="index"
						:label="item.hour"
						:value="item.hour"
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
import { DatePicker } from 'element-ui';
import AttendanceService from "src/services/attendance.service.js";

export default {
	components: {
		'el-date-picker': DatePicker
	},
	props: {
		attendance: {
			type: Object,
			required: true
		},
	},
  data() {
    return {
			step: 1,
      date: '',
      hour: '',
			hours: [],
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() < Date.now();
				}
			}
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
	watch: {
		async date() {
			this.hours = await this.getAvailableHours(this.attendance.doctorId, this.date);
		}
	},
  methods: {
		async getAvailableHours(doctorId, value) {
			const params = new URLSearchParams({ date: value + 'T00:00:00.000Z' });
			return AttendanceService.getDoctorAvailableHours(doctorId, params)
      .then((response) => {
				return response.data;
      })
      .catch((e) => {
        this.showErrorMessage('Não foi possível buscar os horários para o dia selecionado.')
      });
		},
    save() {
			if (this.step == 1) {
				this.step = 2;
			} else {
				this.$emit('reschedule-save', { date: this.date, hour: this.hour });
			}
    },
		close() {
			this.date = '';
			this.hour = '';
			this.$emit('reschedule-close');
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

.date-picker {
	width: 170px;
}

.date-picker input:focus {
	border-color: #000;
}

.default-select {
	height: 40px;
	width: 170px;
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