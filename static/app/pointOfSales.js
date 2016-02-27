var PEPPERONI = PEPPERONI || {};

(function(){

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
                self.quantity(1);
                self.price(response.sell_price);
            });
        });

        self.addItemToDetailEditor=function(item){
            self.productId(item.id);
        };

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

    function OrderModel(settings){
        var loading = false;
        var self = this;
        self.customerPhone=ko.observable();
        self.customerName=ko.observable();
        self.customerAddress=ko.observable();
        self.customerReference=ko.observable();
        self.update_customer_entry=ko.observable();
        self.isDBcustomer = ko.observable(false);
        self.dbcustomerPhone = ko.observable();

        self.id = ko.observable(0);
        self.created_date = ko.observable();
        self.number = ko.observable();
        self.username = ko.observable();
        self.to_go = ko.observable(false);
        self.to_pickup = ko.observable(false);
        self.delivered = ko.observable(false);
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
            return !self.isDBcustomer();
        });

        self.isNew = ko.computed(function(){
            return self.id()===0;
        });

        self.isEditing = ko.computed(function(){
            return !self.isNew();
        });

        self.customerPhone.subscribe(function (value) {

            if(!value){
                self.isDBcustomer(false);
                self.customerName(null);
                self.customerAddress(null);
                self.customerReference(null);
                self.dbcustomerPhone(null);
            }

            if(loading || !value || (value && self.isDBcustomer() && value === self.dbcustomerPhone())){
                return;
            }

            self.isDBcustomer(false);
            self.customerName(null);
            self.customerAddress(null);
            self.customerReference(null);
            self.dbcustomerPhone(null);

            GenericViews.getData("/api/customers/?format=json&phone="+value, function(response){
                if(response && response.length>0){
                    var customer = response[0];
                    self.isDBcustomer(true);
                    self.customerName(customer.name);
                    self.customerAddress(customer.address);
                    self.customerReference(customer.reference);
                    self.dbcustomerPhone(customer.phone);
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
            self.setData({
                id:0,
                update_customer_entry:false,
                to_go:false,
                to_pickup:false,
                delivered:false,
                total:0,
                cash:0,
                sales_area:undefined,
                details:[]
            });
        };
        self.setData=function(data){
            self.customerPhone(data.customer_phone);
            self.customerName(data.customer_name);
            self.customerAddress(data.customer_address);
            self.customerReference(data.customer_reference);
            self.update_customer_entry(data.update_customer_entry);

            if(data.customer_id && data.customer_id >0){
                self.isDBcustomer(true);
                self.dbcustomerPhone(data.customer_phone)
            }else{
                self.isDBcustomer(false);
                self.dbcustomerPhone(null);
            }

            self.id(data.id);
            self.created_date(PEPPERONI.longDateFormat(data.created_date));
            self.number(data.number);
            self.username(self.cashierShift().user_name);
            self.to_go(data.to_go);
            self.to_pickup(data.to_pickup);
            self.delivered(data.delivered);
            self.salesarea(data.sales_area);

            self.total(data.total);
            self.paymentAmount(data.cash);

            self.detailModel.reset();
            self.details(data.details);
        };
        self.getData=function(){
            return {
                id:self.id(),
                customer_phone: self.customerPhone(),
                customer_name: self.customerName(),
                customer_address: self.customerAddress(),
                customer_reference: self.customerReference(),
                update_customer_entry: self.update_customer_entry(),
                to_go: self.to_go(),
                to_pickup: self.to_pickup(),
                delivered: self.delivered(),
                sales_area: self.salesarea(),
                cash: self.paymentAmount(),
                customer_change: self.changeAmount(),
                total: self.total(),
                details:self.details()
            };
        };

        self.save=function(action, onSuccess, onError){
            var data = self.getData();
            data.action = action;
            var method = "post";
            var link = settings.url;
            //formView.resetErrors();

            if (self.isEditing()) {
                method = "put";
                link += self.id() + "/";
            }

            return $.ajax({
                url: link + '?format=json',
                type: method,
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (response) {
                    console.log('created order', response);
                    if(onSuccess) onSuccess(response);
                },
                error: function (jXHR, textStatus, errorThrown) {
                    console.log('errors',jXHR.responseJSON, textStatus, errorThrown);
                    GenericViews.showNotification(jXHR.responseJSON);

                    //alert(jXHR.responseJSON);
                    //GenericViews.errorHandler(formView.fields(),jXHR,textStatus, errorThrown);
                }
            });
        };
    }

    function PointOfSalesView(posSettings){
        var self = this;
        self.settings = {
            url: "/api/orders/"
        };

        self.showPointOfSaleView = ko.observable(false);
        self.menuItems = ko.observableArray();
        self.order = new OrderModel(self.settings);
        self.salesAreaList= ko.observableArray();
        self.activeOrders = new ko.observableArray();

        self.customerLastOrders= ko.observableArray();

        self.show = function(){
            self.showPointOfSaleView(true);
        };

        self.hide = function(){
            self.showPointOfSaleView(false);
        };

        self.onShow =function(callback){
            self.showPointOfSaleView.subscribe(function(value){
                if(value) callback();
            });
        };

        self.onHide =function(callback){
            self.showPointOfSaleView.subscribe(function(value){
                if(!value) callback();
            });
        };

        self.order.customerPhone.subscribe(function (value) {
            if(value){
                GenericViews.getData('/api/toporders/?format=json&customer_phone='+value,function(response){
                    self.customerLastOrders(response);
                });
            }else{
                self.customerLastOrders([]);
            }

        });

        self.customerHasOrdered=ko.computed(function(){
            return self.customerLastOrders().length > 0;
        });

        self.newOrder = function(){
            self.order.reset();
        };

        self.save = function(){
            var request = self.order.save('save');
            request.success(function(response){
                self.order.setData(response);
                self.refreshActiveOrders();
            });
        };

        self.cancel = function(){
            if(self.order.isNew()){
                self.order.reset();
                return;
            }

            var request = self.order.save('cancel');
            request.success(function(response){
                self.order.reset();
                self.refreshActiveOrders();
            });
        };

        self.print = function(){
            alert('printing');
        };

        self.finish = function(){
            var request =self.order.save('finish');
            request.success(function(response){
                self.order.reset();
                self.refreshActiveOrders();
            });
        };

        self.showOrders = function(){
            alert('order list');
        };

        self.finishShift = function(){
            posSettings.finishShiftView.show();
        };

        self.editActiveOrder = function(order){
            self.order.setData(order);
        };

        self.refreshActiveOrders=function(){
            GenericViews.getData("/api/orders/?format=json&status=ACTIVE&cashier_shift="+self.order.cashierShift().id, function(response){
                self.activeOrders(response);
            });
        };

        self.openCustomerSearch = function(){
            posSettings.customerSearchTable.refreshDataTable();
            $('#searchClientsModal').modal('show');
        };

        self.openProductSearch = function(){
            posSettings.productSearchTable.refreshDataTable();
            $('#searchProductsModal').modal('show')
        };

        self.continueOrCreateShift= function(){
            var current_user_id = $('#current_user_id').val();
            GenericViews.getData("/api/cashiershifts/?format=json&status=ACTIVE&user="+current_user_id, function(response){
                console.log(response);
                if(response.length>0){
                    self.show();
                    posSettings.cashierShiftFormView.cashierShift(response[0]);
                }else{
                    posSettings.cashierShiftFormView.show();
                }
            });
        };

        function setSearchEvents(){
            $('#search_customer_modal tbody').on( 'click', 'tr', function () {
                var row = $(this);
                var phone = row.find('td:first').html();
                self.order.customerPhone(phone);
                $('#searchClientsModal').modal('hide');
            });

            $('#search_product_modal tbody').on( 'click', 'tr', function () {
                var row = $(this);
                var codigo = row.find('td:first').html();
                self.order.detailModel.productId(codigo);
                $('#searchProductsModal').modal('hide');
            });
        }
        function setShowHideViewEvents(){

            self.onShow(function(){
                posSettings.cashierShiftFormView.hide();
                posSettings.finishShiftView.hide();
            });

            posSettings.cashierShiftFormView.onShow(function(){
                self.hide();
                posSettings.finishShiftView.hide();
            });

            posSettings.finishShiftView.onShow(function(){
                self.hide();
                posSettings.cashierShiftFormView.hide();
            });
        }

        function setCashierShiftEvents (){
            posSettings.cashierShiftFormView.cashierShift.subscribe(function(cashierShift){
                self.order.cashierShift(cashierShift);
                self.refreshActiveOrders();
            });

            posSettings.cashierShiftFormView.onCreate(function(){
                self.continueOrCreateShift();
            });

            posSettings.finishShiftView.onShow(function(){
                GenericViews.getData("/api/orders/?format=json&cashier_shift="+self.order.cashierShift().id, function(response){
                    console.log(response);
                    response.forEach(function(order){
                        order.showDetails = ko.observable(false);
                    });
                    posSettings.finishShiftView.orders(response);
                });
            });
        }

        function setDefaultValues(){
            GenericViews.getData("/api/products/?format=json&show_in_menu=True", function(response){
                self.menuItems(response);
            });

            GenericViews.getData("/api/salesarea/?format=json", function(response){
                self.salesAreaList(response);
            });

            $('#input_phone').mask('999-999-9999');
        }

        self.init = function(){
            setSearchEvents();
            setShowHideViewEvents();
            setCashierShiftEvents();
            setDefaultValues();

            self.continueOrCreateShift();
        };

    }

    function CashierShiftFormView(settings) {
        var self = this;
        self.settings = settings;
        self.cashierShift = ko.observable();
        self.fields = ko.observableArray();
        settings.includeFields =settings.includeFields|| [];
        settings.afterRender = settings.afterRender || function(){};
        self.afterRender = settings.afterRender;

        self.showNewShiftFormView = ko.observable(false);

        self.show = function(){
            self.showNewShiftFormView(true);
        };

        self.hide = function() {
            self.showNewShiftFormView(false);
        };

        self.onShow =function(callback){
            self.showNewShiftFormView.subscribe(function(value){
                if(value) callback();
            });
        };

        self.onHide =function(callback){
            self.showNewShiftFormView.subscribe(function(value){
                if(!value) callback();
            });
        };

        var createdEvent = ko.observable();
        self.onCreate =function(callback){
            createdEvent.subscribe(callback);
        };

        self.save = function () {
            var request = GenericViews.saveData(self,settings.form.serializeJSON());
            request.success(function(result){
                createdEvent(result);
            });
        };

        self.resetErrors = function(){
            GenericViews.resetFieldErrors(self.fields());
        };

        self.cancel = function () {
            GenericViews.resetFieldDefaultValue(self.fields());
            self.resetErrors();
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

    function FinishShiftView(settings){
        var self = this;
        self.showFinishSwiftView = ko.observable(false);
        self.totalRegister = ko.observable(0).extend({numeric:2});
        self.totalActive = ko.observable(0).extend({numeric:2});
        self.totalFinished = ko.observable(0).extend({numeric:2});
        self.totalVoid = ko.observable(0).extend({numeric:2});
        self.difference = ko.observable(0).extend({numeric:2});
        self.totalNotDelivered = ko.observable(0).extend({numeric:2});
        self.orders = ko.observableArray();
        self.activeOrders = ko.observableArray();
        self.finishedOrders = ko.observableArray();
        self.voidOrders = ko.observableArray();

        self.totalRegister.subscribe(function(){
            self.difference(PEPPERONI.formatAsMoney(self.totalRegister()-self.totalFinished()));
        });

        self.filterBy=function(matches){
            var total = 0;
            var filterOrders= [];
            self.orders().forEach(function(order){
                if(matches(order)) {
                   total += order.total;
                    filterOrders.push(order);
                }
            });
            return {
                total:total,
                orders:filterOrders
            };
        };

        self.orders.subscribe(function(){
            var notDeliveredOrderFilter = self.filterBy(function(order){return order.delivered!==true});
            self.totalNotDelivered(notDeliveredOrderFilter.total);
            self.difference(self.totalRegister()-self.totalActive());

            var activesOrderFilter = self.filterBy(function(order){return order.status ==='ACTIVE'});
            self.activeOrders(activesOrderFilter.orders);
            self.totalActive(activesOrderFilter.total);

            var finishedOrderFilter = self.filterBy(function(order){return order.status ==='FINISHED'});
            self.finishedOrders(finishedOrderFilter.orders);
            self.totalFinished(finishedOrderFilter.total);

            var voidOrderFilter = self.filterBy(function(order){return order.status ==='VOID'});
            self.voidOrders(voidOrderFilter.orders);
            self.totalVoid(voidOrderFilter.total);
        });

        self.show=function(){
            self.showFinishSwiftView(true);
        };

        self.hide=function(){
            self.showFinishSwiftView(false);
        };


        self.onShow =function(callback){
            self.showFinishSwiftView.subscribe(function(value){
                if(value) callback();
            });
        };

        self.onHide =function(callback){
            self.showFinishSwiftView.subscribe(function(value){
                if(!value) callback();
            });
        };

        self.toggleDetails=function(order){
            order.showDetails(!order.showDetails());
        };

        self.finishShift = function(){
            var totalRegister = self.totalRegister();
            if(totalRegister<=0)
            {

            }
            return $.ajax({
                url: '/api/cashiershifts/' + '?format=json',
                type: 'PUT',
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (response) {
                    console.log(reponse);
                },
                error: function (jXHR, textStatus, errorThrown) {
                    console.log(error,Thrown);
                }
            });
        };

        self.init=function(){
            ko.applyBindings(self,document.getElementById('finish-shift-view'));
        };
    }

    function initializeCustomerSearch(){
        var table_settings = {
            url: "/api/customers/",
            dataTable: PEPPERONI.createDatatableInstance({tableId: '#search_customer_modal', keys: true})           
        };

        return new GenericViews.DataTableView(table_settings);
    }

    function initializeProductSearch(){
        var table_settings = {
            url: "/api/products/",
            dataTable: PEPPERONI.createDatatableInstance({tableId: '#search_product_modal', keys: true})
        };

        return new GenericViews.DataTableView(table_settings);
    }

    function initializeFinishShiftView(){
        var finishShiftView = new FinishShiftView({});
        finishShiftView.init();
        return finishShiftView;
    }

    function initializeCashierShiftFormView(){
        var form_settings = {
            url: "/api/cashiershifts/",
            formId: "form_view",
            form: $('#form_view'),
            includeFields: ['cash_register'],
        };
        var cashierShiftFormView = new CashierShiftFormView(form_settings);
        cashierShiftFormView.init();
        return cashierShiftFormView;
    }

    $(document).ready(function(){
        var posSettings = {
            customerSearchTable: initializeCustomerSearch(),
            productSearchTable: initializeProductSearch(),
            finishShiftView: initializeFinishShiftView(),
            cashierShiftFormView: initializeCashierShiftFormView()
        };

        var pointOfSaleView = new PointOfSalesView(posSettings);
        ko.applyBindings(pointOfSaleView,document.getElementById('point-of-sales-page'));
        pointOfSaleView.init();

        shortcut.add('F2', function(){pointOfSaleView.newOrder();})
        shortcut.add('F3', function(){pointOfSaleView.save();})
        shortcut.add('F4', function(){pointOfSaleView.finish();})
        shortcut.add('F5', function(){pointOfSaleView.cancel();})
        shortcut.add('F6', function(){pointOfSaleView.print();})
        shortcut.add('F7', function(){pointOfSaleView.showOrders();})
        shortcut.add('F8', function(){pointOfSaleView.finishShift();})

    });
})();