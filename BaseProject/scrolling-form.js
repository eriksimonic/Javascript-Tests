(function (w, docElm) {
    var previews = null;
    var elements = $('div.content');
    elements.each(function (i, e) { return $(e).data('index', i); });
    var viewportHeight, middle, topIndex, bottomIndex;
    var setElementActive = function (e) {
        $(e).addClass('active').find('input,select').focus();
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
    elements.on('keydown', function (e) {
        console.log(e.target.nodeName);
        if (e.keyCode == 13 && e.target.nodeName === "INPUT") {
            var index = $(e.delegateTarget).data('index');
            $(e.delegateTarget).removeClass('active');
            index = index + 1;
            console.log(index);
            if (index >= elements.length)
                index = 0;
            scrollElementIntoView(elements[index]);
        }
    });
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
                var offset = e.getBoundingClientRect();
                if (offset.top > topIndex && offset.top < bottomIndex) {
                    middleElement = e;
                    return false; // stop iteration
                }
            });
            //if (previews === middleElement)
            //{
            //    return false;
            //}
            // console.log(previews, middleElement);
            if (middleElement) {
                if (previews)
                    $(previews).removeClass("active");
                previews = middleElement;
                setElementActive(middleElement);
            }
        };
    })(docElm);
    $(w).on('scroll resize', findMiddleElement).resize();
})(window, document.documentElement);
//# sourceMappingURL=scrolling-form.js.map