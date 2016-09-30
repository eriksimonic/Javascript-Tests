var _this = this;
var ScrollingForm;
(function (ScrollingForm) {
    var Form = (function () {
        function Form() {
        }
        return Form;
    }());
    ScrollingForm.Form = Form;
})(ScrollingForm || (ScrollingForm = {}));
var scrollingForm = (function (w, docElm) {
    var previews = null;
    var elements = $('div.content');
    elements.each(function (i, e) { return $(e).data('index', i); });
    var viewportHeight, middle, topIndex, bottomIndex;
    var setElementActive = function (e) {
        $(e).addClass('active').find('input,select,textarea').focus();
    };
    var scrollElementIntoView = function (e) {
        var bRect = e.getBoundingClientRect();
        var cElement = e;
        viewportHeight = docElm.clientHeight;
        middle = viewportHeight / 2;
        topIndex = middle / 2;
        var scTop = document.body.scrollTop;
        scTop = document.body.scrollTop + (bRect.top - middle);
        scTop = scTop + ($(e).height() / 2);
        $('html, body').stop(true, false).animate({ scrollTop: scTop }, 450, function () {
            setElementActive(cElement);
        });
    };
    var setActiveElementAction = function (e) {
        var index = $(e).data('index');
        $(e).removeClass('active');
        index = index + 1;
        console.log(index);
        if (index >= elements.length)
            index = 0;
        scrollElementIntoView(elements[index]);
    };
    var setActiveElement = function (e) {
        if (e.keyCode == 13 && e.target.nodeName === "SELECT")
            return true;
        if (e.keyCode == 9 || e.keyCode == 13) {
            setActiveElementAction(e.delegateTarget);
        }
        if (/move-next/gi.test(e.target.getAttribute("class"))) {
            e.preventDefault();
            setActiveElementAction(e.delegateTarget);
        }
    };
    var findMiddleElement = (function (docElm) {
        viewportHeight = docElm.clientHeight;
        middle = viewportHeight / 2;
        topIndex = middle / 2;
        bottomIndex = middle / 1.2;
        return function (e) {
            var middleElement;
            if (e && e.type == 'resize') {
                viewportHeight = docElm.clientHeight;
                middle = viewportHeight / 2;
                topIndex = middle / 2;
                bottomIndex = middle / 1.2;
            }
            elements.each(function (i, e) {
                var offset = e.getBoundingClientRect().top;
                offset = Math.floor(offset - ($(e).outerHeight() / 7));
                if (offset > topIndex && offset < bottomIndex) {
                    middleElement = e;
                    return false; // stop iteration
                }
            });
            if (middleElement) {
                if (previews)
                    $(previews).removeClass("active");
                previews = middleElement;
                setElementActive(middleElement);
            }
        };
    })(docElm);
    var initFormPositionDisplay = (function () {
        //let scrollingPositionIndicator = $('<div class=form-position>').append('<div class=progress-bar>', )
        return function () {
        };
    })();
    elements.on('keydown click', setActiveElement);
    $(w).on('scroll resize', findMiddleElement).resize();
    _this.UpdateElements = function () { };
})(window, document.documentElement);
//# sourceMappingURL=scrolling-form.js.map