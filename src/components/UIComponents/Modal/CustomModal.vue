<template>
  <transition name="model">
		<div class="modal">
			<div class="modal-content">

				<div class="modal-header">
					<button type="button" class="close" @click="closeModal">
						<span aria-hidden="true">&times;</span>
					</button>
					<h2 class="modal-title">{{ title }}</h2>
				</div>

				<div class="modal-body">
					<slot name="body"></slot>
				</div>

				<div class="modal-footer" v-if="showFooter">
					<slot name="footer"></slot>
				</div>
			</div>
		</div>
  </transition>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		},
		showFooter: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		closeModal() {
			this.$emit('close-modal', true);
		}
	}
};
</script>

<style scoped>
.modal {
  z-index: 4;
	width: 100%;
	height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
	transition: opacity .3s ease;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  padding: 16px;
}

.modal-header {
  padding: 0;
  text-align: center;
}

.modal-title {
	font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 40px;
  color: #595555;
}

.modal-body {
	display: flex;
}

.modal-body {
	width: 100%;
	height: 100%;
}

.btn-close {
  float: right;
}
</style>