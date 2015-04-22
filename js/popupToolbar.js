
function popupToolbarClass() {
   
   this.pubLang="";
   this.isOpen = false;
   this.popupToolbarHeight = 0;
   
   this.doOpen = function() {
      this.popupToolbarHeight = 0;
      //var me = this;
      _MAINTOOLBAR_ITEMSELECTED = 11;
      loadMainToolbar();
      //this.isOpen = true;
      if (!this.isOpen) {
          $("#popupToolbar").html(this.getMenuContent());
         //alert(("#mainToolbarButton11").style.left);
         //$("#popupToolbar").animate({'left': '300px'},'fast');
         
         //$('#popupToolbar').stop().animate({opacity:1},fast);
         $("#popupToolbar").animate({'height': this.popupToolbarHeight},'fast');
         /*$("#popupToolbar" ).mouseout(function() {
            
            me.doClose();
         });
         */
         this.isOpen = true;
          $("#popupToolbar .toolbarButtonPopupToolbar").css("background-image","url(./php/icones/black/searchZoom_16x16.png)");
      } else {
         this.doClose();
         
      }
   }
   
   this.doClose = function() {
      _MAINTOOLBAR_ITEMSELECTED = 0;
      loadMainToolbar();
      //$('#popupToolbar').stop().animate({opacity:0},800);
      //alert("close");
      //$('#popupToolbar').stop().animate({opacity:0},fast);
      if (this.isOpen) {
        this.popupToolbarHeight = 0;
         $("#popupToolbar").animate({'height': '0px'},'fast');
          $("#popupToolbar").html("");
         this.isOpen = false;
      }
   }
   
   this.doCloseInstantly = function() {
      //$('#popupToolbar').stop().animate({opacity:0},800);
      //alert("close");
      //$('#popupToolbar').stop().animate({opacity:0},fast);
      if (this.isOpen) {
         $( "#popupToolbar" ).css( "height", "0");

          $("#popupToolbar").html("");
         this.isOpen = false;
      }
   }
   
   this.getMenuContent = function() {
      var _content = "";
      var _buttonHeight = 40;
      if (isBookmarkPossible()) {
         _content += "<div  id='popupToolbarItem' style='float:left;' title=''><div  class='toolbarButton toolbarButtonBookmark'  onclick=\"displayBookmark();\">" + _LANGAGE.mainToolbar_favoris + "</div></div>";
        this.popupToolbarHeight += _buttonHeight;
        //alert(this.popupToolbarHeight);
      }
      _content += "<div id='popupToolbarItem' style='float:left;'  title=''><div  class='toolbarButton toolbarButtonHelp' onclick=\"displayFaq();\">" + _LANGAGE.mainToolbar_aide + "</div></div>";
      this.popupToolbarHeight += _buttonHeight;
      _content += "<div id='popupToolbarItem' style='float:left;'  title=''><div  class='toolbarButton toolbarButtonParametre' onclick=\"_ACCOUNT.getClientInfo();\">" + _LANGAGE.mainToolbar_compte + "</div></div>";
      this.popupToolbarHeight += _buttonHeight;
       if ((_ACCOUNT.connectionType == "0") || (_ACCOUNT.connectionType == "2")) {
         _content += "<div id='popupToolbarItem' style='float:left;'  title=''><div  class='toolbarButton toolbarButtonLogoff' onclick=\"_ACCOUNT.doLogoff();\">" + _LANGAGE.mainToolbar_deconnection + "</div></div>";
        this.popupToolbarHeight += _buttonHeight;
      }
      return _content;
   
   }
   this.init = function() {
     // var panelDef = "<div id='lateralPanel' style='position:fixed;top:100px;z-index:20000;width:250px;height:500px;background:#ff0000;overflow: scroll;'>Hello</div>"
     /* var panelDef = "<div id='lateralPanel'>Hello";
      panelDef += "<span class='bar'/>";
      panelDef += "<div class='foo'/>";
      panelDef += "</div>";
     */
      var panelDef = "<div id='lateralPanel' style='visibility:hidden;position:fixed;top:200px;z-index:20000;width:300px;height:500px;background:#ff0000;'>";
     /* panelDef += "<div id='tabsLateralPanel' class='lateralPanelcontainer'>";
      panelDef += "<ul>";
      panelDef += "<li><a href='#tabs_lateralSommaire'>Sommaire</a></li>";
      panelDef += "<li><a href='#tabs_lateralRecherche'>Recherche</a></li>";
      panelDef += "<li><a href='#tabs_lateralFavoris'>Favoris</a></li>";
      panelDef += "</ul>";
      panelDef += "<div id='tabs_lateralSommaire' style=' height: 150px;overflow: auto;'>";
      panelDef += "<p>Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus.</p>";
      panelDef += "</div>";
      panelDef += "<div id='tabs_lateralRecherche' style=' height: 150px;overflow: auto;'>";
      panelDef += "<p>Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor. Aenean aliquet fringilla sem. Suspendisse sed ligula in ligula suscipit aliquam. Praesent in eros vestibulum mi adipiscing adipiscing. Morbi facilisis. Curabitur ornare consequat nunc. Aenean vel metus. Ut posuere viverra nulla. Aliquam erat volutpat. Pellentesque convallis. Maecenas feugiat, tellus pellentesque pretium posuere, felis lorem euismod felis, eu ornare leo nisi vel felis. Mauris consectetur tortor et purus.</p>";
      panelDef += "</div>";
      panelDef += "<div id='tabs_lateralFavoris'style=' height: 150px;overflow: auto;'>";
      panelDef += "<p>Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus.</p>";
      panelDef += "<p>Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula faucibus eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero sed nulla mattis commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor ac, tempor vitae, pede. Aenean vehicula velit eu tellus interdum rutrum. Maecenas commodo. Pellentesque nec elit. Fusce in lacus. Vivamus a libero vitae lectus hendrerit hendrerit.</p>";
      panelDef += "</div>";
     */
      panelDef += "</div>";
      $( "body" ).append( panelDef );
      
     
     // $( "#tabsLateralPanel" ).tabs();
      //$("#lateralPanel").scrollpanel();
   }
}

