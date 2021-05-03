tinymce.init({
    selector: "#descripcion-txtarea",
    height: 200,
    menubar: false,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount",
    ],
    toolbar:
      "undo redo | formatselect | " +
      "bold italic backcolor | alignleft aligncenter " +
      "alignright alignjustify | bullist numlist outdent indent | " +
      "removeformat | help",
    content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
  });

const Reos = [];
const cargarTabla = ()=>{
  let tbody = document.querySelector("#tbody-tabla");

  tbody.innerHTML = "";

  for (let i = 0; i < Reos.length; ++i){
      
      let p = Reos[i];
      
      let tr = document.createElement("tr");
      
      let tdNro = document.createElement("td");
      let tdNombre = document.createElement("td");
      let tdDescripcion = document.createElement("td");
      let tdCiudad = document.createElement("td");
      let tdGravedad = document.createElement("td");

      
      tdNro.innerText = i + 1;
      tdNombre.innerText = p.nombre + " " + p.apellido;
      tdDescripcion.innerHTML = p.descripcion;
      
      let city = p.ciudad - 1;

      tdCiudad.innerText = Ciudades[city];

      let gravedad = document.createElement("i");
      
      if(p.cantidad > 15) { 
        gravedad.classList.add("fas", "fa-skull", "fa-3x", "enemigo") //Enemigo
      }else if(p.cantidad > 6){
        gravedad.classList.add("fas", "fa-exclamation-triangle", "fa-3x", "peligroso") //Peligroso
      }else if(p.cantidad > 3){
        gravedad.classList.add("fas", "fa-exclamation-circle", "fa-3x", "grave") //Grave
      }else if(p.cantidad > 0){
        gravedad.classList.add("fas", "fa-exclamation", "fa-3x", "leve") //Leve
      };
      tdGravedad.classList.add("text-center");
      tdGravedad.appendChild(gravedad);

      tr.appendChild(tdNro);
      tr.appendChild(tdNombre);
      tr.appendChild(tdDescripcion);
      tr.appendChild(tdCiudad);
      tr.appendChild(tdGravedad);
      
      tbody.appendChild(tr);
      
  }
};

const Ciudades = ["Valparaíso", "Santiago", "Viña del Mar", "La Serena", "Quilpué", "Villa Alemana", "Olmué", "Quillota"];
const cargarCiudades = ()=>{
  const selectCiudades = document.querySelector("#ciudad-select");
  selectCiudades.innerHTML = "";

  for (let i = 0; i < Ciudades.length; ++i){
    let p = Ciudades[i];
    let optioncity = document.createElement("option");
    
    let valor = i + 1;
    
    optioncity.value = valor;
    optioncity.text = p;
    

    selectCiudades.appendChild(optioncity);

  }

};

cargarCiudades();
document.querySelector("#ingresar-btn").addEventListener("click", ()=>{
  let nombre = document.querySelector("#nombre-txt").value;
  let apellido = document.querySelector("#apellido-txt").value;
  let descripcion = tinymce.get("descripcion-txtarea").getContent();
  let cantidad = document.querySelector("#cantidad-num").value;
  let ciudad = document.querySelector("#ciudad-select").value;
  
  
  let delincuente = {};

  delincuente.nombre = nombre;
  delincuente.apellido = apellido;
  delincuente.descripcion = descripcion;
  delincuente.cantidad = cantidad;
  delincuente.ciudad = ciudad;

  
  if(cantidad > 0){
    Reos.push(delincuente);
    cargarTabla();
    Swal.fire("Resultado exitoso!", "Reo registrado", "success");
  }else{
    Swal.fire("Resultado fallido!", "Reo no ha cometido crímenes", "info");
  }
  

});