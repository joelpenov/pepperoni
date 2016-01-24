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

            self.addNewProduct = function () {
                console.log("Add new product test");
                self.orderDetails.push({
                    product:self.productId(),
                    productDescription: self.productDescription(),
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
                    console.log(response.actions.POST.details.child.children)
                });
            };

            self.editForm = function (id) {
                GenericViews.getData(settings.url, id, function (response) {
                    GenericViews.loadEditFormData(self.fields(), response);
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
                url: "/api/inventoryinputs/",
                dataTable: $('#dynamic-table').dataTable({
                    //"aoColumns": columns,
                    data: []
                })
            };

            var dataTableView = new GenericViews.DataTableView(table_settings);

            var form_settings = {
                url: "/api/inventoryinputs/",
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