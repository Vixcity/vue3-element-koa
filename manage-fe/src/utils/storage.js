/**
 * Storage 二次封装
 * @author Vixcity
 */

import config from "@/config";

export default {
  setItem(key, val) {
    let storage = this.getItem();
    if (!storage) {
      storage = {};
    }
    storage[key] = val;
    window.localStorage.setItem(config.namespace, JSON.stringify(storage));
  },
  getItem(key) {
    return this.getStorage()[key];
  },
  getStorage() {
    return JSON.parse(window.localStorage.getItem(config.namespace) || '{"userInfo":{"token":""}}');
  },
  clearItem(key) {
    let storage = this.getStorage();
    delete storage[key];
    window.localStorage.setItem(config.namespace, JSON.stringify(storage));
  },
  clearAll() {
    window.localStorage.clear();
  },
};
