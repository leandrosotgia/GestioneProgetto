$(() => {
    AOS.init();


    let _token = localStorage.getItem('token');
    let checkAdmin = sendRequestNoCallback("/api/checkAdmin", "POST", { token: _token });

    checkAdmin.done(function (serverData) {
        let getUtenti = sendRequestNoCallback("/api/getUtenti", "GET", {});

        getUtenti.done(function (serverData) {

            console.log(serverData)
            serverData = JSON.parse(serverData);
            console.log(serverData);

            CreateDynamicTable(serverData.results, serverData.fields, $("#tableTest"));
            $("#messageTable").hide();
            $("#tableTest").show();
            AOS.refresh();

        });
        getUtenti.fail(function (jqXHR, test_status, str_error) {
            showAndDismissAlert("danger", "Errore: " + jqXHR.status + " - " + jqXHR.responseText)
        });

    });
    checkAdmin.fail(function (jqXHR, test_status, str_error) {
        localStorage.setItem("error", "Errore: " + jqXHR.status + " - " + jqXHR.responseText);
        window.location.href = "login.html";
    });




});    
function handleRowClick(row) {
    var content = $(row).find('td:first').html();
    console.log(content);
}