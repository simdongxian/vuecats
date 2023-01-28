<script>
import axios from "axios";
import { store } from "../store/store.js"
export default {
  data() {
    return {
      count:1,
      cats:[],
      buttonClicked:[]
    }
  },
  methods: {
    async getCats() {
      try {
        const cats = await axios.get(
          "https://api.thecatapi.com/v1/images/search?limit="+this.count);
        this.cats = cats.data.map(val => val.url)
        this.buttonClicked=[]
      } catch (e) {
      }
    },
    like(imageIndex){
      this.buttonClicked.push(imageIndex)
      store.liked.push(this.cats[imageIndex])
    }
    }
}
</script>

<template>
  <div class="home">
    
    <h1>Hello! Welcome to vue cats</h1>
    <div class="radioBox">
    <input type="radio" id="one" value="1" v-model="count" />
    <label for="one">One</label>
    <input type="radio" id="many" value="10" v-model="count" />
    <label for="ten">Ten</label>
    <button class="genButton" @click="getCats">Generate Cat</button>
    </div>
    <div >
    <div v-for="(image, imageIndex) in cats" class="imgBox" :key="imageIndex">
      <img :src="image" class="img-fluid" contain height="100" width="150"/>
      <button class="like" @click="like(imageIndex)" :disabled="buttonClicked.indexOf(imageIndex) !== -1">Like</button>
    </div>
    </div>

  </div>
</template>
<style scoped>
.imgBox {
  margin: 10px
}
.genButton {
  margin-left:10px
}
</style>