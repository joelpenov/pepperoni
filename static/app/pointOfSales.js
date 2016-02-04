(function(){

    function CashierShiftFormView(settings) {
        var self = this;
        self.settings = settings;
        self.cashierShift = ko.observable();
        self.fields = ko.observableArray();
        settings.includeFields =settings.includeFields|| [];
        settings.afterRender = settings.afterRender || function(){};
        self.afterRender = settings.afterRender;


        self.theShiftIsNotActive = ko.observable(false);

        self.cashierShift.subscribe(function(cashierShift){
            settings.pointOfSaleView.getLastActiveOrder(cashierShift);
        });

        self.save = function () {
            var request = GenericViews.saveData(self,settings.form.serializeJSON());

            request.success(function(){
                continueOrCreateShift(self,settings.pointOfSaleView)
            });
        };

        self.resetErrors = function(){
            GenericViews.resetFieldErrors(self.fields());
        };

        self.cancel = function () {
            GenericViews.resetFieldDefaultValue(self.fields());
            self.resetErrors();
            self.theShiftIsNotActive(false);
        };

        self.loadForm = function () {
            GenericViews.loadFormFields(settings,function(fields){
                self.fields(fields);
            });
        };

        self.init = function () {
            ko.applyBindings(self, document.getElementById('cashier-shift-view'));
            self.loadForm();
        };
    }

    function PointOfSalesView(){
        var self = this;
        self.settings = {
            url: "/api/orders/"
        };

        self.theShiftIsActive = ko.observable(false);

        self.menuItems = ko.observableArray();
        self.productIdHasError = ko.observable(false);
        self.quantityHasError = ko.observable(false);
        self.priceHasError = ko.observable(false);
        self.productId = ko.observable();
        self.productDescription = ko.observable();
        self.quantity = ko.observable();
        self.price = ko.observable();
        self.orderDetails= ko.observableArray();
        self.orderTotal=ko.observable(0);
        self.paymentAmount=ko.observable(0);


        self.clientPhoneNumber=ko.observable();
        self.clientName=ko.observable();
        self.clientAddress=ko.observable();
        self.clientReference=ko.observable();
        self.dataBaseClient = ko.observable();

        var saveOrder=function(data){
            var method = "post";
            var link = self.settings.url;
            //formView.resetErrors();
            //
            //if (formView.isEditMode) {
            //    method = "put";
            //    link += formView.currentItemId + "/";
            //}



            return $.ajax({
                url: link + '?format=json',
                type: method,
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (response) {
                   console.log('created order', response)
                },
                error: function (jXHR, textStatus, errorThrown) {
                    console.log('errors',textStatus, errorThrown);
                    //GenericViews.errorHandler(formView.fields(),jXHR,textStatus, errorThrown);
                }
            });
        };

        self.generateNewOrder = function(){
            saveOrder({
                cash: 0,
                customer_change: 0,
                total: 0,
                update_customer_entry: false
            })
        };

        self.loadOrder = function(){

        };

        self.getLastActiveOrder=function(cashierShift){
            GenericViews.getData("/api/orders/?format=json&status='ACTIVE'&cashier_shift="+cashierShift.id, function(response){
                if(response.length>0){
                    self.loadOrder(response[0])
                }else{
                    self.generateNewOrder()
                }
                console.log('active orders', response);
            });
        };

        self.changeAmount=ko.computed(function(){
            return self.paymentAmount() - self.orderTotal();
        });

        self.newClient=ko.computed(function(){
            return !(self.dataBaseClient() && self.dataBaseClient().id > 0);
        });

        self.orderDetails.subscribe(function () {
            var total = 0;
            self.orderDetails().forEach(function(item){
                total+=item.total;
            });
            self.orderTotal(total);
        });

        self.clientPhoneNumber.subscribe(function (value) {
            if(!value || (value && self.dataBaseClient() && value === self.dataBaseClient().phone)){
                return;
            }

            self.dataBaseClient(null);
            self.clientName(null);
            self.clientAddress(null);
            self.clientReference(null);

            GenericViews.getData("/api/customers/?format=json&phone="+value, function(response){
                if(response && response.length>0){
                    var client = response[0];
                    self.dataBaseClient(client);
                    self.clientName(client.name);
                    self.clientAddress(client.address);
                    self.clientReference(client.reference);
                }
            });
        });

        self.productId.subscribe(function () {
            if(!self.productId()){
                self.productDescription("");
                self.price(null);
                return;
            }

            GenericViews.getDataById("/api/products/", self.productId(),function (response) {
                self.productDescription(response.description);
                self.price(response.sell_price);
            });
        });

        function isNumber(value) {

            var er = /^[0-9]|[0-9](.([0-9]))+$/;

            return er.test(value);
        }

        self.cleanDetails = function(){
            self.productId(null);
            self.productDescription(null);
            self.quantity(null);
            self.price(null);

            self.productIdHasError(false);
            self.quantityHasError(false);
            self.priceHasError(false);
        };

        self.addNewProduct = function () {

            self.productIdHasError(!isNumber(self.productId()) || !self.productDescription());
            self.quantityHasError(!isNumber(self.quantity()));
            self.priceHasError(!isNumber(self.price()));

            if(self.productIdHasError() || self.quantityHasError() || self.priceHasError()) return;

            self.orderDetails.push({
                product_id:self.productId(),
                product_description: self.productDescription(),
                quantity: self.quantity(),
                price: self.price(),
                total: (self.quantity() * self.price())
            });

            self.cleanDetails();
        };

        self.deleteProduct = function(product){
            self.orderDetails.remove(product);
        };

    }



    function continueOrCreateShift(cashierShiftFormView, pointOfSaleView){
        var current_user_id = $('#current_user_id').val();

        GenericViews.getData("/api/cashiershifts/?format=json&status=ACTIVE&user="+current_user_id, function(response){
            console.log(response);
            if(response.length>0){
                cashierShiftFormView.theShiftIsNotActive(false);
                pointOfSaleView.theShiftIsActive(true);
                cashierShiftFormView.cashierShift(response[0]);

            }else{
                cashierShiftFormView.theShiftIsNotActive(true);
                pointOfSaleView.theShiftIsActive(false);
            }
        });
    }

    $(document).ready(function(){
        var pointOfSaleView = new PointOfSalesView();
        ko.applyBindings(pointOfSaleView,document.getElementById('point-of-sales-page'));

        var form_settings = {
            url: "/api/cashiershifts/",
            formId: "form_view",
            form: $('#form_view'),
            includeFields: ['cash_register'],
            pointOfSaleView: pointOfSaleView
        };

        var cashierShiftFormView = new CashierShiftFormView(form_settings);
        cashierShiftFormView.init();

        GenericViews.getData("/api/products/?format=json&show_in_menu=True", function(response){
            pointOfSaleView.menuItems(response);
        });

        $('#input_phone').mask('999-999-9999');

        continueOrCreateShift(cashierShiftFormView, pointOfSaleView)

    });
})();