import axios, { AxiosResponse, AxiosError } from "axios";

// Define the base API URL
const API_BASE_URL = "https://api.example.com/items";

// Define a TypeScript interface for your item
export interface Item {
  id?: number;
  name: string;
  description: string;
}

// Define a function to handle Axios errors
export const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    // The request was made, and the server responded with a non-2xx status code
    console.error("Server responded with an error:", error.response.data);
  } else if (error.request) {
    // The request was made, but no response was received
    console.error("No response received:", error.request);
  } else {
    // Something happened in setting up the request
    console.error("Error:", error.message);
  }
};

// Create a new item
export const createItem = async (item: Item): Promise<Item | null> => {
  try {
    const response: AxiosResponse<Item> = await axios.post(API_BASE_URL, item);
    return response.data;
  } catch (error: unknown | any) {
    handleAxiosError(error);
    return null;
  }
};

// Read all items
export const readItems = async (): Promise<Item[]> => {
  try {
    const response: AxiosResponse<Item[]> = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error: unknown | any) {
    handleAxiosError(error);
    return [];
  }
};

// Update an existing item
export const updateItem = async (
  id: number,
  updatedItem: Item
): Promise<Item | null> => {
  try {
    const response: AxiosResponse<Item> = await axios.put(
      `${API_BASE_URL}/${id}`,
      updatedItem
    );
    return response.data;
  } catch (error: unknown | any) {
    handleAxiosError(error);
    return null;
  }
};

// Delete an item by ID
export const deleteItem = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return true;
  } catch (error: unknown | any) {
    handleAxiosError(error);
    return false;
  }
};

// Example usage:

// const newItem: Item = {
//   name: 'New Item',
//   description: 'This is a new item.'
// };

// createItem(newItem).then((createdItem) => {
//   if (createdItem) {
//     console.log('Created item:', createdItem);
//   }
// });

// readItems().then((items) => {
//   console.log('All items:', items);
// });

// const updatedItem: Item = {
//   name: 'Updated Item',
//   description: 'This item has been updated.'
// };

// updateItem(1, updatedItem).then((updated) => {
//   if (updated) {
//     console.log('Updated item:', updated);
//   }
// });

// deleteItem(1).then((success) => {
//   if (success) {
//     console.log('Item deleted.');
//   }
// });
