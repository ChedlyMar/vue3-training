// __tests__/crud.test.ts
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  createItem,
  readItems,
  updateItem,
  deleteItem,
  handleAxiosError,
} from "./items"; // Adjust the import path as needed

const mock = new MockAdapter(axios);

// Mock Axios responses for testing
const mockData = {
  item: { id: 1, name: "Test Item", description: "This is a test item" },
  items: [
    { id: 1, name: "Item 1", description: "Description 1" },
    { id: 2, name: "Item 2", description: "Description 2" },
  ],
};

describe("CRUD Functions", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should create an item", async () => {
    mock.onPost("https://api.example.com/items").reply(201, mockData.item);

    const newItem = await createItem(mockData.item);
    expect(newItem).toEqual(mockData.item);
  });

  it("should handle create item error", async () => {
    mock
      .onPost("https://api.example.com/items")
      .reply(500, "Internal Server Error");

    const newItem = await createItem(mockData.item);
    expect(newItem).toBeNull();
  });

  it("should read all items", async () => {
    mock.onGet("https://api.example.com/items").reply(200, mockData.items);

    const items = await readItems();
    expect(items).toEqual(mockData.items);
  });

  it("should handle read items error", async () => {
    mock
      .onGet("https://api.example.com/items")
      .reply(500, "Internal Server Error");

    const items = await readItems();
    expect(items).toEqual([]);
  });

  it("should update an item", async () => {
    const updatedItem = { ...mockData.item, name: "Updated Item" };
    mock
      .onPut(`https://api.example.com/items/${mockData.item.id}`)
      .reply(200, updatedItem);

    const updated = await updateItem(mockData.item.id!, updatedItem);
    expect(updated).toEqual(updatedItem);
  });

  it("should handle update item error", async () => {
    const updatedItem = { ...mockData.item, name: "Updated Item" };
    mock
      .onPut(`https://api.example.com/items/${mockData.item.id}`)
      .reply(500, "Internal Server Error");

    const updated = await updateItem(mockData.item.id!, updatedItem);
    expect(updated).toBeNull();
  });

  it("should delete an item", async () => {
    mock
      .onDelete(`https://api.example.com/items/${mockData.item.id}`)
      .reply(204);

    const success = await deleteItem(mockData.item.id!);
    expect(success).toBe(true);
  });

  it("should handle delete item error", async () => {
    mock
      .onDelete(`https://api.example.com/items/${mockData.item.id}`)
      .reply(500, "Internal Server Error");

    const success = await deleteItem(mockData.item.id!);
    expect(success).toBe(false);
  });

  it("should handle Axios error", () => {
    const axiosError = new Error("Network Error");
    const errorResponse = { response: { data: "Error message" } };
    const requestError = { request: "Request error" };

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    handleAxiosError(axiosError);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error:", "Network Error");

    handleAxiosError(errorResponse);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Server responded with an error:",
      "Error message"
    );

    handleAxiosError(requestError);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "No response received:",
      "Request error"
    );

    consoleErrorSpy.mockRestore();
  });
});
