<template>
  <div class="text-center">
    <form class="form-signin">
      <img class="mb-4" src="static/administrator.png" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Admin Name</label>
      <input id="email" name="adminName" class="form-control" v-model="adminName" placeholder="AdminName" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="password" name="adminPwd" v-model="adminPwd" class="form-control" placeholder="Password" required>
      <div class="checkbox mb-3">
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="button" @click="login">Sign in</button>
    </form>
    <p class="mt-5 mb-3 text-muted">&copy; 2018-2019 Pitt Bookstore Admin System</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      adminName: '',
      adminPwd: ''
    }
  },
  methods: {
    login () {
      if (!this.adminName || !this.adminPwd) {
        alert('Empty admin name or admin passowrd')
        return
      }
      axios.post('/admin/login', {
        adminName: this.adminName,
        adminPwd: this.adminPwd
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.$router.push({
            path: '/manageDashboard'
          })
        } else {
          this.errorTip = true
        }
      })
    }
  }
}
</script>

<style scoped>
@import "../assets/css/bootstrap.min.css";
@import "../assets/css/signin.css";

.text-center {
  margin-top: 10%
}
</style>
