
function articleClass() { 
   
   this.pubLang="";
   this.pubNum="";
   this.nbrArticle="";
   this.isAllowed="";
   this.message;
   this.articleContentTronque="";
   this.articleNum="";
   this.articleType="";
   this.pubType="";
   this.pubTitle="";
   this.articleTitle="";
   this.articleTitleRubrique="";
   this.articleSubtitle="";
   this.content="";
   this.articleContent="";
   this.nonDisseminationMessage="";
   this.scroll="";
   
   
  
   this.displayArticle = function(_pubNum, _pubType, _articleNum, _pubLang) {
      _POPUPTOOLBAR.doCloseInstantly();
   /*   if ((_pubNum == "") || (_pubNum == undefined)) {
         _pubNum=_BULLETIN.pub;
      }
      if ((_pubType == "") || (_pubType == undefined)) {
         _pubNum="1";
      }
       if ((_articleNum == "") || (_articleNum == undefined)) {
         _articleNum="1";
      }
      if ((_pubLang == "")  || (_pubLang == undefined)) {
         _pubLang=_BULLETIN.lang;
      }*/
      //alert("contectARTICLE");
      _CONTEXT="ARTICLE";
      
      //alert(_USER_ISCONNECTED);
      //if ((this.pub=='') || (this.type==_pubType) && (this.num==_articleNum) && (this.lang==_pubLang) && (_ACCOUNT.isConnected)) {
      if ((this.pub==_pubNum) && (this.pubType==_pubType) && (this.num==_articleNum) && (this.pubLang==_pubLang) && (_ACCOUNT.isConnected)) {
         this.doRefreshArticle();
      } else {
         _LANGAGE.langage=_pubLang;
         if (_pubType == "1") {
            //alert(_SEARCH_STRING);
            if ((_pubNum == _BULLETIN.data.numPub) && (_pubLang ==_BULLETIN.data.pubLang) && (_ACCOUNT.isConnected) && (_SEARCH_STRING == "")) {
               //alert("meme bulletin");
               this.nbrArticle = _BULLETIN.data.articles.length;
               this.isAllowed = _BULLETIN.data.isAllowed;
               this.message = _BULLETIN.data.message;
               this.pubType=_pubType;
               this.pubNum=_pubNum;
               this.articleNum=_articleNum;
               this.articleType=_BULLETIN.data.articles[_articleNum - 1].typeArticle;
               this.pubLang=_pubLang;
               this.pubTitle=_BULLETIN.data.pubTitle;
               this.articleTitleRubrique = _BULLETIN.data.articles[_articleNum - 1].titleRubrique;
               this.articleTitle=_BULLETIN.data.articles[_articleNum - 1].title;
               this.articleSubtitle=_BULLETIN.data.articles[_articleNum - 1].subTitle;
               
               this.content=_BULLETIN.data.articles[_articleNum - 1].content;
               
               //this.content = this.affichArticle();
               this.doRefreshArticle();
            } else {
               this.loadArticle(_pubNum, _pubType, _articleNum, _pubLang, true);
            }
         } else {
            if (_pubType == "2") {
               if ((_pubNum == _EDD.data.numPub) && (_pubLang ==_EDD.data.pubLang) && (_ACCOUNT.isConnected)) {
                  this.nbrArticle = _EDD.data.articles.length;
                  this.isAllowed = _EDD.data.isAllowed;
                  this.message = _EDD.data.message;
                  this.pubType=_pubType;
                  this.pubNum=_pubNum;
                  this.articleNum=_articleNum;
                  this.articleType=_EDD.data.articles[_articleNum - 1].typeArticle;
                  this.pubLang=_pubLang;
                  this.pubTitle=_EDD.data.pubTitle;
                  this.articleTitleRubrique = _EDD.data.articles[_articleNum - 1].titleRubrique;
                  this.articleTitle=_EDD.data.articles[_articleNum - 1].title;
                  this.articleSubtitle=_EDD.data.articles[_articleNum - 1].subTitle;
                  
                  this.content=_EDD.data.articles[_articleNum - 1].content;
                  
                  //this.content = this.affichArticle();
                  this.doRefreshArticle();
               } else {
                  this.loadArticle(_pubNum, _pubType, _articleNum, _pubLang, true);
               }
            } else {
               this.loadArticle(_pubNum, _pubType, _articleNum, _pubLang, true);
            }
         }
         
         //this.loadArticle(_pubNum, _pubType, _articleNum, _pubLang, true);
        
      }
   }
   this.doRefreshArticle = function() {
     
      $("#contentGeneral").css("background-image","url(./icones/black/article.png)");
      
      $("#contentGeneral").html(this.prepareArticle());
       /* $("#contentGeneral").linkify({
            tagName: 'a',
            target: '_blank',
            newLine: '\n',
            linkClass: null,
            linkAttributes: null
        });
       */
      displaySecondToolbar(_CONTEXT, this.pub, this.num, this.pubTitle);
      
      _MAINTOOLBAR_ITEMSELECTED=5;
      loadMainToolbar();
      loadMenuLangue();
      if (_IS_POPUP_ARTICLE) {
         var _contentPopupArticle = "<div style='padding:30px 50px 30px 50px'>";
         _contentPopupArticle += this.content;
         _contentPopupArticle += "</div>";
         $("#popupContainer").html(_contentPopupArticle);
      }
      if (_RECHERCHE_SHOWN) {
         showRechercheForm();
      }
       displayLateralToolbar("ARTICLE");
      $("body,html").animate({ scrollTop: 0 }, 'fast');
   }
   
  this.loadArticle=function(_pubNum, _pubType, _articleNum, _pubLang, doDisplay) {
     
     /* if ((this.pub==_pubNum) && (this.type==_pubType) && (this.num==_articleNum) && (this.lang==_pubLang) && (_ACCOUNT.isConnected)) {
         alert("idem");
          return;
       } else {
         alert("pas idem");
       }
     */
     var _retour = "";
      var me = this;
      var cookieValue=doGetCookie("AE_Auth");
      var _searchString = _SEARCH_STRING;
      //alert(_SEARCH_STRING);
      _LANGAGE.doTranslate(_pubLang);
     // alert(_pubLang);
      $.ajax({
         type:"get",
         dataType:"json",
         url:"./php/loadArticle.php",
         data: "pubNum=" + _pubNum + "&pubType=" + _pubType + "&articleNum=" + _articleNum + "&pubLang=" + _pubLang + "&cookieValue=" + cookieValue + "&searchString=" + _searchString,
         success: function(data){
            //_retour = data;
            //alert("retour:" + data.nbrArticle);
             if (_retour == " 0") {
               _ACCOUNT.isConnected = "0";
               
            }
            //var tabData = data.split("###");
            
          /* if (!_ACCOUNT.doCheckAuthentification(tabData[0])) {
               return false;
            }
          */
            //_CURRENT_PUB_NUM=tabData[1];
            //_CURRENT_PUB_NBR_ARTICLE=tabData[2];
            me.nbrArticle=data.nbrArticle;
            me.pubType=_pubType;
            me.pubNum=data.pubNum;
            me.articleNum=_articleNum;
            me.articleType=data.articles[0].typeArticle;
            me.pubLang=data.pubLang;
            me.pubTitle=data.pubTitle;
            me.isAllowed = data.isAllowed;
            me.message = data.message;
            me.articleTitleRubrique = data.articles[0].titleRubrique;
             me.articleTitle = data.articles[0].title;
            me.articleSubtitle = data.articles[0].subTitle;
            me.content=data.articles[0].content;
           //  alert(data.pubTitle);    
         },
         complete : function(resultat, statut){
            if (_ACCOUNT.isConnected == "1") {
               if (doDisplay) {
                  //alert("article");
                  me.doRefreshArticle();
                  //me.displayVars();
               } 
               
            } else {
            
               _ACCOUNT.doLogoff();
            }
         }
      });
     /* if (_retour == " 1") {
         _ACCOUNT.doLogoff();
      }
     */
      
      return true;
   }
   /*==================================================================
    fonctions article avec JSON
    ====================================================================*/
   this.displayArticleJson = function(_pubNum, _pubType, _articleNum, _pubLang) {
  
      _CONTEXT="ARTICLE";
      
     
   /*   if ((this.pub==_pubNum) && (this.type==_pubType) && (this.num==_articleNum) && (this.lang==_pubLang) && (_ACCOUNT.isConnected)) {
         this.doRefreshArticleJson();
       } else {
         _LANGAGE.langage=_pubLang;
         
         this.loadArticleJson(_pubNum, _pubType, _articleNum, _pubLang, true);
        
      }
   */
      this.loadArticleJson(_pubNum, _pubType, _articleNum, _pubLang, true);
   }
   
   this.doRefreshArticleJson = function() {
     
      $("#contentGeneral").css("background-image","url(./icones/black/article.png)");
      
      $("#contentGeneral").html("test");
       /* $("#contentGeneral").linkify({
            tagName: 'a',
            target: '_blank',
            newLine: '\n',
            linkClass: null,
            linkAttributes: null
        });
       */
      displaySecondToolbar(_CONTEXT, this.pub, this.num, this.pubTitle);
      
      _MAINTOOLBAR_ITEMSELECTED=5;
      loadMainToolbar();
      loadMenuLangue();
      if (_IS_POPUP_ARTICLE) {
         var _contentPopupArticle = "<div style='padding:30px 50px 30px 50px'>";
         _contentPopupArticle += this.prepareArticle();
         _contentPopupArticle += "</div>";
         $("#popupContainer").html(_contentPopupArticle);
      }
      if (_RECHERCHE_SHOWN) {
         showRechercheForm();
      }
       displayLateralToolbar("ARTICLE");
      $("body,html").animate({ scrollTop: 0 }, 'fast');
   }
   
   this.loadArticleJson=function(_pubNum, _pubType, _articleNum, _pubLang, doDisplay) {
     
     /* if ((this.pub==_pubNum) && (this.type==_pubType) && (this.num==_articleNum) && (this.lang==_pubLang) && (_ACCOUNT.isConnected)) {
         alert("idem");
          return;
       } else {
         alert("pas idem");
       }
     */
     var _retour = "";
      var me = this;
      var cookieValue=doGetCookie("AE_Auth");
      var _searchString = _SEARCH_STRING;
      
      _LANGAGE.doTranslate(_pubLang);
     // alert(_pubLang);
      $.ajax({
         type:"get",
         dataType:"json",
         url:"./php/loadArticleJson.php",
         data: "pubNum=" + _pubNum + "&pubType=" + _pubType + "&articleNum=" + _articleNum + "&pubLang=" + _pubLang + "&cookieValue=" + cookieValue + "&searchString=" + _searchString,
         success: function(data){
            _retour = data;
            //alert("retour:" + data);
             if (_retour == " 0") {
               _ACCOUNT.isConnected = "0";
               
            }

           // alert(data.pubTitle);
           // var tabData = data.split("###");
            
          /* if (!_ACCOUNT.doCheckAuthentification(tabData[0])) {
               return false;
            }
          */
            //_CURRENT_PUB_NUM=tabData[1];
            //_CURRENT_PUB_NBR_ARTICLE=tabData[2];
            me.nbrArticle=data.nbrArticles;
            me.pubType=_pubType;
            me.pubNum=data.pubNum;
            me.isAllowed=data.isAllowed;
            me.message = data.message;
           // me.articleContentTronque = data.articleContentTronque;
            me.articleNum=data.numArticle;
            me.lang=data.lang;
            me.title=data.pubTitle;
            me.articleTitle = data.articleTitle;
             me.articleSubtitle = data.articleSubtitle;
            me.articleContent= data.articleContent;
            me.nonDisseminationMessage=data.nonDisseminationMessage;
            me.content= data.articleContent;
                      
         },
         complete : function(resultat, statut) {
            if (_ACCOUNT.isConnected == "1") {
               if (doDisplay) {
                  //alert("article");
                  me.doRefreshArticleJson();
                  //me.displayVars();
               } 
               
            } else {
            
               _ACCOUNT.doLogoff();
            }
         }
      });
     /* if (_retour == " 1") {
         _ACCOUNT.doLogoff();
      }
     */
      
      return true;
   }

   this.prepareArticle = function() {
      var content="";
      var deuxpoint = "";
      
      if (this.pubType == "1") {
         if (this.isAllowed != "0") {
           content += "<div class='userMessage'>" + this.message + "</div>";
         }
         if (this.articleSubtitle != "") {
            content +=  "\n<div style='color:#000000;font-size:1.2em;font-family: \"Times New Roman\";margin-bottom:5px;'>";
            content +=  "\n<b>" + this.articleSubtitle + "</b>: ";
            content +=  "\n</div>";
         }
         if (this.articleTitle != "") {
            content +=  "<div style='color:#196735;line-height:1.1em;font-size:1.6em;font-family: \"Times New Roman\";margin:10px 0px 20px 0px;'>";
            content +=  "\n" + this.articleTitle;
            content +=  "\n</div>";
         }
      
         
         if (this.isAllowed != "0") {
          
            content +=  "\n<div class='texteDegrade'>";
    
            content +=  this.content;
            content += "<span class='spanDegrade'></span>";
            content +=  "\n</div>";
         } else {
            content +=  "<div style='color:#000000;font-size:1.1em;font-family: \"Times New Roman\";margin-bottom:5px;'>";
            content +=  "\n" + this.content;
            content +=  "\n</div>";
          
        }
      }
      if (this.pubType == "2") {
        
         if (this.isAllowed != "0") {
            content += "<div class='userMessage'>" + this.message + "</div>";
         }
         if ((this.articleSubtitle == "") || (this.articleTitle == "")) {
            deuxpoint="";
         } else {
            deuxpoint=": ";
         }
         if (this.articleType == "4") {
            content += "\n<div style='text-align:center;font-style:italic;font-size:1.3em;letter-spacing:3.0pt;border:1px solid #000000;margin:20px 80px 30px 80px;padding:15px 30px 15px 30px;'>" + this.articleTitleRubrique + "</div>";
            
         }
          //alert(this.pubTitle); 
         if ((this.articleType == "1") || (this.articleType == "4")) {
            content += "\n\n<div class='AEdisplay_eddTitreArticle'>";
            
            content += "\n<span  class='AEdisplay_eddSubtitleArticle'>"; 
            content += "\n<b>" + this.articleSubtitle + "</b>";
            
            if ((this.articleSubtitle != "") && (this.articleTitle != "")) {
                content += ": ";
            }
            content += "\n</span>";
            content += "\n<span class='AEdisplay_eddTitleArticle'>"; 
            content += "\n" + this.articleTitle;
            content += "\n</span>";
            content += "\n</div>";
         }
     
         if (this.isAllowed != "0") {
          
            content +=  "\n<div class='texteDegrade'>";
    
            content +=  this.content;
            content += "<span class='spanDegrade'></span>";
            content +=  "\n</div>";
         } else {
            content +=  "<div style='color:#000000;font-size:1.1em;font-family: \"Times New Roman\";margin-bottom:5px;'>";
            content +=  "\n" + this.content;
            content +=  "\n</div>";
          
         }
      }
     
      return content;
   }
   /*this.displayVars = function() {
      var _content ="";
      _content += "CONTEXT:" + _CONTEXT;
      _content += "<br>this.pub:" + this.pub;
      _content += "<br>this.type:" + this.type;
      _content += "<br>this.num:" + this.num;
      _content += "<br>this.lang:" + this.lang;
      _content += "<br>this.nbr:" + this.nbr;
      $("#sessionDisplay").html(_content);
   }
   */
   
}

