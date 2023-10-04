<template>
  <div>
    <h1>Item List</h1>
    <div>
      <button @click="addItem">Add Item</button>
    </div>
    <ul>
      <li
        v-for="item in items"
        :key="item.id"
        @click="selectItem(item)"
        :class="{ selected: selectedItem === item }"
      >
        {{ item.name }}
        <button @click="editItem(item)">Edit</button>
        <button @click="deleteItem(item)">Delete</button>
      </li>
    </ul>
    <div v-if="selectedItem">
      <h2>Selected Item</h2>
      <p>Name: {{ selectedItem.name }}</p>
      <p>Description: {{ selectedItem.description }}</p>
      <button @click="clearSelection">Clear Selection</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useCrud } from "../useCrud"; // Adjust the import path as needed

export default {
  setup() {
    const { items, createNewItem, updateSelectedItem, deleteItemById } =
      useCrud();

    const selectedItem = computed(() =>
      items.value.find((item) => item === selectedItemId.value)
    );
    const selectedItemId = ref(null);

    const addItem = () => {
      const newItem = {
        name: "New Item",
        description: "Description",
      };
      createNewItem(newItem);
    };

    const editItem = (item) => {
      updateSelectedItem(item);
    };

    const deleteItem = (item) => {
      deleteItemById(item.id);
      if (selectedItemId.value === item.id) {
        clearSelection();
      }
    };

    const selectItem = (item) => {
      selectedItemId.value = item.id;
    };

    const clearSelection = () => {
      selectedItemId.value = null;
    };

    return {
      items,
      selectedItem,
      addItem,
      editItem,
      deleteItem,
      selectItem,
      clearSelection,
    };
  },
};
</script>

<style scoped>
.selected {
  background-color: #eee;
}
</style>