(function () {
    let snd = new Audio(chrome.runtime.getURL("alarm.mp3"));

    function openClass() {

        let timeDiv = document.querySelectorAll('#content_wrapper > div.col-xs-12.col-sm-12.col-md-12.col-lg-12.col-xl-12 > div.col-md-12 > div > div > div > div > div.panel-body > p:nth-child(3)');
        
        let selectedDiv = [...timeDiv].find(it => {
            let hour = parseInt(it.textContent.split(':')[0], 10)
            let min = parseInt(it.textContent.split(':')[1], 10)
            return hour == new Date().getHours() && min == new Date().getMinutes();
        });

        if (selectedDiv) {
            let urlKey = 'session_opened_' + new Date().toJSON().slice(0,10).replace(/-/g,'-') + 'T' + selectedDiv.textContent;
            
            if (sessionStorage.getItem(urlKey)) {
                return;
            }else {
                let teamsUrl = selectedDiv.parentElement.children[3].children[0].href;

                let linkNotFound = teamsUrl.includes("#");
                if (linkNotFound) {
                    window.location.reload();
                } else {
                    sessionStorage.setItem(urlKey, 'true');

                    window.open(teamsUrl, '_blank');
                    snd.play();
                }
            }
        }
        setTimeout(openClass, 5000);
    }

    openClass();
}());
