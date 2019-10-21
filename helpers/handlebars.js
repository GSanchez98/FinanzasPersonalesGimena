module.exports = {  
    tipo: (selected, options) => {
      return options
        .fn()
        .replace(new RegExp(` value="${selected}"`), '$& selected="selected"');
    }
  };