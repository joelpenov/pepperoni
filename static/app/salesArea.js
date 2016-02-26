var PEPPERONI = PEPPERONI || {};

(function(){
    $(document).ready(function(){
        var table_settings = {
            url: "/api/salesarea/",
            dataTable: PEPPERONI.createDatatableInstance({tableId: '#dynamic-table'})
        };

        var dataTableView = new GenericViews.DataTableView(table_settings);

        var form_settings = {
            url: "/api/salesarea/",
            formId: "form_view",
            form: $('#form_view'),
            dataTableView: dataTableView,
            includeFields: ['id','name','warehouse']
        };

        var formView = new GenericViews.FormView(form_settings);
        formView.init();
        dataTableView.refreshDataTable();
    });
})();