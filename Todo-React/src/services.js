import axios from "axios";

const BASEURL = "http://localhost:5000/items"

export async function getItems() {
    try {
        const response = await axios.get(BASEURL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function updateItem(item) {
    try {
      const updatedItem = { ...item, is_completed: !item.is_completed, updated_at:new Date() };
      const response = await axios.put(`${BASEURL}/${item.id}`, updatedItem);
      return response.data;
    } catch (error) {
      console.error('Update Error:', error.message, error.response);
      throw error;
    }
  }
  
  

export async function deleteItem(id) {
    try {
        const response = await axios.delete(`${BASEURL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export async function createItem(itemData) {
    try {
        const response = await axios.post(BASEURL, itemData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
