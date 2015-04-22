function sommaireClass() {
   
   this.lang="";
   this.pub="";
   this.num="";
   this.title="";
   this.content="";
   this.scroll="";
   this.nbr="";
  
    this.displayCurrentSommaire = function(numBulletin, _pubType, _pubLang) {
       alert("displayCurrentSommaire");
        _CONTEXT="SOMMAIRE";
        if ((_BULLETIN.num==numBulletin)  && (_BULLETIN.type==_pubType) && (_BULLETIN.lang==_pubLang)  && (_ACCOUNT.isConnected)) {
            //alert("doRefreshSommaire1");
           this.doRefreshSommaire();
            //alert("doRefreshSommaire2");
           
        } else {
             //alert("loadBulletin1");
           _BULLETIN.loadBulletin(numBulletin,_pubType, _pubLang, false);
             //alert("loadBulletin2");
           this.loadCurrentSommaire(numBulletin, _pubType, _pubLang, true);
               // alert("loadCurrentSommaire2");
        }
    }
    
    this.doRefreshSommaire = function() {
        var _content= this.content;
        $("#contentGeneral").css("background-image","url(./icones/black/list_bullet.png)");
        $("#contentGeneral").html(_content);
         displaySecondToolbar("SOMMAIRE",_BULLETIN.num, _ARTICLE.articleNum, _BULLETIN.title);
        //$("#secondToolbar").html(_CURRENT_SOMMAIRE_TITLE);
        //$("#secondToolbar").html(_CURRENT_SOMMAIRE_TITLE);      
        $("html, body").animate({scrollTop: "0px"}, 'fast');
        // $("a[href='#tabs_bulletin']").text("<img class='ui-icon ui-icon-note'/>Bulletin N° " + numBulletin);
        // $("a[href='#tabs_bulletin']").html("<img class='ui-icon ui-icon-note'/>Bulletin N° " + _BULLETIN.num);
        displayLateralToolbar("SOMMAIRE");
        _MAINTOOLBAR_ITEMSELECTED=3;
        
        //changeMainToolbarButton(3, true);
        loadMainToolbar();
        
        
        //$("#secondToolbar").html(_BULLETIN.title);
        if (_RECHERCHE_SHOWN) {
           showRechercheForm();
        }
        $("body,html").animate({ scrollTop: 0 }, 'fast');
    }

    this.loadCurrentSommaire = function(_pubNum, _pubType, _pubLang, doDisplay) {
       
        if ((_BULLETIN.num==_pubNum)  && (_BULLETIN.type==_pubType) && (_BULLETIN.lang==_pubLang)  && (_ACCOUNT.isConnected)) {
           return;
        }
        var me = this;
        //_CURRENT_SOMMAIRE_PUB = _pubNum;
        //_CURRENT_SOMMAIRE_LANG = _pubLang;
        //alert("loadSommaire:" + _pubNum + "-" + _CURRENT_SOMMAIRE_PUB + " / " + _pubLang + "-" + _CURRENT_SOMMAIRE_LANG);
        //var _pubLang="fr";
         var cookieValue=doGetCookie("AE_Auth");
        $.ajax({
           type:"get",
           url:"./php/loadSommaire.php",
           data: "pubNum=" + _pubNum + "&pubType=" + _pubType + "&pubLang=" + _pubLang + "&cookieValue=" + cookieValue,
           success: function(data){
              //alert(data);
                var tabData = data.split("###");
               // alert(tabData[0];
           /*   if (!_ACCOUNT.doCheckAuthentification(tabData[0])) {
                 return false;
              }
           */
            
              //var tabData = data.split("###");
              //_BULLETIN.num=tabData[1];
              _BULLETIN.num=tabData[1];
              _BULLETIN.type=_pubType;
              _BULLETIN.lang=tabData[2];
              _BULLETIN.title=tabData[3];
              me.content=tabData[4];
              
              if (doDisplay) {
                 _CONTEXT="SOMMAIRE"; 
                 me.doRefreshSommaire();
              }
              _NUMRESULT=tabData[1];
               return true;
           }
          
       });
    }
}