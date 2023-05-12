/*UTILS.JS*/

function ValidateEmail(mail) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
		return (true)
	}
	return (false)
}

function showAndDismissAlert(type, message, fade = true) {
	let htmlAlert = '<div class="alert alert-' + type + '">' + message + '</div>';
	$(".alert-messages").empty();

	$(".alert-messages").prepend(htmlAlert);
	if (fade) {
		$(".alert-messages .alert").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).remove(); });
	}
	else {
		$(".alert-messages .alert").first().hide();
	}
}


function CreateDynamicTable(dati, campi, selettore) {
	var thead = '<thead><tr>';
	for (let i = 0; i < campi.length; i++) {
		let campo = campi[i].name;
		if (campo === 'IS_Admin') {
			campo = 'Admin';
		}
		thead += '<th>' + campo + '</th>';
	}
	thead += '</tr></thead>';

	let tbody = '<tbody>';
	for (let j = 0; j < dati.length; j++) {
		tbody += '<tr onclick="handleRowClick(this)">';
		for (let k = 0; k < campi.length; k++) {
			let campo = campi[k].name;
			let cellValue = dati[j][campo];
			if (campo === 'IS_Admin') {
				if (cellValue.data[0] === 0) {
					cellValue = '<label class="switch"><input type="checkbox"><span class="slider round"></span></label>';
				} else {
					cellValue = '<label class="switch"><input type="checkbox" checked ><span class="slider round"></span></label>';
				}
			}
			else if (campo === 'Pwd') {
				if (cellValue !== '') {

					cellValue = '<button class="btn btn-primary btn-sm">Genera nuova password</button>'
				}
				else
					cellValue = '<button class="btn btn-success btn-sm">Genera password</button>'

			}
			tbody += '<td>' + cellValue + '</td>';
		}
		tbody += '</tr>';
	}
	tbody += '</tbody>';

	let table = '<table>' + thead + tbody + '</table>';

	$(selettore).html(table);
}

function sendRequest(url, method, parameters, callback) {
	$.ajax({
		url: url,
		type: method,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		dataType: "text",
		data: parameters,
		timeout: 6000000,
		success: callback,
		error: function (jqXHR, test_status, str_error) {
			//console.log("No connection to " + link);
			//console.log("Test_status: " + test_status);
			alert("Error: " + str_error);
		}
	});
}

function sendRequestNoCallback(url, method, parameters) {
	let mycontentType;
	if (method.toUpperCase() == "GET")
		mycontentType = "application/x-www-form-urlencoded; charset=UTF-8";
	else {
		mycontentType = "application/json; charset=UTF-8";
		parameters = JSON.stringify(parameters);
	}
	return $.ajax({
		url: url,
		contentType: mycontentType,
		type: method,
		dataType: "text",
		data: parameters,
		headers: { token: "Bearer " + localStorage.getItem("token") },
		timeout: 5000
	});
}

function error(jqXHR, testStatus, strError) {
	/*if (jqXHR.status == 0)
		console.log("server timeout");
	else if (jqXHR.status == 200)
		console.log("Formato dei dati non corretto : " + jqXHR.responseText);
	else
		console.log("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);*/
	let code = jqXHR.status;
	let message = jqXHR.responseText;
	if (code == 0)
		alert("Server TimeOut");
	else {
		//if(message != "Token inesistente")
		//alert("Errore Login. Codice Errore: " + code + " - " + message);
	}
}