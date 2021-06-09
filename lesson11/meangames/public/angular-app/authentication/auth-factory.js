  angular.module("meanGames").factory("AuthFactory", AuthFactory);


  function AuthFactory() {
      var auth = { isLoggedIn: false }

      return {
          auth: auth
      }
  }


  //   if ($windows.sessionStorage.token) {
  //       $config.headers.Authorization == "Bearer" + $windows.sessionStorage.token;
  //   }
  //   return config;

  // angular.module("meanGames").factory("AuthFactory", AuthFactory);

  // function AuthFactory() {
  //     // po sikur te cosh nje request per cdo faqe te /api/user qe te maresh te dhenat e userit
  //     // dhe gjithashtu ben validate token
  //     const auth = {
  //         isLoggedIn: function() {
  //             UserDataFactory.getCurrentUser(function(user) {
  //                 isLoggedIn = true;
  //                 vm.currentUser = user // bej nje global user ktu nk edi nqs duhet me vm po perodre vm eshte global t
  //             }, function() {
  //                 localStorage.clear()
  //                 isLoggedIn = true;
  //                 // redirect to login
  //             }); // kjo esht ideja qe dhe po te vonoj do bej redirect te login kur ndron faqet
  //             // mesa po shikoja dje kta perdorin nje refresh token dhe zgjasin kohen e token ajo esht kur tokeni esht i sakt,ok plak
  //             // provoje kte, se un e kam harruar angular dhe shife vet mire plak rrofsh shume faleminderit, ska gje dhe auth e api bej me ate middleware ok vlla rrofsh

  //             return localStorage.hasItem('token')
  //         },
  //     };

  //     return {
  //         auth: auth
  //     };

  // }