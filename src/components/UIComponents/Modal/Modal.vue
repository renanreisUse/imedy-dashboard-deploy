<template>
  <div class="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <p class="modal-title">Informações do Banner</p>

          <div class="banner-content">
            <span><strong>Título:</strong></span>
            <p>{{ modal.title }}</p>
          </div>
          <div class="banner-content">
            <span><strong>Paragráfo:</strong></span>
            <p>{{ modal.paragraph }}</p>
          </div>

          <div class="banner-image">
            <span><strong>Imagem:</strong></span>
            <img :src="modal.image" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="imedy-btn" @click="closeModal">
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit("close-modal-event");
    },
    changed(event) {
      this.$emit("change-input-event", event);
    }
  },
  props: {
    modal: Object
  }
};
</script>

<style scoped>
.modal {
  display: block;
}
.banner-image {
  display: flex;
  flex-direction: column;
}
.banner-image img {
  width: 300px;
  height: 90px;
  border-radius: 10px;
}
.modal-title {
  color: #718efa;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}
.banner-content {
  word-wrap: break-word;
}
</style>
