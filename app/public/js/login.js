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

    $("#btnInviaLogin").on("click", function(){
        let _email = $("#sectionLogin").find("input[name='email']").val();
        let _password = $("#sectionLogin").find("input[name='pass']").val();
    
        if(_email === "" || _password === "" || !ValidateEmail(_email))
            return null;
        else
            console.log("Campi ok");
            // richiesta login
    });
    $("#btnInviaRegister").on("click", function(){
        let _email = $("#sectionRegister").find("input[name='email']").val();
        let _nome = $("#sectionRegister").find("input[name='nome']").val();
        let _cognome = $("#sectionRegister").find("input[name='cognome']").val();
    
        if(_email === "" || _nome === "" || _cognome === "" || !ValidateEmail(_email))
            return null;
        else
            console.log("Campi ok");
            // richiesta login
    });
});