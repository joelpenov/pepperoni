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

    GenericViews.loadFormFields = function(settings,callback){
        return $.ajax({
            url: settings.url + '?format=json',
            type: "options",
            data: {},
            success: function (response) {
                //console.log(response);
                callback(GenericViews.mapActionToFields(settings.includeFields,response.actions.POST ));
            },
            error: function (jXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            }
        });

    };
    GenericViews.saveData=function(formView,data){
        var method = "post";
        var link = formView.settings.url;
        formView.resetErrors();

        if (formView.isEditMode) {
            method = "put";
            link += formView.currentItemId + "/";
        }

        return $.ajax({
            url: link + '?format=json',
            type: method,
            data: data,
            success: function (response) {
                if (formView.settings.dataTableView) {
                    formView.settings.dataTableView.refreshDataTable();
                }
                formView.cancel();
            },
            error: function (jXHR, textStatus, errorThrown) {
                GenericViews.errorHandler(formView.fields(),jXHR,textStatus, errorThrown);
            }
        });
    };

    GenericViews.getData = function(url,id,callback){
        $.ajax({
            url: url + id + '/?format=json',
            type: "get",
            data: {},
            success: function (response) {
                callback(response);
            },
            error: function (jXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            }
        });
    };

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

    function FormView(settings) {
        var self = this;
        self.settings = settings;
        self.fields = ko.observableArray();
        self.isEditMode = false;
        self.currentItemId = 0;
        settings.includeFields =settings.includeFields|| [];

        self.save = function () {
            var request = GenericViews.saveData(self,settings.form.serializeJSON());
            request.success( function (response) {

            });
        };

        self.resetErrors = function(){
            GenericViews.resetFieldErrors(self.fields());
        };

        self.cancel = function () {
            settings.form.get(0).reset();
            self.isEditMode = false;
            self.currentItemId = 0;
            self.resetErrors();
        };

        self.loadForm = function () {
            GenericViews.loadFormFields(settings,function(fields){
                self.fields(fields);
            });
        };

        self.editForm = function (id) {
            GenericViews.getData(settings.url,id,function(response){
                GenericViews.loadEditFormData(settings.form, response);
                self.isEditMode = true;
                self.currentItemId = id;
            });
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
    }


    GenericViews.DataTableView = DataTableView;
    GenericViews.FormView = FormView;

})();