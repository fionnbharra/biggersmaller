/*global biggersmaller, $*/


window.BiggerSmaller = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
      window.pubSub = _.extend({},Backbone.Events);
      BiggerSmaller.pageManager = new BiggerSmaller.Views.PageManagerView();
      BiggerSmaller.user = new BiggerSmaller.Models.UserModel({'score':0 });

      // game views are managed within the router
      BiggerSmaller.app = new BiggerSmaller.Routers.AppRouter();
      this.gameOverView = new BiggerSmaller.Views.GameOverView({ model: BiggerSmaller.user });
      Backbone.history.start();
    }
};

$(document).ready(function () {
    'use strict';
      FastClick.attach(document.body);
      BiggerSmaller.init();
});



var questionsData = [
    {
        "name": "ant",
        "size": "1"
    },
    {
        "name": "mouse",
        "size": "2"
    },
    {
        "name": "cat",
        "size": "3"
    },
    {
        "name": "dog",
        "size": "4"
    },
    {
        "name": "lion",
        "size": "5"
    },
    {
        "name": "rhino",
        "size": "6"
    },
    {
        "name": "elephant",
        "size": "7"
    },
    {
        "name": "blue whale",
        "size": "8"
    }
]
