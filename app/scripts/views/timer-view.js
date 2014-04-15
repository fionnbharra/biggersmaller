/*global BiggerSmaller, Backbone, JST, pubSub, Modernizr*/
"use strict";
BiggerSmaller.Views.TimerView = Backbone.View.extend({

    template: JST['app/scripts/templates/timer.ejs'],

    el: '#timer',

    allowAnimation: true,

    maxTime: 5000,
    minTime: 750,

    transitionEndEventNames: {
      'WebkitTransition' : 'webkitTransitionEnd',
      'OTransition' : 'oTransitionEnd', // this is a guess, I have no idea what the Opera version is.
      'msTransition' : 'MSTransitionEnd', // this is a guess, I have no idea what the MS version is.
      'transition' : 'transitionend'
    },

    // animation end event name
    transitionEndEventName : null,
    // support css animations
    support : Modernizr.cssanimations,

    setTransitionEndEventName: function () {
      this.transitionEndEventName =  this.transitionEndEventNames[ Modernizr.prefixed( 'transition' ) ];
    },

    initialize: function () {
      this.setTransitionEndEventName();
      this.setListeners();
    },

    render: function () {

    },

    setListeners: function (){

      var self = this;

      pubSub.on('pageManager:startGame', function(){
        self.allowAnimation = true;
        self.stopTimer();
        self.resetTimer();
      });

      pubSub.on('pageAnimation:complete', function() {
        if(self.allowAnimation){
          self.startTimer();
        }
      });

      pubSub.on('question:correctAnswer', function() {
          self.stopTimer();
          self.resetTimer();
      });

      pubSub.on('gameOver:wrongAnswer', function(){
        self.allowAnimation = false;
        self.stopTimer();
        self.resetTimer();

      });

      pubSub.on('gameOver:timer', function(){
        self.allowAnimation = false;
        self.stopTimer();
        self.resetTimer();
      });

    },

    // http://easings.net/#easeOutQuint
    // t: current time, b: begInnIng value, c: change In value, d: duration
    easeOutQuint: function (t, b, c, d) {
      return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },

    getTimer: function(){
      var maxTime = this.maxTime,
          minTime = this.minTime,
          maxScore = 30;
      var score = Math.min(maxScore, this.model.get('score'));
      return maxTime + minTime - this.easeOutQuint(score, minTime, maxTime-minTime, maxScore);
    },

    startTimer: function () {
      var self = this;
      var time = Math.round(this.getTimer());
      this.$el.animate({
        width: 0,
      }, time, function() {
        pubSub.trigger("gameOver:timer");
        BiggerSmaller.app.navigate('gameover', {trigger: true});
      });
    },

    resetTimer: function () {
      this.$el.animate({
        width: '100%',
      }, 0, function() {

      });
    },

    stopTimer: function(){
      this.$el.stop();
    }

});
