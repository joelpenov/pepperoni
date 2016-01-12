

(function(){

    function FormViewModel (){
        var self = this;
        this.fields =  ko.observableArray();
    }
       var load_form = function(url){
            $.ajax({
                url : url + '?format=json',
                type: "options",
                data: {},
                success: function (response) {
                        console.log(response);
                    var formObject = response.actions.POST;
                    var fields = [];
                    for(var property in formObject){
                        if(formObject.hasOwnProperty(property)){
                            var field = formObject[property];
                            field.name = property;
                            field.fieldTemplate = field.type+"-field-template";
                            field.fieldId  = "input_"+ field.name;
                            fields.push(field);

                        }
                    }
                    var viewModel = new FormViewModel();
                    viewModel.fields(fields);
                    ko.applyBindings(viewModel,document.getElementById("form_view"));

                },
                error: function (jXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });

        };
    $(document).ready(function(){
        load_form("/api/products")
    });
})();