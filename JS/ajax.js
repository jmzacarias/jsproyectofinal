//  https://api.jquery.com/Jquery.ajax/

$(document).ready(function () {
	const APIURL = "https://jsonplaceholder.typicode.com/posts";

	const usuarioPost = {
		usuario: "Juan Zacarias",
		profesion: "Abogado",
	};

	$("#js-post").click((e) => {
        e.preventDefault();
    
		$.ajax({
			method: "POST",
			url: APIURL,
			data: usuarioPost,
			success: function (res) {
                $("#js-form").empty()
				$("#js-form").append(
					`<p>¡Felicitaciones, ${res.usuario}! Tu correo fue agregado a nuestra lista de distribución exitosamente. Ya no te perderás las novedades.</p>`
				);
			},
		});
	});
});
