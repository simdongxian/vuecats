<template>
  <div class="liked">
    <h1>Liked cats</h1>
    <div v-for="(image, imageIndex) in liked" class="imgBox" :key="imageIndex">
      <img :src="image" class="img-fluid" contain height="100" width="150"/>
      <button class="unlike" @click="unLike(imageIndex)">Unlike</button>
    </div>
  </div>
</template>

<script>
import { store } from "../store/store.js"
export default {
  setup(){
    let liked = store.liked
    return {
      liked
    }
  },
  methods: {
    unLike(imageIndex){
      store.liked.splice(imageIndex,1)
    }
    }
}
</script>