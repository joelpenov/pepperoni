(function(){
    function ProductUsageModel() {
        var factory= this;
        factory.included = ko.observable(true);
        factory.itemId = ko.observable();
        factory.itemName = ko.observable();
        factory.setData = function(data){
            factory.itemId (data.id);
            factory.itemName (data.description);
            return factory;
        };
    }

    function FinishProductionView(){
        var factory = this;
        factory.productUsages = ko.observableArray();


        factory.init = function () {
            ko.applyBindings(factory, document.getElementById('product-usages-view'));
        };
    }


    $(document).ready(function(){
        var finishProductView = new FinishProductionView();
        finishProductView.init();
        GenericViews.getData("/api/products/?format=json&is_raw_material=True", function(response){
            var tempItems = [];
            response.forEach(function(data){
                tempItems.push(new ProductUsageModel().setData(data));
            });
            finishProductView.productUsages(tempItems);
        });
    });
})();