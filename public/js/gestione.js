$(()=>{
    AOS.init();

    let checkToken = sendRequestNoCallback("/api/checkToken", "GET", {});
    checkToken.done(function (serverData) {
        console.log(serverData);
    
        let _email = localStorage.getItem('email');
        let checkAdmin = sendRequestNoCallback("/api/checkAdmin", "POST", {email: _email});

        checkAdmin.done(function(serverData) {
            console.log(serverData);
        });
        checkAdmin.fail(function (jqXHR, test_status, str_error){
            alert(jqXHR, test_status, str_error);
            window.location.href = "login.html";
        });
    });
    checkToken.fail(function (jqXHR, test_status, str_error) {
        error(jqXHR, test_status, str_error);
        window.location.href = "login.html";
    });


})