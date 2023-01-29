<script>
import axios from "axios";
import { store } from "../store/store.js"
export default {
    created() {
        this.getBreeds()
    },
    data() {
        return {
            breeds: [],
            cats: [],
            selected: "",
            buttonClicked: false,
        }
    },
    methods: {
        async getRandomBreedCat() {
            try {
                let query_params = {
                    breed_ids: this.selected,
                    limit: 1
                }
                let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: query_params })
                this.cats = response.data.map(val => val.url)
            } catch (err) {
                console.log(err)
            }
            this.buttonClicked = false
        },
        async getBreeds() {
            try {
                axios.defaults.headers.common['x-api-key'] = import.meta.env.VITE_API_KEY // Replace this with your API Key, as it's set to defaults it will be used from now onwards

                let response = await axios.get('https://api.thecatapi.com/v1/breeds/')
                this.breeds = response.data;
                // pick one to display initially
                this.selected = this.breeds[0].id
            } catch (err) {
                console.log(err)
            }
        },
        like(imageIndex) {
            this.buttonClicked = true
            store.liked.push(this.cats[imageIndex])
        }
    }
}
</script>

<template>
    <div class="home">

        <h1>Search by breed</h1>
        <h2>Generate random cats by breed here!</h2>
        <div class="Search">
            <select v-model="selected">
                <option v-for="breed in breeds" :value="breed.id">
                    {{ breed.name }}
                </option>
            </select>
            <button class="genButton" @click="getRandomBreedCat()">Generate Random Cat</button>
        </div>
        <div>
            <div v-for="(image, imageIndex) in cats" class="imgBox" :key="imageIndex">
                <img :src="image" class="img-fluid" contain height="100" width="150" />
                <button class="like" @click="like(imageIndex)" :disabled="this.buttonClicked">Like</button>
            </div>
        </div>

    </div>
</template>
<style scoped>
.imgBox {
    margin: 10px
}

.genButton {
    margin-left: 10px
}
</style>