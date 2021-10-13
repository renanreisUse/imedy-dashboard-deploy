<template>
   <div>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page" data-color=""
           data-image="static/img/background/background-2.jpg">
            <!--you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content" >
          <div class="container" >
            <div class="row">
              <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                <form method="#" action="#">
                  <div class="card" data-background="color" data-color="blue">
                    <div class="card-header text-center">
                      <h3 class="card-title">Recuperar senha</h3>
                    </div>
                    <div class="card-content">
                      <div class="form-group recovery-input">  
                        <input type="email" placeholder="Insira o e-mail" class="form-control input-no-border">
                      </div>
                    </div>
                    <div class="card-footer text-center">
                      <button type="submit" class="btn btn-fill btn-wd" >Enviar</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="full-page-background" style="background-image: url(static/img/background/background-imed.png)"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      toggleNavbar () {
        document.body.classList.toggle('nav-open')
      },
      closeMenu () {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      }
    },
    beforeDestroy () {
      this.closeMenu()
    }
  }
</script>
<style scoped>
.card{
height: 370px;
width: 340px;
display: flex;
flex-direction: column;
justify-content: center;
}
@media (max-width:780px) {
  .card{
  width: 100%;
  height: 100%;
  }
}
.card .recovery-input{
margin-bottom: 139px;
}
.card .card-title{
font-weight: 400;
color: #262626;
font-size: 28px;
margin-bottom: 30px;
}
.card-footer button{
margin-bottom: 35px;
width: 100%;
background-color: #718EFA;
border: none;
letter-spacing: 1px;
padding: 10px;
}
</style>
