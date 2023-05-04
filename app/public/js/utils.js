/*UTILS.JS*/

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}


function CreateDynamicTable(data) {
    let voti = sendRequestNoCallback("/api/getVoti", "GET", { email: localStorage.getItem("email") });
    voti.done(function (serverData) {
        serverData = JSON.parse(serverData);
        console.log(serverData.data);;

        if (serverData.data.length == 0) {
            $(".table-responsive").hide();
            $("#content-voti").append($("<h1></h1>").text("Non hai ancora nessun voto!"))
        }

        var tbody = $('#tableVoti').children('tbody').eq(0);

        serverData.data.forEach(function (voto) {
            var tr = $('<tr>');
            ['date', 'ore', 'voto', 'max'].forEach(function (attr) {
                console.log(attr + " " + voto[attr]);
                if (attr == 'voto') {
                    if (voto[attr] < 6)
                        tr.append('<td class="col-3 text-danger font-weight-bold">' + voto[attr] + '</td>');
                    else
                        tr.append('<td class="col-3 text-success font-weight-bold">' + voto[attr] + '</td>');
                } else
                    tr.append('<td class="col-3">' + voto[attr] + '</td>');
            });
            tbody.append(tr);
        });


    });
    voti.fail(function (jqXHR, test_status, str_error) {
        error(jqXHR, test_status, str_error);
        window.location.href = "login.html";
    });
}