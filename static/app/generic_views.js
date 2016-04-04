var GenericViews = GenericViews || {};
var PEPPERONI = PEPPERONI || {};

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

    var status = {
        'ACTIVE':'Activo',
        'CLOSE':'Cerrado',
        'FINISHED':'Terminado',
        'VOID':'Nulo',
    }

    GenericViews.tableRenders = {
        'edit-action': function ( data, type, row ) {
            return '<div class="action-buttons"><a class="edit green" data-item-id="' + data + '"><i class="ace-icon fa fa-pencil bigger-130"></i></a></div>';
        },
        'view-action': function ( data, type, row ) {
            return '<div class="action-buttons"> <a class="view blue" data-item-id="' + data + '"><i class="ace-icon fa fa-eye bigger-130" ></i></a> </div>';
        },
        'boolean': function ( data, type, row ) {
            return data === true? '<div class="action-buttons"><a class="edit green"><i class="fa fa-check bigger-130"></i></a></div>': ''
        },
        'check-switch': function ( data, type, row ) {
            var checked =  data === true? 'checked="checked"' : '';
            return '<div class="checkbox">'+
            '<label>'+
                '<input type="checkbox" value="True" class="ace ace-switch" data-unchecked-value="false" '+checked+' />'+
                '<span class="lbl" data-lbl="SI&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NO"></span>'+
                '<span class="help-block" data-bind="foreach:errors">'+
                '     <span data-bind="text: $data"></span>'+
                '</span>'+
            '</label>'+
        '</div>';
        },
        'money':  function ( data, type, row ) {
            return PEPPERONI.formatAsMoney(data);
        },
        'datetime':function ( data, type, row ) {
            return PEPPERONI.longDateFormat(data);
        },
        'status':function ( data, type, row ) {
            return status[data];
        },
    };

    function DataTableView(settings) {
        var self = this;
        self.dataTable= settings.dataTable;

        self.refreshDataTable = function (overRideUrl) {
            var url = overRideUrl || settings.url + '?format=json';
            $.ajax({
                url: url,
                type: "get",
                data: {},
                success: function (response) {
                    settings.dataTable.fnClearTable();
                    if(response.length> 0){
                        settings.dataTable.fnAddData(response);
                    }
                },
                error: function (jXHR, textStatus, errorThrown) {
                    console.error(errorThrown);
                }
            });
        };

        self.reset  =function(){
            settings.dataTable.fnDestroy();
            settings.dataTable = settings.dataTable.DataTable();
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

    GenericViews.showNotification = function(message){
        $('.alert.alert-danger').remove();
        var notification = $('#notification-template').html().replace('{message}', message);
        $('.main-container').append(notification);
    };

    GenericViews.DataTableView = DataTableView;
    GenericViews.FormView = FormView;

})();