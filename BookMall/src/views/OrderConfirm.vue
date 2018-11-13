<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>OrderConfirm</span>
    </nav-bread>
    <div class="container">
      <div class="checkout-order">
        <!-- process step -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li class="cur"><span>View your</span> order</li>
            <li><span>Make</span> payment</li>
            <li><span>Order</span> confirmation</li>
          </ul>
        </div>

        <!-- order list -->
        <div class="page-title-normal checkout-title">
          <h2><span>Order content</span></h2>
        </div>
        <div class="item-list-wrap confirm-item-list-wrap">
          <div class="cart-item order-item">
            <div class="cart-item-head">
              <ul>
                <li>Order contents</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in cartList" :key="item._id">
                <div class="cart-tab-1">
                  <div class="cart-item-pic">
                    <img :src="'/static/' + item.productImage" :alt="item.productName">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.productName}}</div>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.salePrice | currency('¥')}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self">
                      <div class="select-self-area">
                        <span class="select-ipt">×{{item.productNum}}</span>
                      </div>
                    </div>
                    <div class="item-stock item-stock-no">In Stock</div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.salePrice * item.productNum | currency('¥')}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Price count -->
        <div class="price-count-wrap">
          <div class="price-count">
            <ul>
              <li>
                <span>Item subtotal:</span>
                <span>{{subTotal | currency('¥')}}</span>
              </li>
              <li>
                <span>Shipping:</span>
                <span>{{shipping | currency('¥')}}</span>
              </li>
              <li>
                <span>Discount:</span>
                <span>{{discount | currency('¥')}}</span>
              </li>
              <li>
                <span>Tax:</span>
                <span>{{tax | currency('¥')}}</span>
              </li>
              <li class="order-total-price">
                <span>Order total:</span>
                <span>{{orderTotal | currency('¥')}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="order-foot-wrap">
          <div class="prev-btn-wrap">
            <a class="btn btn--m">Previous</a>
          </div>
          <div class="next-btn-wrap">
            <button class="btn btn--m btn--red" @click="payment">Proceed to payment</button>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/NavBread'
import axios from 'axios'

export default{
  data () {
    return {
      subTotal: 0,
      shipping: 30,
      discount: 0,
      tax: 0,
      orderTotal: 0,
      cartList: []
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread
  },
  methods: {
    init () {
      axios.get('/users/cart/list').then((response) => {
        let res = response.data
        let subTotal = 0
        if (res.status === '0') {
          res.result.forEach((item) => {
            if (item.checked === '1') {
              this.cartList.push(item)
              subTotal += item.salePrice * item.productNum
            }
          })
          this.subTotal = subTotal
          this.tax = (subTotal + this.shipping - this.discount) * 0.07
          this.orderTotal = Math.round(subTotal + this.tax + this.shipping)
        }
      })
    },
    payment () {
      let addressId = this.$route.query.addressId
      axios.put('/users/payment', {
        addressId: addressId,
        orderTotal: this.orderTotal
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.$router.push({
            path: '/orderSuccess?orderId=' + res.result.orderId
          })
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
