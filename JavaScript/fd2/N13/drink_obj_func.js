const ObjStorageFunc = function() {
    const storage = {};
    const self = this;
  
    self.addValue = function(key, value) {
      storage[key] = value;
    }
  
    self.getValue = function getValue(key) {
      return storage[key];
    }
  
    self.deleteValue = function deleteValue(key) {
      if (key in storage) {
        delete storage[key];
        return true;
      }
      return false;
    }
  
    self.getKeys = function getKeys() {
      return Object.keys(storage);
    }
  };
  