var PEPPERONI = PEPPERONI || {};
//http://localhost:8000/sales/reportbyshiftsservice
(function(){

	var resultReportDataTable, cashierUsersDataTable;
	function SalesReportViewModel(){
		var self = this;

		self.startDate = ko.observable(PEPPERONI.getCurrentDate());
		self.endDate = ko.observable(PEPPERONI.getCurrentDate());
		self.showReportTable = ko.observable(false);

		self.productList = ko.observableArray([]);
		self.productIdsSelected = ko.observableArray([]);

        self.cashierUserList = ko.observableArray([]);
        self.cashierUserIdsSelected = ko.observableArray([]);

		self.formatDateAsISO = function(date){
			var separator = "-";
			var dateArray = date.split("/");
			return dateArray[2] + separator+
				   dateArray[1] + separator+
				   dateArray[0];
		};

		self.runReport = function(){
			self.showReportTable(false);
			var data = self.getReportCriteria();
			var baseUrl = "/sales/reportbyshiftsservice";
			var query = "?StartDate=" + data.StartDate +
                        "&EndDate=" + data.EndDate +
                        "&Products=" + data.ProductIds
                        + "&Users=" + data.UserIds;
			if(!resultReportDataTable) resultReportDataTable = self.getDataTable('#sales-shifts-report-table', "");
			resultReportDataTable.refreshDataTable(baseUrl + query);
			self.showReportTable(true);
		};

		self.getDataTable = function(tableId, url){
			var table_settings = {
            		url: url,
            		dataTable: PEPPERONI.createDatatableInstance({tableId: tableId})
        	};

         	return new GenericViews.DataTableView(table_settings);

		};

		self.getReportCriteria = function(){
			var data = {
				StartDate: self.formatDateAsISO(self.startDate()),
				EndDate: self.formatDateAsISO(self.endDate()),
				ProductIds: self.productIdsSelected().join(),
                UserIds: self.cashierUserIdsSelected().join()
			};

			return data;

		};

        self.idWasAdded = function(userId){
            return self.cashierUserIdsSelected().filter(function(currentId) {
              return currentId === userId;
            }).length !== 0;
        };

        self.updateUsersIdsSelected = function(user){
            var currentUserId = user.id;
            var idAdded = self.idWasAdded(currentUserId);
            if (idAdded)   {
                self.cashierUserIdsSelected.remove( function (id) {
                return id === currentUserId;
            } );
            }else{
                self.cashierUserIdsSelected.push(currentUserId);
            }
        };

	};

	function initializeProductMultiselec(viewModel){
		$('#product-selection').tokenize({
			newElements: false,
			onAddToken: function(value){
				viewModel.productIdsSelected.push(value);
			},
			onRemoveToken: function(value){
				viewModel.productIdsSelected.remove(value);
			}
		});
	};

	function initializeDatePickerElements(){
		var datepickerProperties = {
			showOtherMonths: true,
			selectOtherMonths: false,
			dateFormat: 'dd/mm/yy'
		};

		$("#start-datepicker").datepicker(datepickerProperties);
		$("#end-datepicker").datepicker(datepickerProperties);
	};

	function initializeElements(salesReportViewModel){
		initializeDatePickerElements();
		initializeProductMultiselec(salesReportViewModel);
	};

	function loadProducts(salesReportViewModel){
		GenericViews.getData('/api/products/', function(response){
        	salesReportViewModel.productList(response);
			initializeElements(salesReportViewModel);
        });
	};

    function loadCashierUsers(salesReportViewModel){
		GenericViews.getData('/api/cashieruses', function(response){
        	salesReportViewModel.cashierUserList(response);
			initializeElements(salesReportViewModel);
        });
	};

    function initializeSelectAllUsersClickEvent (){

    };

    function loadData(viewModel){
        loadProducts(viewModel);
        loadCashierUsers(viewModel);
        initializeSelectAllUsersClickEvent();
    };

	$(function(){
		var salesReportViewModel = new SalesReportViewModel();
        ko.applyBindings(salesReportViewModel, document.getElementById('sales-report-shifts-content'));

        loadData(salesReportViewModel);

	});
})();