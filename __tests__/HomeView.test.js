import { mount } from "@vue/test-utils"
import HomeView from "../src/views/HomeView.vue"

test("Radio button sets cat count", async () => {
    //mount HomeView
    const wrapper = mount(HomeView)

    //find radio button with id "many"
    const radioInput = wrapper.find("#many")
    //check radio button
    await radioInput.setChecked()
    //check if value is set to 10
    expect(wrapper.vm.count).toBe("10")

    //find radio button with id "one"
    const radioInput2 = wrapper.find("#one")
    //check radio button
    await radioInput2.setChecked()
    //check if value is set to 1
    expect(wrapper.vm.count).toBe("1")
})
