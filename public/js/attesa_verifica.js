$(()=>{
    AOS.init();
    
    let _email = localStorage.getItem('email');
    let _nome = localStorage.getItem('nome');
    let _cognome = localStorage.getItem('cognome');


    let greetings = $("#greetings");

    $('#greetings').html($('#greetings').html()
        .replace('{nome}', _nome.toUpperCase())
        .replace('{cognome}', _cognome.toUpperCase())
        .replace('{email}', _email)
    );

});