<template>
  <div class="hello">
    <ul class="domtree">
      <li>
        1级菜单
        <ul>
          <li>2级菜单</li>
          <li>
            2级菜单
            <ul>
              <li>3级菜单</li>
              <li>3级菜单</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        1级菜单
        <ul>
          <li>2级菜单</li>
          <li>2级菜单</li>
        </ul>
      </li>
        <li>
          1级别菜单
        </li>
    </ul>
      <query-tree :list="list" @deleteItem="deleteItem" :level="1"></query-tree>
  </div>
</template>

<script>
import QueryTree from './QueryTree'
export default {
  name: 'HelloWorld',
  components: {
    QueryTree
  },
  methods: {
    deleteItem (index, itemLevel) {
      var params = {
        index,
        itemLevel
      }
      this.doList('delete', params)
    },
    doList (type, params = {}, level = 1) {
      switch (type) {
        case 'delete':
          break
      }
    }
  },
  data () {
    return {
      msg: 'test',
      list: [ {
        type: 1,
        children: [
          {
            type: 0
          },
          {
            type: 1,
            children: [
              {
                type: 1,
                children: [
                  {
                    type: 1
                  }
                ]
              },
              {
                type: 0
              }]
          },
          {
            type: 0
          }
        ]
      }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul.domtree,
ul.domtree ul {
    margin: 0;
    padding: 0 0 0 2em;
}

ul.domtree li {
    list-style: none;
    position: relative;
}

ul.domtree>li:first-child:before {
    border-style: none none solid none;
}

ul.domtree li:before {
    position: absolute;
    content: '';
    top: -0.01em;
    left: -0.7em;
    width: 0.5em;
    height: 0.615em;
    border-style: none none solid solid;
    border-width: 0.05em;
    border-color: #aaa;
}

ul.domtree li:not(:last-child):after {
    position: absolute;
    content: '';
    top: 0.7em;
    left: -0.7em;
    bottom: 0;
    border-style: none none none solid;
    border-width: 0.05em;
    border-color: #aaa;
}
</style>
