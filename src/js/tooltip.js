var JQuery = require("jquery");

(function($) {
    $.fn.tooltip = function() {
        var margin = 5;

        var origin = $(this);

        var tooltipPosition,
            tooltipText,
            tooltipEl;

        var setAttributes = function() {
            tooltipPosition = origin.attr('data-position');
            tooltipText = origin.attr('data-tooltip');
        }

        setAttributes();

        var renderTooltipEl = function() {

            // Create Tooltip div
            var tooltip = $('<div class="c-tooltip"></div>');

            // Create Text span
            tooltipText = $('<span></span>').text(tooltipText);

            // Create Tooltip
            tooltip.append(tooltipText)
                .appendTo($('body'));

            return tooltip;
        }

        // Render tooltip
        tooltipEl = renderTooltipEl();

        // Mouse In
        origin.on({
            'mouseenter.tooltip': function(e) {
                var showTooltip = function() {
                    // TODO: redundant invoking?
                    setAttributes();

                    tooltipEl.css({ visibility: 'visible', left: '0px', top: '0px' });

                    // Tooltip positioning
                    var originWidth = origin.outerWidth();
                    var originHeight = origin.outerHeight();
                    var tooltipWidth = tooltipEl.outerWidth();
                    var tooltipHeight = tooltipEl.outerHeight();

                    var targetTop, targetLeft, newCoordinates;

                    if (tooltipPosition === 'top') {
                        targetTop = origin.offset().top - tooltipHeight - margin;
                        targetLeft = origin.offset().left + originWidth / 2 - tooltipWidth / 2;
                        newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
                    }

                    // Set tooltip css placement
                    tooltipEl.css({
                        top: newCoordinates.y,
                        left: newCoordinates.x
                    });
                }

                showTooltip();
            },
            'mouseleave.tooltip': function(e) {
                tooltipEl.css({ visibility: 'hidden' });
            }
        });
    }

    var repositionWithinScreen = function(x, y, width, height) {
        var newX = x;
        var newY = y;

        if (newX < 0) {
            newX = 4;
        } else if (newX + width > window.innerWidth) {
            newX -= newX + width - window.innerWidth;
        }

        if (newY < 0) {
            newY = 4;
        } else if (newY + height > window.innerHeight + $(window).scrollTop) {
            newY -= newY + height - window.innerHeight;
        }

        return { x: newX, y: newY };
    };

    $(document).ready(function() {
        $('.tooltipped').tooltip();
    })

})(JQuery)