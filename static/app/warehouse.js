(function(){
    $(document).ready(function(){
        var table_settings = {
            url: "/api/warehouses/",
            dataTable: $('#dynamic-table').dataTable({
                //"aoColumns": columns,
                data: []
            })
        };

        var dataTableView = new GenericViews.DataTableView(table_settings);

        var form_settings = {
            url: "/api/warehouses/",
            formId: "form_view",
            form: $('#form_view'),
            dataTableView: dataTableView
        };

        var formView = new GenericViews.FormView(form_settings);
        formView.init();
        dataTableView.refreshDataTable();
    });
})();