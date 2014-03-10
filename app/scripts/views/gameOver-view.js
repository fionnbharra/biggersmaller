/*global BiggerSmaller, Backbone, JST*/
'use strict';
BiggerSmaller.Views.GameOverView = Backbone.View.extend({

    template: JST['app/scripts/templates/gameOver.ejs'],
    el: '#gameover',
    self: null,

    events: {
      'click button': 'restart'
    },

    initialize: function () {
      this.render();
      this.model.on('change', this.updateScore, this);
      this.setListeners();
    },

    render: function () {
      this.$el.html(this.template({ score: this.model.toJSON() }));
    },

    restart: function (){
      BiggerSmaller.app.navigate('game', {trigger: true});
    },

    updateScore: function(){
      this.$el.find('#score').html(this.model.get('score'));
    },

    setListeners: function(){
      var $outOfTimeMessage = this.$el.find('#out-of-time');
      var $wrongAnswerMessage = this.$el.find('#wrong-answer');

      $outOfTimeMessage.addClass('hidden');

      pubSub.on('gameOver:wrongAnswer', function(){
        $outOfTimeMessage.addClass('hidden');
        $wrongAnswerMessage.removeClass('hidden');
      });

      pubSub.on('gameOver:timer', function(){
        $outOfTimeMessage.removeClass('hidden');
        $wrongAnswerMessage.addClass('hidden');
      });
    }

});
