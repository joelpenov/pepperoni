var GenericForm = GenericForm || {};
(function () {

    function FormView(settings) {
        var self = this;
        self.fields = ko.observableArray();
        var isEditMode = false;
        var currentItemId = 0;
        self.save = function () {
            var method = "post";
            var link = settings.url;
            if (isEditMode) {
                method = "put";
                link += currentItemId + "/";
            }
            $.ajax({
                url: link + '?format=json',
                type: method,
                data: settings.form.serializeJSON(),
                success: function (data) {
                    if (settings.dataTableView) {
                        settings.dataTableView.refreshDataTable();
                    }
                    self.cancel();
                },
                error: function (jXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        };

        self.cancel = function () {
            settings.form.get(0).reset();
            isEditMode = false;
            currentItemId = 0;
        };

        self.init = function () {
            if(settings.dataTableView){
                settings.dataTableView.dataTable.on('click', '.action-buttons .edit', function(){
                    var id = $(this).data("item-id");
                    self.editForm(id);
                });
            }

            ko.applyBindings(self, settings.form.get(0));
            self.loadForm();
        };

        self.loadForm = function () {
            $.ajax({
                url: settings.url + '?format=json',
                type: "options",
                data: {},
                success: function (response) {
                    var formObject = response.actions.POST;
                    var fields = [];
                    for (var property in formObject) {
                        if (formObject.hasOwnProperty(property)) {
                            var field = formObject[property];
                            field.name = property;
                            field.fieldTemplate = field.type + "-field-template";
                            field.fieldId = "input_" + field.name;
                            fields.push(field);
                        }
                    }
                    self.fields(fields);
                },
                error: function (jXHR, textStatus, errorThrown) {
                    console.error(errorThrown);
                }
            });
        };

        self.editForm = function (id) {
            $.ajax({
                url: settings.url + id + '/?format=json',
                type: "get",
                data: {},
                success: function (response) {
                    for (property in response) {
                        if (response.hasOwnProperty(property)) {
                            var element = settings.form.find('#input_' + property);
                            if (element) {

                                if (element.attr("type") === "checkbox") {
                                    element.prop('checked', response[property] === true);
                                } else {
                                    element.val(response[property]);
                                }

                            }
                        }
                    }
                    isEditMode = true;
                    currentItemId = id;
                },
                error: function (jXHR, textStatus, errorThrown) {
                    console.error(errorThrown);
                }
            });
        };
    }

    function DataTableView(settings) {
        self = this;
        self.dataTable= settings.dataTable;
        self.refreshDataTable = function () {
            $.ajax({
                url: settings.url + '?format=json',
                type: "get",
                data: {},
                success: function (response) {
                    var data_source = [];
                    response.forEach(function (item) {
                        var theaders = settings.dataTable.find('thead tr th');
                        var row = [];
                        theaders.each(function (index, thcell) {
                            var column_name = $(thcell).attr("name");
                            if (item[column_name]) {
                                row.push(item[column_name]);
                            }
                            else if (column_name == "actions") {
                                row.push('<div class="action-buttons"><a class="edit green" data-item-id="' + item.id + '"><i class="ace-icon fa fa-pencil bigger-130"></i></a></div>');
                            }
                            else {
                                row.push("");
                            }

                        });
                        data_source.push(row);
                    });
                    settings.dataTable.fnClearTable();
                    settings.dataTable.fnAddData(data_source);
                },
                error: function (jXHR, textStatus, errorThrown) {
                    console.error(errorThrown);
                }
            });
        };
    }


    $(document).ready(function () {


        var table_settings = {
            url: "/api/products/",
            dataTable: $('#dynamic-table').dataTable({
                //"aoColumns": columns,
                data: []
            })
        };

        var dataTableView = new DataTableView(table_settings);

        var form_settings = {
            url: "/api/products/",
            formId: "form_view",
            form: $('#form_view'),
            dataTableView: dataTableView
        };

        var formView = new FormView(form_settings);
        formView.init();
        dataTableView.refreshDataTable();

    });
})();