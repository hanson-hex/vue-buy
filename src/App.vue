
<template>
    <div id="app">
        <!--<router-view/>-->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    // async timeout (ms) {
    //   await new Promise((resolve) => {
    //     setTimeout(resolve, ms)
    //   })
    // },
    // async testAsync () {
    //   console.log('start async')
    //   await this.timeout(3000)
    //   console.log('async call')
    // },
    // async testAjax () {
    //   let r = await this.$post('/adc/member/create_device/v/2', {
    //     apptype: 5
    //   })
    //   console.log(r)
    // },
    // testObject () {
    //   var arr1 = ['two', 'three']
    //   var arr2 = ['one', ...arr1, 'four', 'five']
    //   console.log(arr2)
    // }
  },
  mounted () {
    // this.testAsync()
    // this.testAjax()
    // this.testObject()
  }
}
</script>
<style>
    * {
        margin: 0;
        padding: 0;
    }
    #app{
        height:100%;
        width:100%;
    }
</style>

