(function(){
    $(document).ready(function(){
        var table_settings = {
            url: "/api/cashiershifts/",
            dataTable: $('#dynamic-table').dataTable({
                //"aoColumns": columns,
                data: []
            })
        };

        var dataTableView = new GenericViews.DataTableView(table_settings);

        var form_settings = {
            url: "/api/cashiershifts/",
            formId: "form_view",
            form: $('#form_view'),
            dataTableView: dataTableView,
            includeFields: ['id','cash_register','start_date','close_date', 'close_balance']
        };

        var formView = new GenericViews.FormView(form_settings);
        formView.init();
        dataTableView.refreshDataTable();
    });
})();