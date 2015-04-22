
function sessionClass() {
   this.isConnected = false;
   this.isIpConnection = false;
   this.isPrint = false;
   this.cutAndPasteLines = 0;
   this.title="";
   this.ip="";
   this.dailyBeginDate = "";
   
   this.daily="";
   this.daily_beginDate="";
   this.daily_endDate="";
   this.daily_beginDateArchive="";
   this.daily_fr="";
   this.daily_en="";
   
   this.edd="";
   this.edd_beginDate="";
   this.edd_endDate="";
   this.edd_beginDateArchive="";
   this.edd_fr="";
   this.edd_en="";
   
   this.doGetSession = function() {
     // alert ("getSession");
      var _login = "testLogin";
      var _cookieValue=doGetCookie("AE_Auth");
     // alert(_cookieValue);
      $.ajax({
         type:"get",
         url:"./php/getSession.php",
         data: "authFormLogin=" + _login,
         success: function(data){
            //alert("session: " + data);
           
           
         }
        
      });
   }
   
}
    