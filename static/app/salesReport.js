(function(){

	function SalesReportViewModel(){
		var self = this;
		self.productList = ko.observableArray(fakeArray);
	};


	function initializeMultiselec(){
		$('#product-selection').tokenize({
			newElements: false,
			onAddToken: function(value, description, event){
				
			},
			onRemoveToken: function(value, event){

			}
		});
	};

	function initializeDatePickerElements(){
		var datepickerProperties = {showOtherMonths: true, 	selectOtherMonths: false};
		$("#start-datepicker").datepicker(datepickerProperties);
		$("#end-datepicker").datepicker(datepickerProperties);
	};

	function initializeElements(){
		initializeDatePickerElements();
		initializeMultiselec();
	};

	$(function(){
		var salesReportViewModel = new SalesReportViewModel();
        ko.applyBindings(salesReportViewModel, document.getElementById('sales-report-content'));
        
        GenericViews.getData('/api/products/',function(response){
        	salesReportViewModel.productList(response);
			initializeElements();			
        });

        
	});
})();