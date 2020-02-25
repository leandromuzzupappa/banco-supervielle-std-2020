// 
for (const dropdown of document.querySelectorAll(".custom-select-wrapper")) {
    dropdown.addEventListener('click', function () {
        this.querySelector('.custom-select').classList.toggle('open');
    })
}
for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function () {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
        }
    })
}
window.addEventListener('click', function (e) {
    for (const select of document.querySelectorAll('.custom-select')) {
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    }
});

// Fn para traer el valor de los custom select - recibe un #id y devuelve un string
const getSelectVal = (id) => {
    let selectVal = document.querySelector(id + ' .custom-select__trigger span').innerHTML;
    return selectVal;
}
// Fn para traer el valor de los inputs - recibe un #id y devuelve un string
const getInputVal = (id) => {
    let input = document.querySelector(id).value;
    return input;
}

var sresponse = $('#serverResponse');
var sstatus = $('#sstatus');
const popup = $('#popup');
const closeP = $('#closeP');
const overlay = $('#overlay');

// cerrar responses - popups
const closeResponse = () => {
    popup.fadeOut();
    overlay.fadeOut();
    sstatus.fadeOut();
}

const showResponse = (msg) => {
    popup.slideDown('fast');
    sresponse.html(msg);
}

closeP.click(()=>{
    closeResponse();
})

const postToGoogle = () => {
    sstatus.fadeIn().html('Procesando');
    overlay.fadeIn();

    var nombreCompleto = getInputVal('#nombreCompleto');
    var email = getInputVal('#email');
    var dni = getInputVal('#dni');
    var asistencia = getSelectVal('#asistencia');
    var traslado = getSelectVal('#traslado');
    var restriccionAlimentaria = getSelectVal('#restriccion-alimentaria');

    console.log(nombreCompleto);
    console.log(email);
    console.log(dni);
    console.log(asistencia);
    console.log(traslado);
    console.log(restriccionAlimentaria);

    var error = 0;
    if ( nombreCompleto === '') {
        $('#nombreCompleto').addClass('alert');
        $('#nombreCompleto').attr('placeholder', 'El nombre es obligatorio');
        error++;
    }
    if ( email === '') {
        $('#email').addClass('alert');
        $('#email').attr('placeholder', 'El email es obligatorio');
        error++;
    }
    if ( dni === '' && typeof dni != 'number') {
        $('#dni').addClass('alert');
        $('#dni').attr('placeholder', 'El dni es obligatorio');
        error++;
    }
    if ( asistencia === 'Seleccionar') {
        $('#asistencia').addClass('alert');
        error++;
    }
    if ( traslado === 'Seleccionar') {
        $('#traslado').addClass('alert');
        error++;
    }
    if ( restriccionAlimentaria === 'Seleccionar') {
        $('#restriccion-alimentaria').addClass('alert');
        error++;
    }

    if ( error === 0 ) {
        $.ajax({
            url: "https://docs.google.com/forms/d/e/1FAIpQLSd5xZAX7y7Df8tQfXe7R8vjxhgVcPYKFh3JfgRFagHu-UmvpA/formResponse?",
             data: {
                "entry.821673028" : nombreCompleto,
                "entry.674535025" : email,
                "entry.763619302" : dni,
                "entry.1081758758" : asistencia,
                "entry.835211766" : traslado,
                "entry.1115736034" : restriccionAlimentaria,
             },
             type: "POST",
             dataType: "xml",
             success: function (d) {
             },
             error: function (x, y, z) {
            }
        })
        setTimeout(() => {
            sstatus.html('Su confirmación ha sido enviada correctamente');
            setTimeout(() => {
                closeResponse();
                $('#STDform').reset();
            }, 500);
        }, 900);
    } else {
        setTimeout(() => {
            sstatus.html('Hubo un error en tu confirmacion');

            setTimeout(() => {
                sstatus.html('').fadeOut()
                showResponse('No se ha podido enviar su confirmación porque uno o varios de los campos ingresados no es valido o esta vacío.');
            }, 900);
        }, 500);
    }
    return false;
}