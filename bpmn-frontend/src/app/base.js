/** Umhaengen submit Button */
(function () {
    'use strict';


    var formsNodeList = document.querySelectorAll('form');

    for (var i = 0; i < formsNodeList.length; i++){
        formsNodeList[i].addEventListener('submit', function (e) {
            e.preventDefault();
        });
    }

})();
