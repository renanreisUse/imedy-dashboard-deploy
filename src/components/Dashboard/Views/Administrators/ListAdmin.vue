<template>
  <div>
    <div class="add-btn">
      <button
        class="myBtn imedy-btn"
        @click="() => this.$router.push('/admin/create')"
      >
        ADICIONAR ADMINISTRADOR
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.add-btn {
  margin-bottom: 50px;
  display: flex;
  justify-content: right;
}
</style>
