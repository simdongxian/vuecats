import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import LikedView from "../src/views/LikedView.vue"
import HomeView from "../src/views/HomeView.vue"
const mockCats = ["a", "b", "c"]
test("like/unlike function test", async () => {
    const wrapper = mount(HomeView)
    wrapper.vm.cats = mockCats
    await nextTick()
    await wrapper.vm.like(0)
    const wrapper2 = mount(LikedView)
    // await nextTick()
    const images = wrapper2.findAll("img")
    expect(wrapper2.vm.liked).toMatchObject(["a"])
    expect(images.length).toBe(1)
    await wrapper2.vm.unLike(0)
    await nextTick()
    expect(wrapper2.vm.liked).toMatchObject([])
    const newImages = wrapper2.findAll("img")
    expect(newImages.length).toBe(0)
})
