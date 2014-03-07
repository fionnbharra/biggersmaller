/*global BiggerSmaller, Backbone*/

BiggerSmaller.Models.UserModel = Backbone.Model.extend({
  currentScore: 0,

  initialize: function () {
    this.setListeners();
  },

  setListeners: function(){
    var self = this;
    pubSub.on("question:correctAnswer", function(ev){
      self.currentScore ++;
      self.set('score', self.currentScore)
    });
    pubSub.on("pageManager:startGame", function(ev){
      self.currentScore = 0;
      self.set('score', 0)
    });

  }
});
