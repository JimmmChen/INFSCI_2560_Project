<template>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
        <ul class="nav flex-column">
            <li class="nav-item">
            <a class="nav-link" href="/manageDashboard">
                <feather type="home"></feather>
                <span :class="{'selected': curPage === 'manageDashboard'}">Dashboard</span>
            </a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="/manageOrder">
                <feather type="clipboard"></feather>
                <span :class="{'selected': curPage === 'manageOrder'}">Order</span>
            </a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="/manageBook">
                <feather type="book"></feather>
                <span :class="{'selected': curPage === 'manageBook'}">Book</span>
            </a>
            </li>
        </ul>
        </div>
    </nav>
</template>

<style scoped>
@import "../assets/css/bootstrap.min.css";
@import "../assets/css/dashboard.css";

.nav-item {
  margin: 3%
}
.selected{
  color: #0271FF
}
</style>

<script>
export default{
  data () {
    return {
      curPage: ''
    }
  },
  mounted () {
    this.curPage = this.$route.path.slice(1)
  }
}
</script>
