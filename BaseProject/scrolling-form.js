(function (w, docElm) {
    var previews = null;
    var elements = $('div.content');
    elements.each(function (i, e) { return $(e).data('index', i); });
    var viewportHeight, middle, topIndex, bottomIndex;
    var setElementActive = function (e) {
        $(e).addClass('active').find('input').focus();
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
        if (e.keyCode == 13) {
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
    //let scrollHeight = 0;
    //let h1 = document.getElementsByTagName("h1")[0];
    //document.body.style.height = '50000px';
    //let myFraneticFunction = () => {
    //   // console.log(document.body.scrollTop);
    //    if (document.body.scrollTop > 100) {
    //        if (h1.style.position !== "absolute") {
    //            h1.style.position = "absolute";
    //        }
    //        h1.style.top =
    //            `${document.body.scrollTop}px`;
    //        console.log(`
    //        ${document.body.scrollTop},
    //        ${document.body.clientHeight},
    //        ${window.innerHeight},
    //        ${window.outerHeight},
    //        `);
    //    }
    //    else if (document.body.scrollTop <= 100)
    //    {
    //        h1.style.position = "static";
    //    }
    //    //console.log(document.body.scrollTop);
    //};
    //setInterval(myFraneticFunction, 10);
})(window, document.documentElement);
//# sourceMappingURL=scrolling-form.js.map