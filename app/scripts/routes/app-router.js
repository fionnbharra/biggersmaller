/*global BiggerSmaller, Backbone*/

BiggerSmaller.Routers.AppRouter = Backbone.Router.extend({

  routes:{
      "":"welcome",
      "game":"game",
      "gameover": "gameOver"
  },

  game: function  () {
    pubSub.trigger("pageManager:startGame");
    if(!this.question1View){
      var qm = new BiggerSmaller.Collections.QuestionsCollection(questionsData);
      this.timerView = new BiggerSmaller.Views.TimerView({model: BiggerSmaller.user});
      this.question1View = new BiggerSmaller.Views.QuestionView({collection:qm, el: '#question1', index: 1});
      this.question2View = new BiggerSmaller.Views.QuestionView({collection:qm, el: '#question2', index: 2});
    }
  },

  welcome: function () {
    pubSub.trigger("pageManager:welcome");
    if(!this.welcomeView){
      this.welcomeView = new BiggerSmaller.Views.WelcomeView();
    }
  },

  gameOver: function() {
    pubSub.trigger("pageManager:gameOver");
  }
});
