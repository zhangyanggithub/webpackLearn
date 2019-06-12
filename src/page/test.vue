<template>
  <div>
    this is vue page !
    <el-button
      type="primary"
      @click="fetchData">null
    </el-button>
    <el-button
      type="primary"
      @click="fetchData2">body
    </el-button>
    <div>{{ text }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  components: { },
  data() {
    return {
      text: 55
    }
  },
  created() {
    alert(1234);
  },
  methods: {
    fetchData() {
      axios.post('/apiServer').then(res => {
        this.text = res.data;
      });
    },
    fetchData2() {
      axios.post('/apiServer',  {
        a: 'a',
        b: 'b'
      }).then(res => {
        this.text = res.data;
      });
    },

  }
}
</script>

<style>
div {
  color: red
}
</style>
