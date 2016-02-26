
var PEPPERONI = PEPPERONI || {};

(function (){   

    Number.prototype.formatMoney = function(c){
    var n = this, 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = "." , 
        t = ",", 
        s = n < 0 ? "-" : "", 
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
        j = (j = i.length) > 3 ? j % 3 : 0;

       return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
     };

    PEPPERONI.getDatatableLanguageProperties = function(){
        return {
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla",
                "sInfo":           "Mostrando _START_ al _END_. Total registros _TOTAL_",
                "sInfoEmpty":      "Mostrando 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(Total filtrados _MAX_)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending":  ": Ordenar la columna de manera ascendente",
                    "sSortDescending": ": Ordenar la columna de manera descendente"
                }
            };
    };

    PEPPERONI.createDatatableInstance = function(settings){
       var settings = settings || {};
       settings.data = settings.data || [];
       settings.language = PEPPERONI.getDatatableLanguageProperties() 
       return $(settings.tableId).dataTable(settings);
    };    

    PEPPERONI.formatAsMoney = function(numberToMoney){
        if(isNaN(numberToMoney)) return;
        numberToMoney = parseFloat(numberToMoney);
        var result = parseFloat(numberToMoney.toFixed(2));
        var moneyResult = (result).formatMoney(2)
        return moneyResult;
    };


    PEPPERONI.longDateFormat = function(date){
       moment.locale('es');
       return moment(date).format("dddd, D MMMM YYYY, h:mm:ss a");
    };

})();