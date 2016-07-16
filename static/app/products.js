var PEPPERONI = PEPPERONI || {};

(function(){
    $(document).ready(function(){
        var table_settings = {
            url: "/api/products/",
            dataTable: PEPPERONI.createDatatableInstance({tableId: '#dynamic-table'})
        };

        var dataTableView = new GenericViews.DataTableView(table_settings);

        var form_settings = {
            url: "/api/products/",
            formId: "form_view",
            form: $('#form_view'),
            dataTableView: dataTableView,
            includeFields: {'id':{},'description':{},'unit_quantity':{defaultValue:1},'unit_of_measure':{},'sell_price':{},'show_in_menu':{}, 'is_raw_material':{}, 'print_on_cashier_shift':{}}
        };

        var formView = new GenericViews.FormView(form_settings);
        formView.init();
        dataTableView.refreshDataTable();
    });
})();