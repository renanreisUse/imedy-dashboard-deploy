<template>
  <div :class="sidebarClasses"
       :data-background-color="backgroundColor"
       :data-active-color="activeColor">
    <div class="logo">
      <div class="simple-text logo-mini justify"
         href="h">
          <div class="">
              <img src="/static/img/imedy_logo.png" alt="">
          </div>
      </div>
      <a class="simple-text logo-normal"
         href="https://www.creative-tim.com/vue-paper-dashboard-pro">
          {{ title }}
      </a>
    </div>
    <div class="sidebar-wrapper" ref="sidebarScrollArea">
      <slot>

      </slot>
      <ul :class="navClasses">
        <slot name="links">
          <sidebar-item v-for="(link, index) in sidebarLinksFiltered"
                        :key="link.name + index"
                        :link="link">

            <sidebar-item v-for="(subLink, index) in link.children"
                          :key="subLink.name + index"
                          :link="subLink">
            </sidebar-item>
          </sidebar-item>
        </slot>

      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'sidebar',
        validator: (value) => {
          let acceptedValues = ['sidebar', 'navbar']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      backgroundColor: {
        type: String,
        default: 'imedy',
        validator: (value) => {
          let acceptedValues = ['white', 'black', 'imedy']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      activeColor: {
        type: String,
        default: 'white',
        validator: (value) => {
          let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger', 'white']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      sidebarLinks: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      sidebarClasses () {
        if (this.type === 'sidebar') {
          return 'sidebar'
        } else {
          return 'collapse navbar-collapse off-canvas-sidebar'
        }
      },
      navClasses () {
        if (this.type === 'sidebar') {
          return 'nav'
        } else {
          return 'nav navbar-nav'
        }
      }
    },
    methods: {
      async initScrollBarAsync () {
        await import('perfect-scrollbar/dist/css/perfect-scrollbar.css')
        const PerfectScroll = await import('perfect-scrollbar')
        PerfectScroll.initialize(this.$refs.sidebarScrollArea)
      },
      setSidebarLinks(){
        const user = localStorage.getItem("user"),
          role = user.length > 0 ? JSON.parse(user).roles[0] : null
        if (!user || !role) {
          localStorage.clear();
          this.$router.push("/");
        }
        this.sidebarLinksFiltered = this.sidebarLinks.filter((link) => {
          if(link.children){
            link.children = link.children.filter((child) => {
              return child.permission.includes(role)
            })
          }
          return link.permission.includes(role)
        })
      }
    },
    data(){
      return {
        sidebarLinksFiltered: []
      }
    },
    created(){
      this.setSidebarLinks()
    },
    mounted () {
      this.initScrollBarAsync()
    },
    beforeDestroy () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false
      }
    }
  }

</script>
<style>
.sidebar .logo{
  display: flex !important;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
  @media (min-width: 992px) {
    .navbar-search-form-mobile,
    .nav-mobile-menu{
      display: none;
    }
  }
</style>
