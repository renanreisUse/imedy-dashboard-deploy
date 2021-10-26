<template>
  <div class="deleteButton">
    <button><i class="fa fa-times"></i></button>
    <p>Excluir perfil</p>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  .deleteButton{
    display: flex;
    align-items: flex-end;
    cursor: pointer;
  }
  button{
    margin-right: 20px;
    background-color: red;
    border: none;
    padding: 10px 10px;
    border-radius: 5px;
    font-family: Montserrat, sans-serif;
  }
  i{
    color: #fff;
  }
</style>