$(() => {

    AOS.init();

    let _error = localStorage.getItem('error');

    console.log(_error != null)

    if(_error != null){
        showAndDismissAlert("danger", _error);
        localStorage.removeItem("error");
    }

    $("#btnRegister").on("click", function () {
        $("#sectionRegister").show();
        $("#sectionLogin").hide();
    });

    $("#btnLogin").on("click", function () {
        $("#sectionLogin").show();
        $("#sectionRegister").hide();
    });

    $("#btnInviaLogin").on("click", function () {
        let _email = $("#sectionLogin").find("input[name='email']").val();
        let _password = $("#sectionLogin").find("input[name='pass']").val();

        if (_email === "" || _password === "" || !ValidateEmail(_email)) {
            showAndDismissAlert("danger", "Errore: Alcuni campi sono vuoti o errati")
            return;
        }
        
        let postData = { email: _email, password: _password };
        let login = sendRequestNoCallback("/api/login", "POST", postData);
        login.fail(function (jqXHR) {
            showAndDismissAlert("danger", "Errore: " + jqXHR.status + " - " + jqXHR.responseText);
        });

        login.done(function (serverData) {
            serverData = JSON.parse(serverData);
            console.log("NEW TOKEN: " + serverData.token);
            localStorage.setItem("token", serverData.token);
            window.location.href = "index.html";
        });
    });
    $("#btnInviaRegister").on("click", function () {
        let _email = $("#sectionRegister").find("input[name='email']").val();
        let _nome = $("#sectionRegister").find("input[name='nome']").val();
        let _cognome = $("#sectionRegister").find("input[name='cognome']").val();

        if (_email === "" || _nome === "" || _cognome === "" || !ValidateEmail(_email)) {
            showAndDismissAlert("danger", "Errore: Alcuni campi sono vuoti o errati")
            return;
        }

        let postData = { nome: _nome, cognome: _cognome, email: _email };
        let register = sendRequestNoCallback("/api/register", "POST", postData);
        register.fail(function (jqXHR) {
            showAndDismissAlert("danger", "Errore: " + jqXHR.status + " - " + jqXHR.responseText);
        });

        register.done(function (serverData) {
            serverData = JSON.parse(serverData);
            console.log("NEW TOKEN: " + serverData.token);
            localStorage.setItem("token", serverData.token);
            window.location.href = "verifica.html";
        });
    });
});