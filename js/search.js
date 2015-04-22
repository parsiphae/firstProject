function sectionSearchToggleOLD(uid, isOpen, title) {
   // alert (uid + "-" + _SEARCH_CURRENTFORM);
   var idDivContent = "sectionContent" + uid;
    var idDivTitle = "titreSection" + uid;
   
   $('#' + idDivContent).slideToggle('fast');
   alert(_SEARCH_CURRENTFORM);
    if (uid == '1') {
      if (_SEARCH_CURRENTFORM == 1) {
         $("#titreSection1").css("background-image","url(./images/plusBlack.png)");
         _SEARCH_CURRENTFORM=0;
         //alert (uid + "-" + _SEARCH_CURRENTFORM);
         return;
      }
      if (_SEARCH_CURRENTFORM == 2) {
         $("#sectionContent2").slideUp("fast");
         $("#titreSection2").css("background-image","url(./images/plusBlack.png)");
         $("#titreSection1").css("background-image","url(./images/minusBlack.png)");
         _SEARCH_CURRENTFORM=1;
        // alert (uid + "-" + _SEARCH_CURRENTFORM);
         $("#toolsContainer").html("");
         closePopupTheme();
         return;
      }
      if (_SEARCH_CURRENTFORM == 0) {
         _SEARCH_CURRENTFORM=1;
      }
      
      return;
      
   }
   
   if (uid == '2') {
      if (_SEARCH_CURRENTFORM == 2) {
         $("#titreSection2").css("background-image","url(./images/plusBlack.png)");
         _SEARCH_CURRENTFORM=0;
          //alert (uid + "-" + _SEARCH_CURRENTFORM);
         return;
      }
      if (_SEARCH_CURRENTFORM == 1) {
         // alert("test");
         $("#sectionContent1").slideUp("fast");
        
         $("#titreSection1").css("background-image","url(./images/plusBlack.png)");
         $("#titreSection2").css("background-image","url(./images/minusBlack.png)");
         _SEARCH_CURRENTFORM=2;
         // alert (uid + "-" + _SEARCH_CURRENTFORM);
         return;
      }
      if (_SEARCH_CURRENTFORM == 0) {
         _SEARCH_CURRENTFORM=2;
      }
     
     return;
      //$("#titreSection0").style.background="#444444 url(&quot;/sites/all/themes/aeurope/imagesTheme/plusBlack.png&quot;) no-repeat 99% 2px";
      //alert ($("#titreSection0").style.background);
   }
  /* if (uid != '1') {
      $("#sectionContent1").slideUp("fast");
       $("#titreSection1").css("background-image","url(/sites/all/themes/aeurope/imagesTheme/plusBlack.png)");
   }*/
  
}
function sectionSearchToggle(_currentForm, title) {
   // alert (uid + "-" + _SEARCH_CURRENTFORM);
    var idDivContent = "sectionContent" + _currentForm;
    var idDivTitle = "titreSection" + _currentForm;
   // alert("_SEARCH_CURRENTFORM: " + _SEARCH_CURRENTFORM + "     _currentForm: " + _currentForm);
    closePopupTheme();
   if (_SEARCH_CURRENTFORM == 0) { // Les 2 fermés
      $('#sectionContent' + _currentForm).slideToggle('fast'); // Ouvre le bon
      $('#titreSection' + _currentForm).css("background-image","url(./images/minusBlack.png)"); // Met un moins sur l'onglet ouvert
      _SEARCH_CURRENTFORM = _currentForm;
      return;
   }
   if ((_SEARCH_CURRENTFORM == 1) && (_currentForm == 1)) {
      $('#sectionContent1').slideToggle('fast');
      $('#titreSection1').css("background-image","url(./images/plusBlack.png)"); // Met un plus sur l'onglet fermé
      _SEARCH_CURRENTFORM = 0;
      return;
   }
    if ((_SEARCH_CURRENTFORM == 2) && (_currentForm == 2)) {
      $('#sectionContent2').slideToggle('fast');
      $('#titreSection2').css("background-image","url(./images/plusBlack.png)"); // Met un plus sur l'onglet fermé
      _SEARCH_CURRENTFORM = 0;
      return;
   }
   if ((_SEARCH_CURRENTFORM == 1) && (_currentForm == 2)) {
      $('#sectionContent1').slideToggle('fast'); // ferme l'onglet 1
      $('#titreSection1').css("background-image","url(./images/plusBlack.png)"); // Met un plus sur l'onglet 1
      $('#sectionContent2').slideToggle('fast'); // Ouvre l'onglet 1
      $('#titreSection2').css("background-image","url(./images/minusBlack.png)"); // Met un moins sur l'onglet 2
      _SEARCH_CURRENTFORM = _currentForm;
       return;
   }
    if ((_SEARCH_CURRENTFORM == 2) && (_currentForm == 1)) {
      $('#sectionContent1').slideToggle('fast'); // Ouvre l'onglet 1
       $('#titreSection1').css("background-image","url(./images/minusBlack.png)"); // Met un moins sur l'onglet 1
      $('#sectionContent2').slideToggle('fast'); // Ferme l'onglet 1
       $('#titreSection2').css("background-image","url(./images/plusBlack.png)"); // Met un plus sur l'onglet 2
      _SEARCH_CURRENTFORM = _currentForm;
       return;
   }
 
   /*  $("#titreSection1").css("background-image","url(./images/plusBlack.png)");
     $("#titreSection1").css("background-image","url(./images/minusBlack.png)");
     $("#toolsContainer").html("");
     $('#' + idDivContent).slideToggle('fast');
   */
  
  
}
/*==================================================================
 * FORM RECHERCHE
 * ==================================================================*/
function showRechercheForm() {
   _POPUPTOOLBAR.doCloseInstantly();
   if (!_ACCOUNT.isConnected) {
      return;
   }
   var contentGeneralMarginLeft = (parseInt($(window).width()) / 2) - 380;
   if (!_RECHERCHE_SHOWN) {
      $("#secondToolbar").html("");
      // $("#rechercheContainer").html(_SEARCH_FORM);
      _LANGAGE.doTranslateSearchForm();
     
      if (contentGeneralMarginLeft <= 300) {
         contentGeneralMarginLeft = 300;
         $("#contentGeneral").animate({'margin-left': contentGeneralMarginLeft},'slow');
      }
    
      $("#rechercheContainer").animate({'left': '10px'},'slow');
      $("#lateralToolbar").animate({'left': '260px'},'slow');
      
      _RECHERCHE_SHOWN=true;
      if (_RECHERCHE_LAST_CONTENT != "") {
         $("#contentGeneral").css("background-image","url(./icones/black/searchZoom_16x16.png)");
         $("#contentGeneral").html(_RECHERCHE_LAST_CONTENT);
         
         $( "#tabs_listePub" ).tabs();
         $("a[href='#tabsBulletin']").text(_LANGAGE.listeBulletin_bulletinName + " (" + _SEARCH_NBR_BULLETIN + ")");
         $("a[href='#tabsEdd']").text(_LANGAGE.listeBulletin_eddName + " (" + _SEARCH_NBR_EDD + ")");
         
         $("#tabs_listePub").tabs('option','selected',_SEARCH_TAB);
         
         $('#tabs_listePub').bind('tabsselect', function(event, ui) {
            _SEARCH_TAB = ui.index;
            //alert('_SEARCH_TAB : ' + _SEARCH_TAB);
        });
      }
      /*--------------------------------------------------------------
       * Bind le champs theme à la liste en francais ou en anglais
       * ------------------------------------------------------------*/
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
      
      _MAINTOOLBAR_ITEMSELECTED=1;
      displayLateralToolbar("SEARCH");
      
   } else {
     
      $("#contentGeneral").animate({'margin-left': contentGeneralMarginLeft},'slow');
      $("#rechercheContainer").animate({'left': '-400px'},'slow');
       $("#lateralToolbar").animate({'left': '0px'},'slow');
      _RECHERCHE_SHOWN=false;
      closePopupTheme();
       //_MAINTOOLBAR_ITEMSELECTED=0;
   }
  
   loadMainToolbar();
   
   
}
function hideRechercheForm() {
    
}
function loadRechercheForm() {
   var content = "";
  
    $("#rechercheContainer").css({
         'position': 'fixed',
         'top': '205px',
         'left': '-400px',
         'border': '1px solid #000000',
         'min-width' : '250px',
         'width' : '250px',
         'height' : '400px',
         'background-color' : '#FFFFFF'
      });
   //$("#rechercheContainer").stop().animate({fontSize: '1em'},300);

   /* Recherche Bulletins par NumBulletin
    * ===================================*/
   content += "<div id='titreSection1' style=\"background: url(/sites/all/themes/aeurope/imagesTheme/minusBlack.png) no-repeat scroll 99% 2px rgb(57, 66, 65); cursor: pointer;\" class=\"titreSection\" onclick=\"sectionSearchToggle('1','Bulletin par N°');\" onmouseover=\"sectionHover('1');\">Recherche par publication</div>";
   content += "<div id='sectionContent1' style=\"display:block;\">";
   content += "<div class='formSearchDiv'>";
      /*------------------------
       * N° publication
       * ----------------------*/
      content += "<div id='labelnumPub' class='formSearchlabel'>N° publication</div>";

      content += "<div style='height:40px;'>";
      
         content += "<div style='float:left;'>";
         content += "<input id='formSearchNumBulletin1' name='formSearchNumBulletin1' style='width:95px;' class='formSearchInputfield' maxlength='5' value='' type='text'>";
         content += "</div>";
         
         content += "<div id='labelA1' style='float:left;margin-left:7px;'>";
         content += "à";
         content += "</div>";
         
         content += "<div style='float:left;margin-left:7px;'>";
         content += "<input id='formSearchNumBulletin2' name='formSearchNumBulletin2' style='width:95px;' class='formSearchInputfield' maxlength='5' value='' type='text'>";
         content += "</div>";
      content += "</div>";
      
      /*------------------------
       * Par Dates
       * ----------------------*/
      content += "<div id='searchLabelDate1' class='formSearchlabel'>Date (jj/mm/aaaa)</div>";
      content += "<div style='height:40px;'>";
      
         content += "<div style='float:left;'>";
         content += "<input id='formSearchPubDate1' name='formSearchPubDate1' style='width:95px;' class='formSearchInputfield' value='' type='text'>";
         content += "</div>";
         
         content += "<div id='labelA2' style='float:left;margin-left:7px;'>";
         content += "à";
         content += "</div>";
         
         content += "<div style='float:left;margin-left:7px;'>";
         content += "<input id='formSearchPubDate2' name='formSearchPubDate2' style='width:95px;' class='formSearchInputfield' value='' type='text'>";
         content += "</div>";
      content += "</div>";
       /*-----------------------------------
       * Bouton recherche par publication
       * ----------------------------------*/
      content += "<div style='clear:both;'>";
         content += "<div id='labelButtonSearch1' class='formSearchButton' onclick=\"searchBulletin();\">";
         content += "Recherche";
         content += "</div>";
      content += "</div>";
   //content += "<div class="comment">La surface de toiture disponible détermine la puissance crête maximale pouvant être installée.</div>
   content += "</div>"; //formSearchDiv
   content += "</div>"; //sectionContent0
   content += "</div>"; //titreSection0
   
   /* Recherche Bulletins par Dates
    * ============================================*/
  /* content += "<div id=\"titreSection1\" style=\"background: url(&quot;/sites/all/themes/aeurope/imagesTheme/plusBlack.png&quot;) no-repeat scroll 99% 2px rgb(57, 66, 65); cursor: pointer;\" class=\"titreSection\" onclick=\"sectionSearchToggle('1','0','Bulletin par dates');\" onmouseover=\"sectionHover('0');\">Recherche des Bulletins par dates</div>";
   content += "<div id=\"sectionContent1\" style=\"display:none;\">";
   content += "<div class='formSearchDiv'>";
   content += "Dates";
    content += "</div>"; //formSearchDiv
   content += "</div>"; //sectionContent0
   content += "</div>"; //titreSection0
   */
   
   /*================================================
    * Recherche Articles
    * ============================================*/
   content += "<div id='titreSection2' style=\"background: url(/sites/all/themes/aeurope/imagesTheme/plusBlack.png) no-repeat scroll 99% 2px rgb(57, 66, 65); cursor: pointer;\" class=\"titreSection\" onclick=\"sectionSearchToggle('2','Articles');\" onmouseover=\"sectionHover('1');\">Recherche par articles</div>";
   content += "<div id='sectionContent2' style=\"display:none;\">";
   content += "<div class='formSearchDiv'>";
   
      /*------------------------
       * Par Dates
       * ----------------------*/
      content += "<div  id='searchLabelDate2' class='formSearchlabel'>Date (jj/mm/aaaa)</div>";
      content += "<div style='height:40px;'>";
      
         content += "<div style='float:left;'>";
         content += "<input id='formSearchArticlePubDate1' name='formSearchArticlePubDate1' style='width:95px;' class='formSearchInputfield' value='' type='text'>";
         content += "</div>";
         
         content += "<div id='labelA3' style='float:left;margin-left:7px;'>";
         content += "à";
         content += "</div>";
         
         content += "<div style='float:left;margin-left:7px;'>";
         content += "<input id='formSearchArticlePubDate2' name='formSearchArticlePubDate2' style='width:95px;' class='formSearchInputfield' value='' type='text'>";
         content += "</div>";
      content += "</div>";
      /*------------------------
      * Texte
      * ----------------------*/
      content += "<div style='height:90px;'>";
         content += "<div id='labelText' class='formSearchlabel'>Texte recherché</div>";
         content += "<div>";
         content += "<input id='formSearchStringArticle' name='formSearchStringArticle' style='width:220px;' class='formSearchInputfield' value='' type='text'>";
         content += "</div>";
         
         content += "<div style='block:inside;'>";
         content += "<span id='searchTitleButton' class='menuContentButtonActive' onclick=\"setSearchOption('_SEARCH_TITLE','YES');\">";
         content += "Dans le titre</span>";
         content += "<span id='searchTextButton' class='menuContentButton' onclick=\"setSearchOption('_SEARCH_TEXT','YES');\">Dans le texte</span>";
         content += "</div>";
         
        
      
      content += "</div>";
      
       /* Theme
       * ======================*/
      content += "<div style='height:60px;'>";
         content += "<div id='labelTheme' class='formSearchlabel'>Thème</div>";
         content += "\n<div style='float:left;'>";
            content += "\n<input id='formSearchStringTheme' name='formSearchStringTheme' style='width:203px;' class='formSearchInputfield' value='' type='text'>";
         content += "\n</div>";
         content += "\n<div id='puceInfo' onclick=\"showPopupTheme();\"></div>";
         
      content += "</div>";
      
      content += "<div style='clear:both;'>";
         content += "<div id='labelButtonSearch2' class='formSearchButton' onclick=\"loadListeArticle();\">";
         content += "Recherche";
         content += "</div>";
      content += "</div>";
         
    content += "</div>"; //formSearchDiv
   content += "</div>"; //sectionContent0
   content += "</div>"; //titreSection0
   
   content+="<div id='toolsContainer' style='position: absolute; bottom: 0;background:#EEEEEE;width:230px;height:70px;padding:0px 10px 0px 10px;border-top:1px solid #dddddd;'></div>";
   
   //$("#rechercheContainer").html(content);
   _SEARCH_FORM = content;
   $("#rechercheContainer").html(content);
   
   $( "#formSearchPubDate1" ).datepicker({ dateFormat: "d/m/yy" });
   $( "#formSearchPubDate2" ).datepicker({ dateFormat: "d/m/yy" });
   $( "#formSearchArticlePubDate1" ).datepicker({ dateFormat: "d/m/yy" });
   $( "#formSearchArticlePubDate2" ).datepicker({ dateFormat: "d/m/yy" });
   
}

function setSortOption(toolName,toolValue) {
   if (toolName == "_SORTFIELD") {
      if ((_SORTFIELD == "") || (_SORTFIELD != toolValue)) {
         _SORTFIELD = toolValue;
      } else {
         _SORTFIELD="";
      } 
   }
  
   doDisplayOutilArticle();
   loadListeArticle();
}

function setSearchOption(toolName,toolValue) {
   if (toolName == "_SEARCH_TITLE") {
      if ((_SEARCH_TITLE == "") || (_SEARCH_TITLE == "NO")) {
         _SEARCH_TITLE = "YES";
         $("#searchTitleButton").attr('class', 'menuContentButtonActive');
        
      } else {
         _SEARCH_TITLE="";
         $("#searchTitleButton").attr('class', 'menuContentButton');
         _SEARCH_TEXT = "YES";
         $("#searchTextButton").attr('class', 'menuContentButtonActive');
        
      } 
   }
   
    if (toolName == "_SEARCH_TEXT") {
      if ((_SEARCH_TEXT == "") || (_SEARCH_TEXT == "NO")) {
         _SEARCH_TEXT = "YES";
         $("#searchTextButton").attr('class', 'menuContentButtonActive');
        
      } else {
         _SEARCH_TEXT="";
         $("#searchTextButton").attr('class', 'menuContentButton');
         _SEARCH_TITLE = "YES";
         $("#searchTitleButton").attr('class', 'menuContentButtonActive');
        
      } 
   }

}


/*=============================================
 * THEME
 * ==============================================*/
function loadListTheme() {
    $.ajax({
      type:"get",
      url:"./php/loadListeTheme.php",
     // data: "searchString=" + _searchString + "&SORTFIELD=" + _SORTFIELD + "&SEARCH_TITLE=" + _SEARCH_TITLE + "&SEARCH_TEXT=" + _SEARCH_TEXT,
      success: function(data){
         //alert(data);
         var var1= stripAccents(data);
         var tabData = var1.split("###");
         var tabDataFr = tabData[0].split("@@@");
         var tabDataEn = tabData[1].split("@@@");
         _LIST_THEME_FR = tabDataFr;
         _LIST_THEME_FILTERED_FR = tabDataFr;
         _LIST_THEME_EN = tabDataEn;
         _LIST_THEME_FILTERED_EN = tabDataEn;
      }
  });
}

function stripAccents(s) {
   return s.toLowerCase().replace(/[éèêë]/g,"e")
   .replace(/[àâä]/g,"a")
   .replace(/[îï]/g,"i")
   .replace(/[ôö]/g,"o")
   .replace(/œ/g,"oe")
   .replace(/[ùûü]/g,"u")
   .replace(/[ç]/g,"c")
   .replace(/[ñ]/g,"n");
}

function resfreshPopupTheme() {
    var _content = "";
   /*if (!_LIST_THEME_ISDISPLAYED) {
      showPopupTheme();
      $('#formSearchStringTheme').focus();
   }*/
   //if (_LIST_THEME_ISDISPLAYED) {
   var themeValue = stripAccents(document.getElementById("formSearchStringTheme").value);
      if (_LANGAGE.langage == "fr") {
         if (_LIST_THEME_FILTERED_FR.length > 0) {
            for (i in _LIST_THEME_FILTERED_FR) {
               //_content+=_LIST_THEME[i] + " ---<br/>";
            //alert(_LIST_THEME_FILTERED_FR[i]);
               _content += "\n\n<div id='listeTitreTheme' onClick=\"selectTheme(\'" + i + "\','fr');\">";
               _content += getHighlight(_LIST_THEME_FILTERED_FR[i], themeValue); //_LIST_THEME_FILTERED[i];
               _content += "\n</div>";
            }
         } else {
            _content = "\n\n<div style='margin:10px;font-family:Verdana;'>" + _LANGAGE.searchForm_noTheme + "</div>";
         }
      }
      if (_LANGAGE.langage == "en") {
         if (_LIST_THEME_FILTERED_EN.length > 0) {
            for (i in _LIST_THEME_FILTERED_EN) {
               //_content+=_LIST_THEME[i] + " ---<br/>";
               
               _content += "\n\n<div id='listeTitreTheme' onClick=\"selectTheme(\'" + i + "\','en');\">";
               _content += getHighlight(_LIST_THEME_FILTERED_EN[i], themeValue); //_LIST_THEME_FILTERED[i];
               _content += "\n</div>";
            }
         } else {
            _content = "\n\n<div style='margin:10px;font-family:Verdana;'>" + _LANGAGE.searchForm_noTheme + "</div>";
         }
      }
     // alert(_content);
     _LIST_THEME_CONTENT=_content;
     if (_LIST_THEME_ISDISPLAYED) {
         $("#themeContainer").html(_LIST_THEME_CONTENT);
     }
   //}
}

function filterTheme(value) {

  var _themeSearch = stripAccents($('#formSearchStringTheme').val().toLowerCase());
  var _theme = value.toLowerCase();
  var _length = $('#formSearchStringTheme').val().length;
  
  var reg1=new RegExp(_themeSearch,"i");
   if (value.match(reg1)) {
      return true; 
   } else {
      return false;
   }
}

function showPopupTheme() {
   var _content = "";
  // var _themeSearch = $('#formSearchStringTheme').val().toLowerCase();
   //_LIST_THEME_FILTERED = _LIST_THEME.filter(filterTheme);
   resfreshPopupTheme();
 
  
 /* var themeValue = document.getElementById("formSearchStringTheme").value;
   for (i in _LIST_THEME_FILTERED) {
      
      _content += "\n\n<div id='listeTitreTheme' onClick=\"selectTheme('" + _LIST_THEME_FILTERED[i] + "');\">";
      _content += getHighlight(_LIST_THEME_FILTERED[i], themeValue);
      _content += "\n</div>";
   }
    */
   $("#themeContainer").html(_LIST_THEME_CONTENT);

   $( "#themeContainer" ).dialog({ 
         width: 250, 
         height: 400,
         position: [268,205],
         modal: false,
         title: '',
         resizable: false,
         
         hide: 'fadeOut',
         show: 'fadeIn',
         autoOpen: false,
         open: function() {
               $(".ui-dialog").css("box-shadow","#444444 3px 3px 3px");
               $(".ui-dialog").css("position","fixed");
         },
         buttons: { "Fermer": {
                         text: _LANGAGE.popupFermer, 
                         click: function () {
                                 $(this).dialog("close");
                                 _LIST_THEME_ISDISPLAYED=false;
                         }
                 }
         }
   }).siblings('.ui-dialog-titlebar').remove();
   $( "#themeContainer" ).dialog("open");
   _LIST_THEME_ISDISPLAYED=true;
}
/*function showPopupSommaire() {
   var _content = "";
 
   $("#sommaireContainer").html(_BULLETIN.sommaire);

   $( "#sommaireContainer" ).dialog({ 
         width: 250, 
         height: 400,
         position: [268,205],
         modal: false,
         title: '',
         resizable: false,
         
         hide: 'fade',
         show: 'fade',
         autoOpen: false,
         open: function() {
               $(".ui-dialog").css("box-shadow","#444444 3px 3px 3px");
               $(".ui-dialog").css("position","fixed");
         },
         buttons: { "Fermer": {
                         text: _LANGAGE.popupFermer, 
                         click: function () {
                                 $(this).dialog("close");
                                 //_LIST_THEME_ISDISPLAYED=false;
                         }
                 }
         }
   }).siblings('.ui-dialog-titlebar').remove();
   $( "#sommaireContainer" ).dialog("open");
   
}*/
function getHighlightOLD(_text, _expression) {
  var _textLower = _text.toLowerCase();
  var _expressionLower = _expression.toLowerCase();
  var _result = _textLower.replace(_expressionLower,"<FONT style='background:#FFFFFF;color:#007ED2;'>" + _expressionLower + "</FONT>");
  return _result.toUpperCase();
}

function getHighlight(value, term) {
        // Strip accents from 'term' for an accents-insensitive search
        term = stripAccents(term);

        var value_no_accents = stripAccents(value);
        var everything_except_term = value_no_accents.split(new RegExp(term,"gi"));
        var highlighted_value = '';
        var current_position = 0;

        for (var n in everything_except_term)
        {
                // Get the part with accents, since they were stripped to make the comparisson using RegExp, and add it to the final value
                var part_no_accents = everything_except_term[n];
                var part = value.substr(current_position,part_no_accents.length);  //--- this one with accents!!!
                highlighted_value += part;

                // Add the part length to the current position
                current_position += part.length;

                // If its not the last part, add the accented and highlighted term to the final value
                if (n < everything_except_term.length - 1)
                {
                        // Get the term with the original accentuation and add it highlighted to the final value
                        var termo_local = value.substr(current_position, term.length);
                        highlighted_value += "<strong>" + termo_local + "</strong>";

                        // Update the current position
                        current_position += term.length;
                }
        }

        return highlighted_value;
}
/*function highlightString2(searchString, content) {
  searchString = "dés";
   
   var pattern = regexAccents(searchString);
   
      
   var replacement = "<font style='background:#007ED2;color:#ffffff;'>$1</font>";
   alert (pattern);
   var returnContent = content.replace("/(" + pattern + ")/i", replacement);
   
   return $returnContent;
}

function regexAccents(chaine) {
       var accent = new Array('a','à','á','â','ã','ä','å','c','ç','e','è','é','ê','ë','i','ì','í','î','ï','o','ð','ò','ó','ô','õ','ö','u','ù','ú','û','ü','y','ý','ý','ÿ');
       var inter = new Array('%01','%02','%03','%04','%05','%06','%07','%08','%09','%10','%11','%12','%13','%14','%15','%16','%17','%18','%19','%20','%21','%22','%23','%24','%25','%26','%27','%28','%29','%30','%31','%32','%33','%34','%35');
       var regex = new Array('(a|à|á|â|ã|ä|å)','(a|à|á|â|ã|ä|å)','(a|à|á|â|ã|ä|å)','(a|à|á|â|ã|ä|å)','(a|à|á|â|ã|ä|å)','(a|à|á|â|ã|ä|å)','(a|à|á|â|ã|ä|å)',
    '(c|ç)','(c|ç)',
    '(è|e|é|ê|ë)','(è|e|é|ê|ë)','(è|e|é|ê|ë)','(è|e|é|ê|ë)','(è|e|é|ê|ë)',
    '(i|ì|í|î|ï)','(i|ì|í|î|ï)','(i|ì|í|î|ï)','(i|ì|í|î|ï)','(i|ì|í|î|ï)',   '(o|ð|ò|ó|ô|õ|ö)','(o|ð|ò|ó|ô|õ|ö)','(o|ð|ò|ó|ô|õ|ö)','(o|ð|ò|ó|ô|õ|ö)','(o|ð|ò|ó|ô|õ|ö)','(o|ð|ò|ó|ô|õ|ö)','(o|ð|ò|ó|ô|õ|ö)',         '(u|ù|ú|û|ü)','(u|ù|ú|û|ü)','(u|ù|ú|û|ü)','(u|ù|ú|û|ü)',
    '(y|ý|ý|ÿ)','(y|ý|ý|ÿ)','(y|ý|ý|ÿ)','(y|ý|ý|ÿ)');
       
       chaine = chaine.replace(accent, inter);
       chaine = chaine.replace(inter, regex);      
       return chaine;
}
*/
function stripAccentsOLD(str)
{
        var rExps=[
        {re:/[\xC0-\xC6]/g, ch:'A'},
        {re:/[\xE0-\xE6]/g, ch:'a'},
        {re:/[\xC8-\xCB]/g, ch:'E'},
        {re:/[\xE8-\xEB]/g, ch:'e'},
        {re:/[\xCC-\xCF]/g, ch:'I'},
        {re:/[\xEC-\xEF]/g, ch:'i'},
        {re:/[\xD2-\xD6]/g, ch:'O'},
        {re:/[\xF2-\xF6]/g, ch:'o'},
        {re:/[\xD9-\xDC]/g, ch:'U'},
        {re:/[\xF9-\xFC]/g, ch:'u'},
        {re:/[\xD1]/g, ch:'N'},
        {re:/[\xF1]/g, ch:'n'} ];

        for(var i=0, len=rExps.length; i<len; i++)
                str=str.replace(rExps[i].re, rExps[i].ch);

        return str;
} 
function closePopupTheme() {
   if ($('#themeContainer').hasClass('ui-dialog-content')) {
      if ($("#themeContainer").dialog( "isOpen" )===true) {
         $( "#themeContainer" ).dialog("close");
         _LIST_THEME_ISDISPLAYED = false;
        // alert("test");
         $( "#themeContainer" ).html("");
      }
   }
   
}
function selectTheme(index, langage) {
   //_LIST_THEME_FILTERED_FR
   //alert(_LIST_THEME_FILTERED_FR[index]);
   var theme = "";
   if (langage == 'fr') {
      theme = _LIST_THEME_FILTERED_FR[index];
   } else {
      theme = _LIST_THEME_FILTERED_EN[index];
   }
   $( "#themeContainer" ).dialog("close");
   document.getElementById("formSearchStringTheme").value=theme;
   _LIST_THEME_ISDISPLAYED=false;
   
}

/*-----------------------------------
 * DISPLAY ARTICLE SORT TOOLBAR
 * -----------------------------------*/
function doDisplayOutilArticle() {
    var _menuListeArticle = "";
    var _classButton="menuContentButton";
    _menuListeArticle="<div>Tri</div>";
    _menuListeArticle += "<div>";
    if (_SORTFIELD == 'ARTICLE_TITLE') {
      _classButton="menuContentButtonActive";
    } else {
      _classButton="menuContentButton";
    }
   _menuListeArticle += "<span class='" + _classButton + "' onclick=\"setSortOption('_SORTFIELD','ARTICLE_TITLE');\">Par titre</span>";
   
   if (_SORTFIELD == 'THEME') {
      _classButton="menuContentButtonActive";
    } else {
      _classButton="menuContentButton";
    }
   _menuListeArticle += "<span class='" + _classButton + "' onclick=\"setSortOption('_SORTFIELD','THEME');\">Par thème</span>";
   
   if (_SORTFIELD == 'DATE') {
      _classButton="menuContentButtonActive";
    } else {
      _classButton="menuContentButton";
    }
   _menuListeArticle += "<span class='" + _classButton + "' onclick=\"setSortOption('_SORTFIELD','DATE');\">Par date</span>";
   _menuListeArticle += "</div>";
   
   $("#toolsContainer").html(_menuListeArticle);
}

function sectionHover(uid) {
   
     var idDiv = "#titreSection" + uid;
    $(idDiv).css('cursor','pointer');
    // alert("test");
}

