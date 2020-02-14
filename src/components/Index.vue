<template>
    <div>
        <ul>
            <li v-for="(good, index) in goods" v-bind:key="index">
                <span>{{good.text}}</span>
                <span>{{good.price}}</span>
                <button @click="addCart(index)">添加到购物车</button>
            </li>
        </ul>
        <Cart :name="name" :cart="cart"></Cart>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input  v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input type="password" v-model="ruleForm.pwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交</el-button>
            </el-form-item>
        </el-form>
        <k-comp @bindclick="handleClick">
            <strong>
                学校
            </strong>
        </k-comp>
        <!--<input type="text" v-model="inputText">-->
        <!--<input type="text" :value="inputText" @input="inputText = $event.target.value">-->
        <input type="text" :value="inputText" @input="handleInput">
    </div>
</template>

<script>
import Cart from './Cart'
import KComp from './KComp'
// import axios from 'axios'
export default {
  name: 'app',
  provide: {
    name: 'hello world'
  },
  components: {
    Cart,
    KComp
  },
  data () {
    return {
      txt: '',
      inputText: '',
      ruleForm: {
        name: '',
        pwd: ''
      },
      rules: {
        name: { required: true, message: '请输入名称' },
        pwd: { required: true, message: '请输入密码' }
      },
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
    handleInput (e) {
      this.inputText = e.target.value
    },
    handleClick (e) {
      return e
    },
    submitForm () {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          alert('成功')
        } else {
          alert('大兄弟，你数据未完成')
          return false
        }
      })
    },
    addCart (i) {
      const good = this.goods[i]
      this.$bus.$emit('addCart', good)
    }
  }
}
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
