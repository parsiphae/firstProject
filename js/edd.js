/*=================================================
 * BULLETIN
 * ==================================================*/
function eddClass() {
    this.data = "";
    this.lang="";
    this.pub="";
    this.num="";
    this.type="";
    this.title="";
    this.content="";
    this.sommaire="";
    this.isSommaire=false;
    
    this.stackHistory = new Array();
    //this.scroll="";
    this.nbr="";
   

   
    this.displayEdd = function(_pubNum, _pubType, _pubLang) {
        _POPUPTOOLBAR.doCloseInstantly();
         _CONTEXT="EDD";
        // alert("displayEdd");
        //this.isSommaire=false;
        if ((this.num==_pubNum) && (this.type==_pubType) && (this.lang==_pubLang)  && (_ACCOUNT.isConnected)) {
           // alert("refreshedd");
           this.doRefreshEdd();
        } else {
            _LANGAGE.langage=_pubLang;
           //
          // this.loadSommaire(_pubNum, _pubType, _pubLang, false);
           // alert("loadBulletin1");
           this.loadEdd(_pubNum, _pubType, _pubLang, true);
           
        }
       // this.addStackHistory(this.num);

    }
    
     this.displaySommaire = function(_pubNum, _pubType, _pubLang) {
        _POPUPTOOLBAR.doCloseInstantly();
       //alert("displayCurrentSommaire");
       // _CONTEXT="SOMMAIRE";
      // alert("displaySommaire");
       _CONTEXT="EDD";
        this.isSommaire=true;
        if ((this.num==_pubNum)  && (this.type==_pubType) && (this.lang==_pubLang)  && (_ACCOUNT.isConnected)) {
            //alert("doRefreshSommaire1");
           this.doRefreshSommaire();
            //alert("doRefreshSommaire2");
           
        } else {
            _LANGAGE.langage=_pubLang;
            // alert("loadBulletin2");
           this.loadEdd(_pubNum,_pubType, _pubLang, true);
             //alert("loadBulletin2");
          // this.loadCurrentSommaire(numBulletin, _pubType, _pubLang, true);
               // alert("loadCurrentSommaire2");
        }
        
    }
    this.doRefreshEdd = function() {
        _CONTEXT="EDD";
        this.isSommaire=false;
        $("#contentGeneral").css("background-image","url(./icones/black/text_16x16.png)");
        
        $("#contentGeneral").html(this.doPrepareEdd());
        
         $("#tabs_lateralSommaire").html(this.doPrepareSommaire());
       /* $("#contentGeneral").linkify({
            tagName: 'a',
            target: '_blank',
            newLine: '\n',
            linkClass: null,
            linkAttributes: null
        });
       */
        //alert("dorefresh");
        _CURRENT_TYPE_PUB="2";
        
       
        //if (this.type == "2") {
            _MAINTOOLBAR_ITEMSELECTED=44;
        //}
        //alert("dddd" + _MAINTOOLBAR_ITEMSELECTED);
        loadMainToolbar();
        this.displaySecondToolbar();
        loadMenuLangue();
        
        if (_RECHERCHE_SHOWN) {
           showRechercheForm();
        }
        displayLateralToolbar("EDD");
        
        /* Afficher le sommaire dans le panel latéral
         -------------------------------------------*/
        //showPopupSommaire();
        $("body,html").animate({ scrollTop: 0 }, 'fast');
    }
     this.doRefreshSommaire = function() {
        var _content= this.doPrepareSommaire();//this.sommaire;
        this.isSommaire=true;
        $("#contentGeneral").css("background-image","url(./icones/black/list_bullet.png)");
        $("#contentGeneral").html(_content);
        this.displaySecondToolbar();
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
        displayLateralToolbar("EDD");
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
            this.sommaire += "\n\n<div class='" + _AEdisplay_sommaireTitreArticle + "' onClick=\"_ARTICLE.displayArticle('" + this.data.numPub + "','2','" + _numArticle + "','" + this.data.pubLang + "');\">";
          
           // this.sommaire += "\n\n<div class='" + _AEdisplay_sommaireTitreArticle + "'>";
            this.sommaire += "\n<span  class='AEdisplay_sommaireSubTitle'>"; 
            this.sommaire += "\n<b>" + this.data.articles[i].subTitle + "</b>";
            if ((this.data.articles[i].title != "") && (this.data.articles[i].subTitle != "")) {
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
    this.doPrepareEdd = function() {
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
            if (this.data.articles[i].typeArticle == "4") {
                this.content += "\n<div style='text-align:center;font-style:italic;font-size:1.3em;letter-spacing:3.0pt;border:1px solid #000000;margin:20px 80px 30px 80px;padding:15px 30px 15px 30px;'>" + this.data.articles[i].titleRubrique + "</div>";
            
            }
            if ((this.data.articles[i].typeArticle == "1") || (this.data.articles[i].typeArticle == "4")) {
                this.content += "\n\n<div class='AEdisplay_eddTitreArticle'>";
            
                this.content += "\n<span  class='AEdisplay_eddSubtitleArticle'>"; 
                this.content += "\n<b>" + this.data.articles[i].subTitle + "</b>";
            
                if ((this.data.articles[i].title != "") && (this.data.articles[i].subTitle != "")) {
                    this.content += ": ";
                }
                this.content += "\n</span>";
                this.content += "\n<span class='AEdisplay_eddTitleArticle'>"; 
                this.content += "\n" + this.data.articles[i].title;
                this.content += "\n</span>";
                this.content += "\n</div>";
            }
            this.content += "<div class='AEdisplay_content'>" + this.data.articles[i].content + "</div>";
            //this.content += this.getNonDisseminationMessage();
            //alert(data.articles[i].content);
        }
        return this.content;
    }
    this.loadEdd = function(_pubNum, _pubType, _pubLang, doDisplay) {
       //_CONTEXT="BULLETIN";
       // alert("edd");
       /* if ((this.num==_pubNum) && (this.type==_pubType) && (this.lang==_pubLang) && (_ACCOUNT.isConnected)) {
           return;
        }
       */
        var me = this;
        var _searchString = _SEARCH_STRING;
        var cookieValue=doGetCookie("AE_Auth");
         _LANGAGE.doTranslate(_pubLang);
        //alert(_pubType);
        $.ajax({
           type:"get",
           dataType:"json",
           url:"./php/loadEdd.php",
           data: "pubNum=" + _pubNum + "&pubType=" + _pubType + "&pubLang=" + _pubLang + "&cookieValue=" + cookieValue + "&searchString=" + _searchString,
           success: function(data){
              
                me.data = data;
                //var tabData = data.split("###");
           /*   if (!_ACCOUNT.doCheckAuthentification(tabData[0])) {
               
                 return false;
              }
           */
              
              
              me.num=me.data.numPub;
              me.type=_pubType;
              me.lang=data.pubLang;
              me.title=data.pubTitle;
              //me.content=tabData[4];
              //me.sommaire=tabData[5];
              
            
             // var content=tabData[3];
              _NUMRESULT=me.data.numPub;
              // return true;
               
           },
           complete : function(resultat, statut){
                
                if (_ACCOUNT.isConnected == "1") {
                    if (doDisplay) {
                 
                        _ARTICLE.loadArticle(me.num, "2", "1", me.lang, false);
                        _ARTICLE.pubNum = me.num;
                        _ARTICLE.articleNum ="1";
                        _ARTICLE.pubType = "2";
                        _ARTICLE.pubLang = me.lang;
                        _ARTICLE.articleNbr = me.nbr;
                        
                        me.addStackHistory(me.num);
                        if (!me.isSommaire) {
                            me.doRefreshEdd();
                        } else {
                            me.doRefreshSommaire();
                        }
                        
                    }
                }
            }
         
        });
    }
    
    this.displaySecondToolbar = function() {
       
        var _content="";
        if (!_ACCOUNT.isConnected) {
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
           _content+="\n<div id='secondToolbar_pileBulletinNum'" + _class + " onclick=\"_EDD.displayEdd('" + this.stackHistory[i] + "','2','" + _LANGAGE.langage + "');\">" + this.stackHistory[i] + "</div>";
           _content+="\n</div>";
        }
        
       $("#secondToolbar").html(_content);
       
    }
    
    this.addStackHistory = function(_numPub) {
       //alert("edd:" + this.stackHistory.length);
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
    
}