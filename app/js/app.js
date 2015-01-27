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
        self.downloadImg();
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
    showLoader: function() {
        $('.js-loader').fadeIn();
    },
    hideLoader: function() {
        $('.js-loader').fadeOut();

    },
    downloadBackgroundImg: function() {
        var self = this;

        $('#upload-pic').fileupload({
            dataType: 'json',
            add: function (e, data) {
                data.submit();
                self.showLoader();
            },
            done: function (e, data) {
                $('.upload-bg-placeholder').html(data.originalFiles[0].name);
                $('.bg-img').attr('src', data.result.files[0].url);
                $('#bg-img').val(data.result.files[0].url);
                self.hideLoader();
            },
            fail: function(e, data) {
                alert('Error: ' + data.textStatus);
                self.hideLoader();
            }
        });
    },
    downloadWatermarkImg: function() {
        var self = this;

        self.resetWatermarkPosition();

        $('#upload-wm').fileupload({
            dataType: 'json',
            add: function (e, data) {
                data.submit();
                self.showLoader();
            },
            done: function (e, data) {
                $('.upload-wm-placeholder').html(data.originalFiles[0].name);
                $('.watermark-img').attr('src', data.result.files[0].url);
                $('#wm-img').val(data.result.files[0].url);
                self.hideLoader();
            },
            fail: function(e, data) {
                alert('Error: ' + data.textStatus);
                self.hideLoader();
            }
        });
    },
    makeBackgroundImgDraggable: function() {
        var self = this;

        $('.bg-img').draggable({
            grid: [ 1, 1 ]
        });
    },
    makeWatermarkImgDraggable: function() {
        var self = this;

        $('.watermark-img').draggable({
            containment: 'parent',
            grid: [ 1, 1 ],
            drag: function( event, ui ) {
                $('#coord__x').val(ui.position.left);
                $('#coord__y').val(ui.position.top);
            }
        });

        console.log(bgWidth);
    },

    setWatermarkPositionByVisualPanel: function(e) {
        var self = this;

        $('.js-set-watermark-position').on('click', function(e) {
            e.preventDefault();
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
            },
            stop: function(event, ui) {
                $('#watermark-opacity-value').val(self.calculateOpacityValue(ui.value))
            }
        });
    },
    calculateOpacityValue: function (value) {
        return value / 100;
    },
    downloadImg: function() {
        var self = this;

        $('#watermark-img-generator-form').submit(function(e){
            e.preventDefault();
            var $form = $(this);

            console.log($form.serialize());

            self.showLoader();
            $.ajax({
                url: '../php/watermark-img-generator.php',
                type: 'POST',
                data: $(this).serialize()
            })
                .done(function(data) {
                    console.log(data);

                    self.hideLoader();
                }).fail(function(error) {
                    //console.log(error);
                }).always(function() {
                    //console.log('always');
                });
        });
    }
};

app.initialize();
