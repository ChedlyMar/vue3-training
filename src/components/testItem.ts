import { mount } from "@vue/test-utils";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ItemList from "@/components/ItemList.vue"; // Adjust the import path as needed

const mock = new MockAdapter(axios);

// Mock Axios responses for testing
const mockData = {
  items: [
    { id: 1, name: "Item 1", description: "Description 1" },
    { id: 2, name: "Item 2", description: "Description 2" },
  ],
};

describe("ItemList.vue", () => {
  afterEach(() => {
    mock.reset();
  });

  it("fetches items when mounted", async () => {
    mock.onGet("https://api.example.com/items").reply(200, mockData.items);

    const wrapper = mount(ItemList);

    await wrapper.vm.$nextTick();

    const items = wrapper.findAll("li");
    expect(items.length).toBe(2);
    expect(items[0].text()).toContain("Item 1");
    expect(items[1].text()).toContain("Item 2");
  });

  it('adds a new item when "Add Item" button is clicked', async () => {
    mock
      .onPost("https://api.example.com/items")
      .reply(201, { id: 3, name: "New Item", description: "Description" });

    const wrapper = mount(ItemList);

    await wrapper.find("button").trigger("click");

    await wrapper.vm.$nextTick();

    const items = wrapper.findAll("li");
    expect(items.length).toBe(3);
    expect(items[2].text()).toContain("New Item");
  });

  it('deletes an item when "Delete" button is clicked', async () => {
    mock.onGet("https://api.example.com/items").reply(200, mockData.items);
    mock.onDelete("https://api.example.com/items/1").reply(204);

    const wrapper = mount(ItemList);

    await wrapper.vm.$nextTick();

    const deleteButtons = wrapper
      .findAll("button")
      .filter((btn) => btn.text() === "Delete");

    expect(deleteButtons.length).toBe(2);

    await deleteButtons[0].trigger("click");

    await wrapper.vm.$nextTick();

    const items = wrapper.findAll("li");
    expect(items.length).toBe(1);
    expect(items[0].text()).toContain("Item 2");
  });

  it("selects an item when clicked and displays its details", async () => {
    mock.onGet("https://api.example.com/items").reply(200, mockData.items);

    const wrapper = mount(ItemList);

    await wrapper.vm.$nextTick();

    const itemToSelect = mockData.items[0];
    const itemElement = wrapper
      .findAll("li")
      .filter((li) => li.text().includes(itemToSelect.name));

    expect(itemElement.length).toBe(1);

    await itemElement[0].trigger("click");

    await wrapper.vm.$nextTick();

    const selectedItemDetails = wrapper.find(".selected-item-details");
    expect(selectedItemDetails.text()).toContain(itemToSelect.name);
    expect(selectedItemDetails.text()).toContain(itemToSelect.description);
  });

  it('clears the selected item when "Clear Selection" button is clicked', async () => {
    mock.onGet("https://api.example.com/items").reply(200, mockData.items);

    const wrapper = mount(ItemList);

    await wrapper.vm.$nextTick();

    const itemToSelect = mockData.items[0];
    const itemElement = wrapper
      .findAll("li")
      .filter((li) => li.text().includes(itemToSelect.name));

    expect(itemElement.length).toBe(1);

    await itemElement[0].trigger("click");

    await wrapper.vm.$nextTick();

    const clearSelectionButton = wrapper.find("button.clear-selection");

    expect(clearSelectionButton.exists()).toBe(true);

    await clearSelectionButton.trigger("click");

    await wrapper.vm.$nextTick();

    const selectedItemDetails = wrapper.find(".selected-item-details");
    expect(selectedItemDetails.exists()).toBe(false);
  });

  // Add more test cases as needed
});
