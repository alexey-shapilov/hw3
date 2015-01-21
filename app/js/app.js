var app = {
    initialize: function() {
        var self = this;

        self.addListeners();
        console.log('application was initialized');
    },
    addListeners: function() {
        var self = this;

        self.setWatermarkOpacity();

        console.log('addListeners');
    },
    downloadBackgroundImg: function() {
        var self = this;

    },
    downloadWatermarkImg: function() {
        var self = this;

    },
    setWatermarkPosition: function() {
        var self = this;

    },
    setWatermarkOpacity: function() {
        var self = this;

        $('.ui-slider').slider({
            slide: function (event, ui) {
                $('.watermark-wrapper').css({opacity: 1 - ui.value / 100});
            }
        });
    },
    downloadImg: function() {
        var self = this;

    }
};

app.initialize();