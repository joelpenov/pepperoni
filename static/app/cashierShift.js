var PEPPERONI = PEPPERONI || {};

(function(){

    $(document).ready(function(){
        var table_settings = {
            url: "/api/cashiershifts/",
            dataTable: PEPPERONI.createDatatableInstance({tableId: '#dynamic-table'})
        };

        var dataTableView = new GenericViews.DataTableView(table_settings);

        dataTableView.refreshDataTable();
    });
})();