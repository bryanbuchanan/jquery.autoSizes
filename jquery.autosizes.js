(function($) {

    $.fn.autoSizes = function(parameters) {

        // Default Parameters
        parameters = parameters || {};
        var defaults = {
            timeout: 1000,
            class: 'autosizes-on'
        };
        parameters = $.extend(defaults, parameters);

        // Preserve jQuery chaining
        return this.each(function() {

            var $this = $(this);

            /* Define get sizes function */

            function getSizes() {

                $this.each(function() {

                    var $this = $(this);
                    var width = parseInt($this.width());

                    if (width === 0) {

                        var height = parseInt($this.height());
                        var dimensions = $this.data('dimensions').split('x');
                        var masterWidth = dimensions[0];
                        var masterHeight = dimensions[1];
                        var width = (height * masterWidth) / masterHeight;

                    }

                    $this.prop('sizes', width + 'px');

                });

            };

            /* Convert data attributes to actual attributes */

            $this.each(function() {

                var $this = $(this);
                var srcset = $this.data('srcset');
                var src = $this.data('src');
                $this.prop({
                    srcset: srcset,
                    src: src
                }).addClass(parameters.class);

            });

            /* Sizes calculation triggers */

            // On initial page load
            getSizes();

            // On window resize
            var sizesTimeout;
            $(window).resize(function() {
                clearTimeout(sizesTimeout);
                sizesTimeout = setTimeout(getSizes, parameters.timeout);
            });

            /* Preserve Chaining
            -------------------------------------------------------------- */

            return this;

        });

    };

})(jQuery);
