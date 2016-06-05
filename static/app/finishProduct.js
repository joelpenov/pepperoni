(function(){
    function ProductUsageModel() {
        var factory= this;
        factory.included = ko.observable(true);
        factory.itemId = ko.observable();
        factory.itemName = ko.observable();
        factory.setData = function(data){
            factory.itemId (data.id);
            factory.itemName (data.description);
            return factory;
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
        self.productUsages = ko.observableArray();


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
            ko.applyBindings(self, document.getElementById('product-usages-view'));
            self.loadForm();
        };
    }

    $(document).ready(function(){

        var form_settings = {
            url: "/api/finishproduct/",
            form: $('#form_view'),
            includeFields: ['warehouse']
        };

        var formView = new FormView(form_settings);
        formView.init();

        GenericViews.getData("/api/products/?format=json&is_raw_material=True", function(response){
            var tempItems = [];
            response.forEach(function(data){
                tempItems.push(new ProductUsageModel().setData(data));
            });
            formView.productUsages(tempItems);
        });


    });
})();