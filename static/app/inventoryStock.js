var PEPPERONI = PEPPERONI || {};

(function () {
    $(document).ready(function () {
        var table_settings = {
            url: "/api/stocks/",
            dataTable: PEPPERONI.createDatatableInstance({tableId: '#dynamic-table'})
        };

        var dataTableView = new GenericViews.DataTableView(table_settings);

        var form_settings = {
            url: "/api/stocks/",
            viewId: "inventory-input-view",
            dataTableView: dataTableView,
            includeFields:['id','warehouse_description', 'product_description', 'quantity']
        };

        dataTableView.refreshDataTable();
    });
}

)();