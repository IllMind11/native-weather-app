import AsyncStorage from "@react-native-async-storage/async-storage";

const prefix = "cache";

async function store(key, value) {
  try {
    await AsyncStorage.setItem(prefix + key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}

async function get(key) {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if (!item) return null;

    return item;
  } catch (error) {
    console.error(error);
  }
}

async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(prefix + key);
  } catch (error) {
    console.error("Error removing items from cache", error);
  }
}

async function clear() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing the Async storage", error);
  }
}

export default {
  store,
  get,
  removeItem,
  clear,
};
