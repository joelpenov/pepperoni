(function(){

    $(document).ready(function(){
        var table_settings = {
            url: "/api/cashiershifts/",
            dataTable: $('#dynamic-table').dataTable({
                //"aoColumns": columns,
                data: []
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