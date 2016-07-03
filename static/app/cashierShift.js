var PEPPERONI = PEPPERONI || {};

(function(){

    function MoneyModel(){
        var self = this;
        self.count = ko.observable(0);
        self.value = ko.observable(0);
        self.total = ko.computed(function(){
            return PEPPERONI.formatAsMoney(self.count() * self.value(),0);
        });

        self.setData = function(data){
            self.count(data.count);
            self.value(data.value);
            return self;
        };
        self.getData = function(){
            return {
                count: self.count(),
                value: self.value()
            };
        };
    }

    function ShiftListView(){
        var self = this;
        self.showShiftList=ko.observable(true);

        self.show=function(){
            self.showShiftList(true);
        };

        self.hide=function(){
            self.showShiftList(false);
        };


        self.onShow =function(callback){
            self.showShiftList.subscribe(function(value){
                if(value) callback();
            });
        };

        self.onHide =function(callback){
            self.showShiftList.subscribe(function(value){
                if(!value) callback();
            });
        };

        self.init=function(){
            ko.applyBindings(self,document.getElementById('cashier-shift-view'));
        };

    }

    function FinishShiftView(settings){
        var self = this;
        self.showFinishSwiftView = ko.observable(false);
        self.cashierShift = ko.observable({});

        self.totalActive = ko.observable(0).extend({numeric:2});
        self.totalFinished = ko.observable(0).extend({numeric:2});
        self.totalVoid = ko.observable(0).extend({numeric:2});
        self.difference = ko.observable(0).extend({numeric:2});
        self.totalNotDelivered = ko.observable(0).extend({numeric:2});
        self.orders = ko.observableArray();
        self.activeOrders = ko.observableArray();
        self.finishedOrders = ko.observableArray();
        self.voidOrders = ko.observableArray();

        self.totalRegister=ko.observable();
        self.startBalance=ko.observable();
        self.moneyDetails= ko.observableArray();

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
            var notDeliveredOrderFilter = self.filterBy(function(order){return order.status ==='FINISHED' && order.delivered!==true});
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

            self.startBalance(PEPPERONI.formatAsMoney(self.cashierShift().start_balance));
            self.totalRegister(PEPPERONI.formatAsMoney(self.cashierShift().close_balance));
            self.difference(PEPPERONI.formatAsMoney(self.totalRegister()-self.startBalance()-self.totalFinished()));
        });

        self.updateLayout = function(){
            var orderReviewContainer = $('.order-review');
            orderReviewContainer.height(innerHeight- orderReviewContainer.offset().top);
        };


        $(window).resize(function(){
            if(self.showFinishSwiftView()){
                self.updateLayout();
            }
        });


        self.show=function(){
            self.showFinishSwiftView(true);
            self.updateLayout();
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

        self.cancel = function(){
            self.showFinishSwiftView(false);
        };

        self.openMoneyDetailModal = function(){
            $('#moneyModal').modal('show');
        };

        self.init=function(){
            ko.applyBindings(self,document.getElementById('finish-shift-view'));
        };
    }

    function initializeFinishShiftView(){
        var finishShiftView = new FinishShiftView({});
        finishShiftView.init();
        return finishShiftView;
    }
    function initializeShiftListView(){
        var shiftListView = new ShiftListView({});
        shiftListView.init();
        return shiftListView;
    }

    $(document).ready(function(){

        var shiftView = initializeFinishShiftView();
        var shiftListView = initializeShiftListView();
        var table_settings = {
            url: "/api/cashiershifts/",
            dataTable: PEPPERONI.createDatatableInstance({tableId: '#dynamic-table'})
        };

        var dataTableView = new GenericViews.DataTableView(table_settings);

        dataTableView.refreshDataTable();

        shiftListView.onShow(function(){
            shiftView.hide();
        });

        shiftListView.onHide(function(){
            shiftView.show();
        })

        shiftView.onHide(function(){
            shiftListView.show();
        });

        table_settings.dataTable.on('click', '.action-buttons .view', function(){
            var id = $(this).data("item-id");
            GenericViews.getData("/api/cashiershifts/"+id+"?format=json", function(response){
                shiftView.cashierShift(response);
                var tempMoneyDetail = [];
                response.cashier_shift_money.forEach(function(data){
                   tempMoneyDetail.push(new MoneyModel().setData(data));
                });
                shiftView.moneyDetails(tempMoneyDetail);

                GenericViews.getData("/api/orders/?format=json&cashier_shift="+response.id, function(response){
                    response.forEach(function(order){
                        order.showDetails = ko.observable(false);
                    });
                    shiftView.orders(response);
                    shiftListView.hide();
                });
            });
        });

    });
})();