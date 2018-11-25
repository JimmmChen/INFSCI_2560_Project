<template>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 adminheader">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/manageDashboard" >PBS Admin System</a>
      <span><font color="red">Hi ! {{adminName}}</font></span>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a id="signOut" class="nav-link" href="javascript:void(0)" @click="logOut">Sign out</a>
        </li>
      </ul>
    </nav>
</template>

<style scoped>
@import "../assets/css/bootstrap.min.css";

.adminheader {
  line-height: 30px
}

.navbar-brand{
  font-size: 15px
}
@media only screen and (max-width: 767px) {
  .navbar-brand{
    display: none
  }
}
</style>

<script>
import axios from 'axios'
export default{
  data () {
    return {
      adminName: ''
    }
  },
  methods: {
    logOut () {
      axios.post('/admin/logout').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.$router.push({
            path: '/managerLogin'
          })
        }
      })
    }
  },
  mounted () {
    this.adminName = this.$cookies.get('adminName')
  }
}
</script>
