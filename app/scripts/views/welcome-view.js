/*global BiggerSmaller, Backbone, JST*/

BiggerSmaller.Views.WelcomeView = Backbone.View.extend({

    template: JST['app/scripts/templates/welcome.ejs'],
    el: "#welcome",

    events: {
      'click button': 'startGame'
    },

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.html(this.template());
    },

    startGame: function(){
      BiggerSmaller.app.navigate('game', {trigger: true});
    }
});
