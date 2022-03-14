<template>
  <div>
    <div
      class="image-input"
      :style="{ 'background-image': `url(${imageData})` }"
      @click="chooseImage"
    >
      <span v-if="!imageData" class="placeholder">
        Clique e selecione a foto
      </span>
      <input
        class="file-input"
        ref="fileInput"
        type="file"
        @input="onSelectFile"
      />
    </div>
    <div class="addButton">
      <button @click="chooseImage" :class="className">
        {{btnText}}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageData: null,
      btnText: 'FAÇA UPLOAD DA IMAGEM',
      className: 'imedy-btn text-uppercase'
    };
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click();
      this.className = 'imedy-btn-empty'
      this.btnText = 'ALTERAR'
    },

    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    }
  }
};
</script>

<style scoped>
.image-input {
  display: block;
  width: 394px;
  height: 121px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  border-radius: 12px;
}
.image-input span{
  font-size: 14px;
  line-height: 22px;
  color: #262626;
}
.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
  border-radius: 12px;
  text-align: center;
}

.placeholder:hover {
  background: #e0e0e0;
}

.file-input {
  display: none;
}
.addButton {
  display: flex;
  margin-top: 30px;
  justify-content: center;
}
</style>
