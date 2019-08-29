<template>
    <div>
        <div>{{ name }} 购物车</div>
        <table border="1">
            <tr>
                <th>课程名</th>
                <th>单价</th>
                <th>数量</th>
                <th>价格</th>
            </tr>
            <tr v-for="(c, i) in cart" :key="c.name" :class="{active: c.active}">
                <td>{{ c.text }}</td>
                <td>{{ c.price }}</td>
                <td>
                    <button @click="minus(i)">-</button>
                    <span>{{ c.count }}</span>
                    <button @click="add(i)">+</button>
                </td>
                <td>{{ c.count * c.price }}</td>
            </tr>
            <tr>
                <td></td>
                <td colspan="2">{{ activeCount }} / {{ count }}</td>
                <td colspan="2">${{ total }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
  name: 'cart',
  props: {
    name: {
      type: String,
      required: true
    },
    cart: {
      type: Array
    }
  },
  watch: {
    cart: {
      handler () {
        this.setLocal()
      },
      deep: true
    }
  },
  data () {
    return {
    }
  },
  created () {
    // this.cart = JSON.parse(window.localStorage.getItem('cart'))|| []
    this.$bus.$on('addCart', good => {
      const ret = this.cart.find(v => v.text === good.text)
      if (ret) {
        ret.count += 1
      } else {
        this.cart.push({
          ...good,
          active: true,
          count: 1
        })
      }
    })
  },
  computed: {
    total () {
      let num = 0
      this.cart.forEach(v => {
        if (v.active) {
          num += v.price * v.count
        }
      })
      return num
      // this.cart.reduce((sum, v) => {
      //   if (v.active) {
      //     return sum + v.price * v.count
      //   }
      // }, 0)
    },
    count () {
      return this.cart.length
    },
    activeCount () {
      return this.cart.filter(v => v.active).length
    }
  },
  methods: {
    setLocal () {
      window.localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    add (i) {
      this.cart[i].count += 1
    },
    minus (i) {
      const count = this.cart[i].count
      if (count > 1) {
        this.cart[i].count -= 1
      } else {
        this.remove(i)
      }
    },
    remove (i) {
      if (window.confirm(`是否删除商品${this.cart[i].text}`))
      this.cart.splice(i, 1)
    }
  }
}
</script>

<style scoped>
    tr.active {
        color: red;
    }
</style>