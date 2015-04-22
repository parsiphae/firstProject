
/* Objets declaration
 * ====================*/
_ACCOUNT = new Object();
//_SESSION = new Object();
_ARTICLE = new Object();
_BULLETIN = new Object();
_EDD = new Object();
_SOMMAIRE = new Object();
_LANGAGE = new Object();
_PRINT = new Object();
_RECENT = new Object();
_POPUPTOOLBAR  = new Object();
//var _content=obj.displayForm("AE_detailContainer", 1, "matriceItem", "matrice");
/* Piles
 * ==========*/
_PILE_PUB= new Array();

numPubUrl="";
pubTypeUrl="";
numArticleUrl="1";
langageUrl="fr";
token="";

CTR_TEMP=0;

/* Variables globales Utilisateur
* ==============================*/
_MAINTOOLBAR_ITEMSELECTED = 0;
_CURRENT_TYPE_PUB = "";
_HISTORY_SHOWN = false;
/* Variables globales
* ==============================*/
_CONTEXT = "";             //  LIST_BULLETIN, LIST_ARTICLE, SOMMAIRE, BULLETIN, ARTICLE
_IS_POPUP_SOMMAIRE = false;
_IS_POPUP_ARTICLE = false;
_SORTFIELD = "";           //BULLETIN_TITLE, ARTICLE_TITLE, THEME, DATE
_DESC="";                  //YES, NO, ''
_NUMRESULT="0";
_SEARCH_TITLE="YES";       // YES, NO, ''
_SEARCH_TEXT="";           // YES, NO, ''
_SEARCH_STRING="";  
_SEARCH_CURRENTFORM=1;
_SEARCH_TAB=0;
_SEARCH_NBR_EDD=0;
_SEARCH_NBR_BULLETIN=0;
_SEARCH_NBR_ARTICLE=0;
_SEARCH_FORM="";

_CURRENT_BOOKMARK_CONTENT="";
_CURRENT_BOOKMARK_STRING= "";
_CURRENT_BOOKMARK_ARRAY= new Array();
_CURRENT_BOOKMARK_CHANGED=true;

_LIST_THEME_FR = Array();
_LIST_THEME_FILTERED_FR = Array();
_LIST_THEME_EN = Array();
_LIST_THEME_FILTERED_EN = Array();
_LIST_THEME_ISDISPLAYED = false;
_LIST_THEME_CONTENT = "";
//_LIST_THEME_CONTENT_EN = "";

_RECHERCHE_SHOWN = false;
_RECHERCHE_LAST_CONTENT="";

/* ======================================================
 * INIT
 * ======================================================*/

window.onload = function() {
  
   _ACCOUNT = new accountClass();
   //_SESSION = new sessionClass();
   _ARTICLE = new articleClass();
   _BULLETIN = new bulletinClass();
   _EDD = new eddClass();
   _SOMMAIRE = new sommaireClass();
   _LANGAGE = new langageClass();
   _LANGAGE.doTranslate("en");
   _PRINT = new printClass();
   //_RECENT = new recentClass();
   _POPUPTOOLBAR = new popupToolbarClass();
  
   //_RECENT.init();
   /* Gestion des marges et de la taille du #contentSommaire
     ---------------------------------------------------------*/
   ajustContentMargin(); 



  
  //_SESSION.doGetSession();
  
  
  //ERREUR en IE 8
  /* $('a#linky').click(function(){
        var iframe = document.createElement("iframe"); 
        iframe.src = 'http://www.aeuropedev.be/fr/node/17?numPub=10882&numArticle=3&langage=fr'; 
        iframe.style.display = "none"; 
        document.body.appendChild(iframe);
        return false;
   });
  */
   /* Image d'attente en cas de requete Ajax
     ---------------------------------------*/
   $("body").on({
      ajaxStart: function() { 
          $(this).addClass("loading"); 
      },
      ajaxStop: function() { 
          $(this).removeClass("loading"); 
      }
      
   });



   $(document).click(function(event) { 
    //alert("test1");
    //alert($(event.target).parent().attr("id"));
    if ($(event.target).parent().attr("id")) {
      //alert($(event.target).parent().attr("id"));
      if (($(event.target).parent().attr("id") != "popupToolbarItem") && ($(event.target).parent().attr("id") != "mainToolbarButton11")) {
        if (_POPUPTOOLBAR.isOpen) {
            _POPUPTOOLBAR.doClose();
        }
      }
        
      } else {
        //alert("non défini");
      }
    /*if (($(event.target).parent().attr("id") != "popupToolbarItem") && ($(event.target).parent().attr("id") != "mainToolbarButton11")) {
      if (_POPUPTOOLBAR.isOpen) {
          _POPUPTOOLBAR.doClose();
      }
    }
*/

   /* if(!$(event.target).closest('#popupToolbarItem').length) {
      if(!$(event.target).closest('#mainToolbarButton11').length) {
        alert("test");
        if (_POPUPTOOLBAR.isOpen) {
          _POPUPTOOLBAR.doClose();
        }
      }
      */
        //alert("outside");
     /*   if($('#popupToolbar').is(":visible")) {
            $('#popupToolbar').hide()
        }
        */
   // }        
})
   
   /* ----------------------------
   * UPDATE Bulletin
   * -----------------------------*/
  /* $.ajax({
      type:"get", 
      success: function(data){
      }
   });
  */
  
   loadTabs();
   
      //$( "#AE_MainTabs" ).tabs({heightStyle: "fill"});
  // $( "#AE_MainTabs" ).tabs();
  // $( "#AE_privateMenuTabs" ).tabs();
   
 /*  var numPubUrl="";
   var pubTypeUrl="";
   var numArticleUrl="1";
   var langageUrl="fr";
   var token="";
 */
   loadRechercheForm();
   
   /*----------------------------------------
    Récupère les variables en URL
    -------------------------------------------*/
   numPubUrl = getUrlVars2("numPub");//["numPub"];
   pubTypeUrl = getUrlVars2("pubType");//["numPub"];
   numArticleUrl = getUrlVars2("numArticle"); //["numArticle"];
   langageUrl = getUrlVars2("langage"); //["langage"];
   token = getUrlVars2("tokenId");//["numPub"];
   if ((pubTypeUrl =="") || (pubTypeUrl == null)){
      pubTypeUrl='';
   }
   _CURRENT_TYPE_PUB=pubTypeUrl;
   
   if (langageUrl != "") {
      _ARTICLE.pubLang=langageUrl;
      _BULLETIN.lang=langageUrl;
      _EDD.lang=langageUrl;
      _LANGAGE.langage = langageUrl;
      _LANGAGE.doTranslate(langageUrl);
      
   } else {
      _ARTICLE.pubLang="fr";
      _BULLETIN.lang="fr";
      _EDD.lang="fr";
      _LANGAGE.doTranslate("fr");
      langageUrl="fr";
   }
   
   if (pubTypeUrl != "") {
      if (pubTypeUrl == "1") {
          _CONTEXT="BULLETIN";
      } else {
          _CONTEXT="EDD";
      }
   }
  
   
   /*if (numArticleUrl != ""){
      _CONTEXT="ARTICLE";
      
   }*/
   //alert (_CONTEXT);
   if ((numArticleUrl !="") && (pubTypeUrl != "")){
      _CONTEXT="ARTICLE";
      
   }
  
   /*else {
      _CONTEXT="ALL";
   }
   */
   /* Test si le navigateur accepte les Cookies
     ---------------------------------------------------------*/
    if (!isCookieAccepted()) {
      showMessage(_LANGAGE.general_cookie_error_title, _LANGAGE.general_cookie_error);
      //displayCookieError();
      //return;
   }
   
   if (token != "") {
      _ACCOUNT.token = token;
   }
   _ACCOUNT.doInitConnection(token);
  

   

  // alert(_CURRENT_TYPE_PUB);
  
   //alert(numPubUrl);

  
   var cookieValue=doGetCookie("AE_Auth");
   
   //loadMainToolbar();
   
   /*--------------------------------------
   * Limitation du copy ou CUT
   * ---------------------------------------*/

   $("html").bind('cut copy', function(e) {
      doLimitCopy(e);
   });
   
   //$('#contentGeneral').mouseup(function(e) {
      // Intercepte l'after click dans contentGeneral
   //});
   
   /*-------------------------------
   *Load de la liste des themes
   *-------------------------------*/
   loadListTheme();
   if (_LANGAGE.langage == "fr") {
      $('#formSearchStringTheme').bind('input', function() {
        if (($('#formSearchStringTheme').val().length > 0) || ($('#formSearchStringTheme').val().length == 0)) {
           _LIST_THEME_FILTERED_FR = _LIST_THEME_FR.filter(filterTheme);
           resfreshPopupTheme();
        }
     });
   }
   if (_LANGAGE.langage == "en") {
      $('#formSearchStringTheme').bind('input', function() {
        if (($('#formSearchStringTheme').val().length > 0) || ($('#formSearchStringTheme').val().length == 0)) {
           _LIST_THEME_FILTERED_EN = _LIST_THEME_EN.filter(filterTheme);
           resfreshPopupTheme();
        }
     });
   }
 
   /*if ((numArticleUrl !="") && (numPubUrl != "")){
      _CONTEXT="ARTICLE";
      _ARTICLE.loadArticle(numPubUrl, pubTypeUrl, numArticleUrl, _ARTICLE.pubLang, true);
      if (pubTypeUrl == "1") {
         _BULLETIN.loadBulletin(numPubUrl, "1", _ARTICLE.pubLang, false);
      } else {
         _EDD.loadEdd(numPubUrl, "2", _ARTICLE.pubLang, false);
      }
      return;
   }
  
   if (numPubUrl != "") {
      if (pubTypeUrl == "1") {
          _CONTEXT="BULLETIN";
         _BULLETIN.loadBulletin(numPubUrl, "1", _BULLETIN.lang, true);
      } else {
          _CONTEXT="EDD";
         _EDD.loadEdd(numPubUrl, "2", _EDD.lang, true);
      }
      _ARTICLE.loadArticle(numPubUrl, pubTypeUrl,"1", _BULLETIN.lang, false);
      return;
      
   } else {
      _CONTEXT="BULLETIN";
       _EDD.loadEdd('',"2", _EDD.lang, false);
      _BULLETIN.loadBulletin('',"1", _BULLETIN.lang, true);
      _SOMMAIRE.loadCurrentSommaire('',pubTypeUrl , _BULLETIN.lang, false);
      _ARTICLE.loadArticle('', "1", "1", _BULLETIN.lang, false);
      loadBookmark(false);
      return;
      
   }*/
   
   return;
   /*--------------------------------------
   * Test navigateur
   * -------------------------------------*/
   // alert(navigator.appName + "-" + navigator.userAgent );
 
   /*--------------------------------------
   * Limitation du copy ou CUT
   * ---------------------------------------*/

   $("html").bind('cut copy', function(e) {
      doLimitCopy(e);
   });
   
   //$('#contentGeneral').mouseup(function(e) {
      // Intercepte l'after click dans contentGeneral
   //});
   
   /*-------------------------------
   *Load de la liste des themes
   *-------------------------------*/
   loadListTheme();
   if (_LANGAGE.langage == "fr") {
      $('#formSearchStringTheme').bind('input', function() {
        if (($('#formSearchStringTheme').val().length > 0) || ($('#formSearchStringTheme').val().length == 0)) {
           _LIST_THEME_FILTERED_FR = _LIST_THEME_FR.filter(filterTheme);
           resfreshPopupTheme();
        }
     });
   }
   if (_LANGAGE.langage == "en") {
      $('#formSearchStringTheme').bind('input', function() {
        if (($('#formSearchStringTheme').val().length > 0) || ($('#formSearchStringTheme').val().length == 0)) {
           _LIST_THEME_FILTERED_EN = _LIST_THEME_EN.filter(filterTheme);
           resfreshPopupTheme();
        }
     });
   }
    

}

function displayInitVars() {

   var _content ="";
   _content += "CONTEXT:" + _CONTEXT;
   _content += "<br>numPubUrl:" + numPubUrl;
   _content += "<br>pubTypeUrl:" + pubTypeUrl;
   _content += "<br>numArticleUrl:" + numArticleUrl;
   _content += "<br>langageUrl:" + langageUrl;
   _content += "<br>token:" + token;
   $("#sessionDisplay").html(_content);
}




function loadMainToolbar() {
  /* if (_ACCOUNT.isConnected == "0") {
       $('#mainToolbar').html("");
      return;
   }
  */
    
   var _content="";
  
   if (_ACCOUNT.isConnected == "1") {
      if (_MAINTOOLBAR_ITEMSELECTED == 11) {
         _content += "<div style='float:left;' id='mainToolbarButton11' title=''><div id='popupToolbarItem11' class='toolbarButtonActive toolbarButtonPopupToolbarActive' style='padding:10px 18px 10px 18px;border-left:1px solid #AAAAAA; cursor: pointer;' onclick=\"_POPUPTOOLBAR.doOpen()();\">" + _LANGAGE.mainToolbar_popupToolbar + "</div></div>";
      } else {
         _content += "<div style='float:left;' id='mainToolbarButton11' title=''><div id='popupToolbarItem11' class='toolbarButton toolbarButtonPopupToolbar' style='padding:10px 18px 10px 18px;border-left:1px solid #AAAAAA;' onclick=\"_POPUPTOOLBAR.doOpen()();\">" + _LANGAGE.mainToolbar_popupToolbar + "</div></div>";
     
      }
      
      if (_MAINTOOLBAR_ITEMSELECTED == 1) {
         _content += "<div style='float:left;' id='mainToolbarButton1' title=''><div class='toolbarButtonActive toolbarButtonRecherche'>" + _LANGAGE.mainToolbar_recherche + "</div></div>";
      } else {
         _content += "<div style='float:left;' id='mainToolbarButton1' title=''><div class='toolbarButton toolbarButtonRecherche'  onclick=\"showRechercheForm();\">" + _LANGAGE.mainToolbar_recherche + "</div></div>";
      }
      
      /*if (isBookmarkPossible()) {
         if (_MAINTOOLBAR_ITEMSELECTED == 2) {
            _content += "<div style='float:left;' id='mainToolbarButton2' title=''><div class='toolbarButtonActive toolbarButtonBookmark'>" + _LANGAGE.mainToolbar_favoris + "</div></div>";
         } else {
            _content += "<div style='float:left;' id='mainToolbarButton2' title=''><div class='toolbarButton toolbarButtonBookmark'  onclick=\"displayBookmark();\">" + _LANGAGE.mainToolbar_favoris + "</div></div>";
         }
      }*/
      if (_MAINTOOLBAR_ITEMSELECTED == 12) {
         _content += "<div style='float:left;' id='mainToolbarButton12' title=''><div class='toolbarButtonActive toolbarButtonRecent'>" + _LANGAGE.mainToolbar_recent + "</div></div>";
      } else {
         if (_CURRENT_TYPE_PUB == "1") {
            _content += "<div style='float:left;' id='mainToolbarButton12' title=''><div class='toolbarButton toolbarButtonRecent'  onclick=\"displayRecent();\">" + _LANGAGE.mainToolbar_recent + "</div></div>";
         } else {
            _content += "<div style='float:left;' id='mainToolbarButton12' title=''><div class='toolbarButton toolbarButtonRecent'  onclick=\"displayRecent();\">" + _LANGAGE.mainToolbar_recent + "</div></div>";
         }
      }
      if (_MAINTOOLBAR_ITEMSELECTED == 3) {  
         _content += "<div style='float:left;' id='mainToolbarButton3' title=''><div class='toolbarButtonActive toolbarButtonSommaire'>" + _LANGAGE.mainToolbar_sommaire + "</div></div>";
      } else {
         if (_CURRENT_TYPE_PUB == "1") {
            _content += "<div style='float:left;' id='mainToolbarButton3' title=''><div class='toolbarButton toolbarButtonSommaire' onmouseover=\"showHistoryBulletin(true);\" onmouseout=\"showHistoryBulletin(false);\" onclick=\"_BULLETIN.displaySommaire('" + _BULLETIN.num + "','1','" + _LANGAGE.langage + "');\">" + _LANGAGE.mainToolbar_sommaire + "</div></div>";
         } else {
            _content += "<div style='float:left;' id='mainToolbarButton3' title=''><div class='toolbarButton toolbarButtonSommaire' onmouseover=\"showHistoryBulletin(true);\" onmouseout=\"showHistoryBulletin(false);\" onclick=\"_EDD.displaySommaire('" + _EDD.num + "','2','" + _LANGAGE.langage + "');\">" + _LANGAGE.mainToolbar_sommaire + "</div></div>";
         }
      }
     
      if (_MAINTOOLBAR_ITEMSELECTED == 4) {  
        _content += "<div style='float:left;' id='mainToolbarButton4' title=''><div class='toolbarButtonActive toolbarButtonBulletin'>" + _LANGAGE.mainToolbar_bulletin + "</div></div>";
      } else {
        _content += "<div style='float:left;' id='mainToolbarButton4' title=''><div class='toolbarButton toolbarButtonBulletin' onclick=\"_BULLETIN.displayBulletin('" + _BULLETIN.num + "','1','" + _LANGAGE.langage + "');\">" + _LANGAGE.mainToolbar_bulletin + "</div></div>";
      }
   
      
   
       if (_MAINTOOLBAR_ITEMSELECTED == 44) {  
         _content += "<div style='float:left;' id='mainToolbarButton4' title=''><div class='toolbarButtonActive toolbarButtonBulletin'>" + _LANGAGE.mainToolbar_edd + "</div></div>";
       } else {
         _content += "<div style='float:left;' id='mainToolbarButton4' title=''><div class='toolbarButton toolbarButtonBulletin' onclick=\"_EDD.displayEdd('" + _EDD.num + "','2','" + _LANGAGE.langage + "');\">" + _LANGAGE.mainToolbar_edd + "</div></div>";
       }
   
      
       
      if (_MAINTOOLBAR_ITEMSELECTED == 5) {
         _content += "<div style='float:left;' id='mainToolbarButton5' title=''><div class='toolbarButtonActive toolbarButtonArticle'>" + _LANGAGE.mainToolbar_article + "</div></div>";
      } else {
         _content += "<div style='float:left;' id='mainToolbarButton5' title=''><div class='toolbarButton toolbarButtonArticle' onclick=\"_ARTICLE.displayArticle('" + _ARTICLE.pubNum + "','" + _ARTICLE.pubType + "','" + _ARTICLE.articleNum + "','" + _LANGAGE.langage + "');\">" + _LANGAGE.mainToolbar_article + "</div></div>";
      }
      
     
       //  _content += "<div style='float:left;' id='mainToolbarButton5' title=''><div class='toolbarButton toolbarButtonArticle' onclick=\"_ARTICLE.displayArticleJson('" + _ARTICLE.pubNum + "','" + _ARTICLE.pubType + "','" + _ARTICLE.articleNum + "','" + _LANGAGE.langage + "');\">" + _LANGAGE.mainToolbar_article + "</div></div>";
      

   
     /* if ((_ACCOUNT.connectionType == "0") || (_ACCOUNT.connectionType == "2")) {
         _content += "<div style='float:right;' id='mainToolbarButton7' title=''><div class='toolbarButton toolbarButtonLogoff' onclick=\"_ACCOUNT.doLogoff();\">" + _LANGAGE.mainToolbar_deconnection + "</div></div>";
      }
      if (_MAINTOOLBAR_ITEMSELECTED == 6) {
         _content += "<div style='float:right;' id='mainToolbarButton6' title=''><div class='toolbarButtonActive toolbarButtonParametre'>" + _LANGAGE.mainToolbar_compte + "</div></div>";    
      } else {
         _content += "<div style='float:right;' id='mainToolbarButton6' title=''><div class='toolbarButton toolbarButtonParametre' onclick=\"_ACCOUNT.getClientInfo();\">" + _LANGAGE.mainToolbar_compte + "</div></div>";
      }
       if (_MAINTOOLBAR_ITEMSELECTED == 8) {
         _content += "<div style='float:right;' id='mainToolbarButton8' title=''><div class='toolbarButtonActive toolbarButtonHelp'>" + _LANGAGE.mainToolbar_aide + "</div></div>";    
      } else {
         _content += "<div style='float:right;' id='mainToolbarButton8' title=''><div class='toolbarButton toolbarButtonHelp' onclick=\"displayFaq();\">" + _LANGAGE.mainToolbar_aide + "</div></div>";
      }
     */
   }

   if (_ACCOUNT.isConnected == "0") {
      _content += "<div style='float:left;' id='mainToolbarButton1' title=''><div class='toolbarButtonDisable toolbarButtonPopupToolbar' style='padding:10px 18px 10px 18px;'>" + _LANGAGE.mainToolbar_popupToolbar + "</div></div>";
      _content += "<div style='float:left;' id='mainToolbarButton1' title=''><div class='toolbarButtonDisable toolbarButtonRecherche'>" + _LANGAGE.mainToolbar_recherche + "</div></div>";
      _content += "<div style='float:left;' id='mainToolbarButton1' title=''><div class='toolbarButtonDisable toolbarButtonRecent'>" + _LANGAGE.mainToolbar_recent + "</div></div>";
      _content += "<div style='float:left;' id='mainToolbarButton2' title=''><div class='toolbarButtonDisable toolbarButtonBookmark'>" + _LANGAGE.mainToolbar_favoris + "</div></div>";
      _content += "<div style='float:left;' id='mainToolbarButton3' title=''><div class='toolbarButtonDisable toolbarButtonSommaire'>" + _LANGAGE.mainToolbar_sommaire + "</div></div>";
       _content += "<div style='float:left;' id='mainToolbarButton4' title=''><div class='toolbarButtonDisable toolbarButtonBulletin'>" + _LANGAGE.mainToolbar_bulletin + "</div></div>";
       _content += "<div style='float:left;' id='mainToolbarButton4' title=''><div class='toolbarButtonDisable toolbarButtonBulletin'>" + _LANGAGE.mainToolbar_edd + "</div></div>";
       _content += "<div style='float:left;' id='mainToolbarButton5' title=''><div class='toolbarButtonDisable toolbarButtonArticle'>" + _LANGAGE.mainToolbar_article + "</div></div>";
       
   }
     $('#mainToolbar').html(_content);
    
}



function showHistoryBulletin(_OnOff) {
  /* var content = "";
   var _posX="500px";
   var_poxY="500px";
   $('#historyContainer').html(_SOMMAIRE.content);
      $("#historyContainer").css({
         'position': 'fixed',
         'top': '142px',
         'left': '262px',
         'border': '1px solid #000000',
         'padding': '20px',
         'min-width' : '250px',
         'width' : '400px',
         'height' : '500px',
         'overflow' : 'scroll',
         'background-color' : '#FFFFFF'
         
         
      });
   if (_OnOff) {
      $("#historyContainer").fadeTo('fast', 1);
      _HISTORY_SHOWN=_OnOff;
   } else {
       $("#historyContainer").fadeTo('fast', 0);
      _HISTORY_SHOWN=_OnOff;
   }
    //$('#historyContainer').fadeIn('slow');
    */
}



function loadTabs() {
   

    
   
   
  
  
}

/* ======================================================
 * RECHERCHE BULLETINS 
 * ======================================================*/

function searchBulletin() {
   
   var numBulletin1 = document.getElementById('formSearchNumBulletin1').value;
   var numBulletin2 = document.getElementById('formSearchNumBulletin2').value;
   var pubDate1 = document.getElementById('formSearchPubDate1').value;
   var pubDate2 = document.getElementById('formSearchPubDate2').value;
   
   //if (numBulletin2 != "") {
   
      loadListeBulletin(numBulletin1, numBulletin2, pubDate1, pubDate2, '');
   //}
   /*else {
      _SOMMAIRE.displayCurrentSommaire(numBulletin1);
   }
   */

}

function displayRecent() {
   _MAINTOOLBAR_ITEMSELECTED = 12;
   if (_RECHERCHE_SHOWN) {
      showRechercheForm();
   }
   loadMainToolbar();
   displayLateralToolbar("RECENT");
   
   loadListeBulletin('', '', '', '', '30');
}

function loadListeBulletin(numBulletin1, numBulletin2, pubDate1, pubDate2, limit) {
   _POPUPTOOLBAR.doCloseInstantly();
   _CONTEXT="LIST_BULLETIN";
  var _pubLang=_LANGAGE.langage;
    var cookieValue=doGetCookie("AE_Auth");
    var _params = "";
    _params = "numPub1=" + numBulletin1;
    _params+= "&numPub2=" + numBulletin2;
    _params+= "&pubDate1=" + pubDate1;
    _params+= "&pubDate2=" + pubDate2;
    _params+= "&limit=" + limit;
    _params+= "&pubLang=" + _pubLang;
    _params+= "&cookieValue=" + cookieValue;
   
    $.ajax({
      type:"get",
      url:"./php/loadListeBulletin.php",
      data: _params,
    
      success: function(data){
         //alert(data);
         var tabData = data.split("###");
         _SEARCH_NBR_BULLETIN=trim(tabData[0]);
         _SEARCH_NBR_EDD = tabData[1];
         
         var content=tabData[2];
        //$("#contentListe").html("");
         var labelTab='<img class="ui-icon ui-icon-search"/>Résultat ' + '(' + _SEARCH_NBR_BULLETIN + ')';
         
         $("#contentGeneral").css("background-image","url(./php/icones/black/searchZoom_16x16.png)");
         $("#contentGeneral").html(content);
         _RECHERCHE_LAST_CONTENT=content;
         $( "#tabs_listePub" ).tabs();
         $("a[href='#tabsBulletin']").text(_LANGAGE.listeBulletin_bulletinName + " (" + _SEARCH_NBR_BULLETIN + ")");
         $("a[href='#tabsEdd']").text(_LANGAGE.listeBulletin_eddName + " (" + _SEARCH_NBR_EDD + ")");
         
         $("#tabs_listePub").tabs('option','selected',_SEARCH_TAB);
         
         $('#tabs_listePub').bind('tabsselect', function(event, ui) {
            _SEARCH_TAB = ui.index;
            //alert('_SEARCH_TAB : ' + _SEARCH_TAB);
        });
        // $("#AE_privateMenuTabs").tabs("select", "#tabs_resultat");
         //$("a[href='#tabs_resultat']").html(labelTab);
        // $("#contentResultat").animate({ scrollTop: 0 }, 'fast');
         $("#toolsContainer").html("");
         $("body,html").animate({ scrollTop: 0 }, 'fast');
         //doDisplayData(data);
         //$("#contentListe").html(data);
      }
  });
}

/* ======================================================
 * RECHERCHE ARTICLES
 * ======================================================*/
function loadListeArticle() {
   _POPUPTOOLBAR.doCloseInstantly();
   _CONTEXT="LIST_ARTICLE";
    var _pubLang=_LANGAGE.langage;
    var cookieValue=doGetCookie("AE_Auth");
   
   var _searchDate1 = document.getElementById('formSearchArticlePubDate1').value;
   var _searchDate2 = document.getElementById('formSearchArticlePubDate2').value;
   var _searchString = document.getElementById('formSearchStringArticle').value;
   var _searchTheme = document.getElementById('formSearchStringTheme').value;
   _SEARCH_STRING=_searchString;
  // alert(_searchDate1);
   var _params = "";
   _params += "searchDate1=" + _searchDate1;
   _params += "&searchDate2=" + _searchDate2;
   _params += "&searchString=" + _searchString;
   _params += "&searchTheme=" + _searchTheme;
   _params += "&SORTFIELD=" + _SORTFIELD;
   _params += "&SEARCH_TITLE=" + _SEARCH_TITLE;
   _params += "&SEARCH_TEXT=" + _SEARCH_TEXT;
   _params += "&pubLang=" + _pubLang;
   _params += "&cookieValue=" + cookieValue;
    
    /*---------------------------------------------------------
     _searchString doi faire au moins 3 caractères : message
     --------------------------------------------------------*/
   if ((_searchString.length < 3) && (_searchString.length > 0)) {
      showMessage(_LANGAGE.searchForm_lengthErrorTitle, _LANGAGE.searchForm_lengthError);
      document.getElementById('formSearchStringArticle').focus();
      return;
   }
 
   
   _params = encodeURI(_params);
   //alert(_params);
   $.ajax({
      type:"get",
      url:"./php/loadListeArticle.php",
      data: _params,

         success: function(data){
         //alert(data);
         var tabData = data.split("###");
         _SEARCH_NBR_BULLETIN=trim(tabData[0]);
         _SEARCH_NBR_EDD = trim(tabData[1]);
        
         var content=tabData[2];
         //$("#contentListe").html("");
         var labelTab='<img class="ui-icon ui-icon-search"/>Résultat ' + '(' + _SEARCH_NBR_BULLETIN + ')';
         
         $("#contentGeneral").css("background-image","url(./icones/black/searchZoom_16x16.png)");
         $("#contentGeneral").html(content);
          _RECHERCHE_LAST_CONTENT=content;
          
          $( "#tabs_listePub" ).tabs();
         $("a[href='#tabsArticleBulletin']").text(_LANGAGE.listeBulletin_bulletinName + " (" + _SEARCH_NBR_BULLETIN + ")");
         $("a[href='#tabsArticleEdd']").text(_LANGAGE.listeBulletin_eddName + " (" + _SEARCH_NBR_EDD + ")");
         
         $("#tabs_listePub").tabs('option','selected',_SEARCH_TAB);
         
         $('#tabs_listePub').bind('tabsselect', function(event, ui) {
            _SEARCH_TAB = ui.index;
            //alert('_SEARCH_TAB : ' + _SEARCH_TAB);
         });
        // $("#AE_privateMenuTabs").tabs("select", "#tabs_resultat");
        // $("a[href='#tabs_resultat']").html(labelTab);
        // $("#contentGeneral").animate({ scrollTop: 0 }, 'fast');
         doDisplayOutilArticle();
         $("body,html").animate({ scrollTop: 0 }, 'fast');
         //doDisplayData(data);
         
      }
  });
}


/*==================================================================
 * BOOKMARK
 * ==================================================================*/
function bookmarkItem() {
   this.bookmarkType="";
   this.pubType="";
   this.numPub="";
   this.numArticle="";
   this.langage="";
   this.dateJour ="";
}
function displayBookmark() {
   _POPUPTOOLBAR.doClose();
   displayLateralToolbar("BOOKMARK");
   if (!_CURRENT_BOOKMARK_CHANGED) {
      doRefreshBookmark();
   } else {
      if ((_ACCOUNT.connectionType == "1") ||  (_ACCOUNT.connectionType == "2")) {
         loadBookmarkLocal(true);
      } else {
         // Normalement loadBookmark(true);
         loadBookmark(true);
      }
   }
   
   
}
function doRefreshBookmark() {
   //alert ("bookmark");
   _CONTEXT="BOOKMARK";
   $("#contentGeneral").css("background-image","url(./icones/black/star_16x16.png)");
   $("#contentGeneral").html(_CURRENT_BOOKMARK_CONTENT);
   displayLateralToolbar("BOOKMARK");
   _MAINTOOLBAR_ITEMSELECTED=2;
   loadMainToolbar();
   //displaySecondToolbar("BULLETIN",_BULLETIN.num, _CURRENT_ARTICLE_NUM, _BULLETIN.title);
   $("#secondToolbar").html("");
   if (_RECHERCHE_SHOWN) {
      showRechercheForm();
   }
   $("body,html").animate({ scrollTop: 0 }, 'fast');
}
function loadBookmark(doDisplay) {
   //_CONTEXT="ARTICLE";
   
   var cookieValue=doGetCookie("AE_Auth");
    
    $.ajax({
      type:"get",
      url: "./php/loadListeBookmark.php",
      data: "cookieValue=" + cookieValue,
      success: function(data) {
        // alert(data);
        var tabData = data.split("###");
         
      
         _CURRENT_BOOKMARK_CONTENT = tabData[1];
         if (doDisplay) {
           
            doRefreshBookmark();
            _CURRENT_BOOKMARK_CHANGED=false;
            
         }
         return true;
        
      }
  });

}
function loadBookmarkLocal(doDisplay) {
   //_CONTEXT="ARTICLE";
   var cookieValue=doGetCookie("AE_Auth");
   
   var _tabBookmarkItem = new Array;
   var tabBookmarkTemp = new Array();
   var _bookmarkItem="";
   var test="";
   if (localStorage) {
      
     // alert(_ACCOUNT.connectionType);
      _CURRENT_BOOKMARK_STRING=localStorage.getItem("AE_bookmark");
      if ((_CURRENT_BOOKMARK_STRING == null) || (_CURRENT_BOOKMARK_STRING == "")){
      
       showMessage(_LANGAGE.mainToolbar_favoris, _LANGAGE.bookmark_messageNoBookmark);
       return;
      }
      
      if (_CURRENT_BOOKMARK_STRING == ""){
        
      }
        
      //_CURRENT_BOOKMARK_STRING=localStorage.getItem("AE_bookmark");
      var tabBookmark = _CURRENT_BOOKMARK_STRING.split("@@");
      
       
      
      
      for (i=0;i < tabBookmark.length;i++) {
         _bookmarkItem = tabBookmark[i];
         _tabBookmarkItem = _bookmarkItem.split("|");
        // alert(_tabBookmarkItem[6]);
         if (_tabBookmarkItem[6] == "DISPLAY") {
            tabBookmarkTemp.push(tabBookmark[i]);
            _CURRENT_BOOKMARK_CONTENT += getLineBookmark(_tabBookmarkItem);
            test+="\n" +  tabBookmark[i];
          
         }
         
      }
      _CURRENT_BOOKMARK_STRING=tabBookmarkTemp.join("@@");
      localStorage.setItem("AE_bookmark", _CURRENT_BOOKMARK_STRING);
      // alert(test);
      //doRefreshBookmark();
      // _CURRENT_BOOKMARK_CHANGED=false;
      
   }
   loadListeBookmarkLocal(_CURRENT_BOOKMARK_STRING, doDisplay);
   
   
   
   

}

function loadListeBookmarkLocal(bookmarkString, doDisplay) {
   var cookieValue=doGetCookie("AE_Auth");
   //alert("" + bookmarkString);
    $.ajax({
      type: 'GET',
      url: './php/loadListeBookmarkLocal.php',
      data: {'bookmarkTransport':bookmarkString, 'cookieValue':cookieValue},
      success: function(data) {
       // alert(data);
        
         var tabData = data.split("###");
         
        
         _CURRENT_BOOKMARK_CONTENT = tabData[1];
        if (doDisplay) {
           // _CONTEXT="BULLETIN";
            doRefreshBookmark();
            _CURRENT_BOOKMARK_CHANGED=false;
            
         }
        
         return true;
      }
   });
}

function getLineBookmark(_tabBookmarkItem) {
   //tabBookmark.push(_bookmarkType + "|" + _pubType + "|" + _numPub + "|" + _numArticle + "|" + _langage + "|" + _dateJour + "|DISPLAY");
   var _content = "";
    if (_tabBookmarkItem[3] != "0") {
              
           /*         _content += "\n<div id='bookmarkItem".$_rowBookmark['idBookmark']."' class='bookmarkLine'>";
                    _content += "\n\n<div id='listeBookmark".$_rowBookmark['idBookmark']."'  class='listeTitreBookmarkArticle' onClick=\"_ARTICLE.displayArticle('".$_rowBookmark['numPub']."','".$_rowBookmark['pubType']."','".$_rowBookmark['numArticle']."','".$_rowBookmark['langage']."');\">";
                    _content += "\n<div style='display:inline;font-size:0.8em;font-family: Verdana;'>";
                    _content += "<b>".$_rowArticle['subTitle']."</b>: ";
                    _content += "</div>";
                    _content += "\n<div style='display:inline;font-size:1.1em;font-family: \"Times New Roman\";'>";
                    _content += "".$_rowArticle['title'];
                    _content += "</div>";
                    _content += "\n<div style='display:inline;font-size:0.8em;font-family: Verdana;'>";
                    _content += " (Bulletin n° ".$_rowBookmark['numPub']." - ".$dateCurrentBookmark.")";
                    _content += "</div>";
                    _content += "\n</div>";
               
                
                    _content += "\n<div id='deleteBookmark' onClick=\"deleteBookmark('".$_rowBookmark['idBookmark']."');\"></div>";
                    _content += "\n</div>";
           */
              
          } else {
            /*
                    _content += "\n<div id='bookmarkItem".$_rowBookmark['idBookmark']."' class='bookmarkLine'>";
                    _content += "\n\n<div id='listeBookmark".$_rowBookmark['idBookmark']."'   class='listeTitreBookmarkBulletin' onClick=\"_BULLETIN.displayBulletin('".$_rowBookmark['numPub']."','1','".$_rowBookmark['langage']."');\">";
                    _content += $_rowBookmark['bulletinTitle'];
                    _content += "\n</div>";
                    _content += "\n<div id='deleteBookmark' onClick=\"deleteBookmark('".$_rowBookmark['idBookmark']."');\"></div>";
                    _content += "\n</div>";
            */
               
          }
}

function saveBookmark(_numPub, _type, _numArticle, _langage) {
   var cookieValue=doGetCookie("AE_Auth");
   var _bookmarkType=_type;
   var _pubType=_type;
   
   
   var _dateJour ="";
   
   /* Afficher le quickMessage
     ===========================*/
   var quickMessage = "kkjhsfk";
   if (_numArticle != 0) {
      quickMessage=_LANGAGE.bookmark_messageAjoutArticle;
   } else {
      if (_type == 2) {
         quickMessage=_LANGAGE.bookmark_messageAjoutEdd;
      } else {
         quickMessage=_LANGAGE.bookmark_messageAjoutBulletin;
      }
   }
  
   showQuickMessage(quickMessage);
   
   _dateJour = $.datepicker.formatDate('yy/mm/dd', new Date());
   var tabBookmark = new Array();
   //var cookieValue=doGetCookie("AE_Auth");
   if ((_ACCOUNT.connectionType == "1") ||  (_ACCOUNT.connectionType == "2")) {
      
      if (localStorage) {
         _CURRENT_BOOKMARK_STRING = localStorage.getItem("AE_bookmark");
         if ((_CURRENT_BOOKMARK_STRING == null) || (_CURRENT_BOOKMARK_STRING == "")){
            tabBookmark.push(_bookmarkType + "|" + _pubType + "|" + _numPub + "|" + _numArticle + "|" + _langage + "|" + _dateJour + "|DISPLAY");
            _CURRENT_BOOKMARK_STRING=tabBookmark.join("@@");
            localStorage.setItem("AE_bookmark",_CURRENT_BOOKMARK_STRING);
         //  alert(_CURRENT_BOOKMARK_STRING);
         } else {
            /*if (_CURRENT_BOOKMARK_STRING.indexOf("@@") != -1) {
               alert("@@ trouvé");
            } else {
               alert(_CURRENT_BOOKMARK_STRING);
            }*/
            tabBookmark=_CURRENT_BOOKMARK_STRING.split("@@");
            tabBookmark.push(_bookmarkType + "|" + _pubType + "|" + _numPub + "|" + _numArticle + "|" + _langage + "|" + _dateJour + "|DISPLAY");
            _CURRENT_BOOKMARK_STRING=tabBookmark.join("@@");
            localStorage.setItem("AE_bookmark",_CURRENT_BOOKMARK_STRING);
            _CURRENT_BOOKMARK_CHANGED=true;
           //  alert("nouveau : " + _CURRENT_BOOKMARK_STRING);
         }
         //alert(_CURRENT_BOOKMARK_STRING);
      } else {
         showMessage("Message", "Votre navigateur ne peut pas gérer les favoris");
      }
   } else {
      $.ajax({
         type:"get",
         url:"./php/saveBookmark.php",
         data: "bookmarkType=" + _bookmarkType + "&pubType=" + _pubType + "&numPub=" + _numPub + "&numArticle=" + _numArticle + "&pubLang=" + _langage + "&cookieValue=" + cookieValue,
         success: function(data){
           //alert(data);
           _CURRENT_BOOKMARK_CHANGED=true;
            return true;
         }
      });
   }

}



function deleteBookmark(_idBookmark) {
   var cookieValue=doGetCookie("AE_Auth");
  // alert(_idBookmark);
   
   if ((_ACCOUNT.connectionType == "1") ||  (_ACCOUNT.connectionType == "2")) {
      var nbrBookmark = _CURRENT_BOOKMARK_STRING.split('DISPLAY').length - 1;
         //alert(nbrBookmark);
         //alert(_CURRENT_BOOKMARK_STRING);
         if (nbrBookmark <= 1) {
            
            _CURRENT_BOOKMARK_STRING="";
            localStorage.setItem("AE_bookmark","");
            removeBookmarkItem(_idBookmark);
            _CURRENT_BOOKMARK_CHANGED=true;
            _CURRENT_BOOKMARK_CONTENT="Aucun favori...";
            doRefreshBookmark();
            
            return;
         }
         var tabBookmark = _CURRENT_BOOKMARK_STRING.split("@@");
         var bookmarkItem = tabBookmark[_idBookmark];
         var tabBookmarkItem = bookmarkItem.split("|");
         tabBookmarkItem[6]="DELETED";
         bookmarkItem=tabBookmarkItem.join("|");
         //alert(bookmarkItem);
         tabBookmark[_idBookmark]=bookmarkItem;
         _CURRENT_BOOKMARK_STRING=tabBookmark.join("@@"); 
         localStorage.setItem("AE_bookmark",_CURRENT_BOOKMARK_STRING);
         removeBookmarkItem(_idBookmark);
         _CURRENT_BOOKMARK_CHANGED=true;
         //alert(_idBookmark);
        // doRefreshBookmark();
         
   } else {
      $.ajax({
         type:"get",
         url:"./php/deleteBookmark.php",
         data: "idBookmark=" + _idBookmark + "&cookieValue=" + cookieValue,
         success: function(data){
         //  alert(data);
           _CURRENT_BOOKMARK_CHANGED=true;
           removeBookmarkItem(_idBookmark);
       
            return true;
         }
      });
   }
}
function removeBookmarkItem(_idBookmark) {
  var element = document.getElementById("bookmarkItem" + _idBookmark);
  //alert(_idBookmark);
  element.parentNode.removeChild(element);
}

/*==================================================================
 * BOOKMARK
 * ==================================================================*/
function displayFaq() {
    _POPUPTOOLBAR.doClose();
    displayLateralToolbar("FAQ");
  // _CONTEXT="BOOKMARK";
   $("#contentGeneral").css("background-image","url(./icones/black/help_16x16.png)");
  loadFaq();
  // displayLateralToolbar("BOOKMARK");
   _MAINTOOLBAR_ITEMSELECTED=8;
   loadMainToolbar();
   //displaySecondToolbar("BULLETIN",_BULLETIN.num, _CURRENT_ARTICLE_NUM, _BULLETIN.title);
   $("#secondToolbar").html("");
   if (_RECHERCHE_SHOWN) {
      showRechercheForm();
   }
   $("body,html").animate({ scrollTop: 0 }, 'fast');
}
function loadFaq() {
   var _pubLang=_LANGAGE.langage;
   var content="";
   var _url ="./php/loadFaq.php";
   var _params = "";
    _params = "pubLang=" + _pubLang;
   //alert("faq");
   //alert(_url);
   $.ajax({
      type:"get",
      url: _url,
      data: _params,
      success: function(data){
         //alert(data);
         $("#contentGeneral").html(data);

        
      }
  });
 
   
}
function changeMainToolbarButton(_idButton,_changeCurrentButton) { // PAS UTILISE !!!
   /* Desactive current Button
    * -----------------------*/
   var _content="";
   //if (_changeCurrentButton) {
      if (_MAINTOOLBAR_ITEMSELECTED == 1) {
         _content= "<div class='toolbarButton toolbarButtonRecherche'  onclick=\"showRechercheForm();\">Recherche</div>";
      }
      if (_MAINTOOLBAR_ITEMSELECTED == 2) {
         _content= "<div class='toolbarButton toolbarButtonBookmark'  onclick=\"displayBookmark();\">Favoris</div>";
      }
      if (_MAINTOOLBAR_ITEMSELECTED == 3) {
         _content= "<div class='toolbarButton toolbarButtonSommaire'  onclick=\"_BULLETIN.displaySommaire('" + _BULLETIN.num + "','" + _BULLETIN.type + "','" + _BULLETIN.lang + "');\">Sommaire</div>";
      }
      if (_MAINTOOLBAR_ITEMSELECTED == 4) {
         _content= "<div class='toolbarButton toolbarButtonBulletin' onclick=\"_BULLETIN.displayBulletin('" + _BULLETIN.num + "','" + _BULLETIN.type + "','" + _BULLETIN.lang + "');\">Bulletin</div>";
      }
      if (_MAINTOOLBAR_ITEMSELECTED == 5) {
         _content= "<div class='toolbarButton toolbarButtonArticle' onclick=\"_ARTICLE.displayArticle('" + _ARTICLE.pubNum + "','" + _ARTICLE.pubType + "','" + _ARTICLE.articleNum + "','fr');\">Article</div>";
      }
      if (_MAINTOOLBAR_ITEMSELECTED == 6) {
         _content= "<div class='toolbarButton toolbarButtonParametre' onclick=\"_ACCOUNT.getClientInfo();\">Compte utilisateur</div>";
      }
      if (_MAINTOOLBAR_ITEMSELECTED == 7) {
         _content= "<div class='toolbarButton toolbarButtonLogoff' onclick=\"_ACCOUNT.doLogoff();\">Me déconnecter</div>";
      }
       if (_MAINTOOLBAR_ITEMSELECTED == 8) {
         _content= "<div class='toolbarButton toolbarButtonHelp' onclick=\"displayFaq();\">Aide</div>";
      }
      
     
      $("#mainToolbarButton" + _MAINTOOLBAR_ITEMSELECTED).html(_content);
      // alert(_MAINTOOLBAR_ITEMSELECTED);
   //}
   /* Active targuet Button
    * -----------------------*/
    _content="";
   if (_idButton == 1) {
      _content = "<div class='toolbarButtonActive toolbarButtonRecherche'>Recherche</div>";
   }
   if (_idButton == 2) {
      _content = "<div class='toolbarButtonActive toolbarButtonBookmark'>Favoris</div>";
   }
   if (_idButton == 3) {
      _content = "<div class='toolbarButtonActive toolbarButtonSommaire'>Sommaire</div>";
   }
   if (_idButton == 4) {
      _content = "<div class='toolbarButtonActive toolbarButtonBulletin'>Bulletin</div>";
   }
   if (_idButton == 5) {
      _content = "<div class='toolbarButtonActive toolbarButtonArticle'>Article</div>";
   }
   if (_idButton == 6) {
      _content = "<div class='toolbarButtonActive toolbarButtonParametre'>Compte utilisateur</div>";
   }
   if (_idButton == 7) {
      _content= "<div class='toolbarButton toolbarButtonLogoff' onclick=\"_ACCOUNT.doLogoff();\">Me déconnecter</div>";
   }
   $("#mainToolbarButton" + _idButton).html(_content);
   //alert(_idButton);
   _MAINTOOLBAR_ITEMSELECTED=_idButton;
   
}



function addPileBulletin(_numPub) {
   
   var _pile="";
   var _max = 10;
   /* Si déja dans la pile, ne pas l'ajouter
    * ---------------------------------------*/
   for (i=0;i < _PILE_PUB.length;i++) {
        if (_numPub == _PILE_PUB[i]) {
            return;
        }
   }
   //alert("test");
   
   /* Faire remonter la pile si le max est atteint
    * ---------------------------------------*/
   if (_PILE_PUB.length >= _max) {
      for (i=0;i<_max;i++) {
        // if (i < _PILE_PUB.length) {
            _PILE_PUB[i]=_PILE_PUB[i+1];
         //}
      }
      _PILE_PUB[_max - 1]=_numPub;
   } else {
      _PILE_PUB[_PILE_PUB.length]=_numPub;
   }
   /*for (i=0;i<_PILE_PUB.length;i++) {
      _pile+="\n" + _PILE_PUB[i];
   }
   alert(_pile);
   */
}





/*===================================
* Display Second Toolbar
*==================================*/
function displaySecondToolbar(_context, _current_pub_num, _current_article_num, _current_article_pub_title) { // UTILISE PAR _ARTICLE 
   var _next_article_num = 0;
   var _previous_article_num = 1;
   var _content="";
   if (_ACCOUNT.isConnected == "0") {
      //alert("pas connecté");
      $("#secondToolbar").html("");
      return;
   }
   if (_CONTEXT == "ARTICLE") {
      if (parseInt(_ARTICLE.articleNum) > 1) {
         _previous_article_num=parseInt(_ARTICLE.articleNum) - 1;
      }
      //alert(_CURRENT_PUB_NBR_ARTICLE);
      if (parseInt(_ARTICLE.articleNum) < parseInt(_ARTICLE.nbrArticle)) {
         _next_article_num=parseInt(_ARTICLE.articleNum) + 1;
      } else {
         
         _next_article_num=_ARTICLE.nbrArticle;
      }
      _content="<div id='secondToolbar_pubTitle'>";
      _content+=_ARTICLE.pubTitle;
      _content+="</div>";
      if (_ARTICLE.articleNum != "1") {
         _content+="<div  id='secondToolbar_previous_active' class='normal' title='' onclick=\"_ARTICLE.displayArticle('" + _ARTICLE.pubNum + "','" + _ARTICLE.pubType + "','" +  _previous_article_num + "','" + _ARTICLE.pubLang + "');\"></div>";
      } else {
         _content+="<div  id='secondToolbar_previous' title=''></div>";
      }
      _content+="<div  id='secondToolbar_num'><b>" + _ARTICLE.articleNum + "</b></div>";
      _content+="<div  id='secondToolbar_num' style='color:#444444;margin-left:2px;'>" + "/" + _ARTICLE.nbrArticle + "</div>";
     
      if (_ARTICLE.articleNum != _ARTICLE.nbrArticle) {
         _content+="<div  id='secondToolbar_next_active' title='' onclick=\"_ARTICLE.displayArticle('" + _ARTICLE.pubNum + "','" + _ARTICLE.pubType + "','" +  _next_article_num + "','" + _ARTICLE.pubLang + "');\"></div>";
      } else {
         _content+="<div  id='secondToolbar_next' title=''></div>";
      }
   }
   if ((_CONTEXT == "BULLETIN") || (_CONTEXT == "SOMMAIRE")) {
      _content="<div id='secondToolbar_pubTitle'>";
      _content+=_BULLETIN.title;
      _content+="</div>";
      
      var _class = "";
      if (_PILE_PUB.length > 0) {
       _content+="<div id='secondToolbar_pileBulletinText'>" + _LANGAGE.secondToolbar_vuRecemment + " (</div>";
      }
      for (i=0;i < _PILE_PUB.length;i++) {
          if (i > 0) {
               _content+="<div id='secondToolbar_pileBulletinText'>";
               _content+=", ";
               _content+="</div>";
          }
          _class = "";
          if (_PILE_PUB[i] == _BULLETIN.num) {
            _class=" class='pileBulletinTextCurrent'";
          } else {
            _class=" class='pileBulletinTextLink'";
          }
         _content+="<div id='secondToolbar_pileBulletinNum'" + _class + " onclick=\"_BULLETIN.displayBulletin('" + _PILE_PUB[i] + "','1','" + _LANGAGE.langage + "');\">" + _PILE_PUB[i] + "</div>";
        // _content+=_PILE_PUB[i];
         _content+="</div>";
      }
      if (_PILE_PUB.length > 0) {
       _content+="<div id='secondToolbar_pileBulletinText'>)</div>";
      }
     
   }
    /*if (_CONTEXT == "SOMMAIRE") {
      _content="<div id='secondToolbar_pubTitle'>";
      _content+=_SOMMAIRE.title;
      _content+="</div>";
   }*/
   $("#secondToolbar").html(_content);
   
}

function loadMenuLangue() {
      var _content = "";
      var _contentMenuLangue = "";
      var _contentMenuLangue_onclick = "";
      var _otherLangage="";
      if (_LANGAGE.langage == "fr") {
         _otherLangage="en";
      } else {
         _otherLangage="fr";
      }
      //alert(_CONTEXT);
      
      if (_CONTEXT == "ARTICLE") {
         _contentMenuLangue_onclick = "onclick=\"_ARTICLE.displayArticle('" + _ARTICLE.pubNum + "','" + _ARTICLE.pubType + "','" + _ARTICLE.articleNum + "','" + _otherLangage + "');\"";
      }
      if (_CONTEXT == "BULLETIN") {
         if (_BULLETIN.isSommaire) {
            _contentMenuLangue_onclick = "onclick=\"_BULLETIN.displaySommaire('" + _BULLETIN.num + "','" + _BULLETIN.type + "','" + _otherLangage + "');\"";
         } else {
            _contentMenuLangue_onclick = "onclick=\"_BULLETIN.displayBulletin('" + _BULLETIN.num + "','" + _BULLETIN.type + "','" + _otherLangage + "');\"";
         }
      }
      if (_CONTEXT == "EDD") {
         if (_BULLETIN.isSommaire) {
            _contentMenuLangue_onclick = "onclick=\"_EDD.displaySommaire('" + _EDD.num + "','" + _EDD.type + "','" + _otherLangage + "');\"";
         } else {
            _contentMenuLangue_onclick = "onclick=\"_EDD.displayEdd('" + _EDD.num + "','" + _EDD.type + "','" + _otherLangage + "');\"";   
         }
      }
      if (_LANGAGE.langage == "fr") {
         
         _contentMenuLangue+= "<ul class='language-switcher-locale-url'>";
	 _contentMenuLangue+= "<li class='en first'>(<a href='javascript:void(0)' " + _contentMenuLangue_onclick + " class='language-link' lang='en'>English</a></li>";
	 _contentMenuLangue+= "<li class='fr last active language-link'>Français)</li>";
	 _contentMenuLangue+= "</ul>";
      } else {
       
         _contentMenuLangue+= "<ul class='language-switcher-locale-url'>";
	 _contentMenuLangue+= "<li class='en first active'>(English</li>";
	 _contentMenuLangue+= "<li class='fr last'><a href='javascript:void(0)' " + _contentMenuLangue_onclick + " class='language-link' lang='fr'>Français</a>)</li>";
	 _contentMenuLangue+= "</ul>";
         
      }
     
      $('#menuLangue').html(_contentMenuLangue);
     

}
function displayLateralToolbar(_contexteOnglet) {
  //alert("displayLateralToolbar:  " + _BULLETIN.num + "-" + _SOMMAIRE.num);
   //alert(_contexteOnglet + _USER_ISPRINT);
   var _classLangage = "";
   var _otherLangage="";
   var _buttonTitle="";
   
   if (_contexteOnglet == "ARTICLE") {
      if (_ARTICLE.pubLang == "fr") {
         _classLangage = "toolbarButtonLangageEn";
         _otherLangage="en";
         _buttonTitle=_LANGAGE.lateralToolbar_lireArticleEn;
      } else {
         _classLangage = "toolbarButtonLangageFr";
         _otherLangage="fr";
         _buttonTitle=_LANGAGE.lateralToolbar_lireArticleFr;
      }
   }
   
      
   if (_contexteOnglet == "BULLETIN") {
      if (_BULLETIN.lang == "fr") {
         _classLangage = "toolbarButtonLangageEn";
         _otherLangage="en";
         _buttonTitle=_LANGAGE.lateralToolbar_lirePubEn;
      } else {
         _classLangage = "toolbarButtonLangageFr";
         _otherLangage="fr";
         _buttonTitle=_LANGAGE.lateralToolbar_lirePubFr;
      }
    }
   
 /*  if (_contexteOnglet == "SOMMAIRE") {
      if (_BULLETIN.lang == "fr") {
         _classLangage = "toolbarButtonLangageEn";
         _otherLangage="en";
         _buttonTitle="Lire le sommaire en anglais";
      } else {
          _classLangage = "toolbarButtonLangageFr";
         _otherLangage="fr";
         _buttonTitle="Lire le sommaire en français";
      }
   }
   */
   if (_contexteOnglet == "EDD") {
      if (_EDD.lang == "fr") {
         _classLangage = "toolbarButtonLangageEn";
         _otherLangage="en";
         _buttonTitle=_LANGAGE.lateralToolbar_lireEddEn;
      } else {
          _classLangage = "toolbarButtonLangageFr";
         _otherLangage="fr";
         _buttonTitle=_LANGAGE.lateralToolbar_lireEddFr;
      }
   }
  // alert("test");
   var _toolbar = "";
  
   
   _toolbar+="\n<div  style='float:right;font-size:14px;'>";

   if (_contexteOnglet == "ARTICLE") {
      if (_ARTICLE.pubType == "1") {
         _toolbar += "\n<div  id='toolbarButtonSommaire' title='" + _LANGAGE.lateralToolbar_sommaire + "' class='toolbarButton toolbarButtonSommaire' onclick=\"_BULLETIN.displaySommaire('" + _ARTICLE.pubNum + "','" + _ARTICLE.pubType + "','" + _ARTICLE.pubLang + "');\"></div>";
         _toolbar += "\n<div id='toolbarButtonBulletin' title='" + _LANGAGE.lateralToolbar_readPublication + "' class='toolbarButton toolbarButtonBulletin' onclick=\"_BULLETIN.displayBulletin('" + _ARTICLE.pubNum + "','" + _ARTICLE.pubType + "','" + _ARTICLE.pubLang + "');\"></div>";
         _toolbar += "\n<div id='toolbarButtonBookmark' title='" + _LANGAGE.lateralToolbar_ajouterArticleBookmark + "' class='toolbarButton toolbarButtonBookmark'  onclick=\"saveBookmark('" + _ARTICLE.pubNum + "','" + _ARTICLE.pubType + "','" + _ARTICLE.articleNum + "','" + _ARTICLE.pubLang + "');\"></div>";
      } else {
         _toolbar += "\n<div id='toolbarButtonSommaire' title='" + _LANGAGE.lateralToolbar_sommaire + "' class='toolbarButton toolbarButtonSommaire' onclick=\"_EDD.displaySommaire('" + _ARTICLE.pubNum + "','" + _ARTICLE.pubType + "','" + _ARTICLE.pubLang + "');\"></div>";
         _toolbar += "\n<div id='toolbarButtonBulletin' title='" + _LANGAGE.lateralToolbar_readPublication + "' class='toolbarButton toolbarButtonBulletin' onclick=\"_EDD.displayEdd('" + _ARTICLE.pubNum + "','" + _ARTICLE.pubType + "','" + _ARTICLE.pubLang + "');\"></div>";
         _toolbar += "\n<div id='toolbarButtonBookmark' title='" + _LANGAGE.lateralToolbar_ajouterArticleBookmark + "' class='toolbarButton toolbarButtonBookmark'  onclick=\"saveBookmark('" + _ARTICLE.pubNum + "','" + _ARTICLE.pubType + "','" + _ARTICLE.articleNum + "','" + _ARTICLE.pubLang + "');\"></div>";
      }
      
   }
   if (_contexteOnglet == "BULLETIN") {
      if (_BULLETIN.isSommaire) {
         _toolbar += "\n<div id='toolbarButtonBulletin' title='" + _LANGAGE.lateralToolbar_readPublication + "' class='toolbarButton toolbarButtonBulletin' onclick=\"_BULLETIN.displayBulletin('" + _BULLETIN.num + "','" + _BULLETIN.type + "','" + _BULLETIN.lang + "');\"></div>";   
      } else {
         _toolbar += "\n<div id='toolbarButtonSommaire' title='" + _LANGAGE.lateralToolbar_sommaire + "' class='toolbarButton toolbarButtonSommaire' onclick=\"_BULLETIN.displaySommaire('" + _BULLETIN.num + "','" + _BULLETIN.type + "','" + _BULLETIN.lang + "');\"></div>";
      }
       _toolbar += "\n<div id='toolbarButtonBookmark' title='" + _LANGAGE.lateralToolbar_ajouterBulletinBookmark + "' class='toolbarButton toolbarButtonBookmark'  onclick=\"saveBookmark('" + _BULLETIN.num + "','" + _BULLETIN.type + "','0','" + _BULLETIN.lang + "');\"></div>";
    
   }
    if (_contexteOnglet == "EDD") {
      if (_EDD.isSommaire) {
         _toolbar += "\n<div id='toolbarButtonBulletin' title='" + _LANGAGE.lateralToolbar_readPublication + "' class='toolbarButton toolbarButtonBulletin' onclick=\"_EDD.displayEdd('" + _EDD.num + "','" + _EDD.type + "','" + _EDD.lang + "');\"></div>";
      } else {
         _toolbar += "\n<div id='toolbarButtonSommaire' title='" + _LANGAGE.lateralToolbar_sommaire + "' class='toolbarButton toolbarButtonSommaire' onclick=\"_EDD.displaySommaire('" + _EDD.num + "','" + _EDD.type + "','" + _EDD.lang + "');\"></div>";
      }
       _toolbar += "\n<div id='toolbarButtonBookmark' title='" + _LANGAGE.lateralToolbar_ajouterEddBookmark + "' class='toolbarButton toolbarButtonBookmark'  onclick=\"saveBookmark('" + _EDD.num + "','" + _EDD.type + "','0','" + _EDD.lang + "');\"></div>";
    
      
   }
   /*if (_contexteOnglet == "SOMMAIRE") {
      _toolbar += "\n<div id='toolbarButtonBulletin' title='Bulletin' class='toolbarButton toolbarButtonBulletin' onclick=\"_BULLETIN.displayBulletin('" + _BULLETIN.num + "','" + _BULLETIN.type + "','" + _BULLETIN.lang + "');\"></div>";
   }*/
   
  /* if ((_contexteOnglet == "ARTICLE") || (_contexteOnglet == "BULLETIN") || (_contexteOnglet == "EDD")){
     _toolbar += "\n<div id='toolbarButtonBookmark' title='" + _LANGAGE.lateralToolbar_ajouterBulletinBookmark + "' class='toolbarButton toolbarButtonBookmark'  onclick=\"saveBookmark();\"></div>";
   }*/
   _toolbar += "\n<div id='toolbarButtonSizeplus' title='" + _LANGAGE.lateralToolbar_agrandir + "' class='toolbarButton toolbarButtonSizeplus'  onclick=\"agrandirTexte('" + _contexteOnglet + "');\"></div>";
   _toolbar += "\n<div  id='toolbarButtonSizenormal' title='" + _LANGAGE.lateralToolbar_tailleNormale + "' class='toolbarButton toolbarButtonSizenormal' onclick=\"tailleNormaleTexte('" + _contexteOnglet + "');\"></div>";
   _toolbar += "\n<div  id='toolbarButtonSizeminus' title='" + _LANGAGE.lateralToolbar_reduire + "' class='toolbarButton toolbarButtonSizeminus' onclick=\"diminuerTexte('" + _contexteOnglet + "');\"></div>";

   
   if (_contexteOnglet == "ARTICLE") {
      _toolbar += "\n<div id='toolbarButtonLangage' title='" + _buttonTitle + "' class='toolbarButton " + _classLangage + "'  onclick=\"_ARTICLE.displayArticle('" + _ARTICLE.pubNum + "','" + _ARTICLE.pubType + "','" + _ARTICLE.articleNum + "','" + _otherLangage + "');\"></div>";
   }
   
   if (_contexteOnglet == "BULLETIN") {
      if (_BULLETIN.isSommaire) {
         _toolbar += "\n<div id='toolbarButtonLangage' title='" + _buttonTitle + "' class='toolbarButton " + _classLangage + "'  onclick=\"_BULLETIN.displaySommaire('" + _BULLETIN.num + "','" + _BULLETIN.type + "','" + _otherLangage + "');\"></div>";
      } else {
         _toolbar += "\n<div id='toolbarButtonLangage' title='" + _buttonTitle + "' class='toolbarButton " + _classLangage + "'  onclick=\"_BULLETIN.displayBulletin('" + _BULLETIN.num + "','" + _BULLETIN.type + "','" + _otherLangage + "');\"></div>";
      }
      
   }
   if (_contexteOnglet == "EDD") {
      if (_BULLETIN.isSommaire) {
         _toolbar += "\n<div id='toolbarButtonLangage' title='" + _buttonTitle + "' class='toolbarButton " + _classLangage + "'  onclick=\"_EDD.displaySommaire('" + _EDD.num + "','" + _EDD.type + "','" + _otherLangage + "');\"></div>";
      } else {
         _toolbar += "\n<div id='toolbarButtonLangage' title='" + _buttonTitle + "' class='toolbarButton " + _classLangage + "'  onclick=\"_EDD.displayEdd('" + _EDD.num + "','" + _EDD.type + "','" + _otherLangage + "');\"></div>";   
      }
      
   }
   
  /* if (_contexteOnglet == "SOMMAIRE") {
       _toolbar += "\n<div id='toolbarButtonLangage' title='" + _buttonTitle + "' class='toolbarButton " + _classLangage + "'  onclick=\"_BULLETIN.displaySommaire('" + _BULLETIN.num + "','" + _BULLETIN.type + "','" + _otherLangage + "');\"></div>";
   }*/
   //alert("test2");
   if ((_ACCOUNT.isPrint) && (!_RECHERCHE_SHOWN)) {
      //_toolbar += "\n<div  id='toolbarButtonPrinter' title='" + _LANGAGE.lateralToolbar_print + "' class='toolbarButton toolbarButtonPrinter'  onclick=\"_PRINT.printElem('" + _contexteOnglet + "');\"></div>";
      if (_contexteOnglet == "ARTICLE") {
         _toolbar += "\n<div  id='toolbarButtonPrinter' title='" + _LANGAGE.lateralToolbar_print + "' class='toolbarButton toolbarButtonPrinter'  onclick=\"_PRINT.doPrintArticle('" + _ARTICLE.pubNum + "','" + _ARTICLE.pubType + "','" + _ARTICLE.articleNum + "','" + _ARTICLE.pubLang + "');\"></div>";
      }
      if (_contexteOnglet == "BULLETIN") {
         _toolbar += "\n<div  id='toolbarButtonPrinter' title='" + _LANGAGE.lateralToolbar_print + "' class='toolbarButton toolbarButtonPrinter'  onclick=\"_PRINT.doPrintBulletin('" + _BULLETIN.num + "','" + _BULLETIN.type + "','" + _BULLETIN.lang + "');\"></div>";   
      }
      if (_contexteOnglet == "EDD") {
         _toolbar += "\n<div  id='toolbarButtonPrinter' title='" + _LANGAGE.lateralToolbar_print + "' class='toolbarButton toolbarButtonPrinter'  onclick=\"_PRINT.doPrintEdd('" + _EDD.num + "','" + _EDD.type + "','" + _EDD.lang + "');\"></div>";   
      }
      
   }
   //_menuArticle += "<span class='menuContentButton' style='margin-left:10px;' onclick=\"viewArticleMobile('" + idArticle + "');\">Mobile</span>";
   if (!_RECHERCHE_SHOWN) {
      //_toolbar += "\n<div  id='toolbarButtonFullscreen' title='" + _LANGAGE.lateralToolbar_pleinEcran + "' class='toolbarButton toolbarButtonFullscreen' onclick=\"showPopupContent('" + _contexteOnglet + "');\"></div>";
   }
   _toolbar += "</div>";
   
    $("#lateralToolbar").html(_toolbar);
    
   
   if ((_contexteOnglet == "ARTICLE") || (_contexteOnglet == "BULLETIN")  || (_contexteOnglet == "EDD")) {
      $( '.toolbarButtonSommaire' ).tooltip({
         tooltipClass: "toolbarTooltip",
         position: {
            my: "left+40 top-21",
            at: "left center"
         }
      });
      $( '.toolbarButtonBulletin' ).tooltip({
         tooltipClass: "toolbarTooltip",
         position: {
            my: "left+40 top-21",
            at: "left center"
         }
      });
   }

 /*  if (_contexteOnglet == "ARTICLE") {
      $( '.toolbarButtonBulletin' ).tooltip({
         tooltipClass: "toolbarTooltip",
         position: {
            my: "left+40 top-21",
            at: "left center"
         }
      });
   }
   */
   if ((_contexteOnglet == "ARTICLE") || (_contexteOnglet == "BULLETIN") || (_contexteOnglet == "EDD")) {   
      $( '.toolbarButtonBookmark' ).tooltip({
         tooltipClass: "toolbarTooltip",
         position: {
            my: "left+40 top-21",
            at: "left center"
         }
      });
   }
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
   if ((_contexteOnglet == "ARTICLE") || (_contexteOnglet == "BULLETIN") || (_contexteOnglet == "EDD")) {   
      $( '.toolbarButtonLangageFr' ).tooltip({
         tooltipClass: "toolbarTooltip",
         position: {
            my: "left+40 top-21",
            at: "left center"
         }
      });
   }
   if ((_contexteOnglet == "ARTICLE") || (_contexteOnglet == "BULLETIN") || (_contexteOnglet == "EDD")) {   
      $( '.toolbarButtonLangageEn' ).tooltip({
         tooltipClass: "toolbarTooltip",
         position: {
            my: "left+40 top-21",
            at: "left center"
         }
      });
   }
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



function getUrlVars2( name ){
   name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
   var regexS = "[\\?&]"+name+"=([^&#]*)";  
   var regex = new RegExp( regexS );  
   var results = regex.exec( window.location.href ); 
   if( results == null ) {
      return "";  
   }
   else
   {
      return results[1];
   }
}




function viewArticleMobile(idArticle) {
   my_window = window.open("./indexArticleMobile.htm?idArticle=" + idArticle, "mywindow1");
 
}





function showPopupContent(_contexteOnglet) { // 9/2/2014 A REVOIR
   var _width="900";
   var _position="center";
   var _modal = true;
   var _content = "<div style='padding:30px 50px 30px 50px;font-size:14px;'>";
   //var _containerCible="#contentDetail";
   var _popupContainerCible="#popupContainer";
   var _popupTitle="";
   //alert(_CONTEXT);
   if (_CONTEXT == "LIST_BULLETIN") {
      //_containerCible="#contentResultat";
      return;
      
   }
   if (_CONTEXT == "LIST_ARTICLE") {
      //_containerCible="#contentResultat";
      return;
   }
   if (_CONTEXT == "SOMMAIRE") {
      _popupTitle=_BULLETIN.title;
      _IS_POPUP_SOMMAIRE = true;
      _width="330";
      _position="left";
      _modal=false;
      _content = "<div style='padding:20px 20px 20px 20px';background:#F5F5F5;font-size:14px;'>";
      //_containerCible="#contentSommaire1";
      //_popupContainerCible="#popupContainerSommaire";
   }
   if (_contexteOnglet == "BULLETIN") {
      _popupTitle=_BULLETIN.title;
      if (_IS_POPUP_SOMMAIRE) {
         _modal=false;
       }
      //_containerCible="#contentBulletin";
   }
   if (_contexteOnglet == "EDD") {
      _popupTitle=_EDD.title;
      if (_IS_POPUP_SOMMAIRE) {
         _modal=false;
       }
      //_containerCible="#contentBulletin";
   }
   if (_contexteOnglet == "ARTICLE") {
      _popupTitle=_ARTICLE.title;
      _IS_POPUP_ARTICLE = true;
       if (_IS_POPUP_SOMMAIRE) {
         _modal=false;
       }
     // _containerCible="#contentDetail";
   }
   
   _content += $('#contentGeneral').html();
   _content += "</div>";
   $(_popupContainerCible).html(_content);

   
   $(_popupContainerCible).dialog({ 
         width: _width, 
         height: $(window).height(),
         position: _position,
         modal: _modal,
         title: _popupTitle,
         resizable: false,
         
         hide: 'fade',
         show: 'fade',
         autoOpen: false,
         
         buttons: { "Fermer": {
                         text: _LANGAGE.popupFermer, 
                         click: function () {
                              $(_popupContainerCible).html("");
                                 $(this).dialog("close");
                                 
                         }
                 }
         }
   });
   $(_popupContainerCible).dialog("open");
   //$(_popupContainerCible).slideUp("fast");
   $(_popupContainerCible).bind('dialogclose', function(event) {
      //alert(_contexteOnglet);
      if (_contexteOnglet == "SOMMAIRE") {
         _IS_POPUP_SOMMAIRE = false;
      }
      if (_contexteOnglet == "ARTICLE") {
         _IS_POPUP_ARTICLE = false;
      }
   });
}

function showPopupSommaire() { // 9/2/2014 A REVOIR
   var _width="350";
   var _height = $(window).height() - 200;
   var _position="left bottom";
   var _modal = false;
   var _content = "<div style='padding:10px 10px 10px 10px;'>";
   //var _containerCible="#contentDetail";
   var _popupContainerCible="#sommaireContainer";
   var _popupTitle="";
   
  
   if (_CONTEXT == "BULLETIN") {
      _popupTitle=_BULLETIN.title;
      _content += _BULLETIN.sommaire;
      /*if (_IS_POPUP_SOMMAIRE) {
         _modal=false;
       }
      */
      
   }
   if (_CONTEXT == "EDD") {
      _popupTitle=_EDD.title;
      _content += _EDD.sommaire;
      /*if (_IS_POPUP_SOMMAIRE) {
         _modal=false;
       }
      */
   }
   if (_CONTEXT == "ARTICLE") {
      
   }
   //alert("sommaire");
   //_content += $('#contentGeneral').html();
   _content += "</div>";
   $(_popupContainerCible).html(_content);

   
   $(_popupContainerCible).dialog({ 
         width: _width, 
         height: _height,
         position: _position,
         draggable: false,
         modal: _modal,
         title: _popupTitle,
         resizable: false,
         
         hide: 'fade',
         show: 'fade',
         autoOpen: false,
         open: function(event, ui) {
            $(event.target).parent().css('position', 'fixed');
            $(event.target).parent().css('top', '175px');
            $(event.target).parent().css('left', '0px');
        },
         buttons: { "Fermer": {
                         text: _LANGAGE.popupFermer, 
                         click: function () {
                              $(_popupContainerCible).html("");
                                 $(this).dialog("close");
                                 
                         }
                 }
         }
   });
   $(_popupContainerCible).dialog("open");
   $(_popupContainerCible).animate({ scrollTop: 0 }, 'fast');
  // alert("sommaire2");
   //$(_popupContainerCible).slideUp("fast");
   /*$(_popupContainerCible).bind('dialogclose', function(event) {
      
      if (_CONTEXT == "SOMMAIRE") {
         _IS_POPUP_SOMMAIRE = false;
      }
      if (_CONTEXT == "ARTICLE") {
         _IS_POPUP_ARTICLE = false;
      }
   });
   */
}


/*===================================================================
 * Taille Texte
 *==================================================================*/
function agrandirTexte(_contexteOnglet) {
   var _containerCible="#contentGeneral";
  
   $(_containerCible).stop().animate({fontSize: '+=1px'},300);
      
}


function diminuerTexte(_contexteOnglet) {
   var _containerCible="#contentGeneral";

   $(_containerCible).stop().animate({fontSize: '-=1px'},300);
}

function tailleNormaleTexte(_contexteOnglet) {
      var _containerCible="#contentGeneral";

   $(_containerCible).stop().animate({fontSize: '1em'},300);
}



/*===================================================================
 * PRINT
 *==================================================================*/
function printElem(_contexteOnglet) {
   var _elemName = "contentGeneral";
   
/*   if (_contexteOnglet == "SOMMAIRE") {
      _elemName="#contentSommaire1";
   }
   if (_contexteOnglet == "BULLETIN") {
      _elemName="#contentBulletin";
   }
   if (_contexteOnglet == "ARTICLE") {
      _elemName="#contentDetail";
   }
   */
   printData($('#contentGeneral').html());
}

function printData(data) 
   {
    var contentPrint = $('#contentGeneral').html();
    var titlePrint = $('#secondToolbar_pubTitle').html(); 
    $('#contentPrint').html(contentPrint);
    
   /*$('#contentPrint').stop().animate({
      fontSize: '16px'
   },0);
   */
    
   $('#contentPrint').printElement({
      printMode:'popup',
      leaveOpen:false,
      printBodyOptions:
      {
         styleToAdd:'padding:0px;margin:0px;color:#FFFFFF !important;'
      },
      pageTitle: titlePrint
   });
   
   $('#contentPrint').html("");
   return true;
   }
 /*===================================================================
 * CONNECTION
 *==================================================================*/   
   
    
    function doGetCookie(name) {
      var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
      
    }
    function createCookie(name,value,minutes) {
      var expires="";
      if (isCookieAccepted) {
	if (minutes) {
		var date = new Date();
		date.setTime(date.getTime()+(minutes*60*1000)); // 1 minutes
                //date.setTime(date.getTime()+(3*60*60*1000)); // 1 heure
               // date.setTime(date.getTime()+(3*24*60*60*1000)); // 3 jours
		expires = "; expires="+date.toGMTString();
         } else {
      
            expires = "";
         }
         document.cookie = name+"="+value+expires+"; path=/";
      }
       
   }
   
function isCookieAccepted() {
   
   accepteCookies = (navigator.cookieEnabled) ? true : false;

   if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
     document.cookie = "AE_test";
     accepteCookies = (document.cookie.indexOf("AE_test") != -1) ? true : false;
    // alert("test2");
   }

   if (accepteCookies) {
         return true;
   }
   else {
         
         return false;
   } 
}



function doEnter(_inputId) { //2/12/2013 : Plus utilisé
   document.getElementById(_inputId).addEventListener("keydown", function(e) {
    //  if (!e) {
    //     var e = window.event;
    //  }
    //  e.preventDefault(); // sometimes useful
  
      // Enter is pressed
      if (e.keyCode == 13) {
         if (_inputId == "authFormPassword") {
            //alert("enter");
            _ACCOUNT.doConnection();
         }
         
      }
   }, false);

} 





/*===================================================
 * Gestion Copy Paste
 *===================================================*/
function doLimitCopy(e) {
   var _content="";
   var _nbrCharsAutorised = parseInt(_ACCOUNT.cutAndPasteLines) * 100;
   if (_nbrCharsAutorised == 0) {
      e.preventDefault();
     // alert("copy behaviour detected: " + _ACCOUNT.cutAndPasteLines);
   } else {
      var _selectedText=getSelectedText();
      var _textAuthorised = _selectedText.substring(0,_nbrCharsAutorised);
      if (_selectedText.length > _nbrCharsAutorised) {
         e.preventDefault();
         /*if (window.clipboardData) {
            window.clipboardData.setData('Text', _textAuthorised);
            _content += "<p>Le texte suivant à été copié dans le presse-papier.</p></div>";
            $("#popupContainer").html(_USER_CUTANDPASTELINES + " lignes ont copiées dans le presse-papier.");
            $( "#popupContainer" ).dialog({ 
                  width: 200, 
                  height: 'auto',
                  position: 'center',
                  modal: true,
                  title: 'Copie de texte',
                  resizable: false,
                  
                  hide: 'fade',
                  show: 'fade',
                  autoOpen: false,
                  open: function() {
                        $(".ui-dialog").css("box-shadow","#999999 3px 3px 3px");
                  }
            });
            $( "#popupContainer" ).dialog("open");
            $( "#popupContainer" ).dialog("close");
            //alert(_USER_CUTANDPASTELINES + " lignes ont copiées dans le presse-papier.");
         } else {
         */
            popupCopyAuthorised(_textAuthorised);
         //}
         
         //alert("Texte sélectionné trop grand: " + _USER_CUTANDPASTELINES);
        // alert(getSelectedText());
      }
   }
   
}

function popupCopyAuthorised(_textAuthorised) {
   var _content = "<div style='font-family:Verdana;padding:15px;font-size:12px;background:#DDDDDD;'>";
 
   _content += "<div style='float:left;width:100px;'><img src='./icones/info2.png'/></div>";
   _content += "<div style='float:left;width:400px;'><p>" + _LANGAGE.copyPaste1 + " " + _ACCOUNT.cutAndPasteLines + " " + _LANGAGE.copyPaste2 + "</p>";
   if (window.clipboardData) {
      window.clipboardData.setData('Text', _textAuthorised);
      _content += "<p>Le texte suivant à été copié dans le presse-papier.</p></div>";
   } else {
       _content += "<p>" + _LANGAGE.copyPaste3 + "</p></div>";
   }
   

   _content += "<div><textarea id='textareaCopy' style='width:100%;' rows='10' cols='40'>" + _textAuthorised + "</textarea></div>";

   _content += "</div>";
   
   
   $("#popupContainerCopy").html(_content);
 
   $( "#popupContainerCopy" ).dialog({ 
         width: 600, 
         height: 'auto',
         position: 'center',
         modal: true,
         title: 'Copie de texte',
         resizable: false,
         
         hide: 'fade',
         show: 'fade',
         autoOpen: false,
         open: function() {
               $(".ui-dialog").css("box-shadow","#999999 3px 3px 3px");
         },
         buttons: { "Fermer": {
                         text: _LANGAGE.popupFermer, 
                         click: function () {
                                 $(this).dialog("close");
                                 _LIST_THEME_ISDISPLAYED=false;
                         }
                 }
         }
   });
   $( "#popupContainerCopy" ).dialog("open");
   if (!window.clipboardData) {
      document.getElementById("textareaCopy").focus();
      document.getElementById("textareaCopy").select();
   }
}
function getSelectedText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    //var _nbrCharsAutorised = parseInt(_USER_CUTANDPASTELINES) *100;
    //text=text.substring(0,_nbrCharsAutorised);
    return text;
}

function showQuickMessage(_message) {
   // On affiche le message
   var quickMessageId = document.getElementById('quickMessage');
   quickMessageId.innerHTML = _message;
   $("#quickMessage").css("visibility","visible");
  // $(".background", quickMessageId).stop().animate({opacity:1});
   $('#quickMessage').stop().animate({opacity:1},800);
    
   // On l'efface 8 secondes plus tard
   setTimeout(function() {
     
      $('#quickMessage').stop().animate({opacity:0},800);
     // $("#quickMessage").css("visibility","hidden");
    
   },1500);
    setTimeout(function() {
     
      //$('#quickMessage').stop().animate({opacity:0},300);
       document.getElementById('quickMessage').innerHTML = "";
      $("#quickMessage").css("visibility","hidden");
     document.getElementById('quickMessage').innerHTML = "";
   },2500);
}
function showMessage(_title, _message) {
		
		
	
   var _content = "<table style='background:#FFFFFF;font-size:14px;'><tr><td valign='top' style='width:40px;background:#FFFFFF;'><img src='./icones/info_32x32.png'/></td><td style='background:#FFFFFF;'>" + _message + "</td></tr></table>";
   
   var elementPopup=document.getElementById("error");
   elementPopup.innerHTML=_content;
		
   $( "#error" ).dialog({ 
         width: 300, 
         height:'auto',
         position: 'center',
         modal: true,
         title: _title,
         resizable: false,
         
         hide: 'fade',
         show: 'fade',
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

function isBookmarkPossible() {
   if (_ACCOUNT.connectionType == "1") {
      if (localStorage) {
         return true;
      } else {
         return false;
      }
   } else {
      return true;
   }
  
   return false;
}
/*==============================================
 Gestion de la fenêtre et des positions
 ================================================*/
window.onscroll = function() {
    var scroll = (document.documentElement.scrollTop ||
        document.body.scrollTop);
    var test1 = parseInt($(window).height()) - 220 + scroll;
    var _topRechercheContainer = 205 - scroll;
    var _topPopupToolbar = 142 - scroll;
    
    if(scroll>100) {
         //document.getElementById('header2').style.top = scroll+'px';
          document.getElementById('header2').style.position = 'fixed';
         document.getElementById('header2').style.top = '-60px';
         document.getElementById('contentSommaire').style.position = 'fixed';
         document.getElementById('contentSommaire').style.top = '70px';
         document.getElementById('rechercheContainer').style.top = '105px';
         document.getElementById('lateralToolbar').style.top = '105px';
         document.getElementById('popupToolbar').style.top = '42px';
         //document.getElementById('lateralPanel').style.top = '105px';
         //var lateralPanelHeight =  parseInt($(window).height()) + parseInt($("#lateralPanel").position().top);
         //alert(lateralPanelHeight);
         //$("#tabsLateralPanel").height(lateralPanelHeight);
        // $("#tabsLateralPanel").height(lateralPanelHeight);
        // $( "#tabsLateralPanel" ).tabs( "refresh" );
         

         if(_CONTEXT=="ARTICLE") {
            _CURRENT_ARTICLE_SCROLL=scroll;
         }
    } else {
         //$("#header2").animate({top:"40px"},'fast');
         document.getElementById('header2').style.position = 'absolute';
         document.getElementById('header2').style.top = '40px';
         document.getElementById('contentSommaire').style.position = 'absolute';
         document.getElementById('contentSommaire').style.top = '0px';
         $("#contentSommaire").height(test1);
         document.getElementById('rechercheContainer').style.top = _topRechercheContainer + 'px';
         document.getElementById('lateralToolbar').style.top = _topRechercheContainer + 'px';
         document.getElementById('popupToolbar').style.top = _topPopupToolbar + 'px';
         //document.getElementById('lateralPanel').style.top = _topRechercheContainer + 'px';
         //_topRechercheContainer = 205 - scroll;
         
         //var lateralPanelHeight =  parseInt($(window).height()) + parseInt($("#lateralPanel").position().top);
         //alert(lateralPanelHeight);
         //$("#tabsLateralPanel").height(lateralPanelHeight);
         //$("#tabsLateralPanel").height(lateralPanelHeight);
        // $( "#tabsLateralPanel" ).tabs( "refresh" );
         
    }
}
window.onresize = function() {
   var test1 = parseInt($(window).height()) - 220;
    $("#contentSommaire").height(test1);
      ajustContentMargin();
      
  
}
function ajustContentMargin() {
    var contentGeneralMarginLeft = 0;
    var contentGeneralWidth = 0;
    
   //  var lateralPanelHeight =  parseInt($(window).height()) - parseInt($("#lateralPanel").position().top) - 50;
   //alert(lateralPanelHeight);
   //$("#tabsLateralPanel").height(lateralPanelHeight);
   //$("#tabs_lateralSommaire").height(lateralPanelHeight);
  // $( "#tabsLateralPanel" ).tabs( "refresh" );
   
    contentGeneralMarginLeft = (parseInt($(window).width()) / 2) - 380;
    if ((contentGeneralMarginLeft <= 300) && _RECHERCHE_SHOWN) {
      contentGeneralMarginLeft = 300;
    }
    if (!_RECHERCHE_SHOWN) {
      contentGeneralMarginLeft = (parseInt($(window).width()) / 2) - 380;
    }
    $("#contentGeneral").css({'margin-left': contentGeneralMarginLeft});
    //var contentGeneralMarginLeft = (parseInt($(window).width()) / 2) - 350;
    
    // $("#contentGeneral").stop().animate({marginLeft: contentGeneralMarginLeft + 'px'},300);
    $("#contentGeneral").css({
         'margin-left': contentGeneralMarginLeft
         });
   
   // var _left = contentGeneralMarginLeft + 'px';
    //$("#contentGeneral").animate({'left': contentGeneralMarginLeft},'slow');
    
   var test1 = parseInt($(window).height()) - 220;
    $("#contentSommaire").height(test1);
}


/*==============================================
 Non utilisé
 ================================================*/
function displayTooltip(_id, _content) {
   $( '#' +  _id).tooltip();
}

