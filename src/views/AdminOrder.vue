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
              <div class="limiter">
                <div class="container-table100">
                    <div class="wrap-table100">
                        <div class="table100">
                            <table>
                                <thead>
                                    <tr class="table100-head">
                                        <th class="column1">Date</th>
                                        <th class="column2">Order ID</th>
                                        <th class="column3">Detail</th>
                                        <th class="column4">Total</th>
                                        <th class="column5">Address</th>
                                        <th class="column6">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="order in orders" :key="order.orderId">
                                      <td class="column1">{{order.date}}</td>
                                      <td class="column2">{{order.id}}</td>
                                      <td class="column3">
                                        <ul>
                                          <li v-for="(item,index) in order.detail" :key="index">{{item}}</li>
                                        </ul>
                                      </td>
                                      <td class="column4">${{order.total}}</td>
                                      <td class="column5">
                                        <ul>
                                          <li v-for="(item,index) in order.address" :key="index">{{item}}</li>
                                        </ul>
                                      </td>
                                      <td class="column6">
                                        <select @change="modifyStatus">
                                          <option :selected="order.status === 'Paid'" :value="'Paid'+' '+order.id">Paid</option>
                                          <option :selected="order.status === 'Shipped'" :value="'Shipped'+' '+order.id">Shipped</option>
                                          <option :selected="order.status === 'Delivered'" :value="'Delivered'+' '+order.id">Delivered</option>
                                          <option :selected="order.status === 'Canceled'" :value="'Canceled'+' '+order.id">Canceled</option>
                                        </select>
                                      </td>
                                  </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
import axios from 'axios'

export default{
  data () {
    return {
      rawOrders: []
    }
  },
  components: {
    AdminHeader,
    AdminSidebar
  },
  computed: {
    orders () {
      let orders = []
      let rawOrders = this.rawOrders
      for (var i = 0; i < rawOrders.length; i++) {
        let order = {}
        order['date'] = rawOrders[i].createDate
        order['id'] = rawOrders[i].orderId
        let detail = []
        let bookList = rawOrders[i].goodsList
        for (var j = 0; j < bookList.length; j++) {
          detail.push('●  ' + bookList[j].productName + ' * ' + bookList[j].productNum + ' * $' + bookList[j].salePrice)
        }
        order['detail'] = detail
        order['total'] = rawOrders[i].orderTotal
        let addressInfo = rawOrders[i].addressInfo
        order['address'] = [addressInfo.userName, addressInfo.streetName, addressInfo.postCode + ' ' + addressInfo.city + ' ' + addressInfo.state, addressInfo.tel]
        order['status'] = rawOrders[i].orderStatus
        orders.push(order)
      }
      return orders
    }
  },
  methods: {
    modifyStatus (event) {
      let newStatus = event.target.value.split(' ')[0]
      let orderId = event.target.value.split(' ')[1]
      axios.put('/admin/order', {
        orderId: orderId,
        newStatus: newStatus
      }).then((res) => {
        this.init()
      })
    },
    init () {
      axios.get('/admin/order').then((res) => {
        if (res.data.status === '0') {
          this.rawOrders = res.data.result
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
@import "../assets/css/bootstrap.min.css";
@import "../assets/css/font-awesome.min.css";
@import "../assets/css/util.css";
@import "../assets/css/main.css";

</style>
