(function () {
    let snd = new Audio(chrome.runtime.getURL("alarm.mp3"));


    function foo() {
        let a = document.querySelector('#content_wrapper > div.col-xs-12.col-sm-12.col-md-12.col-lg-12.col-xl-12 > div.col-md-12 > div > div > div > div.panel.panel-success > div.panel-body > p > a');

        if (a) {
            let url = a.href;

            if (sessionStorage.getItem(url)) {
                return;
            }

            window.open(url, '_blank');
            snd.play();
           
            sessionStorage.setItem(url, 'true');
        }

        setTimeout(foo, 5000);
    }

    foo();
}());
