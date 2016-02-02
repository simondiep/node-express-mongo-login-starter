'use strict';
exports.homePage = function(request, response) {
    response.render('home', {
        title: 'Home'
    });
};