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
            settings.pointOfSaleView.refreshActiveOrders(cashierShift);
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

    function OrderDetailModel (){
        var self = this;
        self.productIdHasError = ko.observable(false);
        self.quantityHasError = ko.observable(false);
        self.priceHasError = ko.observable(false);
        self.productId = ko.observable();
        self.productDescription = ko.observable();
        self.quantity = ko.observable();
        self.price = ko.observable();

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

        self.reset = function(){
            self.productId(null);
            self.productDescription(null);
            self.quantity(null);
            self.price(null);

            self.productIdHasError(false);
            self.quantityHasError(false);
            self.priceHasError(false);
        };

        function isNumber(value) {

            var er = /^[0-9]|[0-9](.([0-9]))+$/;

            return er.test(value);
        }


        self.isValid = function(){
            self.productIdHasError(!isNumber(self.productId()) || !self.productDescription());
            self.quantityHasError(!isNumber(self.quantity()));
            self.priceHasError(!isNumber(self.price()));

            return !(self.productIdHasError() || self.quantityHasError() || self.priceHasError());
        };

        self.getData = function(){
            return {
                product_id:self.productId(),
                product_description: self.productDescription(),
                quantity: self.quantity(),
                price: self.price(),
                total: (self.quantity() * self.price())
            };
        }

    }

    function OrderModel(){
        var loading = false;
        var self = this;
        self.customerPhone=ko.observable();
        self.customerName=ko.observable();
        self.customerAddress=ko.observable();
        self.customerReference=ko.observable();
        self.update_customer_entry=ko.observable();
        self.DBcustomer = ko.observable();

        self.id = ko.observable();
        self.created_date = ko.observable();
        self.number = ko.observable();
        self.username = ko.observable();
        self.to_go = ko.observable();
        self.to_pickup = ko.observable();
        self.delivered = ko.observable();
        self.salesarea = ko.observable();

        self.total=ko.observable(0);
        self.paymentAmount=ko.observable(0);

        self.details= ko.observableArray();

        self.detailModel = new OrderDetailModel();
        self.cashierShift=ko.observable();


        self.changeAmount=ko.computed(function(){
            return self.paymentAmount() - self.total();
        });

        self.customerIsNew=ko.computed(function(){
            return !(self.DBcustomer() && self.DBcustomer().id > 0);
        });

        self.customerPhone.subscribe(function (value) {
            if(loading || !value || (value && self.DBcustomer() && value === self.DBcustomer().phone)){
                return;
            }

            self.DBcustomer(null);
            self.customerName(null);
            self.customerAddress(null);
            self.customerReference(null);

            GenericViews.getData("/api/customers/?format=json&phone="+value, function(response){
                if(response && response.length>0){
                    var customer = response[0];
                    self.DBcustomer(customer);
                    self.customerName(customer.name);
                    self.customerAddress(customer.address);
                    self.customerReference(customer.reference);
                }
            });
        });

        self.details.subscribe(function () {
            var total = 0;
            self.details().forEach(function(item){
                total+=item.total;
            });
            self.total(total);
        });

        self.addNewProduct = function () {
            if(self.detailModel.isValid()){
                self.details.push(self.detailModel.getData());
                self.detailModel.reset();
            }
        };

        self.deleteProduct = function(product){
            self.details.remove(product);
        };
        self.reset=function(){

        };
        self.setData=function(data){
            self.customerPhone(data.customer_phone);
            self.customerName(data.customer_name);
            self.customerAddress(data.customer_address);
            self.customerReference(data.customer_reference);
            self.update_customer_entry(data.update_customer_entry);
            self.DBcustomer(data.customer_phone);

            self.id(data.id);
            self.created_date(data.created_date);
            self.number(data.number);
            self.username(self.cashierShift().user_name);
            self.to_go(data.to_go);
            self.to_pickup(data.to_pick);
            self.delivered(data.delivered);
            self.salesarea(data.salesarea);

            self.total(data.total);
            self.paymentAmount(data.cash);

            self.details([]);
            self.detailModel.reset();
        };
        self.getData=function(){
            return {
                cash: self.id(),
                customer_change: self.changeAmount(),
                total: self.total(),
                update_customer_entry: self.update_customer_entry()
            };
        };
    }


    function PointOfSalesView(){
        var self = this;
        self.settings = {
            url: "/api/orders/"
        };

        self.theShiftIsActive = ko.observable(false);
        self.menuItems = ko.observableArray();
        self.order = new OrderModel();
        self.salesAreaList= ko.observableArray();
        self.activeOrders = new ko.observableArray();

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
            saveOrder(order.getData())
        };

        self.refreshActiveOrders=function(cashierShift){
            GenericViews.getData("/api/orders/?format=json&status=ACTIVE&cashier_shift="+cashierShift.id, function(response){
                self.activeOrders(response);
                if(response.length>0){
                    self.order.cashierShift(cashierShift);
                    self.order.setData(response[response.length-1])
                }else{
                    self.generateNewOrder()
                }
                console.log('active orders', response);
            });
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

        GenericViews.getData("/api/salesarea/?format=json", function(response){
            pointOfSaleView.salesAreaList(response);
        });

        $('#input_phone').mask('999-999-9999');

        continueOrCreateShift(cashierShiftFormView, pointOfSaleView)

    });
})();