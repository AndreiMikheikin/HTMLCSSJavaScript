class LocStorageClass {
    constructor(storageKey) {
        this.storageKey = storageKey;
    }

    addValue(key, value) {
        let data = JSON.parse(localStorage.getItem(this.storageKey)) || {};
        data[key] = value;
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    getValue(key) {
        let data = JSON.parse(localStorage.getItem(this.storageKey));
        return data ? data[key] : undefined;
    }

    deleteValue(key) {
        let data = JSON.parse(localStorage.getItem(this.storageKey));
        if (data && key in data) {
            delete data[key];
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        }
        return false;
    }

    getKeys() {
        let data = JSON.parse(localStorage.getItem(this.storageKey));
        return data ? Object.keys(data) : [];
    }
}
