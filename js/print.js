/*=================================================
 * BULLETIN
 * ==================================================*/
function printClass() {
    this.bulletin = "";
    this.edd = "";
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
    
   
    
    this.doPrintArticle = function(_pubNum, _type, _articleNum, _lang) {
        if (_type == 1) {
            this.doPrintArticleBulletin(_pubNum, _type, _articleNum, _lang);
        }
        if (_type == 2) {
            this.doPrintArticleEdd(_pubNum, _type, _articleNum, _lang);
        }
    }

    this.printData = function printData(dataToPrint) {
        //alert ("2");
       // var contentPrint = $('#contentGeneral').html();
        var titlePrint = $('#secondToolbar_pubTitle').html(); 
        $('#contentPrint').html(dataToPrint);
        
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
    

    this.doPrintBulletin = function(_pubNum, _pubType, _pubLang) {
        if (_BULLETIN.data.isAllowed == "0") {
            this.preparePrintBulletin();
        }
     
        /*if ((this.num==_pubNum) && (this.type==_pubType) && (this.lang==_pubLang) && (_ACCOUNT.isConnected)) {
           return;
        }
        */
       /*
        var me = this;
       
        var cookieValue=doGetCookie("AE_Auth");
         
         var _data = "pubNum=" + _pubNum + "&pubType=" + _pubType + "&pubLang=" + _pubLang + "&cookieValue=" + cookieValue;
       
        $.ajax({
            type:"get",
            dataType:"json",
            url:"./php/loadPrintBulletin.php",
            data: _data,
            success: function(data){
                me.bulletin = data;
            },
            complete : function(resultat, statut){
                if (me.bulletin.isAllowed == "0") {
                     me.preparePrintBulletin();
                }
            }
        });
       */
    }
    this.preparePrintBulletin = function() {
       // alert(this.bulletin.numBulletin);
        var _content = "\n<div class='AEprint_BulletinTitle'>" + _BULLETIN.data.pubTitle + "</div>";
        /*----------------------------------------------
         SOMMAIRE
         ----------------------------------------------*/
        var _oldNumRubrique="";
        for (i=0; i < _BULLETIN.data.articles.length; i++) {
            if (_oldNumRubrique != _BULLETIN.data.articles[i].numRubrique) {
                _content += "<div class='AEprint_sommaireTitreRubrique'>" + _BULLETIN.data.articles[i].titleRubrique + "</div>";
                _oldNumRubrique=_BULLETIN.data.articles[i].numRubrique;
            }
            _content += "\n\n<div class='AEprint_sommaireTitreArticle'>";
            _content += "\n<span  class='AEprint_sommaireSubTitle'>"; 
            _content += "\n<b>" + _BULLETIN.data.articles[i].subTitle + "</b>";
            if (_BULLETIN.data.articles[i].title != "") {
                _content += ": ";
            }
            _content += "\n</span>";
            _content += "\n<span class='AEprint_sommaireTitle'>"; 
            _content += "\n" + _BULLETIN.data.articles[i].title;
            _content += "\n</span>";
            _content += "\n</div>";
            //alert(data.articles[i].content);
        }
         _content += "\n<BR>";
        /*----------------------------------------------
         BULLETIN
         ----------------------------------------------*/
        if (!_BULLETIN.isSommaire) {
            _oldNumRubrique="";
            for (i=0; i < _BULLETIN.data.articles.length; i++) {
                if (_oldNumRubrique != _BULLETIN.data.articles[i].numRubrique) {
                    _content += "<div class='AEprint_titreRubrique'>" + _BULLETIN.data.articles[i].titleRubrique + "</div>";
                    _oldNumRubrique=_BULLETIN.data.articles[i].numRubrique;
                }
                _content += "\n\n<div class='AEprint_titreArticle'>";
                _content += "\n<span  class='AEprint_subTitle'>"; 
                _content += "\n<b>" + _BULLETIN.data.articles[i].subTitle + "</b>";
                if (_BULLETIN.data.articles[i].title != "") {
                    _content += ": ";
                }
                _content += "\n</span>";
                _content += "\n<span class='AEprint_title'>"; 
                _content += "\n" + _BULLETIN.data.articles[i].title;
                _content += "\n</span>";
                _content += "\n</div>";
                
                _content += "<div class='AEprint_content'>" + _BULLETIN.data.articles[i].content + "</div>";
                _content += this.getNonDisseminationMessage();
                //alert(data.articles[i].content);
            }
        }
        this.printData(_content);
       //$("#contentGeneral").html(_content);
    }
    this.doPrintArticleBulletin = function(_pubNum, _pubType, _articleNum, _pubLang) {
        if (_ARTICLE.isAllowed == "0") {
            this.preparePrintArticleBulletin();
        }
     
        /*if ((this.num==_pubNum) && (this.type==_pubType) && (this.lang==_pubLang) && (_ACCOUNT.isConnected)) {
           return;
        }
        */
       
        /*var me = this;
       
        var cookieValue=doGetCookie("AE_Auth");
         
         var _data = "pubNum=" + _pubNum + "&pubType=" + _pubType + "&articleNum=" + _articleNum + "&pubLang=" + _pubLang + "&cookieValue=" + cookieValue;
        
        $.ajax({
            type:"get",
            dataType:"json",
            url:"./php/loadPrintArticleBulletin.php",
            data: _data,
            success: function(data){
                me.bulletin = data;
            },
            complete : function(resultat, statut){
                if (me.bulletin.isAllowed == "0") {
                     me.preparePrintArticleBulletin();
                }
            }
        });
        */
    }
    
    this.preparePrintArticleBulletin = function() {
       // alert(this.bulletin.numBulletin);
        var _content = ""; //"\n<div class='AEprint_BulletinTitle'>" + this.bulletin.pubTitle + "</div>";
       
        
        /*----------------------------------------------
         ARTICLE
         ----------------------------------------------*/
       // var _articleIndex = _ARTICLE.articleNum - 1;
        //for (i=0; i < _BULLETIN.data.articles.length; i++) {
           /* if (_oldNumRubrique != this.bulletin.articles[i].numRubrique) {
                _content += "<div class='AEprint_titreRubrique'>" + this.bulletin.articles[i].titleRubrique + "</div>";
                _oldNumRubrique=this.bulletin.articles[i].numRubrique;
            }*/
            _content += "\n\n<div class='AEprint_titreArticle'>";
            _content += "\n<span  class='AEprint_subTitle'>"; 
            _content += "\n<b>" + _ARTICLE.articleSubtitle + "</b>";
            if (_ARTICLE.articleTitle != "") {
                _content += ": ";
            }
            _content += "\n</span>";
            _content += "\n<span class='AEprint_title'>"; 
            _content += "\n" + _ARTICLE.articleTitle;
            _content += "\n</span>";
            _content += "\n</div>";
            
            _content += "<div class='AEprint_content'>" + _ARTICLE.content + "</div>";
            _content += this.getNonDisseminationMessage();
            //alert(data.articles[i].content);
        //}
        this.printData(_content);
       //$("#contentGeneral").html(_content);
    }
    
    /*================================================================================
     EDD
     ==================================================================================*/
    this.doPrintEdd = function(_pubNum, _pubType, _pubLang) {
        if (_EDD.data.isAllowed == "0") {
                     this.preparePrintEdd();
                }
     
        /*if ((this.num==_pubNum) && (this.type==_pubType) && (this.lang==_pubLang) && (_ACCOUNT.isConnected)) {
           return;
        }
        */
       /*
        var me = this;
        
        
        var cookieValue=doGetCookie("AE_Auth");
         
         var _data = "pubNum=" + _pubNum + "&pubType=" + _pubType + "&pubLang=" + _pubLang + "&cookieValue=" + cookieValue;
        
        $.ajax({
            type:"get",
            dataType:"json",
            url:"./php/loadPrintEdd.php",
            data: _data,
            success: function(data){
                me.edd = data;
            },
            complete : function(resultat, statut){
                if (me.edd.isAllowed == "0") {
                     me.preparePrintEdd();
                }
            }
        });
       */
    }
    this.preparePrintEdd = function() {
       // alert(this.bulletin.numBulletin);
        var _content = "\n<div class='AEprint_BulletinTitle'>" + _EDD.data.pubTitle + "</div>";
        /*----------------------------------------------
         SOMMAIRE
         ----------------------------------------------*/
        var _oldNumRubrique="";
        for (i=0; i < _EDD.data.articles.length; i++) {
            if (_oldNumRubrique != _EDD.data.articles[i].numRubrique) {
                _content += "<div class='AEprint_sommaireTitreRubrique'>" + _EDD.data.articles[i].titleRubrique + "</div>";
                _oldNumRubrique= _EDD.data.articles[i].numRubrique;
            }
            _content += "\n\n<div class='AEprint_sommaireTitreArticle'>";
            _content += "\n<span  class='AEprint_sommaireSubTitle'>"; 
            _content += "\n<b>" + _EDD.data.articles[i].subTitle + "</b>";
            if (_EDD.data.articles[i].title != "") {
                _content += ": ";
            }
            _content += "\n</span>";
            _content += "\n<span class='AEprint_sommaireTitle'>"; 
            _content += "\n" + _EDD.data.articles[i].title;
            _content += "\n</span>";
            _content += "\n</div>";
            //alert(data.articles[i].content);
        }
        _content += "\n<BR>";
        /*----------------------------------------------
         edd
         ----------------------------------------------*/
        if (!_EDD.isSommaire) {
            _oldNumRubrique="";
            for (i=0; i < _EDD.data.articles.length; i++) {
                if (_oldNumRubrique != _EDD.data.articles[i].numRubrique) {
                    _content += "<div class='AEprint_titreRubrique'>" + _EDD.data.articles[i].titleRubrique + "</div>";
                    _oldNumRubrique=_EDD.data.articles[i].numRubrique;
                }
                
                if (_EDD.data.articles[i].typeArticle == "1") {
                
                    _content += "\n\n<div class='AEprint_titreArticle'>";
                    _content += "\n<span  class='AEprint_subTitle'>"; 
                    _content += "\n<b>" + _EDD.data.articles[i].subTitle + "</b>";
                    if (_EDD.data.articles[i].title != "") {
                        _content += ": ";
                    }
                    _content += "\n</span>";
                    _content += "\n<span class='AEprint_title'>"; 
                    _content += "\n" + _EDD.data.articles[i].title;
                    _content += "\n</span>";
                    _content += "\n</div>";
                }
                _content += "<div class='AEprint_content'>" + _EDD.data.articles[i].content + "</div>";
                _content += this.getNonDisseminationMessage();
                //alert(data.articles[i].content);
            }
        }
        this.printData(_content);
       //$("#contentGeneral").html(_content);
    }
    this.doPrintArticleEdd = function(_pubNum, _pubType, _articleNum, _pubLang) {
        if (_ARTICLE.isAllowed == "0") {
            this.preparePrintArticleEdd();
        }
     
        /*if ((this.num==_pubNum) && (this.type==_pubType) && (this.lang==_pubLang) && (_ACCOUNT.isConnected)) {
           return;
        }
        */
       
       /*
        var me = this;
        
        
        var cookieValue=doGetCookie("AE_Auth");
         
         var _data = "pubNum=" + _pubNum + "&pubType=" + _pubType + "&articleNum=" + _articleNum + "&pubLang=" + _pubLang + "&cookieValue=" + cookieValue;
        
        $.ajax({
            type:"get",
            dataType:"json",
            url:"./php/loadPrintArticleEdd.php",
            data: _data,
            success: function(data){
                me.edd = data;
            },
            complete : function(resultat, statut){
                if (me.edd.isAllowed == "0") {
                     me.preparePrintArticleEdd();
                }
            }
        });
       */
    }
    this.preparePrintArticleEdd = function() {
        
       // alert(this.bulletin.numBulletin);
        var _content = ""; //\n<div class='AEprint_BulletinTitle'>" + this.edd.pubTitle + "</div>";
                
        /*----------------------------------------------
         edd
         ----------------------------------------------*/
       // var _articleIndex = _ARTICLE.articleNum - 1;
        
       // if (_EDD.data.articles[_articleIndex].typeArticle == "1") {
        
            _content += "\n\n<div class='AEprint_titreArticle'>";
            _content += "\n<span  class='AEprint_subTitle'>"; 
            _content += "\n<b>" + _ARTICLE.articleSubtitle + "</b>";
            if (_ARTICLE.articleTitle != "") {
                _content += ": ";
            }
            _content += "\n</span>";
            _content += "\n<span class='AEprint_title'>"; 
            _content += "\n" +_ARTICLE.articleTitle;
            _content += "\n</span>";
            _content += "\n</div>";
       // }
        _content += "<div class='AEprint_content'>" + _ARTICLE.content + "</div>";
        _content += this.getNonDisseminationMessage();
        
        this.printData(_content);
       
       
    }
    this.getNonDisseminationMessage = function() {
        var _content="";
        var _contentSubscriberTitle = "";
        if (_LANGAGE.langage == 'fr') {
            _contentSubscriberTitle = "Abonné: " + _ACCOUNT.title + "<br>COPYRIGHT AGENCE EUROPE© Toute distribution illégale sera poursuivie.";
        } else {
            _contentSubscriberTitle = "Subscriber: "+ _ACCOUNT.title + "<br>COPYRIGHT AGENCE EUROPE© Anyone held liable for illegal distribution will be sued.";
        }
        _content= "\n\n<div class='AEprint_nonDissemination'>"  + _contentSubscriberTitle + "</div>";
        return _content;

    }
    
    this.upperFirst = function(chaine){
        
	return chaine.substr(0,1).toUpperCase() + chaine.substr(1,chaine.length);
    }
   

   
    
}