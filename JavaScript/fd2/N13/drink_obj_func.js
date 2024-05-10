const ObjStorageFunc = function() {
    const storage = {};

    this.addValue = this.addValue.bind(this);
    this.getValue = this.getValue.bind(this);
    this.deleteValue = this.deleteValue.bind(this);
    this.getKeys = this.getKeys.bind(this);
  
    this.addValue = function(key, value) {
      storage[key] = value;
    }
  
    this.getValue = function getValue(key) {
      return storage[key];
    }
  
    this.deleteValue = function deleteValue(key) {
      if (key in storage) {
        delete storage[key];
        return true;
      }
      return false;
    }
  
    this.getKeys = function getKeys() {
      return Object.keys(storage);
    }
  };
  