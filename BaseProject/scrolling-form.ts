((w: Window, docElm: Element) => {
    let previews = null;
    let elements = $('div.content');

    elements.each((i, e) => $(e).data('index', i));

    let viewportHeight, middle, topIndex, bottomIndex;

    let setElementActive = (e: Element) => {
        $(e).addClass('active').find('input,select').focus();
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
        $('html, body').stop(true, false).animate({ scrollTop: scTop}, 450, () => {
            setElementActive(cElement);
        });
    };

    elements.on('keydown', (e: JQueryEventObject) => {
        console.log(e.target.nodeName);
        if (e.keyCode == 13 && e.target.nodeName === "INPUT") {
            let index = $(e.delegateTarget).data('index');
            $(e.delegateTarget).removeClass('active');
            index = index+1;
            console.log(index);
            if (index >= elements.length)
                index = 0;
            scrollElementIntoView(elements[index]);
        }
    });

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
                let offset = e.getBoundingClientRect();
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
         }
    })(docElm);


    $(w).on('scroll resize', findMiddleElement).resize();


})(window, document.documentElement)