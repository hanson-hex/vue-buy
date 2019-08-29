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
  methods: {
    addCart (i) {
      const good = this.goods[i]
      const ret = this.cart.find(v => v.text === good.text)
      console.log(good, ret)
      if (ret) {
        ret.count += 1
      } else {
        this.cart.push({
          ...good,
          active: true,
          count: 1
        })
      }
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
