var app = {
    $watermarkImg: $('.watermark-img'),
    $backgroundImg: $('.bg-img'),
    $loader: $('.js-loader'),
    defaultWatermarkOpacity: 0.5,
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
        self.resetWatermarkOpacity();
        self.resetForm();
        self.downloadImg();
    },
    resetWatermarkOpacity: function() {
        var self = this;

        self.$watermarkImg.css({
            opacity: self.defaultWatermarkOpacity
        });

        $('.ui-slider').slider({
            value: self.defaultWatermarkOpacity * 100
        });
    },
    resetForm: function() {
        var self = this;

        $('#watermark-img-generator-form').on('reset', function() {
            self.resetWatermarkPosition();
            self.resetWatermarkOpacity();
            self.resetVisualPanel();
        })
    },
    resetWatermarkPosition: function() {
        var self = this;

        self.$watermarkImg.removeAttr('style').css({
            top: 0,
            left: 0
        });
    },
    showLoader: function() {
        var self = this;

        self.$loader.fadeIn();
    },
    hideLoader: function() {
        var self = this;

        self.$loader.fadeOut();
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

                self.$backgroundImg.attr('src', data.result.files[0].url).load(function() {
                    self.getCurrentBackgroundImageDimensions();
                    self.hideLoader();
                });

                $('#bg-img').val(data.result.files[0].url);

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

                self.$watermarkImg.attr('src', data.result.files[0].url).load(function() {
                    self.getCurrentWatermarkImageDimensions();
                    self.hideLoader();
                });

                $('#wm-img').val(data.result.files[0].url);
            },
            fail: function(e, data) {
                alert('Error: ' + data.textStatus);
                self.hideLoader();
            }
        });
    },
    getCurrentWatermarkImageDimensions: function(img) {
        var self = this,
            currentWidth = self.$watermarkImg.width(),
            currentHeight = self.$backgroundImg.height();

        $('#wm-img-width').val(currentWidth);
        $('#wm-img-height').val(currentHeight);
    },
    getCurrentBackgroundImageDimensions: function() {
        var self = this,
            currentWidth = self.$backgroundImg.width(),
            currentHeight = self.$backgroundImg.height();

        $('#bg-width').val(currentWidth);
        $('#bg-height').val(currentHeight);
    },
    makeWatermarkImgDraggable: function() {
        var self = this;

        self.$watermarkImg.on('mouseover', function(){
            self.setMainWrapperSize();
        });

        self.$watermarkImg.draggable({
            containment: 'parent',
            grid: [ 1, 1 ],
            drag: function( event, ui ) {
                self.updateSpinnerValue({top: ui.position.top, left: ui.position.left});
            }
        });
    },
    resetVisualPanel: function() {
        var self = this;

        $('.box__cell-btn').removeClass('active').first().addClass('active');
    },
    setMainWrapperSize: function (){
        var self = this;

        $('.main-img-wrapper').css({
            width: self.$backgroundImg.width(),
            height: self.$backgroundImg.height()
        });
    },
    getWatermarkOffsets: function() {
        var self = this,
            watermarkWidth = parseInt(self.$watermarkImg.width(), 10),
            watermarkHeight = parseInt(self.$watermarkImg.height(), 10),
            backgroundWidth = parseInt(self.$backgroundImg.width(), 10),
            backgroundHeight = parseInt(self.$backgroundImg.height(), 10),
            watermarkOffsets = {};

            watermarkOffsets.top = backgroundHeight - watermarkHeight;
            watermarkOffsets.left = backgroundWidth - watermarkWidth;
            watermarkOffsets.centerTop = watermarkOffsets.top / 2;
            watermarkOffsets.centerLeft = watermarkOffsets.left / 2;

        return watermarkOffsets;
    },
    getWatermarkNavigationCoordinates: function() {
        var self = this,
            yCoordinates = ['top', 'center', 'bottom'],
            xCoordinates = ['Left', 'Middle', 'Right'],
            watermarkOffsets = self.getWatermarkOffsets(),
            watermarkNavigationCoordinates = {};

        for (var i = 0; i < yCoordinates.length; i++) {
            for (var j = 0; j < xCoordinates.length; j++) {
                watermarkNavigationCoordinates[yCoordinates[i] + xCoordinates[j]] = { top: 0, left: 0 };

                if (xCoordinates[j] === 'Right') {
                    watermarkNavigationCoordinates[yCoordinates[i] + xCoordinates[j]].left = watermarkOffsets.left;
                }
                if (xCoordinates[j] === 'Middle') {
                    watermarkNavigationCoordinates[yCoordinates[i] + xCoordinates[j]].left = watermarkOffsets.centerLeft;
                }
                if (yCoordinates[i] === 'center') {
                    watermarkNavigationCoordinates[yCoordinates[i] + xCoordinates[j]].top = watermarkOffsets.centerTop;
                }
                if (yCoordinates[i] === 'bottom') {
                    watermarkNavigationCoordinates[yCoordinates[i] + xCoordinates[j]].top = watermarkOffsets.top;
                }
            }
        }

        return watermarkNavigationCoordinates;
    },
    updateSpinnerValue: function(coords) {
        $('#coord__y').val(Math.round(coords.top));
        $('#coord__x').val(Math.round(coords.left));
    },
    setWatermarkPositionByVisualPanel: function() {
        var self = this;

        $('.js-set-watermark-position').on('click', function(e) {
            var targetElement = $(e.currentTarget),
                watermarkPosition = targetElement.data('watermarkPosition'),
                watermarkNavigationCoordinates = self.getWatermarkNavigationCoordinates(),
                positionBtn = targetElement.children('.box__cell-btn');

            e.preventDefault();
            self.setMainWrapperSize();

            $('.box__cell-btn').not(positionBtn).removeClass('active');
            positionBtn.addClass('active');

            self.$watermarkImg.removeAttr('style').css({
                opacity: self.calculateOpacityValue($('.ui-slider').slider('value'))
            });

            self.$watermarkImg.css(watermarkNavigationCoordinates[watermarkPosition]);
            self.updateSpinnerValue(watermarkNavigationCoordinates[watermarkPosition]);
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
                    var orientation = $(this).data('orientation'),
                        watermarkOffsets = self.getWatermarkOffsets();

                    if (orientation === 'x-coordinate') {
                        if ($(this).val() >= watermarkOffsets.left ) {
                            self.$watermarkImg.css({ left: watermarkOffsets.left });
                            $(this).spinner({max: watermarkOffsets.left });
                        } else {
                            self.$watermarkImg.css({left: ui.value});
                        }

                    } else if (orientation === 'y-coordinate') {
                        if ($(this).val() >= watermarkOffsets.top ) {
                            self.$watermarkImg.css({top: watermarkOffsets.top });
                            $(this).spinner({max: watermarkOffsets.top });
                        } else {
                            self.$watermarkImg.css({top: ui.value});
                        }
                    }
                }
            })
        });
    },
    setWatermarkOpacity: function() {
        var self = this;

        self.$watermarkImg.css({ opacity: self.defaultWatermarkOpacity });

        $('.ui-slider').slider({
            value: self.defaultWatermarkOpacity * 100,
            slide: function (event, ui) {
                self.$watermarkImg.css({opacity: self.calculateOpacityValue(ui.value)});
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

            self.showLoader();
            $.ajax({
                url: '../php/generate-watermark.php',
                type: 'POST',
                data: $(this).serialize()
            })
                .done(function() {
                    $('body').append("<iframe src='../php/download.php'></iframe>");
                }).always(function() {
                    self.hideLoader();
                });
        });
    }
};

app.initialize();