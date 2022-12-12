const hbs = require('hbs')
const axios = require('axios')

let dolar;

axios.get('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    .then(resp=> {
        dolar =resp.data[1].casa.venta
        dolar = dolar.replace(/,/g,".")
        dolar = parseFloat(dolar)
        console.log(dolar)
    })

hbs.registerHelper('dolarApeso',precio=>{
    let totalPesos = dolar * precio
    return new Intl.NumberFormat('es-AR',{style:'currency' , currency: 'ARS'}).format(totalPesos) 
})
