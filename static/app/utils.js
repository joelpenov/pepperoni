
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
        settings.language = PEPPERONI.getDatatableLanguageProperties();
        if(!settings.columns){
            settings.columns=[];
            var table = $(settings.tableId);
            var table_headers = table.find('thead th');
            table_headers.each(function(index, element) {
                var item = $(element);
                var name = item.attr('name');
                var type = item.data('type');

                var column= {
                    data:name,
                    className:item.attr("class")
                };
                if(type && GenericViews.tableRenders.hasOwnProperty(type)){
                    column.render = GenericViews.tableRenders[type];
                }

                settings.columns.push(column);
            });
        }
        return $(settings.tableId).dataTable(settings);
    };

    PEPPERONI.formatAsMoney = function(numberToMoney, precision){
        var precision =precision===undefined? 2 : precision;
        if(isNaN(numberToMoney)) return;
        numberToMoney = parseFloat(numberToMoney);
        var result = parseFloat(numberToMoney.toFixed(precision));
        var moneyResult = (result).formatMoney(precision);
        return moneyResult;
    };

    PEPPERONI.parseFloat = function(stringValue){

        return parseFloat(stringValue ? stringValue.replace(",","") : 0);
    };


    PEPPERONI.longDateFormat = function(date){
        moment.locale('es');
        return date ? moment(date).format("DD/MM/YYYY h:mm a") : "";
    };

    PEPPERONI.getCurrentDate = function(){
        return moment().format('DD/MM/YYYY');
    };

    PEPPERONI.getCheckIconEntry = function(condition){
        return condition === true ? '<div class="action-buttons"><a class="edit green"><i class="fa fa-check bigger-130"></i></a></div>': '';
    };

})();
