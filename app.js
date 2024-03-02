const formulario = document.getElementById("formulario");
const terminoInput = document.getElementById("termino");
const categoriaInput = document.getElementById("categoria");
const resultadosDiv = document.getElementById("resultados");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const termino = terminoInput.value;
    const categoria = categoriaInput.value;

    const url = `https://pixabay.com/api/?key=42648211-38ca7cdf8831e74a6f63fec3d&q=${termino}&category=${categoria}`;

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (datos.hits.length === 0) {
        resultadosDiv.innerHTML = "No se encontraron resultados";
    } else {
        let resultadosHTML = "";

        for (const imagen of datos.hits) {
          resultadosHTML += `
          <div class="imagen">
              <a href="${imagen.largeImageURL}">
                  <img src="${imagen.previewURL}" alt="${imagen.tags}" >
              </a>
              
          </div>
          `;
      }

        resultadosDiv.innerHTML = resultadosHTML;
    }
});

{/* <p>${imagen.tags}</p> */}


