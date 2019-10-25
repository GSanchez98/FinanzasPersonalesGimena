const mongoose = require("mongoose");
const Cuenta = mongoose.model("Cuenta");

exports.mostrarbalance = async (req, res, next) => {
  // Obtener todos los documentos de las cuentas
  const cuentas = await Cuenta.find();
  console.log(req.user._id);  //obtenemos el usuario que esta logeado esta es la variabla que lo almacena 
  const cuentastipo = await Cuenta.aggregate([
    {
      $match:{ autor: req.user._id}
    },
    {//esto es el agrupamiento group by lo agrupa por tipo usuario y suma el monto
      $group: {
        _id: '$tipo', 
        usuario: {$first: '$autor'},
        total: {$sum: '$monto'}
      }
    }
  ]);
  const listaingreso = await Cuenta.aggregate([
    {
      $match:{ autor: req.user._id, tipo: 'ingreso'}
    }
  ]);
  const listaegreso = await Cuenta.aggregate([
    {
      $match:{ autor: req.user._id, tipo: 'egreso'}
    }
  ]);
  console.log(listaingreso);
  var ingreso=0;
  var egreso=0;
  cuentastipo.forEach(function(ele){
    if(ele._id=='egreso')
      egreso=ele.total
    else
      ingreso=ele.total
  });
  
  var balance=ingreso-egreso



  // Si no hay cuentas
  if (!cuentas) return next();

  res.render("home", {
    nombrePagina: "Finanzas Personales",
    tagline: "Administra y controla tu dinero de una mejor manera.",

    descripcion:"Le ayudamos a gestionar su economía personal compruebe aquí el estado de sus cuentas, empiece a hacer el presupuesto y organice sus deudas.",
    crearCuenta: "Conozca los pasos a seguir para evitar sorpresas al invertir sus ahorros: defina su perfil y vigile sus inversiones.",
    inicioSesion: "!Accede ya! y continua manejando de manera eficiente y eficaz tus finanzas",
   
    cuentas,
    balance,
    ingreso,
    egreso,
    listaegreso,
    listaingreso
  });
};
