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
    GenericViews.resetFieldDefaultValue=function(fields){
        fields.forEach(function(field){
            if(field.type==="date"){
                field.value(new Date().toISOString().split('T')[0]);
            }else if(field.type==="boolean"){
                field.value(false);
            }
            else{
                field.value(null);
            }
        });
    };

    GenericViews.loadEditFormData=function(fields, response){
        GenericViews.resetFieldErrors(fields);
        fields.forEach(function(field){
            field.value(response[field.name]);
        });
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
                field.child = tempfield.child;
                field.value = ko.observable();


                field.name = property;
                field.fieldId = "input_" + field.name;
                field.errors = ko.observableArray();
                field.hasError = ko.observable(false);

                if(field.type==="field" && field.choices){
                    field.fieldTemplate = "choice-field-template";
                    fields.push(field);
                }
                else if(field.type==="field" && field.child && field.child.type==="nested object"){
                    //do nothing
                }
                else{
                    field.fieldTemplate = field.type + "-field-template";
                    fields.push(field);
                }

                if(field.type==="date"){
                    field.value(new Date().toISOString().split('T')[0]);
                }
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
                console.log(response);
                callback(GenericViews.mapActionToFields(settings.includeFields,response.actions.POST ), response);
            },
            error: function (jXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            }
        });

    };
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });

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
            contentType: "application/json",
            data: JSON.stringify(data),
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
    GenericViews.getData = function(url,callback){
        return $.ajax({
            url: url,
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

    GenericViews.getDataById = function(url,id,callback){
        var link  = url + id + '/?format=json';
        return GenericViews.getData(link,callback);
    };

    function DataTableView(settings) {
        self = this;
        settings.language =
                           [ {
                            "sProcessing":     "Procesando...",
                            "sLengthMenu":     "Mostrar _MENU_ registros",
                            "sZeroRecords":    "No se encontraron resultados",
                            "sEmptyTable":     "Ningún dato disponible en esta tabla",
                            "sInfo":           "Mostrando del _START_ al _END_ de un total de _TOTAL_ registros",
                            "sInfoEmpty":      "Mostrando del 0 al 0 de un total de 0 registros",
                            "sInfoFiltered":   "(filtrados de un total de _MAX_ registros)",
                            "sInfoPostFix":    "",
                            "sSearch":         "Buscar:",
                            "sUrl":            "",
                            "sInfoThousands":  ",",
                            "sLoadingRecords": "Cargando...",
                            "oPaginate": {
                                "sFirst":    "Primero",
                                "sLast":     "Último",
                                "sNext":     "Siguiente",
                                "sPrevious": "Anterior"
                            },
                            "oAria": {
                                "sSortAscending":  ": Ordenar la columna de manera ascendente",
                                "sSortDescending": ": Ordenar la columna de manera descendente"
                            }
                        }];
        self.dataTable= settings.dataTable;
        settings.actionRender = settings.actionRender || function(item){
                return '<div class="action-buttons"><a class="edit green" data-item-id="' + item.id + '"><i class="ace-icon fa fa-pencil bigger-130"></i></a></div>';
            };
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
                                row.push(settings.actionRender(item));
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
        settings.afterRender = settings.afterRender || function(){};
        self.afterRender = settings.afterRender;

        self.save = function () {
            GenericViews.saveData(self,settings.form.serializeJSON());
        };

        self.resetErrors = function(){
            GenericViews.resetFieldErrors(self.fields());
        };

        self.cancel = function () {
            GenericViews.resetFieldDefaultValue(self.fields());
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
            GenericViews.getDataById(settings.url,id,function(response){
                GenericViews.loadEditFormData(self.fields(), response);
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