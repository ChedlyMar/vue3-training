// __tests__/useCrud.test.ts
import { mount } from "@vue/test-utils";
import { ref, nextTick } from "vue";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useCrud } from "./useItem"; // Adjust the import path as needed

const mock = new MockAdapter(axios);

// Mock Axios responses for testing
const mockData = {
  item: { id: 1, name: "Test Item", description: "This is a test item" },
  items: [
    { id: 1, name: "Item 1", description: "Description 1" },
    { id: 2, name: "Item 2", description: "Description 2" },
  ],
};

describe("useCrud Composable", () => {
  afterEach(() => {
    mock.reset();
  });

  it("fetches items when fetchData is called", async () => {
    const wrapper = mount({
      setup() {
        const { items, fetchItems } = useCrud();
        return { items, fetchItems };
      },
      template: '<div><button @click="fetchItems">Fetch Data</button></div>',
    });

    mock.onGet("https://api.example.com/items").reply(200, mockData.items);

    await wrapper.find("button").trigger("click");
    await nextTick();

    const items = wrapper.vm.items;
    expect(items).toEqual(mockData.items);
  });

  it("handles error when fetchData encounters an error", async () => {
    const wrapper = mount({
      setup() {
        const { items, fetchItems, error } = useCrud();
        return { items, fetchItems, error };
      },
      template:
        '<div><button @click="fetchItems">Fetch Data</button><div>{{ error }}</div></div>',
    });

    mock
      .onGet("https://api.example.com/items")
      .reply(500, "Internal Server Error");

    await wrapper.find("button").trigger("click");
    await nextTick();

    const error = wrapper.vm.error;
    expect(error).toEqual("Internal Server Error");
  });

  // Add more tests for other useCrud functions

  it("creates a new item when createNewItem is called", async () => {
    const wrapper = mount({
      setup() {
        const { items, createNewItem } = useCrud();
        return { items, createNewItem };
      },
      template:
        '<div><button @click="createNewItem">Create Item</button></div>',
    });

    mock.onPost("https://api.example.com/items").reply(201, mockData.item);

    await wrapper.find("button").trigger("click");
    await nextTick();

    const items = wrapper.vm.items;
    expect(items).toContainEqual(mockData.item);
  });

  it("handles error when createNewItem encounters an error", async () => {
    const wrapper = mount({
      setup() {
        const { createNewItem, error } = useCrud();
        return { createNewItem, error };
      },
      template:
        '<div><button @click="createNewItem">Create Item</button><div>{{ error }}</div></div>',
    });

    mock
      .onPost("https://api.example.com/items")
      .reply(500, "Internal Server Error");

    await wrapper.find("button").trigger("click");
    await nextTick();

    const error = wrapper.vm.error;
    expect(error).toEqual("Internal Server Error");
  });

  it("updates an item when updateExistingItem is called", async () => {
    const wrapper = mount({
      setup() {
        const { items, updateExistingItem } = useCrud();
        return { items, updateExistingItem };
      },
      template:
        '<div><button @click="updateExistingItem">Update Item</button></div>',
    });

    const updatedItem = { ...mockData.item, name: "Updated Item" };
    mock
      .onPut(`https://api.example.com/items/${mockData.item.id}`)
      .reply(200, updatedItem);

    await wrapper.find("button").trigger("click");
    await nextTick();

    const items = wrapper.vm.items;
    const updatedItemIndex = items.findIndex(
      (item) => item.id === updatedItem.id
    );
    expect(updatedItemIndex).toBeGreaterThanOrEqual(0);
    expect(items[updatedItemIndex]).toEqual(updatedItem);
  });

  it("handles error when updateExistingItem encounters an error", async () => {
    const wrapper = mount({
      setup() {
        const { updateExistingItem, error } = useCrud();
        return { updateExistingItem, error };
      },
      template:
        '<div><button @click="updateExistingItem">Update Item</button><div>{{ error }}</div></div>',
    });

    const updatedItem = { ...mockData.item, name: "Updated Item" };
    mock
      .onPut(`https://api.example.com/items/${mockData.item.id}`)
      .reply(500, "Internal Server Error");

    await wrapper.find("button").trigger("click");
    await nextTick();

    const error = wrapper.vm.error;
    expect(error).toEqual("Internal Server Error");
  });

  it("deletes an item when deleteItemById is called", async () => {
    const wrapper = mount({
      setup() {
        const { items, deleteItemById } = useCrud();
        return { items, deleteItemById };
      },
      template:
        '<div><button @click="deleteItemById">Delete Item</button></div>',
    });

    mock
      .onDelete(`https://api.example.com/items/${mockData.item.id}`)
      .reply(204);

    await wrapper.find("button").trigger("click");
    await nextTick();

    const items = wrapper.vm.items;
    const deletedItemIndex = items.findIndex(
      (item) => item.id === mockData.item.id
    );
    expect(deletedItemIndex).toBe(-1); // Item should be deleted
  });

  it("handles error when deleteItemById encounters an error", async () => {
    const wrapper = mount({
      setup() {
        const { deleteItemById, error } = useCrud();
        return { deleteItemById, error };
      },
      template:
        '<div><button @click="deleteItemById">Delete Item</button><div>{{ error }}</div></div>',
    });

    mock
      .onDelete(`https://api.example.com/items/${mockData.item.id}`)
      .reply(500, "Internal Server Error");

    await wrapper.find("button").trigger("click");
    await nextTick();

    const error = wrapper.vm.error;
    expect(error).toEqual("Internal Server Error");
  });
});
