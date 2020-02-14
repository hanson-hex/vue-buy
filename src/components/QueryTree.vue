<template>
  <div class="top">
      <div class="body" :class="level === 1 ? 'body-0': ''">
        <div class="item" :class="level % 2? 'b-bg': ''" v-for="(item, index) of list" :key="index">
          <div class="" v-if="item.type">
            <div class="item-title">
              <div>
                <a-button-group>
                  <a-button>与</a-button>
                  <a-button >或</a-button>
                </a-button-group>
              </div>
              <div>
                <a-button-group>
                  <a-button type="primary" @click="addRule()">添加规则</a-button>
                  <a-button type="primary" @click="addGroup()">添加组</a-button>
                  <a-button type="danger" v-if="level !== 1" @click="deleteGroup(index)"> 删除</a-button>
                </a-button-group>
              </div>
            </div>
          </div>
          <div class="item-content" v-else>
            <a-input-group
                    style="display: inline-block; vertical-align: middle"
                    :compact="true"
            >
              <a-select
                      showSearch
                      labelInValue
                      placeholder="input search text"
                      style="width: 200px"
                      :value="value"
                      :defaultActiveFirstOption="false"
                      :showArrow="false"
                      :filterOption="false"
                      @search="fetchUser"
                      @change="handleChange"
                      :notFoundContent="fetching ? undefined : null"
              >
                <a-spin v-if="fetching" slot="notFoundContent" size="small" />
                <a-select-option v-for="d in data" :key="d.value">{{d.text}}</a-select-option>
              </a-select>
              <a-select defaultValue="alipay" style="width: 100px">
                <a-select-option value="alipay">支付宝</a-select-option>
                <a-select-option value="wexinpay">微信</a-select-option>
              </a-select>
              <a-input
                      style="width: 100px"
                      v-model="item.content"
              />
            </a-input-group>
            <a-icon type="close-circle" @click="deleteItem(index)" />
          </div>
          <!-- 递归组件是指在组件内部调用组件自身 -->
          <div v-if="item.children" class="item-children">
            <query-tree :list="item.children" :level="level + 1"></query-tree>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import jsonp from 'fetch-jsonp';
import debounce from 'lodash/debounce';
export default {
  name: 'QueryTree',
  props: {
    list: Array,
    level: Number
  },
  data() {
    this.lastFetchId = 0
    this.fetchUser = debounce(this.fetchUser, 800)
    return {
      data: [],
      value: [],
      fetching: false,
    }
  },
  methods: {
    deleteItem (index, level) {
      this.$emit('deleteItem', index, level)
    },
    deleteGroup (index, level) {
    },
    addRule () {
      this.list.children = this.list.children || []
      console.log('this.list:', this.list)
      this.list.children.push({
        type: 0
      })
    },
    addGroup () {
      this.list.children = this.list.children || []
      console.log('this.list:', this.list)
      this.list.children.push({
        type: 1
      })
    },
    fetchUser(value) {
      console.log('fetching user', value)
      this.lastFetchId += 1;
      const fetchId = this.lastFetchId;
      this.data = [];
      this.fetching = true;
      jsonp('https://randomuser.me/api/?results=5')
        .then(response => response.json())
        .then(body => {
          if (fetchId !== this.lastFetchId) {
            return
          }
          const data = body.results.map(user => ({
            text: `${user.name.first} ${user.name.last}`,
            value: user.login.username,
          }))
          this.data = data
          this.fetching = false
        })
    },
    handleChange(value) {
      Object.assign(this, {
        value,
        data: [],
        fetching: false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .top {
    margin: 0 auto;
    position: relative;
  }
  .body-0 {
    margin-left: 0!important;
    width: 100%!important;
  }
  .body {
    margin-left: 40px;
      width: 100%;
    .b-bg {
      background-color: #fff!important;
    }
    .item-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .item {
      background-color: #eee;
      position: relative;
      margin-bottom: 20px;
      width: calc(100% - 50px);
      border-radius: 8px;
      padding: 7px;
      border: 1px solid #eee;
      .item-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .item-children {
        padding: 20px 0 20px;
      }
    }
    .item:before {
      position: absolute;
      content: '';
      top: -22px;
      left: -20px;
      width: 20px;
      height: calc(50% + 20px);
      border-style: none none solid solid;
      border-width: 3px;
      border-color: #aaa;
    }

    .item:not(:last-child):after {
      position: absolute;
      content: '';
      top: 20px;
      left: -20px;
      bottom: 0;
      border-style: none none none solid;
      border-width: 3px;
      border-color: #aaa;
    }
    .item:last-child {
      margin-bottom: 0;
    }
    .item:last-child:before {
      border-radius: 0 0 0 2px;
    }
    .item:last-child:after {
      display: none;
    }
  }
</style>
