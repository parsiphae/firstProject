
	
		
     
	window.onload = function() {
		$("#buttonRetourHome").button({
			label: 'Retour et réinitialisation',
			icons: {primary:'ui-icon-arrowrefresh-1-e'}
		});
		//$("#buttonRetourHome").css("text-transform", "uppercase");
		$("#buttonRetourHome").css("font-size", "12px");
		$("#buttonRetourHome").css("border-color", "#FFFFFF");
		
		$("#buttonRetourHome").click(function() {
		  dialogStart();
		});
		
		 $( "#AE_privateMenuTabs" ).tabs();
		 // $( "#accordion" ).accordion();
		 $( "#AE_privateLeftWrapper" ).height(500);
		  $( "#AE_privateContentWrapper" ).height(500);
		$( "#AE_privateAccordionLeft" ).accordion({
			
			fillSpace: true,
			change: function(event, ui){
				var clicked = $(this).find('.ui-state-active').attr('id');
				//alert(clicked);
				$('#accordionSommaire').load('accordionSommaire.htm', function() {
					//alert('Load was performed.');
				      });
				$('#articleTrouve').load('articleTrouve.htm', function() {
					//alert('Load was performed.');
				      });
			}
		});
		AE_privateAccordionRight
		
		$( "#AE_privateAccordionRight" ).accordion({
			
			fillSpace: true,
		});
		// Resize
		//$( "#AE_privateLeftWrapper" ).height(700);
		
		
		/*  $.ajax({type:"get",url:"./accordionSommaire.htm",success: function(data){
			$("#accordionSommaire").html(data);
			
			
		    }
		});
		  */
		
		 
		
		  
		  

		
		
	
       	}
       	
       	function doStart(_matrice) {
       		if (_matrice == 1) {
       			matriceItem=matriceItem1;
       			matrice=matrice1;
       			
       		}
       		if (_matrice == 2) {
       			matriceItem=matriceItem2;
       			matrice=matrice2;
       			
       		}
       		/*====================================
   		Init le QueryContainer
   		======================================*/
   		
   		/*var _queryContainer="";
   		
   		_queryContainer+="<div id='leftBox'>";
   		_queryContainer+="<div id='nomRubrique'></div>";
			
		_queryContainer+="	<div id='questionLabel'></div>";
		_queryContainer+="	<div id='questionForm'></div>";
		_queryContainer+="	<div id='questionDescription'></div>";

		_queryContainer+="	<div>";
		_queryContainer+="		<div id='btNext'></div>";
		_queryContainer+="		<div id='disclaimer'></div>";
		_queryContainer+="	</div>";
			
		_queryContainer+="</div>";
		
		_queryContainer+="<div id='rightBox'>";
		
		_queryContainer+="	<div id='rightBoxContent'></div>";
			
		_queryContainer+="</div>";
		
   		var elementQueryContainer=document.getElementById("queryContainer");
		elementQueryContainer.innerHTML=_queryContainer;
		*/
		var elementRightBoxList=document.getElementById("introBox");
		elementRightBoxList.innerHTML="";	
		
		
       		
		displayMenu();
       		displayEtape(numEtape);	
       	}
	
	/*
   	0 : Num Rubrique
   	1 : Libelle de la Rubrique
   	2 : Répondu
   	3 : Question répondue (0=pas répondu; 1=répondu)
   	4 : Réponse en texte
   	5 : Score si Oui
   	6 : Score si Non
   	7 : Score
   	*/
   	currentMenu=1;
	var tabMenu= new Array();
	tabMenu[1]=["1","Localisation du projet",0];
	tabMenu[2]=["2","Données financières",0];
	tabMenu[3]=["3","Installation photovoltaïque",0];
	tabMenu[4]=["4","Coût d'investissement",0];
	tabMenu[5]=["5","Résultats",0];
	//tabMenu[6]=["6","Estimation financière - Résultats",0];
   
   	PROVINCE= "Bruxelles";
   	
   	function loadIntro() {
   		/*====================================
   		Vider le QueryContainer
   		======================================*/
   		//var elementQueryContainer=document.getElementById("queryContainer");
		//elementQueryContainer.innerHTML="";
   		/*====================================
   		Afficher boutons démarrer
   		======================================*/
   		var _intro = "";
		
		 
		
		for (var i=0;i< tabIntro.length ;i++) {
			_intro+=tabIntro[i];
		}
		_intro += "<div><table align='center' border='0' width='400px'><tr>";
		_intro+="\n<td align='left' width='50%' ><button id='btn1' type='submit'> OK </button></td> ";
		_intro+="\n<td align='right' width='50%' ><button id='btn2' type='submit'> OK </button></td> ";
		
		_intro+="</tr></table></div>";
		
		
		for (var i=0;i< tabIntro2.length ;i++) {
			_intro+=tabIntro2[i];
		}
		var elementRightBoxList=document.getElementById("introBox");
		elementRightBoxList.innerHTML=_intro;
		
		
		
		//$('#btn1').append($(strHtml));
		$("#btn1").button({
			label: 'Version rapide',
			icons: {primary:'ui-icon-gear'}
		});
		
		$("#btn2").button({
			label: 'Version détaillée',
			icons: {primary:'ui-icon-gear'}
		});
		
		$("#btn1").click(function() {
			_VERSION=1;
			doStart(1);
		});
		
		
		
		$("#btn2").click(function() {
			_VERSION=2;
			doStart(2);
		});
		
   	}
   	
   	function displayMenu() {
   		varMenu="";
   		//varMenu+="<div style='font-size:12px;text-align:center;padding:10px 0px 10px 0px;border-bottom:1px solid #FFFFFF;color:#004274;'>Etapes</div>";
   		for (var i=1;i<=5;i++) {
   			if (numEtape == i) {
   				//varMenu+="<div id='menuItemCurrent'>" + tabMenu[i][0] + ") " + tabMenu[i][1] + "</div>";
   				varMenu+="<div id='menuItemLink'><button id='buttonMenu" + i + "' type='submit'> OK </button></div>";
   				
   			} else {
	   			if ((tabMenu[i][2] == 1 ) && (numEtape != i)) {
	   				if (i == 5) {
	   					//varMenu+="<div id='menuItemLink'><a href='#'  onClick='displayResultat(" + i + ");'><div class='menuItemLinkA'>" + tabMenu[i][0] + ") " + tabMenu[i][1] + "</div></a></div>";
	   					varMenu+="<div id='menuItemLink'><button id='buttonMenu" + i + "' type='submit'> OK </button></div>";
	   				} else {
	   					//varMenu+="<div id='menuItemLink'><a href='#'  onClick='displayEtape(" + i + ");'><div class='menuItemLinkA'>" + tabMenu[i][0] + ") " + tabMenu[i][1] + "</div></a></div>";
	   					varMenu+="<div id='menuItemLink'><button id='buttonMenu" + i + "' type='submit'> OK </button></div>";
	   				}
	   				
	   			} else {
	   				//varMenu+="<div id='menuItem'>"  + tabMenu[i][0] + ") " + tabMenu[i][1] + "</div>";
	   				varMenu+="<div id='menuItemLink'><button id='buttonMenu" + i + "' type='submit'> OK </button></div>";
	   			}
	   		}
   		} 
	   	var elementMenuBox=document.getElementById("menuBox");
		elementMenuBox.innerHTML=varMenu;
		
		/* Transforme les boutons du menu en boutons jquery
		===========================================================*/
		var _idTitreEtape="";
		for (var j=1;j<= 5 ;j++) {
			
			
			
			_idTitreEtape="#buttonMenu" + j;
			$(_idTitreEtape).button();
			$(_idTitreEtape).button( 'option', 'label', tabMenu[j][1] );
			//Label: tabMenu[j][1]
			
			$(_idTitreEtape).width(186);
			$(_idTitreEtape).height(61);
			$(_idTitreEtape).css("text-align", "center");
			$(_idTitreEtape).css("border-radius", "0");
			$(_idTitreEtape).css("font-size", "10px");
			$(_idTitreEtape).css("border-right", "0px solid #CCCCCC");
			
			if (numEtape == j) {
				$(_idTitreEtape).css("color", "#666666");
				$(_idTitreEtape).css("border-bottom", "0px");
				$(_idTitreEtape).width(200);
				$(_idTitreEtape).css("background", "#ffffff url('./images/fondMenuCurrent.png') no-repeat");
				//background:#ffffff url("./images/fondMenuCurrent.png") no-repeat;
			}
			if ((tabMenu[j][2] != 1 ) && (numEtape != j)) {
				$(_idTitreEtape).button( "disable" );
			}
			
			//$(_idTitreEtape).css("border-color", "#FFFFFF");
			//$(_idTitreEtape).css("text-transform", "uppercase");
			//$(_idTitreEtape).css("font-size", "11px");
		
		
			if (j == 1) {
				$(_idTitreEtape).click(function() {
					displayEtape(1);
				});
			}
			if (j == 2) {
				$(_idTitreEtape).click(function() {
					displayEtape(2);	
				});
			}
			if (j == 3) {
				$(_idTitreEtape).click(function() {
					displayEtape(3);	
				});
			}
			if (j == 4) {
				$(_idTitreEtape).click(function() {
					displayEtape(4);	
				});
			}
			if (j == 5) {
				$(_idTitreEtape).click(function() {
					displayResultat(5);	
				});
			}
			
			
		}
		
	}
	
	function displayNextPrevious() {
		
		var nextEtape=numEtape + 1;
		var previousEtape = numEtape - 1;
		var elementNextPrevious=document.getElementById("btNext");
		var _nextPrevious="";
		if (numEtape == 1) {
			//_nextPrevious = "<table width='70%' align='center' border='0'><tr><td align='right'><a href='#' onClick='displayEtape(" + nextEtape + ")'><img src='./images/btNext.png' border='0'/></a></td></tr></table>";
			
			_nextPrevious = "\n<table width='70%' align='center' border='0'><tr>";
			_nextPrevious += "\n<td align='right' width='50%' ><button id='btnNext' type='submit'> OK </button></td> ";
			_nextPrevious += "\n</tr></table>";
			elementNextPrevious.innerHTML=_nextPrevious;
			$("#btnNext").button({
				label: 'Suivant',
				icons: {secondary:'ui-icon-triangle-1-e'}
			});
			//$("#btnNext").width(120);
			$("#btnNext").click(function() {
			  displayEtape(nextEtape);
			});
			
		}
		
		if ((numEtape > 1) && (numEtape < 4)) {
			//_nextPrevious = "<table width='70%'  align='center' border='0'><tr><td align='left'><a href='#' onClick='displayEtape(" + previousEtape + ")'><img src='./images/btPrevious.png' border='0'/></a></td>";
			//_nextPrevious += "<td align='right'><a href='#' onClick='displayEtape(" + nextEtape + ")'><img src='./images/btNext.png' border='0'/></a></td></tr></table>";
			
			_nextPrevious = "\n<table width='70%' align='center' border='0'><tr>";
			_nextPrevious += "\n<td align='left' width='50%' ><button id='btnPrevious' type='submit'> OK </button></td> ";
			_nextPrevious += "\n<td align='right' width='50%' ><button id='btnNext' type='submit'> OK </button></td> ";
			_nextPrevious += "\n</tr></table>";
			elementNextPrevious.innerHTML=_nextPrevious;
			
			$("#btnPrevious").button({
				label: 'Précédent',
				icons: {primary:'ui-icon-triangle-1-w'}
			});
			$("#btnPrevious").click(function() {
			  displayEtape(previousEtape);
			});
			
			$("#btnNext").button({
				label: 'Suivant',
				icons: {secondary:'ui-icon-triangle-1-e'}
			});
			$("#btnNext").click(function() {
			  displayEtape(nextEtape);
			});
		}
		
		if (numEtape == 4)  {
			//_nextPrevious = "<table width='70%' align='center'><tr><td align='left'><a href='#' onClick='displayEtape(" + previousEtape + ")'><img src='./images/btPrevious.png' border='0'/></a></td>";
			//_nextPrevious += "<td align='right'><a href='#' onClick='displayResultat(" + nextEtape + ")'><img src='./images/btNext.png' border='0'/></a></td></tr></table>";
			
			_nextPrevious = "\n<table width='70%' align='center' border='0'><tr>";
			_nextPrevious += "\n<td align='left' width='50%' ><button id='btnPrevious' type='submit'> OK </button></td> ";
			_nextPrevious += "\n<td align='right' width='50%' ><button id='btnNext' type='submit'> OK </button></td> ";
			_nextPrevious += "\n</tr></table>";
			elementNextPrevious.innerHTML=_nextPrevious;
			
			$("#btnPrevious").button({
				label: 'Précédent',
				icons: {primary:'ui-icon-triangle-1-w'}
			});
			$("#btnPrevious").click(function() {
			  displayEtape(previousEtape);
			});
			
			$("#btnNext").button({
				label: 'Suivant',
				icons: {secondary:'ui-icon-triangle-1-e'}
			});
			$("#btnNext").click(function() {
			  displayResultat(nextEtape);
			});
		}
		/*if (numEtape == 5) {
			_nextPrevious = "<table width='100%'><tr><td><a href='#' onClick='displayEtape(" + previousEtape + ")'><img src='./images/btPrevious.png' border='0'/></a></td>";
			_nextPrevious += "<td align='right'><a href='#' onClick='displayEtape(" + nextEtape + ")'><img src='./images/btTerminate.png' border='0'/></a></td></tr></table>";
			
			elementNewtPrevious.innerHTML=_nextPrevious;
		}*/
		if (numEtape == 5) {
			//_nextPrevious = "<table width='70%' align='center'><tr><td><a href='#' onClick='displayEtape(" + previousEtape + ")'><img src='./images/btPrevious.png' border='0'/></a></td></tr></table>";
			
			_nextPrevious = "\n<table width='70%' align='center' border='0'><tr>";
			_nextPrevious += "\n<td align='left' width='50%' ><button id='btnPrevious' type='submit'> OK </button></td> ";
			_nextPrevious += "\n</tr></table>";
			elementNextPrevious.innerHTML=_nextPrevious;
			
			$("#btnPrevious").button({
				label: 'Précédent',
				icons: {primary:'ui-icon-triangle-1-w'}
			});
			$("#btnPrevious").click(function() {
			  displayEtape(previousEtape);
			});
			
			
			
			
		}
		displayMenu();
		
	}
   	
   	function doVerifEtape(_numEtape) {
   		if (_numEtape == 2) {
	   		alert("faux");
	   		return false;
	   	} else {
	   		return true;
	   	}
   	}
   	
   	function displayEtape(_numEtape) {
   		 //tableau[globalNumQuestion][0] + ". " + tableau[globalNumQuestion][1];
		/* Test avant de passer à l'étape suivante
		=========================================== */
		/*
		if (doVerifEtape(_numEtape - 1) == false) {
			return;
		}
		*/
		/* ===================================
		  Vider resultBox et montrer rightBox
		  ===================================*/
		var elementResultBox=document.getElementById("resultBox");
		elementResultBox.innerHTML="";
		
		var elementRightBox=document.getElementById("rightBox");
		elementRightBox.style.visibility="visible";
		
		tabMenu[numEtape][2]=1;
		numEtape=_numEtape;
		var elementNomRubrique=document.getElementById("nomRubrique");
		elementNomRubrique.innerHTML="<div id='nomRubrique1' style='background:#FFFFFF url(\"./images/etape" + numEtape + ".png\") no-repeat left 0px;'>" + tabMenu[numEtape][1] + "</div>";
		
		var structEtape1 = "<table border='0' width='100%'>";
   		//calcEtapes();
   		//alert(_numEtape);
   		var _validFunction = "";
   		var _popup="";
		
		//doEtape1();
   		for (var i=1;i<= matriceItem.length -1 ;i++) {
   			itemName=matriceItem[i];
			if (matrice[itemName]["etape"] == _numEtape) {
				if (matrice[itemName]["isInput"]) { // || (matrice[itemName]["initFunction"] !="")) {
					_validFunction = "";
					if (matrice[itemName]["validFunction"] != "") {
						_validFunction = " onchange='" + matrice[itemName]["validFunction"] + ";'";
						_validFunction += " onkeyup='" + matrice[itemName]["validFunction"] + ";'";
						//_validFunction += " onmouseup='" + matrice[itemName]["validFunction"] + ";'";
					}
					
					if (matrice[itemName]["popup"] != null) {
						
						_popup="<a href='javascript:void(0)' onClick='showPopup(\"" + itemName + "\",event);' id ='" + "popup" + itemName + "' style='margin-left:5px;'><img src='./images/puceInfo.png' height='17px' border='0'/></a>";
					} else {
						_popup="";
					}
					
					
					//matrice[itemName]["validFunction"]
					/* type = text
					=================*/
					
					if (matrice[itemName]["type"] == "numeric") {
						structEtape1 += "\n<tr><td><div id='div" + matrice[itemName]["name"] + "'>";
						structEtape1 += "\n<div class='label'>" + matrice[itemName]["title"] +  _popup +  "</div>";
						structEtape1 += "\n<div width='250px' class='inputFieldTd'><INPUT id='" + matrice[itemName]["name"] + "' name='" + matrice[itemName]["name"] + "' class='inputfieldRight'  value='" + matrice[itemName]["value"] + "' type='text' name='cell5' " + _validFunction + "> " + matrice[itemName]["unit"] + "</div>";
						if (matrice[itemName]["comment"] != null) {
							structEtape1 += "\n<div class='comment'>" + matrice[itemName]["comment"] + "</div>";
						}
						structEtape1 += "\n</div></td></tr>";
					}
					
					/* type = combo
					=================*/
					if (matrice[itemName]["type"] == "combo") {
						structEtape1 += "\n<tr><td><div id='div" + matrice[itemName]["name"] + "'>";
						structEtape1 += "\n<div class='label'>" + matrice[itemName]["title"] +  _popup + "</div>";
						structEtape1 += "\n" + eval(matrice[itemName]["initFunction"]); //doLoadProvince();
						 //structEtape1 += "\n</td><td></td></tr>";
						if (matrice[itemName]["comment"] != null) {
							structEtape1 += "\n<div class='comment'>" + matrice[itemName]["comment"] + "</div>";
						}
						 structEtape1 += "\n</div></td></tr>";
						//structEtape1 += "\n<tr><td><div class='unites' id='fieldEtape2PrixAchatElectricite'><INPUT class='inputfieldRight'  value='" + matrice[i]["default"] + "' type=text name='cell5' onchange='" + matrice[i]["validFunction"] + "(this);'> " + matrice[i]["unit"] + "</div></td><td></td></tr>";
					}
					/* type = title
					=================*/
					if (matrice[itemName]["type"]== "title") {
						structEtape1+="<tr>";
						structEtape1+="<td colspan='3' class='ssTitleInput'>" + matrice[itemName]["title"] + "</td>";
						structEtape1+="</tr>";
					}
					/* type = resultat
					=================*/
					if (matrice[itemName]["type"] == "resultat") {
						structEtape1 += "\n<tr><td colspan='2'><div class='label'>" + matrice[itemName]["title"] + "</div></td></tr>";
						structEtape1 += "\n<tr><td><div class='gray' '>" + matrice[itemName]["value"] + "</div></td><td>" + matrice[itemName]["unit"] + "</td></tr>";
						structEtape1 += "\n<tr><td colspan='2'><div class='comment'>" + matrice[itemName]["comment"] + "</div></td></tr>";
					}
					
				}
			}
			
			
			
		}
		structEtape1 += "</table>";
		var elementquestionForm=document.getElementById("leftBox");
		
		elementquestionForm.innerHTML=structEtape1;
			
		
		
		if ((_numEtape == 3) && (_VERSION == 2)) {
	   		
			if ((matrice["comboProductionConnue"]["value"]!= 0) && (matrice["comboProductionConnue"]["value"] !=1)) {
				$( "#divproductionAnnuelle" ).hide();
				$( "#divcomboOrientation" ).hide();
				$( "#divcomboInclinaison" ).hide();
				$( "#divcomboProductionElecOptimum" ).hide();
				$( "#divfacteurPerte" ).hide();
			}
			if (matrice["comboProductionConnue"]["value"] == 0) {
				$( "#divproductionAnnuelle" ).show();
				$( "#divcomboOrientation" ).hide();
				$( "#divcomboInclinaison" ).hide();
				$( "#divcomboProductionElecOptimum" ).hide();
				$( "#divfacteurPerte" ).hide();
			}
			if (matrice["comboProductionConnue"]["value"] == 1) {
				$( "#divproductionAnnuelle" ).hide();
				$( "#divcomboOrientation" ).show();
				$( "#divcomboInclinaison" ).show();
				$( "#divcomboProductionElecOptimum" ).show();
				$( "#divfacteurPerte" ).show();
			}
			
			
		}
		
		displayNextPrevious();
		
		calcEtapes();
		//alert(numEtape);
		displayOutput(_numEtape);
		
		hidePopup();
		$('html, body').animate({ scrollTop: 0 }, 'fast');
	}
	

	
	function showPopup( _itemName,Event) {
		var _popupId= "popup" + _itemName;
		var elementPopupId=document.getElementById(_popupId);
		var _popupTop=elementPopupId.style.top + 20;
		var _popupLeft=elementPopupId.style.left + 20;
		var _popupHeight=340;
		var _popupWidth=320;
		//elementPopup.innerHTML=matrice[_itemName]["popup"];
		
		//alert(_itemName);	
		var elementPopup=document.getElementById("popup");
		elementPopup.innerHTML=matrice[_itemName]["popup"];
		
		/*elementPopup.style.border="1px solid #CCCCCC"; //;height:150px;width:150px;";
		elementPopup.style.padding="10px";
		elementPopup.style.background="#F5F5F5";
		
		elementPopup.style.position="absolute";
		elementPopup.style.top=Event.pageY;
		elementPopup.style.left=Event.pageX + 20;
		elementPopup.style.visibility='visible';
		*/
		//$( "#popup" ).dialog("destroy");
		if (matrice[_itemName]["popupHeight"] != null) {
			_popupHeight=matrice[_itemName]["popupHeight"];
		}
		if (matrice[_itemName]["popupWidth"] != null) {
			_popupWidth=matrice[_itemName]["popupWidth"];
		}
		
		 $( "#popup" ).dialog({ 
	    		width: _popupWidth, 
	    		height: _popupHeight,
	    		position: 'center',
	    		modal: true,
	    		title: matrice[_itemName]["title"],
	    		resizable: false,
	    		
	    		hide: 'fadeOut',
	    		show: 'fadeIn',
	    		autoOpen: false,
	    		
	    		buttons: { 
	    			"Fermer": function() { $(this).dialog("close"); }
	    		}
	    	});
	    	$( "#popup" ).dialog("open");
	}
	function showPopupResult1() {
		var _popupTitle="Vente des certificats verts";
		var _popupContent="<p>Pour améliorer la rentabilité des systèmes photovoltaïques, le gouvernement wallon a mis en place un mécanisme permettant de recevoir les <b>40 premiers certificats verts</b> dès la première année de production.</p>";
		_popupContent += "<p>Sur une période de 10 ans, vous devriez recevoir <b>" + Math.round(nbrTotalCV()) + " certificats verts</b> au total.</p>";
		_popupContent += "<p>Voir conditions sur www.cwape.be</p>";
		showPopupResult( _popupTitle, _popupContent, 250);
	}
	function showPopupResult2() {
		var _popupTitle="Temps de retour actualisé - TRA";
		var _popupContent="<p>Le TRA permet d'estimer la durée nécessaire pour récupérer son investissement, en tenant compte de l'investissement initial et des dépenses et économies engendrées par l'installation au cours de son utilisation.</p>";
		showPopupResult( _popupTitle, _popupContent, 200);
	}
	function showPopupResult3() {
		var _popupTitle="Gain ou Valeur Actuelle Nette - VAN";
		var _popupContent="<p>Le gain ou la VAN du projet est la valeur estimée du projet dans 25 ans, compte tenu de l'investissement initial et des dépenses et économies engendrées par le projet au cours de son utilisation.</p>";
		_popupContent+="<p>Pour être financièrement intéressant, le gain doit être positif.</p>";
		_popupContent+="<p>Ce gain correspond aussi à la valeur actuelle nette (VAN) du projet et est exprimé en euros d'aujourd'hui.</p>";
		showPopupResult( _popupTitle, _popupContent, 300);
	}
	function showPopupResult4() {
		var _popupTitle="Taux de rentabilité interne modifié - TRIM";
		var _popupContent="<p>Le TRIM peut être comparé au taux d'intérêt. </p>";
		_popupContent+="<p> Il permet d'évaluer la rentabilité de l'investissement en supposant que les bénéfices engendrés par l'installation sont placés à un taux d'intérêt égal au taux d'actualisation choisi. </p>";
		showPopupResult( _popupTitle, _popupContent, 200);
	}
	function showPopupResult5() {
		var _popupTitle="Nombre de certificats verts octroyés";
		var _popupContent="<p>paragraphe1</p>";
		_popupContent+="<p>paragraphe2</p>";
		showPopupResult( _popupTitle, _popupContent, 200);
	}
	
	function showPopupResult( _title, _popupContent, _popupHeight) {

		var _popupWidth=320;
		//elementPopup.innerHTML=matrice[_itemName]["popup"];
		
		//alert(_itemName);	
		var elementPopup=document.getElementById("popup");
		elementPopup.innerHTML=_popupContent;

		 $( "#popup" ).dialog({ 
	    		width: 320, 
	    		height: _popupHeight,
	    		position: 'center',
	    		modal: true,
	    		title: _title,
	    		resizable: false,
	    		
	    		hide: 'fadeOut',
	    		show: 'fadeIn',
	    		autoOpen: false,
	    		
	    		buttons: { 
	    			"Fermer": function() { $(this).dialog("close"); }
	    		}
	    	});
	    	$( "#popup" ).dialog("open");
	}
	
	
	function hidePopup() {
		//var _popupId= "popup" + _itemName;
		//document.getElementById("popup").style.visibility='hidden';
		
		$( "#popup" ).dialog("close");
		//elementPopup.innerHTML=matrice[_itemName]["popup"];
		
		//alert(_itemName);	
		/*var elementPopup=document.getElementById("popup");
		elementPopup.innerHTML=matrice[_itemName]["popup"];
		elementPopup.style.border="1px solid #CCCCCC"; //;height:150px;width:150px;";
		elementPopup.style.position="absolute";
		elementPopup.style.top=Event.pageY - 200;
		elementPopup.style.left=Event.pageX + 15;
		*/
		
	}
	
	function showError(_this, _title, _message, Event) {
		
		var _pos=findPos(_this);
		var _X=_pos[0];
		var _Y=_pos[1];
		var _content = "<table><tr><td><img src='./images/error.png'/></td><td>" + _message + "</td></tr></table>";
		//var _popupId= "popup" + _itemName;
		//var elementPopupId=document.getElementById(_popupId);
		//var _popupTop=elementPopupId.style.top + 20;
		//var _popupLeft=elementPopupId.style.left + 20;
		//elementPopup.innerHTML=matrice[_itemName]["popup"];
		
		//alert(_itemName);	
		var elementPopup=document.getElementById("error");
		elementPopup.innerHTML=_content;
		/*elementPopup.style.border="1px solid #FF0000"; //;height:150px;width:150px;";
		elementPopup.style.padding="10px";
		elementPopup.style.background="#F5F5F5";
		elementPopup.style.width="220";
		elementPopup.style.position="absolute";
		elementPopup.style.top=_Y;
		elementPopup.style.left=_X + 250;*/
		//elementPopup.style.visibility='visible';
		
		//if ( $( "#error" ).dialog("isOpen") == false) {
			//alert("fermé");
			 $( "#error" ).dialog({ 
	    		width: 300, 
	    		height:150,
	    		position: 'center',
	    		modal: false,
	    		title: _title,
	    		resizable: false,
	    		
	    		hide: 'fadeOut',
	    		show: 'fadeIn',
	    		autoOpen: false
	    		
	    		});
	    		$( "#error" ).dialog("open");
	    	//}
	}
	
	function hideError() {
		//var _popupId= "popup" + _itemName;
		//document.getElementById("error").style.visibility='hidden';
		
		$( "#error" ).dialog("close");
		//$( "#error" ).dialog("destroy");
	}
	function getResultat() {
		
	}
	function displayResultat(_numEtape) {
   		 //tableau[globalNumQuestion][0] + ". " + tableau[globalNumQuestion][1];
   		 var _comment="";
		 var _popup="";
		 
		calcResultat();
		tabMenu[numEtape][2]=1;
		numEtape=_numEtape;
		
		var _contentTitre="";
		_contentTitre="<div><table border='0'><tr><td valign='bottom'><div id='nomRubrique1' style='border:0px solid #000000;background:#FFFFFF url(\"./images/etape" + numEtape + ".png\") no-repeat left 0px;'>" + tabMenu[numEtape][1] + "</td>";
		_contentTitre+="<td valign='top' height='48px' style='margin-left:5px;'><a href='#' onClick='doHelpChart()' ><img src='./images/confirm.png' border='0' height='45px'/></a></td>";
		_contentTitre+="<td valign='top' style='margin-left:8px;'><a href='#' onClick='doPrintResult()' ><img src='./images/print_48.png' border='0'/></a></td></tr></table></div>";
		var elementNomRubrique=document.getElementById("nomRubrique");
		elementNomRubrique.innerHTML=_contentTitre;
		
		
		var _contentResult="";
		
		
		
		/* ========================================
		  Affichage du Titre du graphique
		  ========================================*/
		_contentResult+="<div class='graphGridBox'>";
		//_content+="<div class='graphGridBoxBtClose'><a href='#' onClick='hideGraphGrid()'><img src='./images/close.png' border='0'/></a></div>";
		_contentResult+="<div class='graphTitle'>Consommation électrique</div>";
		_contentResult+="<div class='graphSousTitle'>dépenses totales actualisées <FONT  color='#165D8D'><b>avec</b></font> ou <FONT  color='#FF6600'><b>sans</b></font> installation photovoltaïque</div>";
		//_contentResult+="<div class='graphHelp'><a href='#' onClick='doHelpChart()'>Comment interpréter le graphique ?</a></div>";
		
		/* ========================================
		  Affichage le graphique
		  ========================================*/
		_contentResult+="<div class='graphUnite'>Euros</div>";
		_contentResult+="<div id='graph' style='width:900px; height:500px;'></div>";
		_contentResult+="<div class='graphUnite' style='margin-left:880px;' >Ans</div>";
		
		/* ========================================
		  Affichage les tableaux de résultats
		  ========================================*/
		_contentResult+="<div style='margin-left:40px;'>";
		_contentResult+=getTableauResultat(true);
		_contentResult+="</div>";

		/* ========================================
		  Affichage de l'imprimante
		  ========================================*/
		_contentResult +="<div>";
		_contentResult += "<table width='100%' border='0' style='font-size:11px'>";
		_contentResult +="<tr><td align='center'><a href='#' onClick='doPrintResult()'><img src='./images/print_48.png' border='0'/></a></td></tr>";
		_contentResult += "<tr><td align='center'><a href='#' onClick='doPrintResult()'>Imprimer les résultats</a></td><tr>";
		_contentResult +="</table>";
		_contentResult +="</div>";
		

		
		var elementLeftBox=document.getElementById("leftBox");
		elementLeftBox.innerHTML="";
		var elementRightBox=document.getElementById("rightBox");
		elementRightBox.innerHTML="";
		elementRightBox.style.visibility="hidden";
		//var elementQueryContainer=document.getElementById("queryContainer");
		
		//elementLeftBox.style.height=0;
		
		/*var elementRightBox=document.getElementById("rightBox");
		elementRightBox.innerHTML="";
		elementRightBox.style.width=0;
		*/
		var elementResultBox=document.getElementById("resultBox");
		
		elementResultBox.innerHTML=_contentResult;
			
		doPlotGraph();
		
		
		displayNextPrevious();
		
		calcEtapes();
		
		//displayOutput(_numEtape);
		$('html, body').animate({ scrollTop: 0 }, 'fast');
	}
	
	function validInput(_this, _min, _max, Event) {
		
		//onkeyup="virgule(this.value)" onmouseup="virgule(this.value)" onchange="virgule(this.value)"
		
		//alert(_pos[0] + "-" + _pos[1]);
		//alert(_this.name);
		var _itemName =_this.name;
		var _message = "";
		var _valeurStr = _this.value;
		var _valeur = parseFloat(_this.value);
		var _valMin = parseFloat(_min);
		var _valMax = parseFloat(_max);
		//alert(_valeur);
		
		while(_valeurStr.indexOf(',')>-1){
		    _valeurStr=_valeurStr.replace(",",".");
		    
		}
		 _this.value=_valeurStr;
		
		/*if (_valeurStr.substr(_valeurStr.length-1,1) == ",") {
			_message = _valeurStr + " contient une virgule."
		        alert(_message);
		      
		}*/
		
		if (_this.value != parseFloat(_this.value)) {
			_this.style.border='1px solid #FF0000';
			//_this.style.background='#ff0000';
			_this.style.color='#FF0000';
	   		
	   		_this.focus();
	   		_message = "<FONT face='Comic Sans MS' color='#ff0000' size=2>\"" + _this.value + "\"</font> n'est pas numérique!<br><br>Entrez un nombre entre " + _min + " et " + _max + "."
			showError(_this,  matrice[_itemName]["title"], _message, Event);
			_this.focus();
		} else {

			if ((_valeur < _valMin) || (_valeur > _valMax)) {
				_this.style.border='1px solid #FF0000';
				//_this.style.background='#ff0000';
				_this.style.color='#FF0000';
		   		showError(_this, matrice[_itemName]["title"], "Entrez un nombre entre " + _min + " et " + _max + "!", Event);
		   		_this.focus();
				
			} else {
				_this.style.border='1px solid #999999';
				//_this.style.background='#98fb98';
				_this.style.color='#444444';
				matrice[_itemName]["value"]=_valeur;
				matrice[_itemName]["displayedValue"]=_valeur;
				
				//alert(matrice[_itemName][value]);
				calcEtapes();
				displayOutput(numEtape);
				hideError();
			}
		}
	}
	
	function findPos(obj) {
		var curleft = curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
		return [curleft,curtop];
	}
	
	function isPourcent() {
		//alert("pourcent");
	}
	
	function isNumeric() {
		//alert("pourcent");
	}
	
	
	function displayOutput(_numEtape) {
		//alert (_numEtape);
		if ((_numEtape==3) && (_VERSION == 2)) {
			if ((matrice["comboProductionConnue"]["value"]!= 0) && (matrice["comboProductionConnue"]["value"] !=1)) {
				matrice["productionElecOptimum"]["isOutput"]=false;
				matrice["facteurCorrection"]["isOutput"]=false;
				matrice["productionAnnuelle"]["isOutput"]=false;
			}
			if (matrice["comboProductionConnue"]["value"] == 0) {
				matrice["productionElecOptimum"]["isOutput"]=false;
				matrice["facteurCorrection"]["isOutput"]=false;
				matrice["productionAnnuelle"]["isOutput"]=true;
			}
			if (matrice["comboProductionConnue"]["value"] == 1) {
				matrice["productionElecOptimum"]["isOutput"]=true;
				matrice["facteurCorrection"]["isOutput"]=true;
				matrice["productionAnnuelle"]["isOutput"]=false;
			}
		}
		
			
			
			
		var _result = "<div class='rightBoxData'><table border='0' width='100%' style='font-size:11px;'>";
		var itemName="";
		var _oldNumTitle=0;
		for (var i=1;i<= matriceItem.length -1 ;i++) {
			itemName=matriceItem[i];
			if (matrice[itemName]["etape"] <= _numEtape) {
				if (_oldNumTitle != matrice[itemName]["etape"]) {
					_result+="<tr><td colspan='3'><button width='300px' id='resultTitreEtape" + matrice[itemName]["etape"] + "' class='calculGeneralTitreEtape'>" +  tabMenu[matrice[itemName]["etape"]][1] + "</button></td></tr>";
					//_result+="<tr><td colspan='3'><div class='calculGeneralTitreEtape'>" +  tabMenu[matrice[itemName]["etape"]][1] + "</div></td></tr>";
					_oldNumTitle = matrice[itemName]["etape"];
				}
				
				if (matrice[itemName]["isOutput"] == true) {
					if (matrice[itemName]["type"]== "title") {
						_result+="<tr>";
						_result+="<td colspan='3' class='ssTitle'>" + matrice[itemName]["title"] + "</td>";
						_result+="</tr>";
					} else {
							
					
						if (matrice[itemName]["isInput"] == true) {
							_class="yellow";
						} else {
							_class="gray";
						}
						if (matrice[itemName]["outputClass"] != "") {
							_class=matrice[itemName]["outputClass"];
						}
						_result+="<tr>";
						_result+="<td>" + matrice[itemName]["title"] + "</td>";
						_result+="<td class='" + _class + "'>" + matrice[itemName]["displayedValue"] + "&nbsp;</td>";
						_result+="<td>" + matrice[itemName]["unit"] + "</td>";
						_result+="</tr>";
					}
					
						
				}
			}
			
		}
		_result+="</table></div>";
		var elementResult=document.getElementById("rightBox");
		elementResult.innerHTML=_result;
		
		/* Transforme les titres d'étapes en boutons clickables
		===========================================================*/
		var _idTitreEtape="";
		for (var j=1;j<= _numEtape ;j++) {
			
			_idTitreEtape="#resultTitreEtape" + j;
			$(_idTitreEtape).button({
				width: 400,
				height: 50,
				icons: {primary:'ui-icon-triangle-1-e'}
			});
			$(_idTitreEtape).width(395);
			$(_idTitreEtape).css("text-align", "left");
			//$(_idTitreEtape).css("border-color", "#FFFFFF");
			//$(_idTitreEtape).css("text-transform", "uppercase");
			//$(_idTitreEtape).css("font-size", "11px");
		
		
			if (j == 1) {
				$(_idTitreEtape).click(function() {
				  	displayEtape(1);
				});
			}
			if (j == 2) {
				$(_idTitreEtape).click(function() {
				  	displayEtape(2);	
				});
			}
			if (j == 3) {
				$(_idTitreEtape).click(function() {
				  	displayEtape(3);	
				});
			}
			if (j == 4) {
				$(_idTitreEtape).click(function() {
				  	displayEtape(4);	
				});
			}
			if (j == 5) {
				$(_idTitreEtape).click(function() {
				  	displayEtape(5);	
				});
			}
			
		}
		
	}
	
	function calcResultat() {
		RESULTAT_productionPhotovoltaique=matrice["productionAnnuelle"]["value"];
		calc_productionAnnuelle();
		calc_prixCv();
		calc_tauxOctroiCv();
		//Min (consommationElecAnnuelle, productionAnnuelle)
		calc_autoconsommation();
		RESULTAT_autoconsommation=Math.min(matrice["consommationElecAnnuelle"]["value"],matrice["productionAnnuelle"]["value"]);
		
		calc_prixAchatElec();
		//=prixAchatElec*(1+indexationCoutEnergetique)
		RESULTAT_indexationUnAn=matrice["prixAchatElec"]["value"] * (1 + parseFloat((matrice["indexationCoutEnergetique"]["value"]) / 100));
		
		RESULTAT_autoconsommationEuro=RESULTAT_autoconsommation * RESULTAT_indexationUnAn;
		
		calc_achatElec();
		calc_fraisRemplacement();
		calc_fraisFonctionnement();
		calc_primeRegionale();
		calc_primeProvinciale();
		calc_primeCommunale();
		calc_reducFiscaleParticulier();
		calc_reducTaxeCommunale();
		
		calc_coutConsoDeBase();
		calc_coutActualiseConsoSansPv();
		calc_VANconsoHorsPv();
		calc_autoconsommationElecPv();
		calc_achatElecAvecPv();
		calc_nbrCvOctroye();
		calc_nbrCvOctroyeAnticip();
		calc_venteCv();
		calc_coutConsoPv();
		calc_coutActualise();
		calc_VANconsoPv();
		calc_CfPv();
		calc_CfPvAvecInteret();
		calc_VANinvestPv();
		calc_TRI();
		calc_TRIM();
		calc_TRS();
		calc_TRA();
		//displayTabAllResultat();
		
	}
	function calcEtapes() {
		// Calculs 
		//var _result = "<div class='rightBoxData'><table border='0' width='100%' style='font-size:11px;'>";
		if ((numEtape >= 1) || (tabMenu[1][2] == 1)) {
			//matrice[1]["value"]=0;
			if (numEtape == 1) {
				
				//Province
				matrice["province"]["value"]=getSelectValue("fieldEtape1ProvinceValue");
				//alert(matrice["province"]["value"]);
				matrice["province"]["displayedValue"]=tabProvince[getSelectValue("fieldEtape1ProvinceValue")][1];
				
				//Commune
				
				matrice["commune"]["value"] = getSelectValue("fieldEtape1CommuneValue");
				matrice["commune"]["displayedValue"]=tabProvinceCommune[matrice["commune"]["value"]][3];
				
				//Type de construction
				//matrice["typeConstruction"]["value"] = getSelectValue("fieldEtape1TypeConstructionValue");
				//matrice["typeConstruction"]["displayedValue"]=tabTypeConstruction[getSelectValue("fieldEtape1TypeConstructionValue")][1];
				
				// ATTENTION CHANGER LES VIRGULES EN POINT DANS LE TABLEAU
				matrice["tauxCommunal"]["value"] = parseFloat(tabProvinceCommune[matrice["commune"]["value"]][4]) / 100;//tabTypeConstruction[getSelectValue("fieldEtape1TypeConstructionValue")][2];
				matrice["tauxCommunal"]["displayedValue"] = tabProvinceCommune[matrice["commune"]["value"]][4];
				
				matrice["tauxTva"]["value"] = tabTypeConstruction[matrice["typeConstruction"]["value"]][2] ;//tabTypeConstruction[getSelectValue("fieldEtape1TypeConstructionValue")][2];			
				matrice["tauxTva"]["displayedValue"] = tabTypeConstruction[matrice["typeConstruction"]["value"]][2]*100;//tabTypeConstruction[getSelectValue("fieldEtape1TypeConstructionValue")][2];	
				
				matrice["etalementFiscal"]["value"] = tabTypeConstruction[matrice["typeConstruction"]["value"]][3] ;
				matrice["etalementFiscal"]["displayedValue"] = tabTypeConstruction[matrice["typeConstruction"]["value"]][3] ;	
			}
			
			if (numEtape == 2) {
				
				
				matrice["indexationCoutEnergetique"]["value"]=parseFloat(matrice["evolutionPrixElec"]["value"]);
				matrice["indexationCoutEnergetique"]["displayedValue"]=matrice["indexationCoutEnergetique"]["value"];
			}
			
			if (numEtape == 3) {
				matrice["consommationElecAnnuelle"]["displayedValue"]=formatNombre(matrice["consommationElecAnnuelle"]["value"],0," ");
				
				/* facteurCorrection
				
					Déterminé selon le disque solaire (Feuille 'Hyp')
				============================================================*/
				matrice["facteurCorrection"]["value"]=100;
				matrice["facteurCorrection"]["displayedValue"]=100;
				//if ((matrice["facteurCorrectionManual"]["value"] == "") || (matrice["facteurCorrectionManual"]["value"] == 0)) {
					if ((matrice["orientation"]["value"] != 0) && (matrice["inclinaison"]["value"] != 0)) {
						matrice["facteurCorrection"]["value"]=tabInclinaison[matrice["inclinaison"]["value"]][matrice["orientation"]["value"]];
						matrice["facteurCorrection"]["displayedValue"]=matrice["facteurCorrection"]["value"];
					}
				/*}  else {
						matrice["facteurCorrection"]["value"]=matrice["facteurCorrectionManual"]["value"];
						matrice["facteurCorrection"]["displayedValue"]=matrice["facteurCorrectionManual"]["value"];
				}	
				*/
				/* perteRendement
				
					Suppose généralement 0.5% /an
					Source PVGIS
				============================================================*/
				//matrice["perteRendement"]["value"]="Calcul";
				//matrice["perteRendement"]["displayedValue"]="Calcul";
				
				/* productionElecOptimum
					Suppose production de 850 kWh/kWc (moyenne belge) si aucune info introduite
					Optimum : sud
					Optimum : 35°

					=SI(ESTVIDE(E27);850;INDEX(Hyp!J66:AA94;EQUIV(Donnees!E27;Hyp!I66:I94;0);EQUIV(Province;Hyp!J65:AA65)+1))
				=========================================================*/
				//if (matrice["villeProche"]["value"] != 0) {
					//if (tabPVGIS[matrice["comboProductionElecOptimum"]["value"]][0] != 3) {
						matrice["productionElecOptimum"]["value"]=tabPVGIS[matrice["comboProductionElecOptimum"]["value"]][2];
						matrice["productionElecOptimum"]["displayedValue"]=matrice["productionElecOptimum"]["value"];
						//alert (tabPVGIS[matrice["comboProductionElecOptimum"]["value"]][0]);
					//} 
					
					//alert(matrice["productionElecOptimum"]["value"]);
				//} else {
					//alert(matrice["productionElecOptimum"]["value"]);
					//matrice["productionElecOptimum"]["value"]=matrice["productionElecOptimum"]["default"];
					//matrice["productionElecOptimum"]["displayedValue"]=matrice["productionElecOptimum"]["default"];
				//}	
				/* productionAnnuelle
				
					=SI(ESTVIDE(E31);E26*G33*G31;E26*G33*E31)
				==============================================================*/
				
					var _facteurPerte = 1 - (parseFloat(matrice["facteurPerte"]["value"]) / 100);
					//alert(_facteurPerte);
					if (_VERSION == 2) {
						if (matrice["comboProductionConnue"]["value"] == 1) {
							matrice["productionAnnuelle"]["value"]=(parseFloat(matrice["PuissanceCrete"]["value"]) * parseFloat(matrice["facteurCorrection"]["value"]) * parseFloat(matrice["productionElecOptimum"]["value"]) / 100) * _facteurPerte;
							matrice["productionAnnuelle"]["displayedValue"]=matrice["productionAnnuelle"]["value"];
						}
					} else {
						
						matrice["productionAnnuelle"]["value"]=(parseFloat(matrice["PuissanceCrete"]["value"]) * parseFloat(matrice["facteurCorrection"]["value"]) * parseFloat(matrice["productionElecOptimum"]["value"]) / 100) * _facteurPerte;
						matrice["productionAnnuelle"]["displayedValue"]=matrice["productionAnnuelle"]["value"];
					}
					
				
			}
			if (numEtape == 4) {
				//matrice["investSystemePv"]["value"]=getInputValue("investSystemePv");
				//matrice["investSystemePv"]["displayedValue"]=getInputValue("investSystemePv");
				
				// investSystemePvTvac = investSystemePv * (1+tauxTva)
				//matrice["investSystemePvTvac"]["value"]=parseFloat(matrice["investSystemePv"]["value"]) * (1 + parseFloat(matrice["tauxTva"]["value"]));  //     matrice["tauxTva"]["value"]     //E39*(1+TVA)
				matrice["investSystemePvTvac"]["displayedValue"]=formatNombre(matrice["investSystemePvTvac"]["value"],0," ");
			
				matrice["investSystemePvParWcTvac"]["value"]=matrice["investSystemePvTvac"]["value"] / (parseFloat(matrice["PuissanceCrete"]["value"]) * 1000);
				matrice["investSystemePvParWcTvac"]["displayedValue"]=formatNombre(matrice["investSystemePvParWcTvac"]["value"],2,"");
				
				matrice["datePayement"]["value"]=getSelectValue("fieldEtape4DateValue");
				matrice["datePayement"]["displayedValue"]=tabDate[matrice["datePayement"]["value"]][0];
				
				/* prixCv
					Supposé fixe, PAS indexé
				=================================================*/
				//matrice["prixCv"]["value"]=getInputValue("prixCv");
				//matrice["prixCv"]["displayedValue"]=getInputValue("prixCv");
				
				/*dureeOctroiCv
					CWaPE :	à concurrence du nombtre estimé pour une période de cinq ans et sous réserve d'un plafond de 40 CV
					Le mécanisme d'octroi anticipé de max. 40 CV 
					est pris en compte de l'analyse si aucune prime régionale n'est introduite
					
					=INDEX(Hyp!C100:E102;EQUIV(E50;Hyp!B100:B102;0);1)
				================================================== */
				matrice["dureeOctroiCv"]["value"]=tabDate[matrice["datePayement"]["value"]][1];
				matrice["dureeOctroiCv"]["displayedValue"]=matrice["dureeOctroiCv"]["value"];
				
				/* tauxOctroiCv	
					Du 01/12/2012 au 31/03/2012 :
					Pour les 5 premiers kWc : 7 CV / MWh produit
					Pour les 5 kWc suivants :  5 CV/MWh produit
					Pendant 10 ans
					http://www.ef4.be/fr/photovoltaique/cv/cv-photovoltaique.html
					
					=SI(PuissanceCrete<=5)
						;7
					sinon 
						SI(PuissanceCrete>10;
							"pas valable";
						sinon
							7*5/PuissanceCrete+5*(PuissanceCrete-5)/PuissanceCrete))
							
				================================================= */
				var _puissanceCrete =parseFloat(matrice["PuissanceCrete"]["value"]);
				var _tauxOctroiCv=0;
				if (_puissanceCrete <= 5) {
					_tauxOctroiCv=7;
				} else {
					if ((_puissanceCrete > 5) && (_puissanceCrete <= 10)) {
						 _tauxOctroiCv = (7 * 5 / _puissanceCrete) + 5 * (_puissanceCrete - 5) / _puissanceCrete;
					} else {
						_tauxOctroiCv="Pas valable";
					}
				}
				//alert(_tauxOctroiCv);
				matrice["tauxOctroiCv"]["value"]=_tauxOctroiCv;
				matrice["tauxOctroiCv"]["displayedValue"]=_tauxOctroiCv;
				
				
				/* reducFiscaleParticulier
					40% des investissements avec un plafond à 3 680 € (en 2011), 
					l'excédent pouvant être reporté sur les 3 années imposables suivantes (pour maisons occupées depuis + de 5 ans)
					
					=INDEX(Hyp!B100:E104;EQUIV(E50;Hyp!B100:B104;0);4)*0.4*G39
					=INDEX(CV;EQUIV(Date;Hyp!B100:B105);3)*SI(etalementFiscal="oui";MIN(4*3680;0,4*investSystemePvTvac);MIN(3680;0,4*investSystemePvTvac))
				====================================================================*/
				var _isReductionFiscale = tabDate[matrice["datePayement"]["value"]][2];
				var _investSystemePvTvac = matrice["investSystemePvTvac"]["value"];
				var _reducFiscaleParticulier=0;
				if (matrice["etalementFiscal"]["value"] > 0) {
					_reducFiscaleParticulier = _isReductionFiscale * Math.min((4 * 3680), (0.4 * _investSystemePvTvac));
					
				} else {
					_reducFiscaleParticulier = _isReductionFiscale * Math.min(3680, (0.4 * _investSystemePvTvac));
				}
				matrice["reducFiscaleParticulier"]["value"]=_reducFiscaleParticulier;
				matrice["reducFiscaleParticulier"]["displayedValue"]=_reducFiscaleParticulier;
				
				/*var _primeRegionale = tabDate[matrice["datePayement"]["value"]][3];
				_reducFiscaleParticulier = parseFloat(_primeRegionale) * 0.4 * parseFloat(matrice["investSystemePvTvac"]["value"]);
				matrice["reducFiscaleParticulier"]["value"]=_reducFiscaleParticulier;
				matrice["reducFiscaleParticulier"]["displayedValue"]=_reducFiscaleParticulier;
				*/
				
				
				/* reducTaxeCommunale
					=tauxCommunal * reducFiscaleParticulier
				=============================================================*/
				matrice["reducTaxeCommunale"]["value"]=parseFloat(matrice["tauxCommunal"]["value"]) * parseFloat(matrice["reducFiscaleParticulier"]["value"]);
				matrice["reducTaxeCommunale"]["displayedValue"]=matrice["reducTaxeCommunale"]["value"];
				
				/* aideInvestTotal
					Tient compte de la prime régionale OU des CV anticipés de la 1° année

					=E55+E56+E57+G58+G59
				============================================================*/
				var _primeRegionale = parseFloat(matrice["primeRegionale"]["value"]);
				var _primeProvinciale = parseFloat(matrice["primeProvinciale"]["value"]);
				var _primeCommunale = parseFloat(matrice["primeCommunale"]["value"]);
				//var _primeRegionale = parseFloat(matrice["primeRegionale"]["value"]);
				var _reducTaxeCommunale = parseFloat(matrice["reducTaxeCommunale"]["value"]);
				matrice["aideInvestTotal"]["value"]= _primeRegionale + _primeProvinciale + _primeCommunale + _reducFiscaleParticulier + _reducTaxeCommunale;
				matrice["aideInvestTotal"]["displayedValue"]=matrice["aideInvestTotal"]["value"];
				
				/* investDepartNetInstallation
					=MAX(0;SOMME(investSystemePv + investAuxilliaire + investFraisDepart))*((1+tauxTva)/100)-_aideInvestTotal)
				===============================================================*/


				var _investSystemePv = parseFloat(matrice["investSystemePv"]["value"]);
				var _investAuxilliaire = parseFloat(matrice["investAuxilliaire"]["value"]);
				var _investFraisDepart = parseFloat(matrice["investFraisDepart"]["value"]);
				//var _tauxTVA = (1 + parseFloat(matrice["tauxTva"]["value"]));
				var _aideInvestTotal = parseFloat(matrice["aideInvestTotal"]["value"]);
				
				//matrice["investDepartNetInstallation"]["value"]=((_investSystemePv + _investAuxilliaire + _investFraisDepart) * _tauxTVA) - _aideInvestTotal;
				matrice["investDepartNetInstallation"]["value"]=((_investSystemePvTvac + _investAuxilliaire + _investFraisDepart)) - _aideInvestTotal;
				matrice["investDepartNetInstallation"]["displayedValue"]=formatNombre(matrice["investDepartNetInstallation"]["value"],0," ");
			}
			
			
		}
	}
	
	function getSelectValue(selectId)
	{
		/**On récupère l'élement html <select>*/
		var selectElmt = document.getElementById(selectId);
		/**
		selectElmt.options correspond au tableau des balises <option> du select
		selectElmt.selectedIndex correspond à l'index du tableau options qui est actuellement sélectionné
		*/
		//alert(selectElmt.options[selectElmt.selectedIndex].value);
		return selectElmt.options[selectElmt.selectedIndex].value;
	}
	
	function getInputValue(selectId)
	{
		/**On récupère l'élement html <select>*/
		var selectElmt = document.getElementById(selectId);
		/**
		selectElmt.options correspond au tableau des balises <option> du select
		selectElmt.selectedIndex correspond à l'index du tableau options qui est actuellement sélectionné
		*/
		//alert(selectElmt.options[selectElmt.selectedIndex].value);
		return selectElmt.value;
	}
	
	function dialogStart() {
		var _content = "<table><tr><td width='80px'><img src='./images/confirm.png'/></td><td>Voulez-vous relancer le programme et réinitialiser les données ?</td></tr></table>";
		var selectElmt = document.getElementById("popup");
		
		selectElmt.innerHTML=_content;
		 $( "#popup" ).dialog({ 
	    		width: 350, 
	    		height:170,
	    		position: 'center',
	    		modal: true,
	    		title: "Retour et initialisation",
	    		resizable: false,
	    		
	    		hide: 'fadeOut',
	    		show: 'fadeIn',
	    		autoOpen: true,
	    		
	    		buttons: { 
	    			"Oui": function() { location.reload();  },
	    			"Non": function() { $(this).dialog("close");  },
	    			"Annuler": function() { $(this).dialog("close"); }
	    		 }
	    		
	    		});
	    		$( "#popup" ).dialog("open");
	}
	
	function dialogRayonnementSolaire() { // NON UTILISE
		var _validFunction = " onchange='validInput(this, 0,1000);'";
		_validFunction += " onkeyup='validInput(this, 0,1000);'";
		
		var _content = "<table><tr><td width='80px'><img src='./images/question.png'/></td>";
		_content +="<td>";
		_content +="<div>Entrez le rayonnement solaire :</div>";
		_content +="<div width='250px' class='inputFieldTd'><INPUT id='productionElecOptimum' name='productionElecOptimum' class='inputfieldRight'  value='" + matrice["productionElecOptimum"]["value"] + "' type='text'" + _validFunction + ">kWh/kWc</td><td></td></tr>";
		_content +="</td></tr></table>";
		var selectElmt = document.getElementById("popup");
		
		selectElmt.innerHTML=_content;
		 $( "#popup" ).dialog({ 
	    		width: 350, 
	    		height:170,
	    		position: 'center',
	    		modal: true,
	    		title: "Production électrique à l'optimum",
	    		resizable: false,
	    		
	    		hide: 'fadeOut',
	    		
	    		autoOpen: true,
	    		
	    		buttons: { 
	    			
	    			"OK": function() {
					
					tabPVGIS[matrice["comboProductionElecOptimum"]["value"]][2]=getInputValue("productionElecOptimum");
					matrice["productionElecOptimum"]["value"]=getInputValue("productionElecOptimum");
					matrice["productionElecOptimum"]["displayedValue"]=matrice["productionElecOptimum"]["value"];
					$(this).dialog("close");
					//alert(matrice["productionElecOptimum"]["value"]);
					calcEtapes();
					displayOutput(numEtape);
					
				}
	    			
	    		 }
	    		
	    		});
	    		$( "#popup" ).dialog("open");
	}
	
	function getMousePosition(e) {
		var _x;
		var _y;
		if (!isIE) {
			_x = e.pageX;
			_y = e.pageY;
		}
		if (isIE) {
			_x = event.clientX + document.body.scrollLeft;
			_y = event.clientY + document.body.scrollTop;
		}
		posX = _x;
		posY = _y;
	return true;
}
	
	
	
