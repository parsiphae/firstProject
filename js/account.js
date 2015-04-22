
function accountClass() {
   this.isConnected = "0";
   this.connectionType = "0"; // 0=Login 1=IP 2=Webservice
   this.idProfile = "";
   this.isPrint = false;
   this.isCutAndPaste = false;
   this.cutAndPasteLines = 0;
   this.title="";
   this.ip="";
   this.dailyBeginDate = "";
   
   this.daily="";
   this.daily_beginDate="";
   this.daily_endDate="";
   this.daily_beginDateArchive="";
   this.daily_fr="";
   this.daily_en="";
   
   this.edd="";
   this.edd_beginDate="";
   this.edd_endDate="";
   this.edd_beginDateArchive="";
   this.edd_fr="";
   this.edd_en="";
   this.token="";
   
   this.doCheckAuthentification = function(dataAuth) {
      //alert(this.token);
      if ((dataAuth == "") || (dataAuth == null) || (dataAuth == "0")) {
         //alert ("empty");
          this.isConnected="0";
          this.doDisplayAuthForm();
          return false;
      }
     
      var _tabData=dataAuth.split("|");
      
      
      if (_tabData[0] == "0") {
       
          this.isConnected="0";
          
         this.doDisplayAuthForm();
       
         return false;
         
      } else {
         
         //alert("2:" + _tabData[0]);
         //alert("doCheckAuthentification true");
          this.isConnected="1";
          
         this.doInitUser(dataAuth);
         //alert("true...");
         //loadMainToolbar();
         //alert(doGetCookie("AE_Auth") + "\n" + _tabData[0]);
         //alert (_tabData[0]);
         //createCookie("AE_Auth",_tabData[0],10);
         
      }
    //  alert("true...");
      return true;
   
   }
    
   this.doInitUser = function(_userData) {
      //alert(_userData);
      var _tabCookie=_userData.split("|");
   //    alert("connected : " + _tabCookie[0]);
      this.connectionType = _tabCookie[1];
      this.isConnected = trim(_tabCookie[0]);
       
      /*if (_tabCookie[0] == "1") {
         this.isConnected = true;
      } else {
         this.isConnected = false;
        
      }
      */
       
      this.ip = _tabCookie[2];
      this.idProfile=_tabCookie[3];
      this.title=_tabCookie[4];
      if (_tabCookie[5] == "1") {
         //alert("print");
         this.isPrint = true;
      }
      if (_tabCookie[6] == "1") {
         //alert("print");
         this.isCutAndPaste = true;
      }
      this.cutAndPasteLines=_tabCookie[7];
      
      this.daily=_tabCookie[9];
      this.daily_beginDate=_tabCookie[10];
      this.daily_endDate=_tabCookie[11];
      this.daily_beginDateArchive=_tabCookie[12];
      this.daily_fr=_tabCookie[13];
      this.daily_en=_tabCookie[14];
      
      this.edd=_tabCookie[15];
      this.edd_beginDate=_tabCookie[16];
      this.edd_endDate=_tabCookie[17];
      this.edd_beginDateArchive=_tabCookie[18];
      this.edd_fr=_tabCookie[19];
      this.edd_en=_tabCookie[20];
      this.token=_tabCookie[21];
      //alert(_tabCookie[21]);
      if (_tabCookie[21] != "") {
        //createCookie("AE_Auth",_userData,10);
      }
      //alert(_tabCookie[9] + ":" + _tabCookie[10]);
   //   alert("connected2 : " + this.isConnected);
   //   this.displayAuthData(_userData);
   //   alert("connected3 : " + this.isConnected);
   }
   this.displayAuthData = function(_userData) {
      
      var _content= "";
   //   alert("connected4 : " + this.isConnected);
      if (this.isConnected == "1") {
          
         _content += "Connecté par ";
         if (this.connectionType == "0") {
            _content += "Login";
         }
         if (this.connectionType == "1") {
            _content += "IP";
         }
         if (this.connectionType == "2") {
            _content += "Webservice";
         }
         
      } else {
         _content += "Déconnecté";
      }
   }
   this.getClientInfo = function() {
       _POPUPTOOLBAR.doClose();
       displayLateralToolbar("ACCOUNT");
      //alert("getClientInfo");
      var content="";
      var randomnumber=Math.random();
      // var objTabParametre = document.getElementById("tabs_parametres");
      // if (objTabParametre == null) {
         //$("#AE_MainTabs").tabs("add","#tabs_parametres","Mes paramètres");
         //$("#tabs_parametres").css("display","block");
        
      //}
      // $('#AE_MainTabs').tabs('refresh');
      // $("#AE_MainTabs").tabs("select", "#tabs_lecture");
      content += "\n<div class='paramTitle paramTitleCoordonnee'>" + _LANGAGE.account_titleAccount +  "</div>";
      content += "\n<div>";
      content+="\n<span class='paramLabel'>" + _LANGAGE.account_abonne +  ": </span><span class='paramData'>" + this.title + "</span>";
      content += "\n</div>";
      
      content += "\n<div class='paramTitle paramTitleAbonnement'>" +  _LANGAGE.account_titleAbonnement+ "</div>";
      if (this.isDaily()) {
         content += "\n<div>";
         content+="\n<span class='paramLabel'>" + _LANGAGE.listeBulletin_bulletinName + ": </span>";
         content+="\n<span class='paramSubLabel'> " +  _LANGAGE.account_du + " </span><span class='paramData'>" + this.daily_beginDate + "</span>";
         content+="\n<span class='paramSubLabel'> " +  _LANGAGE.account_au + " </span><span class='paramData'>" + this.daily_endDate + "</span>";
         content += "\n</div>";
      }
      if (this.isEdd()) {
         content += "\n<div>";
         content+="\n<span class='paramLabel'>" + _LANGAGE.listeBulletin_eddName + ": </span>";
         content+="\n<span class='paramSubLabel'> " +  _LANGAGE.account_du + " </span><span class='paramData'>" + this.edd_beginDate + "</span>";
         content+="\n<span class='paramSubLabel'> " +  _LANGAGE.account_au + " </span><span class='paramData'>" + this.edd_endDate + "</span>";
         content += "\n</div>";
      }
      
     
      
      content += "\n<div class='paramTitle paramTitleNetwork'>" + _LANGAGE.account_titleNetwork + "</div>";
      content += "\n<div>";
      content+="\n<span class='paramLabel'>" + _LANGAGE.account_yourIp + ": </span><span class='paramData'>" + this.ip + "</span>";
      content += "\n</div>";
      
      
      /*content += "\n<div class='paramTitle paramTitleCoordonnee'>Coordonnées</div>";
      content+="\n<div class='paramData'>" + _USER_TITLE + "</div>";
      content+="\n<div class='paramData'>" + _USER_IP + "</div>";
      content += "\n</div>";
      */
      
      if (this.connectionType == "0") {
         
         content += "\n<div class='paramTitle paramTitleOnOff' >" + _LANGAGE.account_titleConnection + "</div>";
         content += "\n<div class='paramLabel'><span class='paramData paramDataLogoff' onClick=\"_ACCOUNT.doLogoff();\">" + _LANGAGE.account_meDeconnecter + "</span></div>";
         
         content += "\n<div class='paramTitle paramTitlePassword' >" + _LANGAGE.account_titlePassword + "</div>";
         content += "\n<div class='paramLabel'><span class='paramData paramDataLogoff' onClick=\"_ACCOUNT.doChangePasswordForm();\">" + _LANGAGE.account_changePassword + "</span></div>";
       
      }
      
      content += "\n<div id='formAccount' style='margin:20px 0px 0px 30px;'></div>";
      
      content+="<div style='height:300px'></div>";
      $("#contentGeneral").css("background-image","url(./php/icones/black/contact_card.png)");
      $("#contentGeneral").html(content);
      _MAINTOOLBAR_ITEMSELECTED=6;
      loadMainToolbar();
      $("#secondToolbar").html("");
     
   }
   this.doDisplayAuthForm = function() {
      //alert("doDisplayAuthForm");
      var _lastLogin = doGetCookie("AE_login");
      if ((_lastLogin == null) ||  (trim(_lastLogin) == "")) {
         _lastLogin = "";
      }
      var content="";
      content += "<div style='height:150px;width:250px;border:1px solid #CCCCCC;margin:30px auto auto auto;padding:20px;'>";
         content += "<div class='formSearchlabel'>" + _LANGAGE.account_loginLabelUser + "</div>";
         content += "\n<div style='display:block;'>";
            content += "\n<input id='authFormLogin' name='authFormLogin' style='width:240px;' class='formSearchInputfield' value='" + _lastLogin + "' type='text'>";
         content += "\n</div>";
          content += "<div class='formSearchlabel'>" + _LANGAGE.account_loginLabelPassword + "</div>";
         content += "\n<div style='display:block;'>";
         //content += "\n<input id='authFormPassword' type='password' name='authFormPassword' style='width:190px;' onkeydown=\"doEnter('authFormPassword');\" class='formSearchInputfield' value='' type='text'>";
         content += "\n<input id='authFormPassword' type='password' name='authFormPassword' style='width:240px;' class='formSearchInputfield' value='' type='text'>";
         content += "\n</div>";
         
         content += "<div style='clear:both;margin-top:20px;'>";
         content += "<div class='formLoginButton' onclick=\"_ACCOUNT.doConnection();\">";
         content += _LANGAGE.account_titleConnection;
         content += "</div>";
         content += "</div>";
         //content += "\n<div id='puceInfo' onclick=\"showPopupTheme();\"></div>";
        
      content += "</div>";
      content += "<div id='loginMessage' style='color:#ff0000;text-align:center;margin-top:10px;'></div>";
      $("#contentGeneral").css("background-image","url()");
      $("#contentGeneral").html(content);
      if (_lastLogin != "") {
         $("#authFormPassword").focus();
      } else {
         $("#authFormLogin").focus();
      }
      
      _MAINTOOLBAR_ITEMSELECTED=5;
      loadMainToolbar();
     
   }
   this.doInitConnection = function(_token) {
         //alert("doInitConnection:" + this.token);
          var me = this;
         var cookieValue=doGetCookie("AE_Auth");
        // alert("cookie:" + cookieValue);
         
         /*if (((cookieValue == "0") || (cookieValue == null) || (cookieValue == "")) && (_token == "")) {
            //alert ("cookie vide");
            this.doDisplayAuthForm();
           return;
         
         } else {
         */
            var _data = "cookieValue=" + cookieValue + "&token=" + _token;
            //alert(_data);
            $.ajax({
               type:"get",
               url:"./php/initConnection.php",
               data: _data,
               success: function(data){
                 // alert(data);
                  var tabData = data.split("|");
                  if ((tabData[0] == 1) && (data != "0")) {
                     me.doInitUser(data);
                     if (tabData[21] != "") {
                        createCookie("AE_Auth",data,3000); // PAS BON si on change l'url
                     }
                     /*----------------------------------------------------------------
                      Si l'utilisateur n'a pas cliqué sur une publication spécifique,
                      On lui propose de préférence une publication à laquelle il est abonné.
                      ----------------------------------------------------------------*/
                     if (pubTypeUrl == "")  { 
                        _ACCOUNT.verifPubType();
                     }
                     
                     //displayInitVars();
                    // alert(_CONTEXT);
                     if ((_CONTEXT == "ARTICLE") && ((pubTypeUrl == '') || (pubTypeUrl == '1'))) {
                        _ARTICLE.loadArticle(numPubUrl, pubTypeUrl, numArticleUrl, _LANGAGE.langage, true);
                        //_BULLETIN.loadBulletin(numPubUrl,'1', _LANGAGE.langage, false);
                     }
                     if ((_CONTEXT == "ARTICLE") && (pubTypeUrl == '2')) {
                        _ARTICLE.loadArticle(numPubUrl, pubTypeUrl, numArticleUrl, _LANGAGE.langage, true);
                        //_EDD.loadEdd(numPubUrl, "2", _LANGAGE.langage, false);
                     }
                     if (_CONTEXT == "BULLETIN") {
                        _BULLETIN.loadBulletin(numPubUrl, '1', _LANGAGE.langage, true);
                     }
                     if (_CONTEXT == "EDD") {
                        _EDD.loadEdd(numPubUrl, "2", _LANGAGE.langage, true);
                     } 
                  } else {
                     //alert("pas connecté");
                     me.doLogoff();
                   
                  }
               },
               complete: function(data){
               }
                
           
            });
         //}
   }
   
this.doConnection = function() {
         var me = this;
         var _login = $('#authFormLogin').val();
         
         var _password = $('#authFormPassword').val();
         var _md5password = getMd5(_password);
         
         /*-------------------------------------------------
          Stocker le login dans un cookie séparé
          --------------------------------------------------*/
         createCookie("AE_login",_login, 43200); // 30 jours
         //alert(_md5password);
        /* var numPubUrl = "";
         var numArticleUrl = "";
         var langageUrl = "";
        */
         $.ajax({
         type:"get",
         url:"./php/connection.php",
         data: "authFormLogin=" + _login + "&authFormPassword=" + _md5password,
         success: function(data){
           // alert("connection: " + data);
            var tabData = data.split("|");
            if (tabData[0] == 1) {
               createCookie("AE_Auth",data,3000);
               _ACCOUNT.doInitUser(data);
              // alert(_CONTEXT);
               /*----------------------------------------------------------------
               Si l'utilisateur n'a pas cliqué sur une publication spécifique,
               On lui propose de préférence une publication à laquelle il est abonné.
               ----------------------------------------------------------------*/
               //alert(_CONTEXT + ":" + pubTypeUrl);
               if (pubTypeUrl == "")  {
                  
                  _ACCOUNT.verifPubType();
               }
                
               //alert(_CURRENT_ARTICLE_PUB+"-"+ _CURRENT_ARTICLE_NUM+"-"+ _CURRENT_ARTICLE_LANG);
              
                //displayInitVars();
               //alert(_CONTEXT);
                  if ((_CONTEXT == "ARTICLE") && ((pubTypeUrl == '') || (pubTypeUrl == '1'))) {
                     _ARTICLE.loadArticle(numPubUrl, pubTypeUrl, numArticleUrl, _LANGAGE.langage, true);
                     //_BULLETIN.loadBulletin(numPubUrl,'1', _LANGAGE.langage, false);
                  }
                  if ((_CONTEXT == "ARTICLE") && (pubTypeUrl == '2')) {
                     _ARTICLE.loadArticle(numPubUrl, pubTypeUrl, numArticleUrl, _LANGAGE.langage, true);
                     //_EDD.loadEdd(numPubUrl, "2", _LANGAGE.langage, false);
                  }
                  if (_CONTEXT == "BULLETIN") {
                    // alert(numPubUrl);
                     _BULLETIN.loadBulletin(numPubUrl, '1', _LANGAGE.langage, true);
                  }
                  if (_CONTEXT == "EDD") {
                     _EDD.loadEdd(numPubUrl, "2", _LANGAGE.langage, true);
                  } 
            } else {
               $("#loginMessage").html(_LANGAGE.account_loginError);
               $("#authFormPassword").val("");
               $("#authFormLogin").focus();
               
            }
           
         }
        
      });
  
   }
   this.verifPubType = function() {
     // _CONTEXT="EDD";
    //  pubTypeUrl='2';
     // alert(this.daily);
      if (_CONTEXT != "ARTICLE")  {
         if ((this.betweenDates(this.daily_beginDate, this.daily_endDate)) && (this.daily == "daily") && ((this.daily_fr == "1") || (this.daily_en == "1"))) {
            _CONTEXT="BULLETIN";
            pubTypeUrl='1';
           // alert(_LANGAGE.langage + " - " + this.daily_fr + ":" + this.daily_en);
            if (_LANGAGE.langage == "fr") {
               
               if (this.daily_fr != "1") {
                  _LANGAGE.langage="en";
               }
            } else {
               if (this.daily_en != "1") {
                 _LANGAGE.langage="fr";
               }
            }
            
         } else {
            //alert(_LANGAGE.langage + " - " + this.daily_fr + ":" + this.daily_en);
            if ((this.betweenDates(this.edd_beginDate, this.edd_endDate)) && (this.edd == "edd") && ((this.edd_fr == "1") || (this.edd_en == "1"))) {
               _CONTEXT="EDD";
               pubTypeUrl='2';
               if (_LANGAGE.langage == "fr") {
                  //alert(this.edd_fr);
                  if (this.edd_fr != "1") {
                     _LANGAGE.langage="en";
                  }
               } else {
                   if (this.edd_en != "1") {
                     _LANGAGE.langage="fr";
                  }
               }
            }
         }
         
         
         /*---------------------------------------------------------------
          Si on a pas trouvé un abonnement valide, On affiche le bulletin
          (pubTypeUrl == vide)
          ---------------------------------------------------------------*/
         if (pubTypeUrl == '') {
            _CONTEXT="BULLETIN";
            pubTypeUrl='1';
         }
         
        
      }
   }
   
   this.betweenDates = function(beginDate, endDate) {

       var _todayDate = new Date(); //Today Date
       
       var reggie = "/(\d{2})-(\d{2})-(\d{4})";
       var _beginDateArray = beginDate.split("-");
       //var _beginDateArray = reggie.exec(beginDate);
       var _beginDate = new Date((_beginDateArray[2]), (_beginDateArray[1])-1, (_beginDateArray[0])); // 01-01-2014
       
      // var _endDateArray = reggie.exec(endDate);
       var _endDateArray = endDate.split("-");
       var _endDate =  new Date((_endDateArray[2]), (_endDateArray[1])-1, (_endDateArray[0])); // 01-01-2014
       
     
      

       if ((_todayDate >= _beginDate) && (_todayDate <= _endDate)) {

            //alert("Today Date is between:" + _beginDate + " - " + _todayDate + " - " +_endDate);
            return true;

        } else {
            //alert("Today Date is NOT between:" + _beginDate + " - " + _todayDate + " - " +_endDate);
            return false;
        }
        return false;

    }
   this.doLogoff = function() {
       _POPUPTOOLBAR.doClose();
      //alert("doLogoff");
      createCookie("AE_Auth","",-1);
    //  $("#AE_MainTabs").tabs("select", "#tabs_lecture");
    //  $("#AE_MainTabs").tabs("remove", "#tabs_parametres");
      this.isConnected = "0";
      this.connectionType = "0"; // 0=Login 1=IP 2=Webservice
      this.idProfile = "";
      this.isPrint = false;
      this.isCutAndPaste = false;
      this.cutAndPasteLines = 0;
      this.title="";
      this.ip="";
      this.dailyBeginDate = "";
      
      this.daily="";
      this.daily_beginDate="";
      this.daily_endDate="";
      this.daily_beginDateArchive="";
      this.daily_fr="";
      this.daily_en="";
      
      this.edd="";
      this.edd_beginDate="";
      this.edd_endDate="";
      this.edd_beginDateArchive="";
      this.edd_fr="";
      this.edd_en="";
      this.token="";
      $("#secondToolbar").html("");
      //_ARTICLE.displayArticle(0,'0',0,'fr');
      this.doDisplayAuthForm();
      $("#sessionDisplay").html("");
       $("#lateralToolbar").html("");
      //lateralToolbar
      //_CONTEXT = "BULLETIN";
      //alert("test");
     // location.reload();
    // window.location="http://http://www.agenceeurope.info";
   }
   this.isEdd = function() {
      
      var _isEdd = true;
      
      var _now = $.datepicker.formatDate('yy-mm-dd', new Date());
      
      //_now.format("yyyy-mm-dd");
      
      var _currentDate = _now;


      if ((this.edd_fr != "1") && (this.edd_en != "1")) {
         _isEdd=false;
      }
      if (this.edd != "edd") {
         _isEdd=false;
      }
     /* if (this.edd_beginDate > _currentDate) {
         _isEdd=false;
      }
      if (this.edd_endDate < _currentDate) {
         _isEdd=false;
      }*/
      // alert(_now + " isEdd:" + _isEdd);
      return _isEdd;
   }
  
   this.isDaily = function() {
       var _isDaily = true;
      
      var _now = $.datepicker.formatDate('yy-mm-dd', new Date());
      
      //_now.format("yyyy-mm-dd");
      
      var _currentDate = _now;


      if ((this.daily_fr != "1") && (this.daily_en != "1")) {
         _isDaily=false;
      }
      if (this.daily != "daily") {
         _isDaily=false;
      }
      /*if (this.daily_beginDate > _currentDate) {
         _isDaily=false;
      }
      if (this.daily_endDate < _currentDate) {
         _isDaily=false;
      }*/
      // alert(_now + " isEdd:" + _isEdd);
      return _isDaily; //_isDaily;
      
   }
   
   this.doChangePasswordForm= function() {
      var content = "";
      content += "<div style='clear:both;'>" + _LANGAGE.account_labelPassword1 + "</div>";
      content += "<div style='clear:both;'>";
         content += "<div width='450px' class='inputFieldTd' style='float:left;'>";
         content += "<input id='newPassword1' name='newPassword1' style='width:200px;' class='inputfieldLeft' value='' onblur=\"_ACCOUNT.testPassword1();\" type='password'> </div>";
         content += "<div id='newPassword1Score' style='float:left;width:200px;margin:5px 0px 0px 10px;'></div>";
      content += "</div>";
      
      content += "<div style='clear:both;'>" + _LANGAGE.account_labelPassword2 + "</div>";
      content += "<div style='clear:both;'>";
         content += "<div width='450px' class='inputFieldTd' style='float:left;'>";
         content += "<input id='newPassword2' name='newPassword1' style='width:200px;' class='inputfieldLeft' value='' onblur=\"_ACCOUNT.testPassword2();\" type='password'> </div>";
         content += "</div>";
         content += "<div id='newPassword2Score' style='float:left;width:200px;margin:5px 0px 0px 10px;'></div>";
      content += "</div>";
      
      content += "<div style='clear:both;margin-top:50px;'>";
         content += "<div class='formButton' onclick=\"_ACCOUNT.doSavePassword();\">";
         content += _LANGAGE.account_buttonPassword;
         content += "</div>";
      content += "</div>";
      
      $("#formAccount").html(content);
   }
   
   this.testPassword1= function() {
      var _password1 = $("#newPassword1").val();
      if ((_password1.length < 6) || (_password1.length > 12)) {
         showError("Password", _LANGAGE.account_message0);
         $("#newPassword1").focus();
         return;
      }
     var _passwordScore = CheckPassword(_password1);
     $("#newPassword1Score").html(_passwordScore);   
   }
   
   this.testPassword2= function() {
     var _passwordScore = CheckPassword($("#newPassword2").val());
     $("#newPassword2Score").html(_passwordScore); 
   }
   
   this.doSavePassword= function() {
      var _password1 = trim($("#newPassword1").val());
      var _password2 = trim($("#newPassword2").val());
      var _md5password = "";
      if ((_password1 =="") || (_password1 == null) || (_password2 =="") || (_password2 == null)) {
         showError("Password", _LANGAGE.account_message1);
         return;
      }
      
      if (_password1 != _password2) {
         showError("Password", _LANGAGE.account_message2);
         return;
      }
      var cookieValue=doGetCookie("AE_Auth");
      _md5password=getMd5(_password1);
      $.ajax({
           type:"get",
           url:"./php/savePassword.php",
           data: "newPassword=" + _md5password +  "&cookieValue=" + cookieValue,
           success: function(data){
               //alert(data);
               var tabData = data.split("###");
               if (!_ACCOUNT.doCheckAuthentification(tabData[0])) {
                    showError("Password", _LANGAGE.account_message3);
                  return false;
               }
                
               var _dialogContent=_LANGAGE.account_message4;
               var _content = "<table style='background:#FFFFFF;font-size:14px;'><tr><td style='width:40px;background:#FFFFFF;'><img src='./icones/handpro_32x32.png'/></td>";
               _content += "<td style='background:#FFFFFF;'>" + _dialogContent + "</td></tr></table>";
               $("#error").html(_content);
               $( "#error" ).dialog({ 
                  width: 300, 
                  height:'auto',
                  position: 'center',
                  modal: true,
                  title: "Password",
                  resizable: false,
                  
                  hide: 'fadeOut',
                  show: 'fadeIn',
                  autoOpen: false,
                  open: function() {
                    $(".ui-dialog").css("box-shadow","#999999 3px 3px 3px");
                  },
                  buttons: { "Fermer": {
                        text: _LANGAGE.popupFermer, 
                        click: function () {
                                $(this).dialog("close");
                                _ACCOUNT.doLogoff();
                        }
                     }
                  }
               });
               $( "#error" ).dialog("open");
              
               return true;
           }
         
        });
     
      
   }
}

function showError(_title, _message) {
		
		
	
   var _content = "<table style='background:#FFFFFF;font-size:14px;'><tr><td style='width:40px;background:#FFFFFF;'><img src='./icones/attention_32x32.png'/></td><td style='background:#FFFFFF;'>" + _message + "</td></tr></table>";
   
   var elementPopup=document.getElementById("error");
   elementPopup.innerHTML=_content;
		
   $( "#error" ).dialog({ 
         width: 300, 
         height:'auto',
         position: 'center',
         modal: true,
         title: _title,
         resizable: false,
         
         hide: 'fadeOut',
         show: 'fadeIn',
         autoOpen: false,
         open: function() {
           $(".ui-dialog").css("box-shadow","#999999 3px 3px 3px");
         },
         buttons: { "Fermer": {
               text: _LANGAGE.popupFermer, 
               click: function () {
                       $(this).dialog("close");
                       //_ACCOUNT.doLogoff();
               }
            }
         }
      });
      $( "#error" ).dialog("open");
   }


 
function CheckPassword(password)
{
   var strength = new Array();
   if (_LANGAGE.langage == "fr") {
      strength[0] = "Vide";
      strength[1] = "Très faible";
      strength[2] = "Falble";
      strength[3] = "Moyenne";
      strength[4] = "Solide";
      strength[5] = "Très solide";
   } else {
      strength[0] = "Blank";
      strength[1] = "Very Weak";
      strength[2] = "Weak";
      strength[3] = "Medium";
      strength[4] = "Strong";
      strength[5] = "Very Strong";
   }

	var score = 1;

	if (password.length < 1)
		return strength[0];

	if (password.length < 4)
		return strength[1];

	if (password.length >= 8)
		score++;
	if (password.length >= 10)
		score++;
	if (password.match(/\d+/))
		score++;
	if (password.match(/[a-z]/) &&
		password.match(/[A-Z]/))
		score++;
	if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,£,(,)]/))
		score++;

	return strength[score];
}

function trim (myString)
{
   return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
}

function getMd5(_str) {
   return CryptoJS.MD5(_str).toString();
}
		