/**
 * select component
 * use case:
 *  1> add code in html file is:<div class="select--container" id=[name]></div>
 *     (name is the value that you defined it by yourself.)
 *   2> add code in js file:new xx.Select(data,name);
 *    (data is an array type value,eg:[1,2,3,4,5])
 *    (name is you just defined in html,eg:<div class="select--container" id=[name]>)
 */
const jQuery = require('jquery');
(function($) {
    class Select {
        constructor(data, dom, signal) {
            this.data = data;
            this.dom = $('#' + dom) || '';
            this.domStr = '#' + dom;
            this.signal = signal;
        };

        init() {
            this.loadHtml();
            this.changeValue();
            this.toggle();
        };

        initHtml(data) {
            var that = this;
            var html = ' <div class="select- select--change"><span class="selected--option "></span><i  class="select--icon"></i></div>';
            html += '<ul class="select--content select--hide">';
            for (var i = 0; i < this.data.length; i++) {
                if (that.signal) {
                    html += '<li class="select--li" value="' + data[i] + '">' + data[i] + '</li>';
                } else {
                    html += '<li class="select--li" value="' + data[i].name + '">' + data[i].name + '</li>';
                }
            }
            html += '</ul>';
            return html;
        };

        loadHtml() {
            this.dom.append(this.initHtml(this.data));
        };

        changeValue() {
            $(document).on('click', this.domStr + ' .select--content li', function() {
                let that = $(this);
                let parent = that.parent();
                let parentPrev = parent.prev().find('.selected--option');
                parent.removeClass('select--show').addClass('select--hide');
                let oldValue = parentPrev.html();
                let newValue = that.html();
                if (oldValue !== newValue) {
                    parentPrev.html(newValue || '');
                    console.log(that.attr('value'));
                    parentPrev.attr('selected', true);
                }
            })
        };
        toggle() {
            $(document).on('click', this.domStr + ' .select--change', function() {
                let dom = $(this).next();
                if (dom.hasClass('select--show')) {
                    dom.removeClass('select--show').addClass('select--hide');
                } else {
                    dom.removeClass('select--hide').addClass('select--show');
                    $('body').click(function() {
                        dom.removeClass('select--show').addClass('select--hide');
                    })
                }
            });
        };
    }
    window.xx = window.xx || {};
    window.xx.Select = Select;

})(jQuery);
