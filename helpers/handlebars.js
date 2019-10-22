module.exports = {
  tipoContrato: (selected, options) => {
    return options
      .fn()
      .replace(new RegExp(` value="${selected}"`), '$& selected="selected"');
  },

  mostrarAlertas: (errors = {}, alerts) => {
    const categoria = Object.keys(errors);

    let html = "";

    if (categoria.length) {
      errors[categoria].forEach(error => {
        html += `<div class="${categoria} alerta">${error}</div>`;
      });
    }

    return (alerts.fn().html = html);
  }
};