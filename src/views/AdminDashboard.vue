<template>
  <div>
    <admin-header></admin-header>
    <div class="container-fluid">
      <div class="row">
        <admin-sidebar></admin-sidebar>
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-2 order-md-1 mb-4"></div>
            <div class="col-md-10 order-md-2">
              <div class="chartdiv" style="margin-top: -80px">
                <vue-chart
                  chart-type="BarChart"
                  :columns="columns"
                  :rows="rows"
                  :options="options"
                ></vue-chart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from '@/components/AdminHeader'
import AdminSidebar from '@/components/AdminSidebar'
import VueCharts from 'vue-charts'
import axios from 'axios'

export default{
  data () {
    return {
      rawOrders: [],
      columns: [{
        'type': 'string',
        'label': 'Book'
      }, {
        'type': 'number',
        'label': 'Sales'
      }, {
        'type': 'number',
        'label': 'Count * 10'
      }],
      options: {
        title: 'Sales Summary Per Book',
        height: 800,
        vAxis: {textStyle: {fontSize: '12', paddingRight: '100', marginRight: '150'}},
        chartArea: {left: 300, width: 700},
        bar: {
          groupWidth: '90%'
        }
      }
    }
  },
  components: {
    AdminHeader,
    AdminSidebar,
    VueCharts
  },
  computed: {
    rows () {
      let bookStat = {}
      let rawOrders = this.rawOrders
      rawOrders.forEach((item) => {
        item.goodsList.forEach((book) => {
          let bookName = book.productName
          let count = parseInt(book.productNum)
          let sales = parseInt(book.productNum) * parseFloat(book.salePrice) / 10
          if (bookStat[bookName] === undefined) {
            bookStat[bookName] = {count: count, sales: sales}
          } else {
            bookStat[bookName] = {count: count + bookStat[bookName].count, sales: bookStat[bookName].sales}
          }
        })
      })
      let bookStatArr = Object.keys(bookStat).map((key) => {
        return [key, bookStat[key].sales, bookStat[key].count]
      })
      bookStatArr.sort((first, second) => {
        return second[1] - first[1]
      })
      return bookStatArr
    }
  },
  methods: {
    init () {
      axios.get('/admin/order').then((res) => {
        if (res.data.status === '0') {
          this.rawOrders = res.data.result
        }
      })
    }
  },
  mounted () {
    if (sessionStorage.getItem('onceLogout')) {
      sessionStorage.removeItem('onceLogout')
      this.$router.go(0)
    }
    this.init()
  }
}
</script>

<style scoped>
@import "../assets/css/bootstrap.min.css"
</style>
