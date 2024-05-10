class ObjStorageClass {
    constructor () {
        this.storage = {}.bind(this);
    }

    addValue = (key, value) => {
        this.storage[key] = value;
    }

    getValue = (key) => {
        return this.storage[key];
    }

    deleteValue = (key) => {
        if (key in this.storage) {
            delete this.storage[key];
            return true;
        }
        return false;
    }

    getKeys = () => {
        return Object.keys(this.storage);
    }
}
