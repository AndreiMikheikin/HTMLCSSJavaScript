const ObjStorageFunc = function() {
    const storage = {};
  
    function addValue(key, value) {
      storage[key] = value;
    }
  
    function getValue(key) {
      return storage[key];
    }
  
    function deleteValue(key) {
      if (key in storage) {
        delete storage[key];
        return true;
      }
      return false;
    }
  
    function getKeys() {
      return Object.keys(storage);
    }
  
    return {
      addValue,
      getValue,
      deleteValue,
      getKeys
    };
  };
  