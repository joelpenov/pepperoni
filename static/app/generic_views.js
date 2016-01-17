var GenericViews = GenericViews || {};
(function () {

    GenericViews.errorHandler=function(fields, jXHR, status, errorThrown){
        var response = jXHR.responseJSON;
        if(response){
            for(var property in response){
                if(response.hasOwnProperty(property)){
                    var field = ko.utils.arrayFirst(fields, function(item){
                        return item.name === property;
                    });
                    if(field){
                        field.errors(response[property]);
                        field.hasError(true);
                    }
                }
            }
        }else{
            console.error(errorThrown);
        }
    };
    GenericViews.resetFieldErrors=function(fields){
        fields.forEach(function(field){
            field.errors([]);
            field.hasError(false);
        });
    };
    GenericViews.loadEditFormData=function(form, response){
        for (var property in response) {
            if (response.hasOwnProperty(property)) {
                var element = form.find('#input_' + property);
                if (element) {

                    if (element.attr("type") === "checkbox") {
                        element.prop('checked', response[property] === true);
                    } else {
                        element.val(response[property]);
                    }

                }
            }
        }
    };
    GenericViews.mapActionToFields=function(includeFields,actionFields){
        var fields = [];
        for (var property in actionFields) {
            if (actionFields.hasOwnProperty(property) && (includeFields.length==0 || includeFields.indexOf(property) > -1 )) {
                var tempfield = actionFields[property];
                var field = {};
                field.label=tempfield.label;
                field.read_only= tempfield.read_only;
                field.require= tempfield.required;
                field.description= tempfield.description;
                field.type = tempfield.type;
                field.choices = tempfield.choices;
                field.value = ko.observable();

                if(field.type==="field"){
                    field.fieldTemplate = "choice-field-template";
                }
                else{
                    field.fieldTemplate = field.type + "-field-template";
                }

                if(field.type==="date"){
                    field.value(new Date().toISOString().split('T')[0]);
                }

                field.name = property;
                field.fieldId = "input_" + field.name;
                field.errors = ko.observableArray();
                field.hasError = ko.observable(false);
                fields.push(field);
            }
        }
        return fields;
    };

    function FormView(settings) {
        var self = this;
        self.fields = ko.observableArray();
        var isEditMode = false;
        var currentItemId = 0;
        settings.includeFields =settings.includeFields|| [];

        self.save = function () {
            var method = "post";
            var link = settings.url;
            if (isEditMode) {
                method = "put";
                link += currentItemId + "/";
            }
            self.resetErrors();
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
                    GenericViews.errorHandler(self.fields(),jXHR,textStatus, errorThrown);
                }
            });
        };

        self.resetErrors = function(){
            GenericViews.resetFieldErrors(self.fields());
        };

        self.cancel = function () {
            settings.form.get(0).reset();
            isEditMode = false;
            currentItemId = 0;
            self.resetErrors();
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
            var request= $.ajax({
                url: settings.url + '?format=json',
                type: "options",
                data: {},
                success: function (response) {
                    self.fields(GenericViews.mapActionToFields(settings.includeFields,response.actions.POST ));
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
                    GenericViews.loadEditFormData(settings.form, response);
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
                        settings.dataTable.fnClearTable();
                        settings.dataTable.fnAddData(data_source);
                    });

                },
                error: function (jXHR, textStatus, errorThrown) {
                    console.error(errorThrown);
                }
            });
        };
    }
    GenericViews.DataTableView = DataTableView;
    GenericViews.FormView = FormView;

})();