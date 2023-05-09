$(()=>{
    let checkToken = sendRequestNoCallback("/api/checkToken", "GET", {});
    checkToken.done(function (serverData) {
        console.log(serverData);
    });
    checkToken.fail(function (jqXHR, test_status, str_error) {
        error(jqXHR, test_status, str_error);
        window.location.href = "login.html";
    });
    //CreateDynamicTable()
});