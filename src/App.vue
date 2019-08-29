<template>
  <div id="app">
      <ul>
          <li v-for="(good, index) in goods" v-bind:key="index">
              <span>{{good.text}}</span>
              <span>{{good.price}}</span>
              <button @click="addCart(index)">添加到购物车</button>
          </li>
      </ul>
      <Cart :name="name" :cart="cart"></Cart>
  </div>
</template>

<script>
import Cart from './components/Cart'
import axios from 'axios'
export default {
  name: 'app',
  components: {
    Cart
  },
  data () {
    return {
      txt: '',
      name: '测试',
      cart: [],
      goods: [
        {text: '苹果', price: 100},
        {text: '西瓜', price: 80},
        {text: '香蕉', price: 60}
      ]
    }
  },

  created () {
    // axios.get('/api/goods').then(res => {
    //   this.goods = res.data.list
    // })
    // const res = await axios.get('/api/goods')
    // this.goods = res.data.list
  },
  methods: {
    addCart (i) {
      const good = this.goods[i]
      this.$bus.$emit('addCart', good)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
