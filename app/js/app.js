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
        self.setWatermarkPositionBySpinner();

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
                    watermarkWrapper.css({
                        top: 0,
                        left: 0
                    });
                    break;
                case 'top-middle':
                    watermarkWrapper.css({
                        top: 0,
                        left: '50%',
                        marginLeft: '-90px'
                    });
                    break;
                case 'top-right':
                    watermarkWrapper.css({
                        top: 0,
                        right: 0
                    });
                    break;
                case 'center-left':
                    watermarkWrapper.css({
                        top: '50%',
                        marginTop: '-90px'
                    });
                    break;
                case 'center-middle':
                    watermarkWrapper.css({
                        top: '50%',
                        marginTop: '-90px',
                        left: '50%',
                        marginLeft: '-90px'
                    });
                    break;
                case 'center-right':
                    watermarkWrapper.css({
                        top: '50%',
                        marginTop: '-90px',
                        right: 0
                    });
                    break;
                case 'bottom-left':
                    watermarkWrapper.css({
                        bottom: 0,
                        left: 0
                    });
                    break;
                case 'bottom-middle':
                    watermarkWrapper.css({
                        bottom: 0,
                        left:' 50%',
                        marginLeft: '-90px'
                    });
                    break;
                case 'bottom-right':
                    watermarkWrapper.css({
                        bottom: 0,
                        right: 0
                    });
            }
        });
    },
    setWatermarkPositionBySpinner: function() {
        var self = this;

        $.each($('.js-coord__counter'), function() {
            $(this).spinner({
                min: 0,
                icons: {
                    up: 'spinner-up-btn',
                    down: 'spinner-down-btn'
                },
                spin: function( event, ui ) {
                    var orientation = $(this).data('orientation');

                    if (orientation === 'x-coordinate') {
                        $('.watermark-wrapper').css({left: ui.value});
                    } else if (orientation === 'y-coordinate') {
                        $('.watermark-wrapper').css({top: ui.value});
                    }
                }
            })
        });
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