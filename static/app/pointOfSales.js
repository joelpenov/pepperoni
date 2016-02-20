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
            self.created_date(data.created_date);
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
                    console.log('created order', response)
                    if(onSuccess) onSuccess(response);
                },
                error: function (jXHR, textStatus, errorThrown) {
                    console.log('errors',textStatus, errorThrown);
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
                self.refreshActiveOrders(self.order.cashierShift());
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
                self.refreshActiveOrders(self.order.cashierShift());
            });
        };

        self.print = function(){
            alert('printing');
        };

        self.finish = function(){
            var request =self.order.save('finish');
            request.success(function(response){
                self.order.reset();
                self.refreshActiveOrders(self.order.cashierShift());
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

        self.refreshActiveOrders=function(cashierShift){
            GenericViews.getData("/api/orders/?format=json&status=ACTIVE&cashier_shift="+cashierShift.id, function(response){
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
                self.refreshActiveOrders(cashierShift);
            });

            posSettings.cashierShiftFormView.onCreate(function(){
                self.continueOrCreateShift();
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
        self.orders = ko.observableArray();

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

        self.onShow(function(){
            //GenericViews.getData("/api/orders/?format=json&cashier_shift="+cashierShift.id, function(response){
            //    self.orders(response);
            //});
        });

        self.init=function(){
            ko.applyBindings(self,document.getElementById('finish-shift-view'));

            //var grid_data =
            //    [
            //        {id:"1",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
            //        {id:"2",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
            //        {id:"3",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
            //        {id:"4",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"},
            //        {id:"5",name:"Laser Printer",note:"note2",stock:"Yes",ship:"FedEx",sdate:"2007-12-03"},
            //        {id:"6",name:"Play Station",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
            //        {id:"7",name:"Mobile Telephone",note:"note",stock:"Yes",ship:"ARAMEX",sdate:"2007-12-03"},
            //        {id:"8",name:"Server",note:"note2",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
            //        {id:"9",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
            //        {id:"10",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
            //        {id:"11",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
            //        {id:"12",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
            //        {id:"13",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"},
            //        {id:"14",name:"Laser Printer",note:"note2",stock:"Yes",ship:"FedEx",sdate:"2007-12-03"},
            //        {id:"15",name:"Play Station",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
            //        {id:"16",name:"Mobile Telephone",note:"note",stock:"Yes",ship:"ARAMEX",sdate:"2007-12-03"},
            //        {id:"17",name:"Server",note:"note2",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
            //        {id:"18",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
            //        {id:"19",name:"Matrix Printer",note:"note3",stock:"No", ship:"FedEx",sdate:"2007-12-03"},
            //        {id:"20",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx", sdate:"2007-12-03"},
            //        {id:"21",name:"Laptop",note:"Long text ",stock:"Yes",ship:"InTime",sdate:"2007-12-03"},
            //        {id:"22",name:"LCD Monitor",note:"note3",stock:"Yes",ship:"TNT",sdate:"2007-12-03"},
            //        {id:"23",name:"Speakers",note:"note",stock:"No",ship:"ARAMEX",sdate:"2007-12-03"}
            //    ];
            //
            //var subgrid_data =
            //    [
            //        {id:"1", name:"sub grid item 1", qty: 11},
            //        {id:"2", name:"sub grid item 2", qty: 3},
            //        {id:"3", name:"sub grid item 3", qty: 12},
            //        {id:"4", name:"sub grid item 4", qty: 5},
            //        {id:"5", name:"sub grid item 5", qty: 2},
            //        {id:"6", name:"sub grid item 6", qty: 9},
            //        {id:"7", name:"sub grid item 7", qty: 3},
            //        {id:"8", name:"sub grid item 8", qty: 8}
            //    ];
            //
            //jQuery(function($) {
            //    var grid_selector = "#grid-table";
            //    var pager_selector = "#grid-pager";
            //
            //    //resize to fit page size
            //    $(window).on('resize.jqGrid', function () {
            //        $(grid_selector).jqGrid( 'setGridWidth', $(".page-content").width() );
            //    })
            //    //resize on sidebar collapse/expand
            //    var parent_column = $(grid_selector).closest('[class*="col-"]');
            //    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
            //        if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
            //            //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
            //            setTimeout(function() {
            //                $(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
            //            }, 0);
            //        }
            //    })
            //
            //    //if your grid is inside another element, for example a tab pane, you should use its parent's width:
            //    /**
            //     $(window).on('resize.jqGrid', function () {
				//	var parent_width = $(grid_selector).closest('.tab-pane').width();
				//	$(grid_selector).jqGrid( 'setGridWidth', parent_width );
				//})
            //     //and also set width when tab pane becomes visible
            //     $('#myTab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
				//  if($(e.target).attr('href') == '#mygrid') {
				//	var parent_width = $(grid_selector).closest('.tab-pane').width();
				//	$(grid_selector).jqGrid( 'setGridWidth', parent_width );
				//  }
				//})
            //     */
            //
            //
            //
            //
            //
            //    jQuery(grid_selector).jqGrid({
            //        //direction: "rtl",
            //
            //        //subgrid options
            //        subGrid : true,
            //        //subGridModel: [{ name : ['No','Item Name','Qty'], width : [55,200,80] }],
            //        //datatype: "xml",
            //        subGridOptions : {
            //            plusicon : "ace-icon fa fa-plus center bigger-110 blue",
            //            minusicon  : "ace-icon fa fa-minus center bigger-110 blue",
            //            openicon : "ace-icon fa fa-chevron-right center orange"
            //        },
            //        //for this example we are using local data
            //        subGridRowExpanded: function (subgridDivId, rowId) {
            //            var subgridTableId = subgridDivId + "_t";
            //            $("#" + subgridDivId).html("<table id='" + subgridTableId + "'></table>");
            //            $("#" + subgridTableId).jqGrid({
            //                datatype: 'local',
            //                data: subgrid_data,
            //                colNames: ['No','Item Name','Qty'],
            //                colModel: [
            //                    { name: 'id', width: 50 },
            //                    { name: 'name', width: 150 },
            //                    { name: 'qty', width: 50 }
            //                ]
            //            });
            //        },
            //
            //
            //
            //        data: grid_data,
            //        datatype: "local",
            //        height: 250,
            //        colNames:[' ', 'ID','Last Sales','Name', 'Stock', 'Ship via','Notes'],
            //        colModel:[
            //            {name:'myac',index:'', width:80, fixed:true, sortable:false, resize:false,
            //                formatter:'actions',
            //                formatoptions:{
            //                    keys:true,
            //                    //delbutton: false,//disable delete button
            //
            //                    delOptions:{recreateForm: true, beforeShowForm:beforeDeleteCallback},
            //                    //editformbutton:true, editOptions:{recreateForm: true, beforeShowForm:beforeEditCallback}
            //                }
            //            },
            //            {name:'id',index:'id', width:60, sorttype:"int", editable: true},
            //            {name:'sdate',index:'sdate',width:90, editable:true, sorttype:"date",unformat: pickDate},
            //            {name:'name',index:'name', width:150,editable: true,editoptions:{size:"20",maxlength:"30"}},
            //            {name:'stock',index:'stock', width:70, editable: true,edittype:"checkbox",editoptions: {value:"Yes:No"},unformat: aceSwitch},
            //            {name:'ship',index:'ship', width:90, editable: true,edittype:"select",editoptions:{value:"FE:FedEx;IN:InTime;TN:TNT;AR:ARAMEX"}},
            //            {name:'note',index:'note', width:150, sortable:false,editable: true,edittype:"textarea", editoptions:{rows:"2",cols:"10"}}
            //        ],
            //
            //        viewrecords : true,
            //        rowNum:10,
            //        rowList:[10,20,30],
            //        pager : pager_selector,
            //        altRows: true,
            //        //toppager: true,
            //
            //        multiselect: true,
            //        //multikey: "ctrlKey",
            //        multiboxonly: true,
            //
            //        loadComplete : function() {
            //            var table = this;
            //            setTimeout(function(){
            //                styleCheckbox(table);
            //
            //                updateActionIcons(table);
            //                updatePagerIcons(table);
            //                enableTooltips(table);
            //            }, 0);
            //        },
            //
            //        editurl: "/dummy.html",//nothing is saved
            //        caption: "jqGrid with inline editing"
            //
            //        //,autowidth: true,
            //
            //
            //        /**
            //         ,
            //         grouping:true,
            //         groupingView : {
				//		 groupField : ['name'],
				//		 groupDataSorted : true,
				//		 plusicon : 'fa fa-chevron-down bigger-110',
				//		 minusicon : 'fa fa-chevron-up bigger-110'
				//	},
            //         caption: "Grouping"
            //         */
            //
            //    });
            //    $(window).triggerHandler('resize.jqGrid');//trigger window resize to make the grid get the correct size
            //
            //
            //
            //    //enable search/filter toolbar
            //    //jQuery(grid_selector).jqGrid('filterToolbar',{defaultSearch:true,stringResult:true})
            //    //jQuery(grid_selector).filterToolbar({});
            //
            //
            //    //switch element when editing inline
            //    function aceSwitch( cellvalue, options, cell ) {
            //        setTimeout(function(){
            //            $(cell) .find('input[type=checkbox]')
            //                .addClass('ace ace-switch ace-switch-5')
            //                .after('<span class="lbl"></span>');
            //        }, 0);
            //    }
            //    //enable datepicker
            //    function pickDate( cellvalue, options, cell ) {
            //        setTimeout(function(){
            //            $(cell) .find('input[type=text]')
            //                .datepicker({format:'yyyy-mm-dd' , autoclose:true});
            //        }, 0);
            //    }
            //
            //
            //    //navButtons
            //    jQuery(grid_selector).jqGrid('navGrid',pager_selector,
            //        { 	//navbar options
            //            edit: true,
            //            editicon : 'ace-icon fa fa-pencil blue',
            //            add: true,
            //            addicon : 'ace-icon fa fa-plus-circle purple',
            //            del: true,
            //            delicon : 'ace-icon fa fa-trash-o red',
            //            search: true,
            //            searchicon : 'ace-icon fa fa-search orange',
            //            refresh: true,
            //            refreshicon : 'ace-icon fa fa-refresh green',
            //            view: true,
            //            viewicon : 'ace-icon fa fa-search-plus grey',
            //        },
            //        {
            //            //edit record form
            //            //closeAfterEdit: true,
            //            //width: 700,
            //            recreateForm: true,
            //            beforeShowForm : function(e) {
            //                var form = $(e[0]);
            //                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
            //                style_edit_form(form);
            //            }
            //        },
            //        {
            //            //new record form
            //            //width: 700,
            //            closeAfterAdd: true,
            //            recreateForm: true,
            //            viewPagerButtons: false,
            //            beforeShowForm : function(e) {
            //                var form = $(e[0]);
            //                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
            //                    .wrapInner('<div class="widget-header" />')
            //                style_edit_form(form);
            //            }
            //        },
            //        {
            //            //delete record form
            //            recreateForm: true,
            //            beforeShowForm : function(e) {
            //                var form = $(e[0]);
            //                if(form.data('styled')) return false;
            //
            //                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
            //                style_delete_form(form);
            //
            //                form.data('styled', true);
            //            },
            //            onClick : function(e) {
            //                //alert(1);
            //            }
            //        },
            //        {
            //            //search form
            //            recreateForm: true,
            //            afterShowSearch: function(e){
            //                var form = $(e[0]);
            //                form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
            //                style_search_form(form);
            //            },
            //            afterRedraw: function(){
            //                style_search_filters($(this));
            //            }
            //            ,
            //            multipleSearch: true,
            //            /**
            //             multipleGroup:true,
            //             showQuery: true
            //             */
            //        },
            //        {
            //            //view record form
            //            recreateForm: true,
            //            beforeShowForm: function(e){
            //                var form = $(e[0]);
            //                form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
            //            }
            //        }
            //    )
            //
            //
            //
            //    function style_edit_form(form) {
            //        //enable datepicker on "sdate" field and switches for "stock" field
            //        form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
            //
            //        form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');
            //        //don't wrap inside a label element, the checkbox value won't be submitted (POST'ed)
            //        //.addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');
            //
            //
            //        //update buttons classes
            //        var buttons = form.next().find('.EditButton .fm-button');
            //        buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
            //        buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
            //        buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')
            //
            //        buttons = form.next().find('.navButton a');
            //        buttons.find('.ui-icon').hide();
            //        buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
            //        buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');
            //    }
            //
            //    function style_delete_form(form) {
            //        var buttons = form.next().find('.EditButton .fm-button');
            //        buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
            //        buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
            //        buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
            //    }
            //
            //    function style_search_filters(form) {
            //        form.find('.delete-rule').val('X');
            //        form.find('.add-rule').addClass('btn btn-xs btn-primary');
            //        form.find('.add-group').addClass('btn btn-xs btn-success');
            //        form.find('.delete-group').addClass('btn btn-xs btn-danger');
            //    }
            //    function style_search_form(form) {
            //        var dialog = form.closest('.ui-jqdialog');
            //        var buttons = dialog.find('.EditTable')
            //        buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
            //        buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
            //        buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
            //    }
            //
            //    function beforeDeleteCallback(e) {
            //        var form = $(e[0]);
            //        if(form.data('styled')) return false;
            //
            //        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
            //        style_delete_form(form);
            //
            //        form.data('styled', true);
            //    }
            //
            //    function beforeEditCallback(e) {
            //        var form = $(e[0]);
            //        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
            //        style_edit_form(form);
            //    }
            //
            //
            //
            //    //it causes some flicker when reloading or navigating grid
            //    //it may be possible to have some custom formatter to do this as the grid is being created to prevent this
            //    //or go back to default browser checkbox styles for the grid
            //    function styleCheckbox(table) {
            //        /**
            //         $(table).find('input:checkbox').addClass('ace')
            //         .wrap('<label />')
            //         .after('<span class="lbl align-top" />')
            //
            //
            //         $('.ui-jqgrid-labels th[id*="_cb"]:first-child')
            //         .find('input.cbox[type=checkbox]').addClass('ace')
            //         .wrap('<label />').after('<span class="lbl align-top" />');
            //         */
            //    }
            //
            //
            //    //unlike navButtons icons, action icons in rows seem to be hard-coded
            //    //you can change them like this in here if you want
            //    function updateActionIcons(table) {
            //        /**
            //         var replacement =
            //         {
            //             'ui-ace-icon fa fa-pencil' : 'ace-icon fa fa-pencil blue',
            //             'ui-ace-icon fa fa-trash-o' : 'ace-icon fa fa-trash-o red',
            //             'ui-icon-disk' : 'ace-icon fa fa-check green',
            //             'ui-icon-cancel' : 'ace-icon fa fa-times red'
            //         };
            //         $(table).find('.ui-pg-div span.ui-icon').each(function(){
				//		var icon = $(this);
				//		var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
				//		if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
				//	})
            //         */
            //    }
            //
            //    //replace icons with FontAwesome icons like above
            //    function updatePagerIcons(table) {
            //        var replacement =
            //        {
            //            'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
            //            'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
            //            'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
            //            'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
            //        };
            //        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
            //            var icon = $(this);
            //            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
            //
            //            if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
            //        })
            //    }
            //
            //    function enableTooltips(table) {
            //        $('.navtable .ui-pg-button').tooltip({container:'body'});
            //        $(table).find('.ui-pg-div').tooltip({container:'body'});
            //    }
            //
            //    //var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');
            //
            //    $(document).one('ajaxloadstart.page', function(e) {
            //        $(grid_selector).jqGrid('GridUnload');
            //        $('.ui-jqdialog').remove();
            //    });
            //});
        };
    }

    function initializeCustomerSearch(){
        var table_settings = {
            url: "/api/customers/",
            dataTable: $('#search_customer_modal').dataTable({
                //"aoColumns": columns,
                data: [],
                language: getDatatableLanguageProperties(),
                keys: true
            })
        };

        return new GenericViews.DataTableView(table_settings);
    }

    function initializeProductSearch(){
        var table_settings = {
            url: "/api/products/",
            dataTable: $('#search_product_modal').dataTable({
                //"aoColumns": columns,
                data: [],
                language: getDatatableLanguageProperties(),
                keys: true
            })
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

    });
})();