(function(){
    function PointOfSalesView(){
        var self = this;
        self.menuItems = ko.observableArray();
    }

    $(document).ready(function(){
        var pointOfSaleView = new PointOfSalesView();
        ko.applyBindings(pointOfSaleView,document.getElementById('point-of-sales-page'));


        GenericViews.getData("/api/products/?format=json&show_in_menu=True", function(response){
            pointOfSaleView.menuItems(response);
        });

    });
})();