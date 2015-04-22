function langageClass() {
   this.langage = "fr";
   
   this.mainToolbar_popupToolbar = "&nbsp;";
   this.mainToolbar_recherche = "Recherche";
   this.mainToolbar_favoris = "Favoris";
   this.mainToolbar_sommaire = "Sommaire";
   this.mainToolbar_bulletin = "Bulletin";
   this.mainToolbar_edd = "EDD";
   this.mainToolbar_article = "Article";
   this.mainToolbar_aide = "FAQ";
   this.mainToolbar_compte = "Compte utilisateur";
   this.mainToolbar_deconnection = "Me déconnecter";
   
   this.mainToolbar_recent = "Récents";
   
   this.listeBulletin_bulletinName = "Bulletin Quotidien Europe";
   this.listeBulletin_eddName = "Europe Diplomatie & Défense";
   
   this.secondToolbar_vuRecemment = "Vus récemment";
   
   this.lateralToolbar_lireArticleFr = "Version française";
   this.lateralToolbar_lireArticleEn = "Version anglaise";
   this.lateralToolbar_lirePubFr = "Version française";
   this.lateralToolbar_lirePubEn = "Version anglaise";
   this.lateralToolbar_lireSommaireFr = "Version française";
   this.lateralToolbar_lireSommaireEn = "Version anglaise";
   this.lateralToolbar_lireEddFr = "Version française";
   this.lateralToolbar_lireEddEn = "Version anglaise";
   this.lateralToolbar_sommaire = "Sommaire";
   this.lateralToolbar_readPublication = "Texte intégral";
   
   this.lateralToolbar_ajouterArticleBookmark = "Ajouter cet article aux Favoris";
   this.lateralToolbar_ajouterBulletinBookmark = "Ajouter ce bulletin aux Favoris";
   this.lateralToolbar_ajouterEddBookmark = "Ajouter cet EDD aux favoris";
   
   
   this.lateralToolbar_agrandir = "Agrandir";
   this.lateralToolbar_tailleNormale = "Taille normale";
   this.lateralToolbar_reduire = "Réduire";
   this.lateralToolbar_print = "Imprimer";
   this.lateralToolbar_pleinEcran = "Affichage plein écran";
   this.popupFermer="Fermer";
   this.copyPaste1="Vous pouvez copier environ";
   this.copyPaste2="lignes de texte.";
   this.copyPaste3="Appuyez sur CTRL+C pour copier le texte.";
   this.bookmark_messageNoBookmark = "Aucun favori";
   this.bookmark_messageAjoutArticle = "Cet article à été ajouté aux favoris.";
   this.bookmark_messageAjoutBulletin = "Ce Bulletin à été ajouté aux favoris.";
   this.bookmark_messageAjoutEdd = "Cet EDD à été ajouté aux favoris.";
   this.account_titleAccount = "Compte utilisateur";
   this.account_abonne = "Abonné";
   
  
   this.account_titleAbonnement = "Abonnements";
   this.account_du = "du";
   this.account_au = "au";
   this.account_titleNetwork = "Réseau";
   this.account_yourIp = "Votre adresse IP";
   this.account_titleConnection = "Connexion";
   this.account_meDeconnecter = "Me déconnecter";
   
   this.account_titlePassword = "Mot de passe";
   this.account_changePassword = "Modifiez votre mot de passe";
   this.account_labelPassword1 = "Entrez votre nouveau mot de passe";
   this.account_labelPassword2 = "Confirmez le mot de passe";
   this.account_buttonPassword = "Enregistrer";
   this.account_message0 = "Entrez un mot de passe entre 6 et 12 caractères.";
   this.account_message1 = "Le mot de passe ne peut pas être vide!";
   this.account_message2 = "Les 2 passwords que vous avez entré sont différents!";
   this.account_message3 = "L'enregistrement échoué.<br>Votre mot de passe n'a pas été modifié.";
   this.account_message4 = "Votre mot de passe à été changé avec success.<br>Vous allez être déconnecté. = ";

   
   this.account_loginLabelUser =  "Login";
   this.account_loginLabelPassword = "Mot de passe";
   this.account_loginError = "Login et (ou) mot de passe incorrects!";
   
   
   this.searchForm_section1ParPub = "Recherche par publication";
   this.searchForm_labelnumPub = "N° publication";
   this.searchForm_labelA = "à";
   this.searchForm_labelDatePub = "Date (jj/mm/aaaa)";
   this.searchForm_labelButtonSearch = "Recherche";
   this.searchForm_section2ParArticle = "Recherche par article";
   this.searchForm_labelText = "Texte recherché";
   this.searchForm_labelButtonTitle = "Dans le titre";
   this.searchForm_labelButtonTexte = "Dans le texte";
   this.searchForm_labelTheme = "Thème";
   this.searchForm_noTheme = "Aucun thème trouvé!";
   this.searchForm_lengthErrorTitle = "Recherche";
   this.searchForm_lengthError = "Votre recherche doit contenir au moins 3 caractères, merci.";
   
   this.general_cookie_error_title = "Avertissement";
   this.general_cookie_error = "<p>Notre site utilise des cookies, dans le respect des lois sur la vie privée.</p><p>Sans les cookies, notre site ne fonctionnera pas correctement.</p>";
   
   this.doTranslate = function(_lang) {
      this.doTranslateMainMenu(_lang);
      if (_lang == "fr") {
               
         this.langage = "fr";
         this.mainToolbar_popupToolbar = "&nbsp;";
         this.mainToolbar_recherche = "Recherche";
         this.mainToolbar_favoris = "Favoris";
         this.mainToolbar_sommaire = "Sommaire";
         this.mainToolbar_bulletin = "Bulletin";
         this.mainToolbar_edd = "EDD";
         this.mainToolbar_article = "Article";
         this.mainToolbar_aide = "FAQ";
         this.mainToolbar_compte = "Compte utilisateur";
         this.mainToolbar_deconnection = "Me déconnecter";
         
         this.mainToolbar_recent = "Récents";
         
         this.listeBulletin_bulletinName = "Bulletin Quotidien Europe";
         this.listeBulletin_eddName = "Europe Diplomatie & Défense";
         
         this.secondToolbar_vuRecemment = "Vus récemment";
         
         this.lateralToolbar_lireArticleFr = "Version française";
         this.lateralToolbar_lireArticleEn = "Version anglaise";
         this.lateralToolbar_lirePubFr = "Version française";
         this.lateralToolbar_lirePubEn = "Version anglaise";
         this.lateralToolbar_lireSommaireFr = "Version française";
         this.lateralToolbar_lireSommaireEn = "Version anglaise";
         this.lateralToolbar_lireEddFr = "Version française";
         this.lateralToolbar_lireEddEn = "Version anglaise";
         this.lateralToolbar_sommaire = "Sommaire";
         this.lateralToolbar_readPublication = "Texte intégral";
         
         this.lateralToolbar_ajouterArticleBookmark = "Ajouter cet article aux Favoris";
         this.lateralToolbar_ajouterBulletinBookmark = "Ajouter ce bulletin aux Favoris";
         this.lateralToolbar_ajouterEddBookmark = "Ajouter cet EDD aux favoris";

         this.lateralToolbar_agrandir = "Agrandir";
         this.lateralToolbar_tailleNormale = "Taille normale";
         this.lateralToolbar_reduire = "Réduire";
         this.lateralToolbar_print = "Imprimer";
         this.lateralToolbar_pleinEcran = "Affichage plein écran";
         this.popupFermer="Fermer";
         this.copyPaste1="Vous pouvez copier environ";
         this.copyPaste2="lignes de texte.";
         this.copyPaste3="Appuyez sur CTRL+C pour copier le texte.";
         this.bookmark_messageAjoutArticle = "Cet article à été ajouté aux favoris.";
         this.bookmark_messageAjoutBulletin = "Ce Bulletin à été ajouté aux favoris.";
         this.bookmark_messageAjoutEdd = "Cet EDD à été ajouté aux favoris.";
         this.bookmark_messageNoBookmark = "Aucun favori";
         this.account_titleAccount = "Compte utilisateur";
         this.account_abonne = "Abonné";
         this.account_titleAbonnement = "Abonnements";
         this.account_du = "du";
         this.account_au = "au";
         this.account_titleNetwork = "Réseau";
         this.account_yourIp = "Votre adresse IP";
         this.account_titleConnection = "Connexion";
         this.account_meDeconnecter = "Me déconnecter";
         
         this.account_titlePassword = "Mot de passe";
         this.account_changePassword = "Modifiez votre mot de passe";
         this.account_labelPassword1 = "Entrez votre nouveau mot de passe";
         this.account_labelPassword2 = "Confirmez le mot de passe";
         this.account_buttonPassword = "Enregistrer";
         this.account_message0 = "Entrez un mot de passe entre 6 et 12 caractères.";
         this.account_message1 = "Le mot de passe ne peut pas être vide!";
         this.account_message2 = "Les 2 passwords que vous avez entré sont différents!";
         this.account_message3 = "L'enregistrement échoué!<br>Votre mot de passe n'a pas été modifié.";
         this.account_message4 = "Votre mot de passe à été modifié avec success.<br>Votre session va être déconnectée.";
   
         this.account_loginLabelUser = "Login";
         this.account_loginLabelPassword = "Mot de passe";
         this.account_loginError = "Login et (ou) mot de passe incorrects!";
         
         this.searchForm_section1ParPub = "Recherche par publication";
         this.searchForm_labelnumPub = "N° publication";
         this.searchForm_labelA = "à";
         this.searchForm_labelDatePub = "Date (jj/mm/aaaa)";
         this.searchForm_labelButtonSearch = "Recherche";
         this.searchForm_section2ParArticle = "Recherche par article";
         this.searchForm_labelText = "Texte recherché";
         this.searchForm_labelButtonTitle = "Dans le titre";
         this.searchForm_labelButtonTexte = "Dans le texte";
         this.searchForm_labelTheme = "Thème";
         this.searchForm_noTheme = "Aucun thème trouvé!";
         this.searchForm_lengthErrorTitle = "Recherche";
         this.searchForm_lengthError = "Votre recherche doit contenir au moins 3 caractères, merci.";
         
         this.general_cookie_error_title = "Avertissement";
         this.general_cookie_error = "<p>Notre site utilise des cookies, dans le respect des lois sur la vie privée.</p><p>Sans les cookies, notre site ne fonctionnera pas correctement.</p>";
           
           
      } else {
         this.langage = "en";
         this.mainToolbar_popupToolbar = "&nbsp;";
         this.mainToolbar_recherche = "Search";
         this.mainToolbar_favoris = "Favorites";
         this.mainToolbar_sommaire = "Contents";
         this.mainToolbar_bulletin = "Bulletin";
         this.mainToolbar_edd = "EDD";
         this.mainToolbar_article = "Article";
         this.mainToolbar_aide = "FAQ";
         this.mainToolbar_compte = "User account";
         this.mainToolbar_deconnection = "Disconnect";
         
         this.mainToolbar_recent = "Recents";
         
         this.listeBulletin_bulletinName = "Bulletin Quotidien Europe";
         this.listeBulletin_eddName = "Europe Diplomacy & Defense";
         
         this.secondToolbar_vuRecemment = "Latest views";
         
         this.lateralToolbar_lireArticleFr = "French version";
         this.lateralToolbar_lireArticleEn = "English version";
         this.lateralToolbar_lirePubFr = "French version";
         this.lateralToolbar_lirePubEn = "English version";
         this.lateralToolbar_lireSommaireFr = "French version";
         this.lateralToolbar_lireSommaireEn = "English version";
         this.lateralToolbar_lireEddFr = "French version";
         this.lateralToolbar_lireEddEn = "English version";
         this.lateralToolbar_sommaire = "Contents";
         this.lateralToolbar_readPublication = "Full text";
         
         this.lateralToolbar_ajouterArticleBookmark = "Add this issue to Favorites";
         this.lateralToolbar_ajouterBulletinBookmark = "Add this issue to Favorites";
         this.lateralToolbar_ajouterEddBookmark = "Add this EDD to favorites";
         
         this.lateralToolbar_agrandir = "Larger font";
         this.lateralToolbar_tailleNormale = "Normal size";
         this.lateralToolbar_reduire = "Smaller font";
         this.lateralToolbar_print = "Print";
         this.lateralToolbar_pleinEcran = "Full screen";
         this.popupFermer="Close";
         this.copyPaste1="You can copy about";
         this.copyPaste2="text lines.";
         this.copyPaste3="Press CTRL+C to copy the text.";
         this.bookmark_messageAjoutArticle = "This article is added to favorites.";
         this.bookmark_messageAjoutBulletin = "This Bulletin  is added to favorites.";
         this.bookmark_messageAjoutEdd = "This EDD  is added to favorites.";
         this.bookmark_messageNoBookmark = "No favorites";
         this.account_titleAccount = "User account";
         this.account_abonne = "Subscriber";
         this.account_titleAbonnement = "Subscriptions";
         this.account_du = "from";
         this.account_au = "to";
         this.account_titleNetwork = "Network";
         this.account_yourIp = "Your IP address";
         this.account_titleConnection = "Connection";
         this.account_meDeconnecter = "Logout";
         
         this.account_titlePassword = "Password";
         this.account_changePassword = "Change your password";
         this.account_labelPassword1 = "Enter your new password";
         this.account_labelPassword2 = "Confirm password";
         this.account_buttonPassword = "Submit";
         this.account_message0 = "Please enter a password between 6 and 12 characters.";
         this.account_message1 = "The password cannot be empty!";
         this.account_message2 = "The 2 passwords are different!";
         this.account_message3 = "Failed!<br>Sorry, Your password has not been changed.";
         this.account_message4 = "Your password has been changed with success.<br>Your session will be disconnected.";
         
         this.account_loginLabelUser = "Login";
         this.account_loginLabelPassword = "Password";
         this.account_loginError = "Login and (or) password invalid!";
         
         this.searchForm_section1ParPub = "Search by publication";
         this.searchForm_labelnumPub = "Publication No.";
         this.searchForm_labelA = "to";
         this.searchForm_labelDatePub = "Date (dd/mm/yyyy)";
         this.searchForm_labelButtonSearch = "Search";
         this.searchForm_section2ParArticle = "Search by articles";
         this.searchForm_labelText = "Search text";
         this.searchForm_labelButtonTitle = "In title";
         this.searchForm_labelButtonTexte = "In full text";
         this.searchForm_labelTheme = "Thema";
         this.searchForm_noTheme = "No thema found!";
         this.searchForm_lengthErrorTitle = "Search";
         this.searchForm_lengthError = "The search-key must be at least 3 characters long, thanks.";
         
         this.general_cookie_error_title = "Warning";
         this.general_cookie_error = "<p>Our site uses cookies, in respect of privacy laws.</p><p>Without cookies our site does not work properly.</p>";
           
          
      }
   }
	   
   this.doTranslateSearchForm = function (_lang) {
      $("#titreSection1").html(this.searchForm_section1ParPub);
      $("#labelnumPub").html(this.searchForm_labelnumPub);
      $("#labelA1").html(this.searchForm_labelA);
      $("#labelA2").html(this.searchForm_labelA);
      $("#searchLabelDate1").html(this.searchForm_labelDatePub);
      $("#searchLabelDate2").html(this.searchForm_labelDatePub);
      $("#labelButtonSearch1").html(this.searchForm_labelButtonSearch);
      
      $("#titreSection2").html(this.searchForm_section2ParArticle);
      $("#labelA").html(this.searchForm_labelA);
      $("#labelText").html(this.searchForm_labelText);
      $("#searchTitleButton").html(this.searchForm_labelButtonTitle);
      $("#searchTextButton").html(this.searchForm_labelButtonTexte);
      $("#labelTheme").html(this.searchForm_labelTheme);
      $("#labelButtonSearch2").html(this.searchForm_labelButtonSearch);
		
		 // $("#labelA").html(this.searchForm_labelA);
   }
   
   this.doTranslateMainMenu = function (_lang) {
      var _content = "";
      
      if (_lang == "fr") {
         _content+= "<ul id='main-menu2-links' class='links clearfix'>";
         _content+="<li class='menu-367 first'><a href='/fr/node/9' title=''>Accueil</a></li>";
         _content+="<li class='menu-366'><a href='/fr/node/5'>Publications</a></li>";
         _content+="<li class='menu-362'><a href='/fr/node/6'>Abonnements</a></li>";
         _content+="<li class='menu-360'><a href='/fr/node/2'>Société</a></li>";
         _content+="<li class='menu-369'><a href='/fr/node/3'>Rédaction</a></li>";
         _content+="<li class='menu-371'><a href='/fr/node/4'>Contactez-nous</a></li>";
         _content+="</ul>";
         
      } else {
         _content+="<ul id='main-menu2-links' class='links clearfix'>";
         _content+="<li class='menu-367 first'><a href='/en/node/11' title=''>Home</a></li>";
         _content+="<li class='menu-366'><a href='/en/node/10'>Publications</a></li>";
         _content+="<li class='menu-362'><a href='/en/node/12'>Subscriptions</a></li>";
         _content+="<li class='menu-360'><a href='/en/node/13'>Company</a></li>";
         _content+="<li class='menu-369'><a href='/en/node/14'>Editorial Staff</a></li>";
         _content+="<li class='menu-371'><a href='/en/node/15'>Contact us</a></li>";
         _content+="</ul>";
      
         
      }
      $('#main-menu').html(_content);
     
     
   }
   
}