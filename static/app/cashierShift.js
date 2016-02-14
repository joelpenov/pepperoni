(function(){

    $(document).ready(function(){
        var table_settings = {
            url: "/api/cashiershifts/",
            dataTable: $('#dynamic-table').dataTable({
                //"aoColumns": columns,
                data: [],
                language:{
                            "sProcessing":     "Procesando...",
                            "sLengthMenu":     "Mostrar _MENU_ registros",
                            "sZeroRecords":    "No se encontraron resultados",
                            "sEmptyTable":     "Ningún dato disponible en esta tabla",
                            "sInfo":           "Mostrando del _START_ al _END_ de un total de _TOTAL_ registros",
                            "sInfoEmpty":      "Mostrando del 0 al 0 de un total de 0 registros",
                            "sInfoFiltered":   "(filtrados de un total de _MAX_ registros)",
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
                        }
            }),
            actionRender: function(item){
                return '<div class="action-buttons">'+
                    '<a class="view blue" data-item-id="' + item.id + '"><i class="ace-icon fa fa-eye bigger-130"></i></a>' +
                    '</div>';
            }
        };

        var dataTableView = new GenericViews.DataTableView(table_settings);

        dataTableView.refreshDataTable();
    });
})();