/*var app = {
    initialize: function () {
        var self = this;

        console.log('application was initialized');
    }
};

app.initialize(); */

$(function() {
    $( ".slider" ).slider(
            {
                range: 'min',
                max: 100,
                min: 0
    });
});