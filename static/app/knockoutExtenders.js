(function(){
    ko.extenders.numeric = function(target, precision) {
        //create a writable computed observable to intercept writes to our observable
        var result = ko.pureComputed({
            read: target,  //always return the original observables value
            write: function(newValue) {
                var current = target();

                var valueToWrite  = (isNaN(newValue) ? 0 : parseFloat(+newValue)).toFixed(precision);

                //only write if it changed
                if (valueToWrite !== current) {
                    target(valueToWrite)
                }
            }
        }).extend({ notify: 'always' });

        //initialize with current value to make sure it is rounded appropriately
        result(target());

        //return the new computed observable
        return result;
    };

})();