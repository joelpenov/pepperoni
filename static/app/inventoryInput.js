var PEPPERONI = PEPPERONI || {};

(function () {


        function InventoryFormView(settings) {
            var self = this;
            self.settings = settings;
            self.fields = ko.observableArray();
            self.orderDetails= ko.observableArray();
            self.creationMode = ko.observable(false);
            self.showDetailMode = ko.observable(false);            
            self.showList = ko.observable(true);
            self.productIdHasError = ko.observable(false);
            self.quantityHasError = ko.observable(false);
            self.priceHasError = ko.observable(false);
            self.canCreateNew = ko.observable(true);
            self.productId = ko.observable();
            self.productDescription = ko.observable();
            self.quantity = ko.observable();
            self.price = ko.observable();
            self.inputDescription = ko.observable("");
            self.note = ko.observable("");
            self.warehouse = ko.observable("");
            self.transactionDate = ko.observable("");
            self.transactionId = ko.observable(0);


            settings.includeFields = settings.includeFields || [];

            self.productId.subscribe(function () {
                if(!self.productId()){
                    self.productDescription("")
                    return;
                }

                GenericViews.getDataById("/api/products/", self.productId(),function (response) {
                    self.productDescription(response.description+" ("+response.unit_of_measure_description+")")
                });
            });

            function isNumber(value) {

                var er = /^[0-9]|[0-9](.([0-9]))+$/;

                return er.test(value);
            }

            self.addNewProduct = function () {

                self.productIdHasError(!isNumber(self.productId()) || !self.productDescription());
                self.quantityHasError(!isNumber(self.quantity()));
                self.priceHasError(!isNumber(self.price()));

                if(self.productIdHasError() || self.quantityHasError() || self.priceHasError()) return;

                self.addDetail(self.productId(), self.productDescription(), self.quantity(), self.price(), (self.quantity() * self.price()).toFixed(2));
                self.cleanDetails();
            };

            self.addDetail = function(id, description, quantity, price, total){
                self.orderDetails.push({
                    product_id: id,
                    product_description: description,
                    quantity: quantity,
                    price: price,
                    total: total
                });
            };

            self.deleteProduct = function(product){
                self.orderDetails.remove(product);
            };

            self.addNew = function () {
                self.creationMode(true);
                self.showList(false);
                self.canCreateNew(false);
                self.showDetailMode(false);
            };

            self.save = function () {
                var data = settings.form.serializeJSON();
                data.details = self.orderDetails();
                GenericViews.saveData(self,data );
                self.canCreateNew(true);
            };

            self.resetErrors = function () {
                GenericViews.resetFieldErrors(self.fields());
            };
            self.cleanDetails = function(){
                self.productId(null);
                self.productDescription(null);
                self.quantity(null);
                self.price(null);

                self.productIdHasError(false);
                self.quantityHasError(false);
                self.priceHasError(false);
            };

            self.cancel = function () {
                GenericViews.resetFieldDefaultValue(self.fields());
                self.resetErrors();
                self.creationMode(false);
                self.showList(true);
                self.canCreateNew(true);
                self.cleanDetails();
                self.showDetailMode(false);
                self.orderDetails([]);
            };

            self.loadForm = function () {
                GenericViews.loadFormFields(settings, function (fields, response) {
                    self.fields(fields);
                });
            };

            self.setHeaderDetails = function(response){
                self.inputDescription("Entrada");
                self.transactionId(response.id);
                self.warehouse(response.warehouse_description);
                self.note(response.note);
                self.transactionDate(response.transaction_date);
            };

            self.addAllDetails = function(details){
                details.forEach(function(item){
                    self.addDetail(
                                    item.product_id,
                                    item.product_description + " ("+item.unit_of_measure_description+")",
                                    item.quantity,
                                    item.price,
                                    item.total);
                });
            };

            self.viewDetails = function (id) {
                GenericViews.getDataById(settings.url, id, function (response) {
                    GenericViews.loadEditFormData(self.fields(), response);
                    self.addAllDetails(response.details);
                    self.setHeaderDetails(response);
                    self.creationMode(false);
                    self.canCreateNew(false);
                    self.showList(false);
                    self.showDetailMode(true);
                });
            };

            self.addRowClickEvent = function(){
                $('#search_product_modal tbody').on( 'click', 'tr', function () {
                    var row = $(this);
                    var itemId = row.find('td:first').html();
                    var itemDescription = row.find('td').eq(1).html();
                    self.productId(itemId);
                    self.productDescription(itemDescription);
                    $('#searchProductsModal').modal('hide');
                });
            };

            self.init = function () {
                if (settings.dataTableView) {
                    settings.dataTableView.dataTable.on('click', '.action-buttons .view', function () {
                        var id = $(this).data("item-id"); 
                        self.viewDetails(id);
                    });
                }
                ko.applyBindings(self, document.getElementById(settings.viewId));
                self.loadForm();
                self.addRowClickEvent();
            };

            self.openProductSearch = function(){
                settings.productSearchTable.refreshDataTable();
                $('#searchProductsModal').modal('show')
            };
        }

        function initializeProductSearch(){
            var table_settings = {
                url: "/api/products/",
                dataTable: PEPPERONI.createDatatableInstance({tableId: '#search_product_modal', keys: true})
            };
            return new GenericViews.DataTableView(table_settings);
        }

        $(document).ready(function () {
            var table_settings = {
                url: "/api/inventoryinputs/",
                dataTable: PEPPERONI.createDatatableInstance({tableId: '#dynamic-table'})
            };

            var dataTableView = new GenericViews.DataTableView(table_settings);

            var form_settings = {
                url: "/api/inventoryinputs/",
                viewId: "inventory-input-view",
                form: $('#form_view'),
                dataTableView: dataTableView,
                includeFields:['id','warehouse', 'transaction_date', 'note'], 
                productSearchTable: initializeProductSearch()
            };

            var formView = new InventoryFormView(form_settings);
            formView.init();
            dataTableView.refreshDataTable();
        });
    }

)();