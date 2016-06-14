(function(){

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
        self.finishProduct = ko.observable();


        self.showEntries = ko.observable(false);
        self.showCreateForm = ko.observable(false);
        self.showUpdateStockView = ko.observable(false);

        self.continueEditing = function(){
            GenericViews.getData("/api/finishproduct/?format=json&status=ACTIVE", function(response){
                if(response && response.length>0){
                   self.continueWithStock(response[0])
                }else{
                   self.refreshEntries()
                }
             });
        };

        self.refreshEntries = function(){
            self.showEntries(false);
            self.showCreateForm(false);
            GenericViews.getData("/api/finishproduct/?format=json&status=FINISH", function(response){
                if(response && response.length>0){
                   self.showEntries(true);
                }else{
                    self.showCreateForm(true);
                }
             });
        };

        self.continueWithStock = function(finishProduct){
            self.showCreateForm(false);
            self.showUpdateStockView(true);

            finishProduct.details.forEach(function(item){
                item.included_in_output=ko.observable(item.included_in_output);
                item.new_stock=ko.observable(item.new_stock);
                item.stock_usage = ko.computed(function(){
                    return item.old_stock - item.new_stock();
                });
            });

            self.finishProduct(finishProduct);

        };


        self.createProductUsageEntry = function () {
            self.isEditMode = false;
            self.currentItemId = 0;
            var request =  GenericViews.saveData(self,settings.form.serializeJSON());
            request.success(self.continueWithStock)
        };

        self.finishEditingProductUsage = function(){
            var finishProduct = self.finishProduct();
            self.isEditMode = true;
            self.currentItemId = finishProduct.id;
            var data = {
                id: finishProduct.id,
                warehouse: finishProduct.warehouse,
                details: finishProduct.details.map(function(item){
                    return {
                        id:item.id,
                        included_in_output:item.included_in_output(),
                        new_stock:item.new_stock(),
                        stock_usage:item.stock_usage()
                    };
                })
            };
            var request =  GenericViews.saveData(self,data);
            request.success(self.continueWithStock)
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

        formView.continueEditing();


    });
})();