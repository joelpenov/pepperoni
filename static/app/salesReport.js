var PEPPERONI = PEPPERONI || {};

(function(){

	var dataTable;
	function SalesReportViewModel(){
		var self = this;

		self.startDate = ko.observable(PEPPERONI.getCurrentDate());
		self.endDate = ko.observable(PEPPERONI.getCurrentDate());
		self.showReportTable = ko.observable(false);

		self.productList = ko.observableArray([]);
		self.productIdsSelected = ko.observableArray([]);

		self.formatDateAsISO = function(date){
			var separator = "-";
			var dateArray = date.split("/");
			return dateArray[2] + separator+
				   dateArray[1] + separator+
				   dateArray[0];
		};
		

		self.runReport = function(){	
			self.showReportTable(false);
			var data =self.getReportCriteria();
			var baseUrl = "/sales/salesreportservice";
			var query = "?StartDate=" + data.StartDate +
                        "&EndDate=" + data.EndDate +
                        "&Products=" + data.ProductIds ;
			if(!dataTable) dataTable = self.getDataTable("");
			dataTable.refreshDataTable(baseUrl + query);
			self.showReportTable(true);
		};

		self.getDataTable = function(url){
			var table_settings = {
            		url: url,
            		dataTable: PEPPERONI.createDatatableInstance({tableId: '#sales-report-table'})
        	};

         	return new GenericViews.DataTableView(table_settings);
			
		};

		self.getReportCriteria = function(){
			var data = {
				StartDate: self.formatDateAsISO(self.startDate()),
				EndDate: self.formatDateAsISO(self.endDate()),
				ProductIds: self.productIdsSelected().join()
			};

			return data;
			
		};

	};

	function initializeMultiselec(salesReportViewModel){
		$('#product-selection').tokenize({
			newElements: false,
			onAddToken: function(value){
				salesReportViewModel.productIdsSelected.push(value);
			},
			onRemoveToken: function(value){				
				salesReportViewModel.productIdsSelected.remove(value);
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
		initializeMultiselec(salesReportViewModel);
	};

	function loadProducts(salesReportViewModel){
		GenericViews.getData('/api/products/', function(response){
        	salesReportViewModel.productList(response);
			initializeElements(salesReportViewModel);			
        });
	};

	$(function(){
		var salesReportViewModel = new SalesReportViewModel();
        ko.applyBindings(salesReportViewModel, document.getElementById('sales-report-content'));
        
        loadProducts(salesReportViewModel);
	});
})();