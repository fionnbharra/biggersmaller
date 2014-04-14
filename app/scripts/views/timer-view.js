/*global BiggerSmaller, Backbone, JST, pubSub*/

BiggerSmaller.Views.TimerView = Backbone.View.extend({

    template: JST['app/scripts/templates/timer.ejs'],

    el: '#timer',

    allowAnimation: true,

    initialTime: 5000,
    minimumTime: 750,

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

    getTimer: function(){
      var reducedTime = this.initialTime * (1-(this.model.get('score')*.1));
      return Math.max(reducedTime,this.minimumTime);
    },

    startTimer: function () {
      var self = this;

      this.$el.animate({
        width: 0,
      }, self.getTimer(), function() {
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
