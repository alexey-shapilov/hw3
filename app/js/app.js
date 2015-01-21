var app = {
    initialize: function() {
        var self = this;

        self.addListeners();
        console.log('application was initialized');
    },
    addListeners: function() {
        var self = this;

        self.downloadWatermarkImg();
        self.setWatermarkOpacity();
        self.setWatermarkPositionByVisualPanel();

        console.log('addListeners');
    },
    downloadBackgroundImg: function() {
        var self = this;

    },
    downloadWatermarkImg: function() {
        var self = this,
            watermarkWrapper = $('.watermark-wrapper');

        watermarkWrapper.css({
            top: 0,
            left: 0
        });
    },
    setWatermarkPositionByVisualPanel: function() {
        var self = this;

        $('.js-set-watermark-position').on('click', function(e) {
            var targetElement = $(e.currentTarget),
                watermarkWrapper = $('.watermark-wrapper'),
                watermarkPosition = targetElement.data('watermarkPosition'),
                positionBtn = targetElement.children('.box__cell-btn');

            $('.box__cell-btn').not(positionBtn).removeClass('active');
            positionBtn.addClass('active');

            watermarkWrapper.removeAttr('style');
            switch (watermarkPosition) {
                case 'top-left':
                    console.log(watermarkPosition);
                    watermarkWrapper.css({
                        top: 0,
                        left: 0
                    });
                    break;
                case 'top-middle':
                    console.log(watermarkPosition);
                    watermarkWrapper.css({
                        top: 0,
                        left: '50%',
                        marginLeft: '-90px'
                    });
                    break;
                case 'top-right':
                    console.log(watermarkPosition);
                    watermarkWrapper.css({
                        top: 0,
                        right: 0
                    });
                    break;
                case 'center-left':
                    console.log(watermarkPosition);
                    watermarkWrapper.css({
                        top: '50%',
                        marginTop: '-90px'
                    });
                    break;
                case 'center-middle':
                    console.log(watermarkPosition);
                    watermarkWrapper.css({
                        top: '50%',
                        marginTop: '-90px',
                        left: '50%',
                        marginLeft: '-90px'
                    });
                    break;
                case 'center-right':
                    console.log(watermarkPosition);
                    watermarkWrapper.css({
                        top: '50%',
                        marginTop: '-90px',
                        right: 0
                    });
                    break;
                case 'bottom-left':
                    console.log(watermarkPosition);
                    watermarkWrapper.css({
                        bottom: 0,
                        left: 0,
                    });
                    break;
                case 'bottom-middle':
                    console.log(watermarkPosition);
                    watermarkWrapper.css({
                        bottom: 0,
                        left:' 50%',
                        marginLeft: '-90px'
                    });
                    break;
                case 'bottom-right':
                    console.log(watermarkPosition);
                    watermarkWrapper.css({
                        bottom: 0,
                        right: 0
                    });
            }

            console.log(watermarkPosition);
        });
    },
    setWatermarkPositionBySpinner: function() {
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