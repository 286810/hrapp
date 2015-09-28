// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'directives'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.backButton.text("");
    $ionicConfigProvider.tabs.style("standard");
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.views.transition("ios");
    $ionicConfigProvider.navBar.alignTitle("center");
    $ionicConfigProvider.navBar.positionPrimaryButtons('left');
    $ionicConfigProvider.navBar.positionSecondaryButtons('right');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // 登录
      .state('login', {
        url: '/login',
        templateUrl: 'templates/public/login.html',
        controller: 'PublicCtrl'
      })
      // 注册
      .state('register', {
        url: '/register',
        templateUrl: 'templates/public/register.html',
        controller: 'PublicCtrl'
      })
      //确认身份
      .state('identity', {
        url: '/identity',
        templateUrl: 'templates/public/identification.html',
        controller: 'PublicCtrl'
      })
      //基本信息
      .state('basicinfo', {
        url: '/basicinfo',
        templateUrl: 'templates/public/basicinfo.html',
        controller: 'PublicCtrl'
      })
      //城市列表
      .state('citylist', {
        url: '/citylist',
        templateUrl: 'templates/public/citylist.html',
        controller: 'CityCtrl'
      })
      //从业信息
      .state('jobinfo', {
        url: '/jobinfo',
        templateUrl: 'templates/public/jobinfo.html',
        controller: 'PublicCtrl'
      })
      //区域、医院列表
      .state( 'hospitalist', {
        url: '/hospitalist',
        templateUrl: 'templates/public/hospitalist.html',
        controller: 'HospitalCtrl'
      })
      //认证信息
      .state('authentication', {
        url: '/authentication',
        templateUrl: 'templates/public/authentication.html',
        controller: 'PublicCtrl'
      })


      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/public/tabs.html'
      })

      // 首页，Each tab has its own nav history stack:
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/home/tab-home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('tab.home.recommend', {
        url: '/recommend',
        views: {
          'home': {
            templateUrl: 'templates/home/home-recommend.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('tab.home.recommend-detail', {
        url: '/recommend/:id',
        views: {
          'home': {
            templateUrl: 'templates/home/recommend-detail.html',
            controller: 'HomeRecommendDetailCtrl'
          }
        }
      })
      .state('tab.home.hottask', {
        url: '/hottask',
        views: {
          'home': {
            templateUrl: 'templates/home/home-hottask.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('tab.home.hotman', {
        url: '/hotman',
        views: {
          'home': {
            templateUrl: 'templates/home/home-hotman.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('tab.home.search', {
        url: '/search',
        views: {
          'home': {
            templateUrl: 'templates/home/home-recommend.html',
            controller: 'HomeCtrl'
          }
        }
      })
      //资讯
      .state('tab.news', {
        url: '/news',
        views: {
          'tab-news': {
            templateUrl: 'templates/news/tab-news.html',
            controller: 'NewsCtrl'
          }
        }
      })
      .state('tab.news.dynamic', {
        url: '/dynamic',
        views: {
          'news': {
            templateUrl: 'templates/news/news-dynamic.html',
            controller: 'NewsCtrl'
          }
        }
      })
      .state('tab.news.dynamic-detail', {
        url: '/dynamic/:id',
        views: {
          'news': {
            templateUrl: 'templates/news/dynamic-detail.html',
            controller: 'DynamicCtrl'
          }
        }
      })
      .state('tab.news.bid', {
        url: '/bid',
        views: {
          'news': {
            templateUrl: 'templates/news/news-dynamic.html',
            controller: 'NewsCtrl'
          }
        }
      })
      .state('tab.news.activity', {
        url: '/activity',
        views: {
          'news': {
            templateUrl: 'templates/news/news-dynamic.html',
            controller: 'NewsCtrl'
          }
        }
      })
      .state('tab.news.classroom', {
        url: '/classroom',
        views: {
          'news': {
            templateUrl: 'templates/news/news-dynamic.html',
            controller: 'NewsCtrl'
          }
        }
      })

      //发布任务
      .state('tab.publish', {
        url: '/publish',
        //abstract: false,
        views: {
          'tab-publish': {
            templateUrl: 'templates/publish/tab-publish.html',
            controller: 'MainCtrl'
          }
        }
      })
      .state('tab.publish.batch', {
        url: '/batch',
        views: {
          'publish': {
            templateUrl: 'templates/publish/publish-batch.html',
            controller: 'BatchCtrl'
          }
        }
      })
      .state('tab.publish.department', {
        url: '/department',
        views: {
          'publish': {
            templateUrl: 'templates/publish/publish-department.html',
            controller: 'DepartmentCtrl'
          }
        }
      })
      .state('tab.publish.heal', {
        url: '/heal',
        views: {
          'publish': {
            templateUrl: 'templates/publish/publish-heal.html',
            controller: 'HealCtrl'
          }
        }
      })
      .state('tab.publish.other', {
        url: '/other',
        views: {
          'publish': {
            templateUrl: 'templates/publish/publish-other.html',
            controller: 'OtherCtrl'
          }
        }
      })

      //消息
      .state('tab.message', {
        url: '/message',
        views: {
          'tab-message': {
            templateUrl: 'templates/message/tab-message.html',
            controller: 'MsgCtrl'
          }
        }
      })
      .state('tab.message-chat', {
        url: '/message-chat',
        views: {
          'tab-message': {
            templateUrl: 'templates/message/message-chat.html',
            controller: 'MsgChatCtrl'
          }
        }
      })
      .state('tab.message-notice', {
        url: '/message-notice',
        views: {
          'tab-message': {
            templateUrl: 'templates/message/message-notice.html',
            controller: 'MsgCtrl'
          }
        }
      })
      .state('tab.message-notice-detail', {
        url: '/message-notice-detail',
        views: {
          'tab-message': {
            templateUrl: 'templates/my/all-detail.html',
            controller: 'AllOrderDetailCtrl'
          }
        }
      })
      //我的
      .state('tab.my', {
        url: '/my',
        views: {
          'tab-my': {
            templateUrl: 'templates/my/tab-my.html',
            controller: 'MyCtrl'
          }
        }
      })
      .state('tab.manageOrder', {
        url: '/manageOrder',
        views: {
          'tab-my': {
            templateUrl: 'templates/my/manage-order.html',
            controller: 'MyCtrl'
          }
        }
      })
      .state('tab.manageOrder.all', {
        url: '/all',
        views: {
          'order': {
            templateUrl: 'templates/my/order-all.html',
            controller: 'AllOrderCtrl'
          }
        }
      })
      .state('tab.manageOrder.all-detail', {
        url: '/all/:allId',
        views: {
          'order': {
            templateUrl: 'templates/my/all-detail.html',
            controller: 'AllOrderDetailCtrl'
          }
        }
      })
      .state('tab.manageOrder.all-detail.allMan-modal', {
        url: '/all/:allId/allMan-modal',
        views: {
          'order': {
            templateUrl: 'templates/my/allMan-modal.html',
            controller: 'AllOrderDetailCtrl'
          }
        }
      })
      .state('tab.manageOrder.response', {
        url: '/response',
        views: {
          'order': {
            templateUrl: 'templates/my/order-response.html',
            controller: 'MyCtrl'
          }
        }
      })
      .state('tab.manageOrder.underway', {
        url: '/underway',
        views: {
          'order': {
            templateUrl: 'templates/my/order-underway.html',
            controller: 'MyCtrl'
          }
        }
      })
      .state('tab.manageOrder.cancel', {
        url: '/cancel',
        views: {
          'order': {
            templateUrl: 'templates/my/order-cancel.html',
            controller: 'MyCtrl'
          }
        }
      })
      .state('tab.manageOrder.store', {
        url: '/store',
        views: {
          'order': {
            templateUrl: 'templates/my/order-store.html',
            controller: 'MyCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home/recommend');

  });
