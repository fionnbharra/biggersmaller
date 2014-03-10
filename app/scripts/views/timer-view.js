/*global BiggerSmaller, Backbone, JST*/

BiggerSmaller.Views.TimerView = Backbone.View.extend({

    template: JST['app/scripts/templates/timer.ejs'],

    el: '#timer',

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

      pubSub.on("pageManager:startGame", function(ev){
        self.$el.removeClass('running')
        self.$el.removeClass('interrupt')
      });

      pubSub.on("pageAnimation:complete", function() {
        self.$el.addClass('running')
      });

      pubSub.on("question:correctAnswer", function(ev) {
        self.$el.removeClass('running')
      });

      pubSub.on("gameOver:wrongAnswer", function(){
        self.$el.removeClass('running')
        self.$el.addClass('interrupt')
      });

      pubSub.on("gameOver:timer", function(){
        self.$el.removeClass('running')
        self.$el.addClass('interrupt')
      });

      this.$el.on( this.transitionEndEventName, function(){

        // pubSub.trigger("gameOver:timer");

        // BiggerSmaller.app.navigate('gameover', {trigger: true});
      });

    }

});
