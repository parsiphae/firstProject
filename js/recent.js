/*=================================================
 * BULLETIN
 * ==================================================*/
function recentClass() {
    this.recentBulletin = "";
    this.recentEdd = "";
   
    
    this.loadRecent = function() {
        var me = this;
        var cookieValue=doGetCookie("AE_Auth");
         _LANGAGE.doTranslate(_pubLang);
         var _pubLang="fr";
         var _data = "pubLang=" + _pubLang + "&cookieValue=" + cookieValue;
        //alert(_data);
        $.ajax({
           type:"get",
           dataType:"json",
           url:"./php/loadRecentBulletin.php",
           data: _data,
           success: function(data){
            //alert(data);
            me.recentBulletin = data;
           // alert(me.recentBulletin.pub[0].bulletinTitle);
            },
            complete : function(resultat, statut){
                
            }
        });
    }
   
    this.displayRecentBulletin = function() {
      
        var _content = "";
        var _pubLang = _LANGAGE.langage;
        _CONTEXT="BULLETIN";
        _MAINTOOLBAR_ITEMSELECTED = 11;
        for (i=0; i < this.recentBulletin.pub.length; i++) {
            //alert(this.recentBulletin.pub[i].bulletinTitle);
            //_content += this.recentBulletin.pub[i].bulletinTitle + "<br>";
            
            _content +="\n\n<div id='listeTitreBulletin" + this.recentBulletin.pub[i].bulletinTitle + "' class='listeTitreBulletin' onClick=\"_BULLETIN.displayBulletin('" + this.recentBulletin.pub[i].numBulletin + "','1','" + _pubLang + "');\">";
            //$content .= "\n<div style ='font-size:0.85em;letter-spacing: 1px;'>";
            _content += this.recentBulletin.pub[i].bulletinTitle;
            //$content .= "\n</div>";
            _content += "\n</div>";
        }
        $("#contentGeneral").html(_content);
        loadMainToolbar();
        $("#secondToolbar").html("");
        if (_RECHERCHE_SHOWN) {
           showRechercheForm();
        }
    }
     this.displaySommaire = function(numBulletin, _pubType, _pubLang) {
       //alert("displayCurrentSommaire");
       // _CONTEXT="SOMMAIRE";
        this.isSommaire=true;
        _CONTEXT="BULLETIN";
        if ((this.num==numBulletin)  && (this.type==_pubType) && (this.lang==_pubLang)  && (_ACCOUNT.isConnected)) {
            //alert("doRefreshSommaire1");
           this.doRefreshSommaire();
            //alert("doRefreshSommaire2");
           
        } else {
            _LANGAGE.langage=_pubLang;
             //alert("loadBulletin1");
           this.loadBulletin(numBulletin,_pubType, _pubLang, true);
             //alert("loadBulletin2");
          // this.loadCurrentSommaire(numBulletin, _pubType, _pubLang, true);
               // alert("loadCurrentSommaire2");
        }
        
    }
    this.doRefreshBulletin = function() {
        this.isSommaire=false;
        _CONTEXT="BULLETIN";
        $("#contentGeneral").css("background-image","url(./icones/black/text_16x16.png)");
        $("#contentGeneral").html(this.doPrepareBulletin());
        
        $("#tabs_lateralSommaire").html(this.doPrepareSommaire());
       
       /* $("#contentGeneral").linkify({
            tagName: 'a',
            target: '_blank',
            newLine: '\n',
            linkClass: null,
            linkAttributes: null
        });
       */
        _CURRENT_TYPE_PUB="1";
        
        
        if (this.type == "1") {
            _MAINTOOLBAR_ITEMSELECTED=4;
        }
        
        loadMainToolbar();
        this.displaySecondToolbar();
        loadMenuLangue();
         $("#contentSommaire").html(_BULLETIN.sommaire);
         var test1 = parseInt($(window).height()) - 220;
        $("#contentSommaire").height(test1);
        
        //this.showSommaire();
        
        if (_RECHERCHE_SHOWN) {
           showRechercheForm();
        }
        displayLateralToolbar("BULLETIN");
        
        /* Afficher le sommaire dans le panel latéral
          -------------------------------------------*/
        //showPopupSommaire();
        $("body,html").animate({ scrollTop: 0 }, 'fast');
    }
    
    this.doRefreshSommaire = function() {
        this.isSommaire=true;
        _CONTEXT="BULLETIN";
        var _content= this.doPrepareSommaire();//sommaire;
        $("#contentGeneral").css("background-image","url(./icones/black/list_bullet.png)");
        $("#contentGeneral").html(_content);
        this.displaySecondToolbar();
       // loadMenuLangue();
        //$("#secondToolbar").html(_CURRENT_SOMMAIRE_TITLE);
        //$("#secondToolbar").html(_CURRENT_SOMMAIRE_TITLE);      
        $("html, body").animate({scrollTop: "0px"}, 'fast');
        // $("a[href='#tabs_bulletin']").text("<img class='ui-icon ui-icon-note'/>Bulletin N° " + numBulletin);
        // $("a[href='#tabs_bulletin']").html("<img class='ui-icon ui-icon-note'/>Bulletin N° " + _BULLETIN.num);
        
        _MAINTOOLBAR_ITEMSELECTED=3;
        
        //changeMainToolbarButton(3, true);
        loadMainToolbar();
         loadMenuLangue();
        
        //$("#secondToolbar").html(_BULLETIN.title);
        if (_RECHERCHE_SHOWN) {
           showRechercheForm();
        }
        displayLateralToolbar("BULLETIN");
        $("body,html").animate({ scrollTop: 0 }, 'fast');
    }
    this.doPrepareSommaire = function() {
         
        /*----------------------------------------------
         SOMMAIRE
         ----------------------------------------------*/
        var _oldNumRubrique="";
        var _AEdisplay_sommaireTitreRubrique = "";
        var _AEdisplay_sommaireTitreArticle = "";
        var _AEdisplay_sommaireSubTitle = "";
        
        if (this.data.isAllowed == "0") {
            _AEdisplay_sommaireTitreRubrique = "AEdisplay_sommaireTitreRubrique";
            _AEdisplay_sommaireTitreArticle = "AEdisplay_sommaireTitreArticle";
            _AEdisplay_sommaireSubTitle = "AEdisplay_sommaireSubTitle";
            
        } else {
            _AEdisplay_sommaireTitreRubrique = "AEdisplay_sommaireTitreRubriqueForbidden";
            _AEdisplay_sommaireTitreArticle = "AEdisplay_sommaireTitreArticleForbidden";
            _AEdisplay_sommaireSubTitle = "AEdisplay_sommaireSubTitleForbidden";
            
        }
        this.sommaire = "\n<div class='AEdisplay_BulletinTitle'>" + this.data.pubTitle + "</div>";
        var _numArticle = 0;
        for (i=0; i < this.data.articles.length; i++) {
            _numArticle = i + 1;
            if (_oldNumRubrique != this.data.articles[i].numRubrique) {
                this.sommaire += "<div class='" + _AEdisplay_sommaireTitreRubrique + "'>" + this.data.articles[i].titleRubrique + "</div>";
                _oldNumRubrique=this.data.articles[i].numRubrique;
            }
            this.sommaire += "\n\n<div class='" + _AEdisplay_sommaireTitreArticle + "' onClick=\"_ARTICLE.displayArticle('" + this.data.numPub + "','1','" + _numArticle + "','" + this.data.pubLang + "');\">";
          
           // this.sommaire += "\n\n<div class='" + _AEdisplay_sommaireTitreArticle + "'>";
            this.sommaire += "\n<span  class='AEdisplay_sommaireSubTitle'>"; 
            this.sommaire += "\n<b>" + this.data.articles[i].subTitle + "</b>";
            if (this.data.articles[i].title != "") {
                this.sommaire += ": ";
            }
            this.sommaire += "\n</span>";
            this.sommaire += "\n<span class='AEdisplay_sommaireTitle'>"; 
            this.sommaire += "\n" + this.data.articles[i].title;
            this.sommaire += "\n</span>";
            this.sommaire += "\n</div>";
            
            //alert(data.articles[i].content);
        }
        return this.sommaire;
    }
    this.doPrepareBulletin = function() {
        this.content = "\n<div class='AEdisplay_BulletinTitle'>" + this.data.pubTitle + "</div>";
        if (this.data.isAllowed != "0") {
            this.content += "<div class='userMessage'>" + this.data.message + "</div>";
            this.content += "<div class='AEdisplay_bulletinTitreRubrique'>" + this.data.articles[0].titleRubrique + "</div>";
            this.content += "\n\n<div class='AEdisplay_bulletinTitreArticle'>";
            this.content += "\n<span  class='AEdisplay_subtitleArticle'>"; 
            this.content += "\n<b>" + this.data.articles[0].subTitle + "</b>";
            if (this.data.articles[0].title != "") {
                this.content += ": ";
            }
            this.content += "\n</span>";
            this.content += "\n<span class='AEdisplay_titleArticle'>"; 
            this.content += "\n" + this.data.articles[0].title;
            this.content += "\n</span>";
            this.content += "\n</div>";
            
            this.content +=  "\n<div class='texteDegrade'>";
            this.content +=  this.data.articles[0].content;
            this.content += "<span class='spanDegrade'></span>";
            this.content +=  "\n</div>";
            //this.content += "<div class='AEdisplay_content'>" + this.data.articles[0].content + "</div>";
            return this.content;
        }
        var _oldNumRubrique="";
        for (i=0; i < this.data.articles.length; i++) {
            if (_oldNumRubrique != this.data.articles[i].numRubrique) {
                this.content += "<div class='AEdisplay_bulletinTitreRubrique'>" + this.data.articles[i].titleRubrique + "</div>";
                _oldNumRubrique=this.data.articles[i].numRubrique;
            }
            this.content += "\n\n<div class='AEdisplay_bulletinTitreArticle'>";
            this.content += "\n<span  class='AEdisplay_subtitleArticle'>"; 
            this.content += "\n<b>" + this.data.articles[i].subTitle + "</b>";
            if (this.data.articles[i].title != "") {
                this.content += ": ";
            }
            this.content += "\n</span>";
            this.content += "\n<span class='AEdisplay_titleArticle'>"; 
            this.content += "\n" + this.data.articles[i].title;
            this.content += "\n</span>";
            this.content += "\n</div>";
            
            this.content += "<div class='AEdisplay_content'>" + this.data.articles[i].content + "</div>";
            //this.content += this.getNonDisseminationMessage();
            //alert(data.articles[i].content);
        }
        return this.content;
    }
    this.loadBulletin = function(_pubNum, _pubType, _pubLang, doDisplay) {
        
       // alert(_ACCOUNT.isConnected);
     
        /*if ((this.num==_pubNum) && (this.type==_pubType) && (this.lang==_pubLang) && (_ACCOUNT.isConnected)) {
           return;
        }
        */
       // alert("bulletin2");
        var me = this;
        var meArticle = _ARTICLE;
        var _searchString = _SEARCH_STRING;
        var cookieValue=doGetCookie("AE_Auth");
         _LANGAGE.doTranslate(_pubLang);
         var _data = "pubNum=" + _pubNum + "&pubType=" + _pubType + "&pubLang=" + _pubLang + "&cookieValue=" + cookieValue + "&searchString=" + _searchString;
        //alert(_data);
        $.ajax({
           type:"get",
           dataType:"json",
           url:"./php/loadBulletin2.php",
           data: _data,
           success: function(data){
             // alert(data);
             me.data = data;
             
              me.num=me.data.numPub;
              //_BULLETIN.num=tabData[1];
              //alert(me.num);
              me.type=_pubType;
              me.lang=data.pubLang;
              me.title=data.pubTitle;
              //me.content="display content";//tabData[4];
              //me.sommaire="display sommaire";//tabData[5];
              
             // alert("SOMMAIRE : " + me.sommaire);
              
              var content="display content";//tabData[3];
              _NUMRESULT=me.data.numPub;
               //return true;
            },
            complete : function(resultat, statut){
                if (_ACCOUNT.isConnected == "1") {
                    if (doDisplay) {
                        //  alert(me.num);
                        _ARTICLE.loadArticle(me.num, "1", "1", me.lang, false);
                        _ARTICLE.pubNum = me.num;
                        _ARTICLE.articleNum ="1";
                        _ARTICLE.pubType = "1";
                        _ARTICLE.pubLang = me.lang;
                        _ARTICLE.articleNbr = me.nbr;
                       
                        me.addStackHistory(me.num);
                        if (!me.isSommaire) {
                            
                            me.doRefreshBulletin();
                        } else {
                            me.doRefreshSommaire();
                        }
                        // }
                        /*if (me.isSommaire) {
                            _BULLETIN.addStackHistory(me.num);
                            me.doRefreshSommaire();
                        }
                        */
                    }
                }
            }
        });
    }
    this.displaySecondToolbar = function() { 
      
        var _content="";
        if (!_ACCOUNT.isConnected) {
           //alert("pas connecté");
           $("#secondToolbar").html("");
           return;
        }
        _content="<div id='secondToolbar_pubTitle'>";
        _content+=this.title;
        _content+="</div>";
        
        var _class = "";
        if (this.stackHistory.length > 0) {
         _content+="<div id='secondToolbar_pileBulletinText'>" + _LANGAGE.secondToolbar_vuRecemment + ":</div>";
        }
        for (i=0;i < this.stackHistory.length;i++) {
            _class = "";
            if (this.stackHistory[i] == this.num) {
              _class=" class='pileBulletinTextCurrent'";
            } else {
              _class=" class='pileBulletinTextLink'";
            }
           _content+="<div id='secondToolbar_pileBulletinNum'" + _class + " onclick=\"_BULLETIN.displayBulletin('" + this.stackHistory[i] + "','1','" + _LANGAGE.langage + "');\">" + this.stackHistory[i] + "</div>";
           _content+="</div>";
        }
        $("#secondToolbar").html(_content);
       
    }
     this.addStackHistory = function(_numPub) {
       //alert("bulletin:" + this.stackHistory.length);
        var _pile="";
        var _max = 10;
        /* Si déja dans la pile, ne pas l'ajouter
         * ---------------------------------------*/
        for (i=0;i < this.stackHistory.length;i++) {
             if (_numPub == this.stackHistory[i]) {
                 return;
             }
        }
        /* Faire remonter la pile si le max est atteint
         * ---------------------------------------*/
        if (this.stackHistory.length >= _max) {
           for (i=0;i<_max;i++) {
             // if (i < _PILE_PUB.length) {
                 this.stackHistory[i]=this.stackHistory[i+1];
              //}
           }
           this.stackHistory[_max - 1]=_numPub;
        } else {
           this.stackHistory[this.stackHistory.length]=_numPub;
        }
    }
    
    this.displayLateralToolbar = function(_contexteOnglet) {
      //alert("displayLateralToolbar:  " + _BULLETIN.num + "-" + _SOMMAIRE.num);
       //alert(_contexteOnglet + _USER_ISPRINT);
       var _classLangage = "";
       var _otherLangage = "en";
       var _bulletinButtonTitle=_LANGAGE.lateralToolbar_lirePubFr;
       var _sommaireButtonTitle=_LANGAGE.lateralToolbar_lireSummaryFr;
          
       if (this.lang == "fr") {
          _classLangage = "toolbarButtonLangageEn";
          _otherLangage="en";
          _bulletinButtonTitle=_LANGAGE.lateralToolbar_lirePubEn;
          _sommaireButtonTitle=_LANGAGE.lateralToolbar_lireSummaryEn;
       } else {
          _classLangage = "toolbarButtonLangageFr";
          _otherLangage="fr";
          _bulletinButtonTitle=_LANGAGE.lateralToolbar_lirePubFr;
          _sommaireButtonTitle=_LANGAGE.lateralToolbar_lireSummaryFr;
       }
       
       var _toolbar = "";

       _toolbar+="\n<div  style='float:right;font-size:14px;'>";
    
       if (!this.isSommaire) {
          _toolbar += "\n<div id='toolbarButtonSommaire' title='" + _LANGAGE.lateralToolbar_sommaire + "' class='toolbarButton toolbarButtonSommaire' onclick=\"_BULLETIN.displaySommaire('" + this.num + "','" + this.type + "','" + this.lang + "');\"></div>";
       }
       if (this.isSommaire) {
          _toolbar += "\n<div id='toolbarButtonBulletin' title='Bulletin' class='toolbarButton toolbarButtonBulletin' onclick=\"_BULLETIN.displayBulletin('" + this.num + "','" + this.type + "','" + this.lang + "');\"></div>";
          
       }
       _toolbar += "\n<div id='toolbarButtonBookmark' title='" + _LANGAGE.lateralToolbar_ajouterBookmark + "' class='toolbarButton toolbarButtonBookmark'  onclick=\"saveBookmark();\"></div>";
       
       _toolbar += "\n<div id='toolbarButtonSizeplus' title='" + _LANGAGE.lateralToolbar_agrandir + "' class='toolbarButton toolbarButtonSizeplus'  onclick=\"agrandirTexte('" + _contexteOnglet + "');\"></div>";
       _toolbar += "\n<div  id='toolbarButtonSizenormal' title='" + _LANGAGE.lateralToolbar_tailleNormale + "' class='toolbarButton toolbarButtonSizenormal' onclick=\"tailleNormaleTexte('" + _contexteOnglet + "');\"></div>";
       _toolbar += "\n<div  id='toolbarButtonSizeminus' title='" + _LANGAGE.lateralToolbar_reduire + "' class='toolbarButton toolbarButtonSizeminus' onclick=\"diminuerTexte('" + _contexteOnglet + "');\"></div>";
     
       if (!this.isSommaire) {
          _toolbar += "\n<div id='toolbarButtonLangage' title='" + _bulletinButtonTitle + "' class='toolbarButton " + _bulletinClassLangage + "'  onclick=\"_BULLETIN.displayBulletin('" + this.num + "','" + this.type + "','" + _otherLangage + "');\"></div>";
       }
       
       if (this.isSommaire) {
           _toolbar += "\n<div id='toolbarButtonLangage' title='" + _sommaireButtonTitle + "' class='toolbarButton " + _sommaireClassLangage + "'  onclick=\"_BULLETIN.displaySommaire('" + this.num + "','" + this.type + "','" + _otherLangage + "');\"></div>";
       // 
       }
       //alert("test2");
       if (_ACCOUNT.isPrint) {
          _toolbar += "\n<div  id='toolbarButtonPrinter' title='" + _LANGAGE.lateralToolbar_print + "' class='toolbarButton toolbarButtonPrinter'  onclick=\"printElem('" + _contexteOnglet + "');\"></div>";
    
          
       }
       //_menuArticle += "<span class='menuContentButton' style='margin-left:10px;' onclick=\"viewArticleMobile('" + idArticle + "');\">Mobile</span>";
    
       _toolbar += "\n<div  id='toolbarButtonFullscreen' title='" + _LANGAGE.lateralToolbar_pleinEcran + "' class='toolbarButton toolbarButtonFullscreen' onclick=\"showPopupContent('" + _contexteOnglet + "');\"></div>";
        
       _toolbar += "</div>";
       
        $("#lateralToolbar").html(_toolbar);
        
       
       if (!this.isSommaire) {
          $( '.toolbarButtonSommaire' ).tooltip({
             tooltipClass: "toolbarTooltip",
             position: {
                my: "left+40 top-21",
                at: "left center"
             }
          });
       }
    
       if (this.isSommaire) {
          $( '.toolbarButtonBulletin' ).tooltip({
             tooltipClass: "toolbarTooltip",
             position: {
                my: "left+40 top-21",
                at: "left center"
             }
          });
       }
       
          $( '.toolbarButtonBookmark' ).tooltip({
             tooltipClass: "toolbarTooltip",
             position: {
                my: "left+40 top-21",
                at: "left center"
             }
          });
      
       $( '.toolbarButtonSizeplus' ).tooltip({
          tooltipClass: "toolbarTooltip",
           position: {
             my: "left+40 top-21",
             at: "left center"
          }
       });
       $( '.toolbarButtonSizenormal' ).tooltip({
          tooltipClass: "toolbarTooltip",
          position: {
             my: "left+40 top-21",
             at: "left center"
          }
       });
       $( '.toolbarButtonSizeminus' ).tooltip({
          tooltipClass: "toolbarTooltip",
          position: {
             my: "left+40 top-21",
             at: "left center"
          }
       });
      
          $( '.toolbarButtonLangageFr' ).tooltip({
             tooltipClass: "toolbarTooltip",
             position: {
                my: "left+40 top-21",
                at: "left center"
             }
          });
       
      
          $( '.toolbarButtonLangageEn' ).tooltip({
             tooltipClass: "toolbarTooltip",
             position: {
                my: "left+40 top-21",
                at: "left center"
             }
          });
     
       $(".toolbarButtonPrinter").tooltip({
          tooltipClass: "toolbarTooltip",
          position: {
             my: "left+40 top-21",
             at: "left center"
          }
       });
       $( '.toolbarButtonFullscreen' ).tooltip({
             tooltipClass: "toolbarTooltip",
             position: {
                my: "left+40 top-21",
                at: "left center"
             }
       });
      
       
       
    }

   
    
}