<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>Books</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" v-bind:class="{'sort-up':sortFlag}" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}" @click="setPriceFilter('all')">All</a></dd>
                <dd v-for="(price,index) in priceFilter" :key="price.startPrice" @click="setPriceFilter(index)">
                  <a href="javascript:void(0)" :class="{'cur':priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList" :key="item.productId">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/' + item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name"><a href="#" :title=item.productName>{{item.productName}}</a></div>
                      <div class="price">$ {{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">Add to Cart</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" spinner="bubbles">
                  <span slot="no-more">
                    No more books :)
                  </span>
                </infinite-loading>
              </div>
            </div>
          </div>
        </div>
      </div>
      <modal :mdShow="mdShow" @close="closeModal">
        <p slot="message">
            You can't add goods to cart without login
        </p>
        <div slot="btnGroup">
            <a class="btn btn--m" href="javascript:;" @click="mdShow = false">Close</a>
        </div>
      </modal>
      <modal :mdShow="mdShowCart" @close="closeModal">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>Added to Cart</span>
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">Continue</a>
          <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">Go to Cart</router-link>
        </div>
      </modal>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/NavBread'
import InfiniteLoading from 'vue-infinite-loading'
import Modal from '@/components/Modal'
import axios from 'axios'

export default{
  data () {
    return {
      goodsList: [],
      sortFlag: true,
      page: 1,
      pageSize: 8,
      mdShow: false,
      mdShowCart: false,
      priceFilter: [
        {
          startPrice: '0',
          endPrice: '100'
        },
        {
          startPrice: '100',
          endPrice: '500'
        },
        {
          startPrice: '500',
          endPrice: '1000'
        },
        {
          startPrice: '1000',
          endPrice: '5000'
        }],
      priceChecked: 'all',
      filterBy: false,
      overLayFlag: false
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    InfiniteLoading,
    Modal
  },
  methods: {
    infiniteHandler ($state) {
      setTimeout(() => {
        this.page++
        this.getGoodsList($state)
      }, 500)
    },
    getGoodsList ($state) {
      let param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag === true ? 1 : -1,
        priceLevel: this.priceChecked
      }
      axios.get('/goods/list', {
        params: param
      }).then((result) => {
        let res = result.data
        let completed = false
        if (res.status === '0') {
          if (res.result.list.length === 0) {
            completed = true
          } else {
            this.goodsList = this.goodsList.concat(res.result.list)
          }
        } else {
          this.goodsList = []
          completed = true
        }
        if ($state) {
          if (completed) {
            $state.complete()
          }
          $state.loaded()
        }
      })
    },
    sortGoods () {
      this.sortFlag = !this.sortFlag
      this.reset()
      this.getGoodsList()
    },
    reset () {
      this.page = 1
      this.goodsList = []
      this.noMoreData = false
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    },
    showFilterPop () {
      this.filterBy = true
      this.overLayFlag = true
    },
    closePop () {
      this.filterBy = false
      this.overLayFlag = false
    },
    setPriceFilter (index) {
      this.priceChecked = index
      this.reset()
      this.getGoodsList()
      this.closePop()
    },
    addCart (productId) {
      axios.post('/goods/addCart', {
        productId: productId
      }).then((res) => {
        if (res.data.status === '0') {
          this.mdShowCart = true
        } else {
          this.mdShow = true
        }
      })
    },
    closeModal () {
      this.mdShow = false
      this.mdShowCart = false
    }
  },
  mounted () {
    this.getGoodsList()
  }
}
</script>
