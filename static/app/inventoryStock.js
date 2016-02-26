var PEPPERONI = PEPPERONI || {};

(function () {
    $(document).ready(function () {
        var table_settings = {
            url: "/api/stocks/",
            dataTable: PEPPERONI.createDatatableInstance({tableId: '#dynamic-table'}),
            actionRender: function(item){
            return '<div class="action-buttons"> <a class="view blue"><i '+
            'class="ace-icon fa fa-eye bigger-130" data-item-id="' + item.id + '"></i></a> </div>';
            }
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