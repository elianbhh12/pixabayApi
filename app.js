const formulario = document.getElementById("formulario");
const terminoInput = document.getElementById("termino");
const categoriaInput = document.getElementById("categoria");
const resultadosDiv = document.getElementById("resultados");
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const termino = terminoInput.value;
    const categoria = categoriaInput.value;

    const url = `https://pixabay.com/api/?key=42648211-38ca7cdf8831e74a6f63fec3d&q=${termino}&category=${categoria}&image_type=photo&orientation=horizontal&color=red`;
    

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (datos.hits.length === 0) {
        resultadosDiv.innerHTML = "No se encontraron resultados";
    } else {
        let resultadosHTML = "";

        for (const imagen of datos.hits) {
            resultadosHTML += `
            <div class="imagen">
                <img src="${imagen.previewURL}" alt="${imagen.tags}" class="rounded-lg" onclick="abrirModal('${imagen.largeImageURL}', '${imagen.tags}', '${imagen.user}', '${imagen.likes}', '${imagen.views}')">
                
            </div>
            `;
        }
        
        resultadosDiv.innerHTML = resultadosHTML;
    }
});

function abrirModal(url, tags, usuario, likes, vistas) {
    modal.style.display = "block";
    modalImg.src = url;

    let info = `
        <p><i class="fas fa-tags"></i><strong>Etiquetas:</strong> ${tags}</p>
    `;
    if (usuario) {
        info += `
            <p><i class="fas fa-user"></i><strong>Usuario:</strong> ${usuario}</p>
        `;
    }
    if (likes) {
        info += `
            <p><i class="fas fa-heart"></i><strong>Likes:</strong> ${likes}</p>
        `;
    }
    if (vistas) {
        info += `
            <p><i class="fas fa-eye"></i><strong>Vistas:</strong> ${vistas}</p>
        `;
    }
    captionText.innerHTML = info;
}

modal.onclick = function() {
    modal.style.display = "none";
}