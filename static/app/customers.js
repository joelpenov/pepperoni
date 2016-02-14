(function(){
    $(document).ready(function(){
        var table_settings = {
            url: "/api/customers/",
            dataTable: $('#dynamic-table').dataTable({
                //"aoColumns": columns,
                data: [],
                language: getDatatableLanguageProperties()
            })
        };

        var dataTableView = new GenericViews.DataTableView(table_settings);

        var form_settings = {
            url: "/api/customers/",
            formId: "form_view",
            form: $('#form_view'),
            dataTableView: dataTableView,
            includeFields: ['phone','name','address','reference'],
            afterRender:function(){
                $('#input_phone').mask('999-999-9999');
            }
        };

        var formView = new GenericViews.FormView(form_settings);
        formView.init();
        dataTableView.refreshDataTable();
    });
})();