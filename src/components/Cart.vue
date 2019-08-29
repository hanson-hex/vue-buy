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
            <tr v-for="(c, i) in cart" :key="c.name" :style="{'color': c.active ? 'red': 'black'}">
                <td>{{ c.text }}</td>
                <td>{{ c.price }}</td>
                <td>
                    <button @click="minus(i)">-</button>
                    <span>{{ c.count }}</span>
                    <button @click="add(i)">+</button>
                </td>
                <td>{{ c.count * c.price }}</td>
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
  data () {
    return {

    }
  },
  methods: {
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

</style>