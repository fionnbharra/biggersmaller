/*global BiggerSmaller, Backbone, JST*/
'use strict';
BiggerSmaller.Views.PageManagerView = Backbone.View.extend({

    el: '#main',
    $pages: null,
    animcursor: 1,
    pagesCount: 0,
    current: 0,
    isAnimating: false,
    endCurrPage: false,
    endNextPage: false,

    animEndEventNames: {
      'WebkitAnimation' : 'webkitAnimationEnd',
      'OAnimation' : 'oAnimationEnd',
      'msAnimation' : 'MSAnimationEnd',
      'animation' : 'animationend'
    },

    // animation end event name
    animEndEventName : null,
    // support css animations
    support : Modernizr.cssanimations,

    events: {

    },

    initialize: function () {
      this.setPages();
      this.setAnimEndEventName();

      this.$pages.each( function() {
        var $page = $( this );
        $page.data( 'originalClassList', $page.attr( 'class' ) );
      } );

      this.$pages.eq( this.current ).addClass( 'screen-current' );

      this.setListeners();
    },

    setListeners: function () {
      var self = this;

      pubSub.on('pageManager:nextQuestion', function(ev){
        self.nextQuestion();
      });

      pubSub.on('pageManager:startGame', function(ev){
        self.startGame();
      });

      pubSub.on('pageManager:welcome', function(ev){
        self.showWelcome();
      });

      pubSub.on('pageManager:gameOver', function(ev){
        self.showGameOver();
      });

    },

    setPages: function(){
      this.$pages = this.$el.children( 'div.screen' );
      this.pagesCount = this.$pages.length;
    },

    setAnimEndEventName: function () {
      this.animEndEventName =  this.animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
    },

    showWelcome: function(){
      this.current = -1;
      this.nextPage();
    },

    startGame: function ( ){
      this.nextPage( 1 );
    },

    showGameOver: function(){
      this.nextPage( 3 );
    },

    nextQuestion: function(){
      if(this.current === 2 ){
        this.nextPage( 1 );
      } else {
        this.nextPage(  );
      }
    },

    nextPage: function( targetPage ) {

      var self = this;

      if( self.isAnimating ) {
        return false;
      }


      var animation = Math.floor(Math.random() * 67) + 1;

      self.isAnimating = true;

      var $currPage = self.$pages.eq( self.current );

      if(targetPage > 0){
        self.current = targetPage-1;
      }

      if( self.current < self.pagesCount - 1 ) {
        ++self.current;
      }
      else {
        self.current = 0;
      }



      var $nextPage = self.$pages.eq( self.current ).addClass( 'screen-current' ),
        outClass = '', inClass = '';

      switch( animation ) {
        case 1:
          outClass = 'pt-page-moveToLeft';
          inClass = 'pt-page-moveFromRight';
          break;
        case 2:
          outClass = 'pt-page-moveToRight';
          inClass = 'pt-page-moveFromLeft';
          break;
        case 3:
          outClass = 'pt-page-moveToTop';
          inClass = 'pt-page-moveFromBottom';
          break;
        case 4:
          outClass = 'pt-page-moveToBottom';
          inClass = 'pt-page-moveFromTop';
          break;
        case 5:
          outClass = 'pt-page-fade';
          inClass = 'pt-page-moveFromRight pt-page-ontop';
          break;
        case 6:
          outClass = 'pt-page-fade';
          inClass = 'pt-page-moveFromLeft pt-page-ontop';
          break;
        case 7:
          outClass = 'pt-page-fade';
          inClass = 'pt-page-moveFromBottom pt-page-ontop';
          break;
        case 8:
          outClass = 'pt-page-fade';
          inClass = 'pt-page-moveFromTop pt-page-ontop';
          break;
        case 9:
          outClass = 'pt-page-moveToLeftFade';
          inClass = 'pt-page-moveFromRightFade';
          break;
        case 10:
          outClass = 'pt-page-moveToRightFade';
          inClass = 'pt-page-moveFromLeftFade';
          break;
        case 11:
          outClass = 'pt-page-moveToTopFade';
          inClass = 'pt-page-moveFromBottomFade';
          break;
        case 12:
          outClass = 'pt-page-moveToBottomFade';
          inClass = 'pt-page-moveFromTopFade';
          break;
        case 13:
          outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
          inClass = 'pt-page-moveFromRight';
          break;
        case 14:
          outClass = 'pt-page-moveToRightEasing pt-page-ontop';
          inClass = 'pt-page-moveFromLeft';
          break;
        case 15:
          outClass = 'pt-page-moveToTopEasing pt-page-ontop';
          inClass = 'pt-page-moveFromBottom';
          break;
        case 16:
          outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
          inClass = 'pt-page-moveFromTop';
          break;
        case 17:
          outClass = 'pt-page-scaleDown';
          inClass = 'pt-page-moveFromRight pt-page-ontop';
          break;
        case 18:
          outClass = 'pt-page-scaleDown';
          inClass = 'pt-page-moveFromLeft pt-page-ontop';
          break;
        case 19:
          outClass = 'pt-page-scaleDown';
          inClass = 'pt-page-moveFromBottom pt-page-ontop';
          break;
        case 20:
          outClass = 'pt-page-scaleDown';
          inClass = 'pt-page-moveFromTop pt-page-ontop';
          break;
        case 21:
          outClass = 'pt-page-scaleDown';
          inClass = 'pt-page-scaleUpDown pt-page-delay300';
          break;
        case 22:
          outClass = 'pt-page-scaleDownUp';
          inClass = 'pt-page-scaleUp pt-page-delay300';
          break;
        case 23:
          outClass = 'pt-page-moveToLeft pt-page-ontop';
          inClass = 'pt-page-scaleUp';
          break;
        case 24:
          outClass = 'pt-page-moveToRight pt-page-ontop';
          inClass = 'pt-page-scaleUp';
          break;
        case 25:
          outClass = 'pt-page-moveToTop pt-page-ontop';
          inClass = 'pt-page-scaleUp';
          break;
        case 26:
          outClass = 'pt-page-moveToBottom pt-page-ontop';
          inClass = 'pt-page-scaleUp';
          break;
        case 27:
          outClass = 'pt-page-scaleDownCenter';
          inClass = 'pt-page-scaleUpCenter pt-page-delay400';
          break;
        case 28:
          outClass = 'pt-page-rotateRightSideFirst';
          inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
          break;
        case 29:
          outClass = 'pt-page-rotateLeftSideFirst';
          inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
          break;
        case 30:
          outClass = 'pt-page-rotateTopSideFirst';
          inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
          break;
        case 31:
          outClass = 'pt-page-rotateBottomSideFirst';
          inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
          break;
        case 32:
          outClass = 'pt-page-flipOutRight';
          inClass = 'pt-page-flipInLeft pt-page-delay500';
          break;
        case 33:
          outClass = 'pt-page-flipOutLeft';
          inClass = 'pt-page-flipInRight pt-page-delay500';
          break;
        case 34:
          outClass = 'pt-page-flipOutTop';
          inClass = 'pt-page-flipInBottom pt-page-delay500';
          break;
        case 35:
          outClass = 'pt-page-flipOutBottom';
          inClass = 'pt-page-flipInTop pt-page-delay500';
          break;
        case 36:
          outClass = 'pt-page-rotateFall pt-page-ontop';
          inClass = 'pt-page-scaleUp';
          break;
        case 37:
          outClass = 'pt-page-rotateOutNewspaper';
          inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
          break;
        case 38:
          outClass = 'pt-page-rotatePushLeft';
          inClass = 'pt-page-moveFromRight';
          break;
        case 39:
          outClass = 'pt-page-rotatePushRight';
          inClass = 'pt-page-moveFromLeft';
          break;
        case 40:
          outClass = 'pt-page-rotatePushTop';
          inClass = 'pt-page-moveFromBottom';
          break;
        case 41:
          outClass = 'pt-page-rotatePushBottom';
          inClass = 'pt-page-moveFromTop';
          break;
        case 42:
          outClass = 'pt-page-rotatePushLeft';
          inClass = 'pt-page-rotatePullRight pt-page-delay180';
          break;
        case 43:
          outClass = 'pt-page-rotatePushRight';
          inClass = 'pt-page-rotatePullLeft pt-page-delay180';
          break;
        case 44:
          outClass = 'pt-page-rotatePushTop';
          inClass = 'pt-page-rotatePullBottom pt-page-delay180';
          break;
        case 45:
          outClass = 'pt-page-rotatePushBottom';
          inClass = 'pt-page-rotatePullTop pt-page-delay180';
          break;
        case 46:
          outClass = 'pt-page-rotateFoldLeft';
          inClass = 'pt-page-moveFromRightFade';
          break;
        case 47:
          outClass = 'pt-page-rotateFoldRight';
          inClass = 'pt-page-moveFromLeftFade';
          break;
        case 48:
          outClass = 'pt-page-rotateFoldTop';
          inClass = 'pt-page-moveFromBottomFade';
          break;
        case 49:
          outClass = 'pt-page-rotateFoldBottom';
          inClass = 'pt-page-moveFromTopFade';
          break;
        case 50:
          outClass = 'pt-page-moveToRightFade';
          inClass = 'pt-page-rotateUnfoldLeft';
          break;
        case 51:
          outClass = 'pt-page-moveToLeftFade';
          inClass = 'pt-page-rotateUnfoldRight';
          break;
        case 52:
          outClass = 'pt-page-moveToBottomFade';
          inClass = 'pt-page-rotateUnfoldTop';
          break;
        case 53:
          outClass = 'pt-page-moveToTopFade';
          inClass = 'pt-page-rotateUnfoldBottom';
          break;
        case 54:
          outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
          inClass = 'pt-page-rotateRoomLeftIn';
          break;
        case 55:
          outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
          inClass = 'pt-page-rotateRoomRightIn';
          break;
        case 56:
          outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
          inClass = 'pt-page-rotateRoomTopIn';
          break;
        case 57:
          outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
          inClass = 'pt-page-rotateRoomBottomIn';
          break;
        case 58:
          outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
          inClass = 'pt-page-rotateCubeLeftIn';
          break;
        case 59:
          outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
          inClass = 'pt-page-rotateCubeRightIn';
          break;
        case 60:
          outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
          inClass = 'pt-page-rotateCubeTopIn';
          break;
        case 61:
          outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
          inClass = 'pt-page-rotateCubeBottomIn';
          break;
        case 62:
          outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
          inClass = 'pt-page-rotateCarouselLeftIn';
          break;
        case 63:
          outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
          inClass = 'pt-page-rotateCarouselRightIn';
          break;
        case 64:
          outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
          inClass = 'pt-page-rotateCarouselTopIn';
          break;
        case 65:
          outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
          inClass = 'pt-page-rotateCarouselBottomIn';
          break;
        case 66:
          outClass = 'pt-page-rotateSidesOut';
          inClass = 'pt-page-rotateSidesIn pt-page-delay200';
          break;
        case 67:
          outClass = 'pt-page-rotateSlideOut';
          inClass = 'pt-page-rotateSlideIn';
          break;

      }


      $currPage.addClass( outClass ).on( this.animEndEventName, function() {
        $currPage.off( self.animEndEventName );

        self.endCurrPage = true;
        if( self.endNextPage ) {
          self.onEndAnimation( $currPage, $nextPage );
        }
      } );


      $nextPage.addClass( inClass ).on( this.animEndEventName, function() {
        $nextPage.off( self.animEndEventName );
        self.endNextPage = true;
        if( self.endCurrPage ) {
          self.onEndAnimation( $currPage, $nextPage );
        }
      } );

      if( !this.support ) {
        this.onEndAnimation( $currPage, $nextPage );
      }

    },

    onEndAnimation: function ( $outpage, $inpage ) {
      this.endCurrPage = false;
      this.endNextPage = false;
      this.resetPage( $outpage, $inpage );
      this.isAnimating = false;
      pubSub.trigger('pageAnimation:complete', {foo: true});
    },

    resetPage: function( $outpage, $inpage ) {
      $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
      $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' screen-current' );
    }


});
