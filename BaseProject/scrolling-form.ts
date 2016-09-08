((w: Window, docElm: Element) => {
    let previews = null;
    let elements = $('div.content');

    elements.each((i, e) => $(e).data('index', i));

    let viewportHeight, middle, topIndex, bottomIndex;

    let setElementActive = (e: Element) => {
        $(e).addClass('active').find('input,select,textarea').focus();
    };

    let scrollElementIntoView = (e: Element) => {
        let bRect = e.getBoundingClientRect();
        let cElement = e;

        viewportHeight = docElm.clientHeight;
        middle = viewportHeight / 2;
        topIndex = middle / 2;
        let scTop = document.body.scrollTop;
        scTop = document.body.scrollTop + (bRect.top - middle);
        scTop = scTop + ($(e).height() / 2);
        $('html, body').stop(true, false).animate({ scrollTop: scTop }, 450, () => {
            setElementActive(cElement);
        });
    };

    let setActiveElementAction = (e: Element) => {
        let index = $(e).data('index');
        $(e).removeClass('active');
        index = index + 1;
        console.log(index);
        if (index >= elements.length)
            index = 0;
        scrollElementIntoView(elements[index]);
    }

    let setActiveElement = (e: JQueryEventObject) => {

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

    elements.on('keydown click', setActiveElement);

    let findMiddleElement = (function (docElm) {
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
            elements.each((i, e) => {
                let offset = e.getBoundingClientRect().top;
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
        }
    })(docElm);

    $(w).on('scroll resize', findMiddleElement).resize();
})(window, document.documentElement)