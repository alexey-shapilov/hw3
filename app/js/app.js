var app = {
    initialize: function() {
        var self = this;

        self.addListeners();
        console.log('application was initialized');
    },
    addListeners: function() {
        var self = this;

        self.downloadBackgroundImg();
        self.downloadWatermarkImg();
        self.setWatermarkOpacity();
        self.setWatermarkPositionByVisualPanel();
        self.setWatermarkPositionBySpinner();
        self.makeWatermarkImgDraggable();
        self.makeBackgroundImgDraggable();
    },
    resetWatermarkOpacity: function() {
        var self = this,
            watermarkWrapper = $('.watermark-img');

        watermarkWrapper.css({
            opacity: .5
        });
    },
    resetWatermarkPosition: function() {
        var self = this,
            watermarkWrapper = $('.watermark-img');

        watermarkWrapper.css({
            top: 0,
            left: 0
        });
    },
    downloadBackgroundImg: function() {
        var self = this;

        $('#upload-pic').fileupload({
            dataType: 'json',
            add: function (e, data) {
                $('.upload-bg-placeholder').html(data.originalFiles[0].name);
                data.submit();
            },
            done: function (e, data) {
                console.log(data);
                console.log(data.result.files[0].url);

                $('.bg-img').attr('src', data.result.files[0].url);
            }
        });
    },
    downloadWatermarkImg: function() {
        var self = this;

        self.resetWatermarkPosition();

        $('#upload-wm').fileupload({
            dataType: 'json',
            add: function (e, data) {
                $('.upload-wm-placeholder').html(data.originalFiles[0].name);
                data.submit();
            },
            done: function (e, data) {
                $('.watermark-img').attr('src', data.result.files[0].url);
            }
        });
    },
    makeBackgroundImgDraggable: function() {
        var self = this;

        $('.bg-img').draggable();
    },
    makeWatermarkImgDraggable: function() {
        var self = this;

        $('.watermark-img').draggable({
            containment: 'parent',
            stop: function( event, ui ) {
                $('#coord__x').val(ui.position.left);
                $('#coord__y').val(ui.position.top);
            }
        });
    },
    setWatermarkPositionByVisualPanel: function() {
        var self = this;

        $('.js-set-watermark-position').on('click', function(e) {
            var targetElement = $(e.currentTarget),
                watermarkWrapper = $('.watermark-img'),
                watermarkPosition = targetElement.data('watermarkPosition'),
                positionBtn = targetElement.children('.box__cell-btn');

            $('.box__cell-btn').not(positionBtn).removeClass('active');
            positionBtn.addClass('active');

            watermarkWrapper.removeAttr('style');
            watermarkWrapper.css({ opacity: self.calculateOpacityValue($('.ui-slider').slider('value')) });

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
                        left: 0,
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
                        $('.watermark-img').css({left: ui.value});
                    } else if (orientation === 'y-coordinate') {
                        $('.watermark-img').css({top: ui.value});
                    }
                }
            })
        });
    },
    setWatermarkOpacity: function() {
        var self = this,
            watermarkDefaultOpacity = 50;

        $('.watermark-img').css({opacity: self.calculateOpacityValue(watermarkDefaultOpacity)});

        $('.ui-slider').slider({
            value: watermarkDefaultOpacity,
            slide: function (event, ui) {
                $('.watermark-img').css({opacity: self.calculateOpacityValue(ui.value)});
            }
        });
    },
    calculateOpacityValue: function (value) {
        return 1 - value / 100;
    },
    downloadImg: function() {
        var self = this;

    }
};

app.initialize();