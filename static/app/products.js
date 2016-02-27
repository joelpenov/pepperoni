var PEPPERONI = PEPPERONI || {};

(function(){
    $(document).ready(function(){
        var table_settings = {
            url: "/api/products/",
            dataTable: PEPPERONI.createDatatableInstance({tableId: '#dynamic-table'}),
            booleanFields: ['is_raw_material', 'show_in_menu'],
            moneyFields: ['sell_price']
        };

        var dataTableView = new GenericViews.DataTableView(table_settings);

        var form_settings = {
            url: "/api/products/",
            formId: "form_view",
            form: $('#form_view'),
            dataTableView: dataTableView,
            includeFields: ['id','description','sell_price','show_in_menu', 'is_raw_material']
        };

        var formView = new GenericViews.FormView(form_settings);
        formView.init();
        dataTableView.refreshDataTable();
    });
})();