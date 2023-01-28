import { mount, flushPromises } from "@vue/test-utils"
import axios from "axios"
import HomeView from "../src/views/HomeView.vue"

const mockCats = {
    data: [{ url: "abc" }],
}

// Following lines tell Jest to mock any call to `axios.get`
// and to return `mockPostList` instead
jest.spyOn(axios, "get").mockResolvedValue(mockCats)

test("loads posts on button click", async () => {
    const wrapper = mount(HomeView)

    await wrapper.get("button").trigger("click")

    // Let's assert that we've called axios.get the right amount of times and
    // with the right parameters.
    expect(axios.get).toHaveBeenCalledTimes(1)

    // Wait until the DOM updates.
    await flushPromises()

    // Finally, we make sure we've rendered the content from the API.
    const images = wrapper.findAll("img")

    // ensure that only one image is loaded
    expect(images).toHaveLength(1)
    // ensure that there is one image in the store
    expect(wrapper.vm.cats).toHaveLength(1)
    // ensure that string is store is the same as the mock string.
    expect(wrapper.vm.cats[0]).toBe("abc")
})
