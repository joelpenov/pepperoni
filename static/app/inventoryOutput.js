(function () {


        function InventoryFormView(settings) {
            var self = this;
            self.settings = settings;
            self.fields = ko.observableArray();
            self.orderDetails= ko.observableArray();
            self.isEditMode = false;
            self.currentItemId = 0;
            self.showForm = ko.observable(false);
            self.showList = ko.observable(true);
            self.productIdHasError = ko.observable(false);
            self.quantityHasError = ko.observable(false);
            self.priceHasError = ko.observable(false);
            self.productId = ko.observable();
            self.productDescription = ko.observable();
            self.quantity = ko.observable();
            self.price = ko.observable();

            settings.includeFields = settings.includeFields || [];

            self.productId.subscribe(function () {
                if(!self.productId()){
                    self.productDescription("")
                    return;
                }

                GenericViews.getData("/api/products/", self.productId(),function (response) {
                    self.productDescription(response.description)
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

            self.addNew = function () {
                self.showForm(true);
                self.showList(false);
            };

            self.save = function () {
                var data = settings.form.serializeJSON();
                data.details = self.orderDetails();
                GenericViews.saveData(self,data );
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
                self.isEditMode = false;
                self.currentItemId = 0;
                self.resetErrors();
                self.showForm(false);
                self.showList(true);
                self.cleanDetails();
                self.orderDetails([]);
            };

            self.loadForm = function () {
                GenericViews.loadFormFields(settings, function (fields, response) {
                    self.fields(fields);
                });
            };

            self.editForm = function (id) {
                GenericViews.getData(settings.url, id, function (response) {
                    GenericViews.loadEditFormData(self.fields(), response);
                    self.orderDetails(response.details);
                    self.isEditMode = true;
                    self.currentItemId = id;
                    self.showForm(true);
                    self.showList(false);
                });
            };

            self.init = function () {
                if (settings.dataTableView) {
                    settings.dataTableView.dataTable.on('click', '.action-buttons .edit', function () {
                        var id = $(this).data("item-id");
                        self.editForm(id);
                    });
                }
                ko.applyBindings(self, document.getElementById(settings.viewId));
                self.loadForm();
            };
        }

        $(document).ready(function () {
            var table_settings = {
                url: "/api/inventoryoutputs/",
                dataTable: $('#dynamic-table').dataTable({
                    //"aoColumns": columns,
                    data: []
                })
            };

            var dataTableView = new GenericViews.DataTableView(table_settings);

            var form_settings = {
                url: "/api/inventoryoutputs/",
                viewId: "inventory-input-view",
                form: $('#form_view'),
                dataTableView: dataTableView,
                includeFields:['id','warehouse', 'transaction_date']
            };

            var formView = new InventoryFormView(form_settings);
            formView.init();
            dataTableView.refreshDataTable();


        });
    }

)();