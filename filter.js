/**
 * Created by sijiehao on 21/03/2016.
 */

app.filter('labelCase', function() {
        return function(input) {
            input = input.replace(/([A-Z])/g, ' $1');
            return input[0].toUpperCase() + input.slice(1);
        };
    });