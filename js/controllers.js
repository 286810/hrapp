angular.module('starter.controllers', [])

  .controller( 'MainCtrl', ['$scope', '$location', '$ionicModal', '$ionicNavBarDelegate', '$ionicHistory', '$ionicLoading',
    function ( $scope, $location, $ionicModal, $ionicNavBarDelegate, $ionicHistory, $ionicLoading ) {
    //状态变量
      $scope.root = {};

      $scope.$on( '$stateChangeStart' , function ( e, toState, toParams, fromState, fromParams ) {

        if ( toState.name == 'tab.message-chat' ) {
          $scope.root.hideTabs = true;
        } else {
          $scope.root.hideTabs = false;
        }
      });
      $scope.$on( '$stateChangeSuccess' , function ( e, toState, toParams, fromState, fromParams ) {
        $ionicLoading.hide();
        //console.dir([ e, toState, toParams, fromState, fromParams  ])
      });
    //hide back-button
    $ionicNavBarDelegate.showBackButton(false);

    $scope.setPublish = function () {
      openModal();
    };

    function openModal(next) {
      $ionicModal.fromTemplateUrl('./templates/publish/publish_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (publish_modal) {
        $scope.publish_modal = publish_modal;
        $scope.publish_modal.show();
      });
    }
    $scope.cancelPublish = function () {
      $scope.publish_modal.hide();
      $scope.publish_modal.remove();
      $ionicHistory.goBack();
    };

    $scope.publishBatch = function () {
      $scope.publish_modal.hide();
      $scope.publish_modal.remove();
      $location.path('/tab/publish/batch');
      $location.replace();
    };
    //科室会
    $scope.publishDepartment = function () {
      $scope.publish_modal.hide();
      $scope.publish_modal.remove();
      $location.path('/tab/publish/department');
      $location.replace();
    };

    $scope.publishHeal = function () {
      $scope.publish_modal.hide();
      $scope.publish_modal.remove();
      $location.path('/tab/publish/heal');
      $location.replace();
    };
    $scope.publishOther = function () {
      $scope.publish_modal.hide();
      $scope.publish_modal.remove();
      $location.path('/tab/publish/other');
      $location.replace();
    };
  }])

  .controller( 'PublicCtrl', ['$scope', '$state', '$ionicPopover', 'User', '$ionicActionSheet', '$timeout', '$ionicModal',
    function ( $scope, $state, $ionicPopover, User, $ionicActionSheet, $timeout, $ionicModal ) {

      //判断是否同意使用条款
      $scope.user = {
        checked: true,
        city_name: '北京市', city_id: "110200000000"
      };

      $scope.login = function (form) {
        console.log(form.$valid);
        if (form.$valid) {
          //登录请求
          //$http({
          //method: 'POST',
          //url: 'http://www.ocdday.com:3333/user_acount/u_phone_number/:' + $scope.user.phone,
          //headers: {
          //  'Content-Type': 'application/json',
          //  'access_token': 'test123'
          //},
          //data: {
          //}
          //}).success(function (data) {
          //
          //}).error(function (status) {
          //  console.log(status);
          //});
          $state.go('identity');
          $scope.finish_percent = 50;
        }
      };

      //qq
      $scope.qqLogin = function () {
        YCQQ.checkClientInstalled(function(){
          console.log('client is installed');
        },function(){
          // 如果安装的QQ客户端版本太低，不支持SSO登录也会返回没有安装客户端的错误
          console.log('client is not installed');
        });
        var checkClientIsInstalled = 1;//默认值是 0,仅仅针对 iOS平台有效![]() 110406
        YCQQ.ssoLogin(function(args){
          alert(args.access_token);
          alert(args.userid);
        },function(failReason){
          console.log(failReason);
        },checkClientIsInstalled);
      };

      //邀请码提示框
      $scope.inviPopover = $ionicPopover.fromTemplate(
        '<ion-popover-view>' +
        ' <ion-content>' +
        '   邀请码是邀请码邀请码是邀请码' +
        ' </ion-content>' +
        '</ion-popover-view>',
        {
          scope: $scope
        }
      );

      $scope.openPopover = function (e) {
        $scope.inviPopover.show(e);
        //待处理点透问题
        //if (e == 'touchend') {
        //  e.preventDefault();
        //}
        //console.log(e);
      };
      $scope.closePopover = function () {
        $scope.inviPopover.hide();
      };
      //

      $scope.register = function (form) {
        if (form.$valid) {
          $state.go('identity');
          $scope.finish_percent = 50;
        }
      };

      //确认身份
      $scope.identityList = [
        {
          text: '代理商',
          value: 1
        },
        {
          text: '直销人员',
          value: 2
        },
        {
          text: '以上都是',
          value: 3
        }
      ];
      //邀请码提示框
      $scope.identityPopover = $ionicModal.fromTemplate(
        '<ion-modal-view>' +
        ' <ion-content>' +
        '   代理商是代理商' +
        ' </ion-content>' +
        '</ion-modal-view>',
        {
          scope: $scope,
          animation: 'slide-in-up'
        }
      );

      $scope.openIdentityPopover = function () {
        $scope.identityPopover.show();
        $timeout(function () {
          $scope.identityPopover.hide();
        },2000);
      };

      $scope.identity = {
        type: 1
      };

      //去选择城市
      $scope.selectCity = function () {
        $state.go('citylist');
      };

      //完成基本信息
      $scope.finishBasic = function () {
        $state.go('jobinfo');
        $scope.finish_percent = 80;
      };
      $scope.selectDoctor = function () {
        $state.go('hospitalist');
      };
      //选择医院
      console.log(User.data);

      //上传证件
      $scope.uploadCard = function () {
        var hideSheet = $ionicActionSheet.show({
          buttons: [
            {text: '直接拍照'},
            {text: '从相册中选'}
          ],
          buttonClicked: function (index) {
            function onSuccess(imageData) {
              //$('#imgList').appendChild('<img src="data:image/jpeg;base64,' + imageData + '" >');
              var image = document.querySelector('#myImg');
              image.src = "data:image/jpeg;base64," + imageData;
            }

            function onFail(message) {
              alert('Failed because: ' + message);
            }

            if (index == 0) {
              console.log('camera');
              navigator.camera.getPicture(onSuccess, onFail, {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 400,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
              })
            } else if (index == 1) {
              console.log('photo');
              navigator.camera.getPicture(onSuccess, onFail, {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 400,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
              })
            }
            return true;
          }
        });
      }
    }])

  .controller('CityCtrl', ['$scope', '$state', 'User', function ($scope, $state, User) {
    $scope.back = function () {
      $state.go('basicinfo');
    };
    $scope.cityList = User.getCity();
    console.log()
  }])

  .controller('HospitalCtrl', ['$scope', '$state', '$ionicSlideBoxDelegate', 'User',
    function ($scope, $state, $ionicSlideBoxDelegate, User) {
      //$scope.option = User.data();
      $scope.options = {};
      $scope.hospital = [];
      $scope.currentSlide = 0;

      $scope.pagerClick = function (index) {
        $ionicSlideBoxDelegate.slide(index);
        $scope.currentSlide = index;
      };
      $scope.slideChanged = function (index) {

        $scope.currentSlide = index;
      };

      //省份数据
      $scope.provinceList = User.getProvince();
      //辖区内城市
      $scope.showCity = function (name) {
        $scope.tempList = User.getOwnedCity(name);
        //console.log(name);
        if ($scope.tempList[0].isCounty) {
          $scope.ownedCountyList = $scope.tempList;
          $ionicSlideBoxDelegate.slide(3);
        } else {
          $scope.ownedCityList = $scope.tempList;
          $ionicSlideBoxDelegate.slide(2);
        }

      };
      //辖区内区县
      $scope.showCounty = function (name) {
        $scope.ownedCountyList = User.getOwnedCounty(name);
        $ionicSlideBoxDelegate.slide(3);
      };
      //等级
      $scope.showLevel = function (name) {
        User.data.county = name;
        $ionicSlideBoxDelegate.slide(4);
      };
      //医院等级
      $scope.levelData = [
        '三级特等', '三级甲等', '三级乙等', '三级丙等',
        '二级甲等', '二级乙等', '二级丙等',
        '一级甲等', '一级乙等', '一级丙等'
      ];
      //搜索结果
      $scope.showResult = function (name) {
        User.data.level = name;
        $ionicSlideBoxDelegate.slide(5);
        console.log(User.data)
      };

      //医院临时数据
      $scope.hospitalList = [
        { text: "江苏省人民医院", checked: false },
        { text: "江苏省中医院", checked: false },
        { text: "南京市中医院", checked: false },
        { text: "南京市中心医院", checked: false },
        { text: "上海市人民医院", checked: false },
        { text: "上海儿童医院", checked: false }
      ];
      $scope.changeHospital = function (item) {

        item.checked ? $scope.hospital.push(item) : $scope.hospital.shift();
        //console.log($scope.hospital);
      };

    }])

  .controller('HomeCtrl', ['$scope', '$state', '$location',
    function ($scope, $state, $location) {
      //智能推荐下拉框
      $scope.show = {};

    if ($location.path() == '/tab/home') {
      $location.path('/tab/home/recommend');
      $location.replace();
    }
    //控制二级菜单
    $scope.currentLocation = $location.path();
    $scope.$on('$locationChangeStart', function (event, next, current) {
      $scope.currentLocation = next.split('#')[1];

      if( next.split('#')[1] == '/tab/home/hottask' || next.split('#')[1] == '/tab/home/hotman' ) {
        $scope.show.rmd_menu = false;
      }
      if ( next.split('#')[1].indexOf('/recommend/') == -1 ) {
        $scope.show.recommendItemActive = false;
      } else {
        $scope.show.recommendItemActive = true;
      }
    });

      //显示详情
      $scope.showDetail = function (id) {
        $location.path('/tab/home/recommend/1');
      }

  }])
  .controller('HomeRecommendDetailCtrl', ['$scope', '$state', function ($scope, $state) {
    //console.log($scope);

  }])

  //发布任务
  .controller('PublishCtrl', ['$scope', '$ionicModal', '$location', '$state', '$ionicNavBarDelegate', '$ionicHistory',
    function ( $scope, $ionicModal, $location, $state, $ionicNavBarDelegate, $ionicHistory ) {
      $scope.modal = {};

      $scope.$on('open', function () {
        //!$scope.modal.active && openModal();
      });

      //if ( $location.path() == '/tab/publish' ) {
      //  $location.path('/tab/publish/batch');
      //  $location.replace();
      //} else if ( $location.path() == '/tab/publish/batch' ) {
      //  openModal();
      //  publish.active = true;
      //}
      //hide back-button
      $ionicNavBarDelegate.showBackButton(false);

      //function openModal(next) {
      //    $ionicModal.fromTemplateUrl('./templates/publish/publish_modal.html', {
      //      scope: $scope,
      //      animation: 'slide-in-up'
      //    }).then(function (publish_modal) {
      //      $scope.publish_modal = publish_modal;
      //      $scope.publish_modal.show();
      //    });
      //
      //  $scope.modal.active = true;
      //}
      //openModal();
      //$scope.$on('$locationChangeStart', function ( e, next, pre ) {
      //  if ( next.split('#')[1].indexOf('/tab/publish/') != -1 && pre.split('#')[1].indexOf('/tab/publish/') == -1 ) {
      //    openModal();
      //  }
      //});


      $scope.cancelPublish = function () {
        $scope.publish_modal.hide();
        $scope.publish_modal.remove();
        $ionicHistory.goBack();
        $scope.modal.active = false;
      };

      $scope.publishBatch = function () {
        $scope.publish_modal.hide();
        $scope.publish_modal.remove();
        $scope.modal.active = false;
        $location.path('/tab/publish/batch');
        $location.replace();
      };
      //科室会
      $scope.publishDepartment = function () {
        $scope.publish_modal.hide();
        $scope.publish_modal.remove();
        $scope.modal.active = false;
        $location.path('/tab/publish/department');
        $location.replace();
      };

      $scope.publishHeal = function () {
        $scope.publish_modal.hide();
        $scope.publish_modal.remove();
        $scope.modal.active = false;
        $location.path('/tab/publish/heal');
        $location.replace();
      };
      $scope.publishOther = function () {
        $scope.publish_modal.hide();
        $scope.publish_modal.remove();
        $scope.modal.active = false;
        $location.path('/tab/publish/other');
        $location.replace();
      };
  }])
  .controller('BatchCtrl', [ '$scope', '$ionicHistory', '$location',
    function ( $scope, $ionicHistory, $location ) {

    //
    $scope.$on('$locationChangeStart', function ( e, next, pre ) {
      if ( next.split('#')[1] == '/tab/publish/batch' ){
        $scope.$emit('open');
      }

      //if ( next.split('#')[1].indexOf('/tab/publish/') != -1 && pre.split('#')[1].indexOf('/tab/publish/') == -1 ) {
      //  //openModal();
      //}
    });

    $scope.cancelPublish = function () {
      //console.log($ionicHistory.viewHistory().views);
      //$ionicHistory.clearHistory();
      $ionicHistory.goBack();
    };

      //上传产品图片
      $scope.uploadImg = function () {
        function win(r) {
          console.log("Code = " + r.responseCode);
          console.log("Response = " + r.response);
          console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
          alert("An error has occurred: Code = " + error.code);
          console.log("upload error source " + error.source);
          console.log("upload error target " + error.target);
        }

        var fileURL = 'cdvfile://localhost';
        var uri = encodeURI("http://http://localhost/hrapp/www");

        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
        options.mimeType="text/plain";

        var headers={'headerParam':'headerValue'};

        options.headers = headers;

        var ft = new FileTransfer();
        ft.onprogress = function(progressEvent) {
          if (progressEvent.lengthComputable) {
            loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
          } else {
            loadingStatus.increment();
          }
        };
        ft.upload(fileURL, uri, win, fail, options);
      };
  }])
  .controller('DepartmentCtrl', ['$scope', function ($scope) {

    $scope.$on('$locationChangeStart', function ( e, next, pre ) {
      if ( next.split('#')[1] == '/tab/publish/department' ){
        //$scope.$emit('open');
        //console.log($scope)
      }
    });
  }])
  .controller('HealCtrl', ['$scope', function ($scope) {

    $scope.$on('$locationChangeStart', function ( e, next, pre ) {
      if ( next.split('#')[1] == '/tab/publish/heal' ){
        //$scope.$emit('open');
      }
    });
  }])
  .controller('OtherCtrl', ['$scope', function ($scope) {

    $scope.$on('$locationChangeStart', function ( e, next, pre ) {
      if ( next.split('#')[1] == '/tab/publish/other' ){
        //$scope.$emit('open');
      }
    });
  }])

  .controller('NewsCtrl', ['$scope', '$location', '$rootScope', '$state',
    function ($scope, $location, $rootScope, $state) {

      if ($location.path() == '/tab/news') {
        $location.path('/tab/news/dynamic');
        $location.replace();
      }

      //控制二级菜单
      $scope.currentLocation = $location.path();
      $scope.$on('$locationChangeStart', function (event, next, current) {
        $scope.currentLocation = next.split('#')[1];//console.dir([$scope.currentLocation])

        var isDynamic = $scope.currentLocation == '/tab/news/dynamic' ||
          $scope.currentLocation == '/tab/news/bid' ||
          $scope.currentLocation == '/tab/news/activity' ||
          $scope.currentLocation == '/tab/news/classroom';
        if (isDynamic) {
          $rootScope.showDetail = false;
        }
      });
      //$scope.$on( '$locationChangeSuccess', function () {
      //  console.log($state.current.name)
      //});

      //测试数据
      $scope.dynamicItems = [
        {
          id: 0,
          src: './img/ionic.png',
          summary: '贵阳市政府支持乌当区，建设贵州省大健康医药产业。引领示范区，乌当区建设贵州省大健康医药产业引领示范区',
          time: new Date().toLocaleString().split(' ')[0].replace(/\//g, '-')
        },
        {
          id: 1,
          src: './img/ionic.png',
          summary: '贵阳市政府支持乌当区，建设贵州省大健康医药产业。引领示范区，乌当区建设贵州省大健康医药产业引领示范区',
          time: new Date().toLocaleString().split(' ')[0].replace(/\//g, '-')
        }
      ]
    }])
  .controller('DynamicCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    //隐藏二级菜单
    $rootScope.showDetail = true;
  }])

  .controller('MsgCtrl', [ '$scope', '$location', '$timeout',
    function ( $scope, $location, $timeout ) {

      //查看订单
      $scope.lookOrderDetail = function () {
        console.log('lookOrderDetail');
        //$location.path('/tab/my');
        //$timeout(function () {
        //  $location.path('/tab/manageOrder/all/0');
        //});
      }

  }])
  .controller('MsgChatCtrl', [ '$scope',
    function ( $scope ) {
      //对话数据
      $scope.chatData = [
        {
          'name': '小红',
          'img': './img/hotman-1.png',
          'pos': 'left',
          'content': '欢迎来到医药红人！'
        },
        {
          'name': '小花',
          'img': './img/hotman-2.jpg',
          'pos': 'right',
          'content': '你看到我了吗'
        }
      ];

      $scope.sendMsg = function() {
        console.log($scope.chat.content);
        if ( $scope.chat.content ) {
          $scope.chatData.push(
            {
              'name': '小花',
              'img': './img/hotman-2.jpg',
              'pos': 'right',
              'content': $scope.chat.content
            },
            {
              'name': '小红',
              'img': './img/hotman-1.png',
              'pos': 'left',
              'content': '哎哟，我们又见面了哦！'
            }
          );
        }

      }
    }])

  .controller('MyCtrl', ['$scope', '$location', '$rootScope', '$timeout', 'OrderService',
    function ($scope, $location, $rootScope, $timeout, OrderService) {

      //控制二级菜单
      $scope.currentLocation = $location.path();
      $scope.$on('$locationChangeStart', function (event, next, prev) {
        console.log(prev);

        $scope.currentLocation = next.split('#')[1];

        var isActive = $scope.currentLocation == '/tab/manageOrder/all' ||
          $scope.currentLocation == '/tab/manageOrder/response' ||
          $scope.currentLocation == '/tab/manageOrder/underway' ||
          $scope.currentLocation == '/tab/manageOrder/cancel' ||
          $scope.currentLocation == '/tab/manageOrder/store';
        if (isActive) {
          $rootScope.showOrDetail = false;
        }
      });


    }])
  .controller('AllOrderCtrl', ['$scope', '$location', '$state', '$rootScope', '$ionicModal', '$timeout', 'OrderService',
    function ($scope, $location, $state, $rootScope,$ionicModal, $timeout, OrderService) {
      $scope.allOpt = {};
      $scope.allOpt.allId = $state.params.allId;

      //获取数据
      $scope.items = OrderService.allSync();
      //上拉加载
      $scope.isMoreData = true;
      $scope.loadMore = function () {
        /*$http.get('/more-items').success(function(items) {
         useItems(items);
         $scope.$broadcast('scroll.infiniteScrollComplete');
         });*/
        $timeout(function () {
          $scope.items.push(
            {id: 5}
          );
          $scope.$broadcast('scroll.infiniteScrollComplete');
          //$scope.isMoreData = false;
        }, 2000);

        console.log($scope.items);
      };
      //$scope.$on('$stateChangeSuccess', function () {
      //  $scope.loadMore();
      //});

      //滑动删除订单列表
      $scope.listCanSwipe = true;
      $scope.onItemDelete = function (item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
      };

      //进入详细页
      $scope.showOrderDetail = function (id) {
        console.log($scope.currentLocation);
        console.log(id);
        $location.path('/tab/manageOrder/all/' + id);
        console.log($scope.currentLocation);
      };


    }])
  .controller('AllOrderDetailCtrl', ['$scope', '$location', '$state', '$rootScope', '$ionicModal', '$ionicSlideBoxDelegate',
    function ($scope, $location, $state, $rootScope, $ionicModal, $ionicSlideBoxDelegate) {
      $scope.allDetailOpt = {};
      $scope.allDetailOpt.slideIndex = 0;

        $scope.$on('$locationChangeStart', function (e, next, prev) {
        if ( next.split('#')[1] == '/tab/my' ) {
          console.log(e.defaultPrevented);
          e.defaultPrevented = true;
          //e.preventDefault();
        }
      });
      //隐藏二级菜单
      $rootScope.showOrDetail = true;

      //查看响应者信息
      $ionicModal.fromTemplateUrl('./templates/my/allMan-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.allManModal = modal;
      });
      $scope.openAllManModal = function() {
        $scope.allManModal.show();
      };
      $scope.closeAllManModal = function() {
        $scope.allManModal.hide();
      };

      //滑动窗口
      $scope.slideHasChanged = function (index) {
        $ionicSlideBoxDelegate.slide(index);
        $scope.allDetailOpt.slideIndex = $ionicSlideBoxDelegate.currentIndex();
      }

    }])
;
