// useCrud.ts
import { ref, reactive, computed } from "vue";
import {
  Item,
  createItem,
  readItems,
  updateItem,
  deleteItem,
} from "../api/items";

interface CrudState {
  items: Item[];
  selectedItem: Item | null;
  loading: boolean;
  error: string | null;
}

export function useCrud() {
  const state: CrudState = reactive({
    items: [],
    selectedItem: null,
    loading: false,
    error: null,
  });

  const fetchItems = async () => {
    state.loading = true;
    state.error = null;
    state.items = await readItems();
    state.loading = false;
  };

  const createNewItem = async (item: Item) => {
    state.loading = true;
    state.error = null;
    const newItem = await createItem(item);
    if (newItem) {
      state.items.push(newItem);
    }
    state.loading = false;
  };

  const updateSelectedItem = (item: Item) => {
    state.selectedItem = item;
  };

  const updateExistingItem = async (item: Item) => {
    state.loading = true;
    state.error = null;
    const updatedItem = await updateItem(item.id!, item);
    if (updatedItem) {
      const index = state.items.findIndex((i) => i.id === updatedItem.id);
      if (index !== -1) {
        state.items[index] = updatedItem;
      }
    }
    state.loading = false;
  };

  const deleteItemById = async (id: number) => {
    state.loading = true;
    state.error = null;
    const success = await deleteItem(id);
    if (success) {
      state.items = state.items.filter((item) => item.id !== id);
    }
    state.loading = false;
  };

  const selectedItem = computed(() => state.selectedItem);

  return {
    items: computed(() => state.items),
    selectedItem,
    loading: computed(() => state.loading),
    error: computed(() => state.error),
    fetchItems,
    createNewItem,
    updateSelectedItem,
    updateExistingItem,
    deleteItemById,
  };
}
