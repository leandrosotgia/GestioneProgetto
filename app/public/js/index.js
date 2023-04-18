$(()=>{
    
    $("#sectionRegister").hide();

    $("#btnRegister").on("click", function(){
        $("#sectionRegister").show();
        $("#sectionLogin").hide();
    });

    $("#btnLogin").on("click", function(){
        $("#sectionLogin").show();
        $("#sectionRegister").hide();
    });

    // $("btnInviaLogin").on("click", function(){
    //     let _email = $("#sectionLogin").children('input[name="email"').val();
    //     console.log(_email);
    // });

});