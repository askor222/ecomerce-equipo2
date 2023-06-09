let params = new URLSearchParams(location.search);

        let idd;
        let productos = "";
        // condicion para los detalles
        if(params.get("id")){
            idd = params.get('id');
            products.forEach(item => {
                if (item.id == idd) {
                    let imagen = "";
                    let li="";
                    let ul="";
                    console.log('Encontrado el: '+idd);
                    let n = 1;
                    imagen += `<img src="${item.images[0]}" alt="${item.title}" id="imgprincipl">`; 
                    item.images.forEach(img =>{
                        if(n <= 3){
                            
                            li += `<img src="${img}" alt="${item.title}" id="a${n}" class="segunda">`;
                            console.log("imagen: "+ img);
                        }
                        n +=1;
                    });
                    console.log(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.price));
                    productos = `<div class="productoD">
                            <div class="container1">
                                ${imagen}
                                <div>${li}</div>
                            </div>
                            <div class="container2">
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                                <p class="precio">${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.price)}</p>
                                <div class="compra acceso">
                                    <i class="fa fa-share-alt d" aria-hidden="true"></i>
                                    <i class="fa fa-shopping-bag" data-id="${item.id}" id="c${item.id}" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>`;
                    document.title = item.title;
                }
            });
            
        }else{
            // condicion default
            products.forEach(item => {
            console.log(`id: ${item.id}, category: ${item.category}`);
                productos += `<div class="producto">
                    <a href="detalles.html?id=${item.id}">
                        <img src="${item.images[0]}" alt="${item.title}" class="imagen-producto">
                        <h3>${item.title}</h3>
                    </a>
                    <div class="compra">
                        <p>${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.price)} </p>
                        
                            <i class="fa fa-shopping-bag" data-id="${item.id}" id="c${item.id}" aria-hidden="true"></i>

                    </div>
                </div>`;
        });
        }
        
        
        //let section = document.querySelector('section'); 
       
        cargar(productos);
        let selectCategory = document.getElementById("category");
        let buscador = document.getElementById("buscar");

        // bucle para agregar las categorias
        for (let i = 0; i < category.length; i++) {
            let opt = category[i];
            let el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            selectCategory.appendChild(el);
        }

        // para el selector de categoria
        selectCategory.addEventListener("change", function() {
            if(selectCategory.value == ""){
                location.href = "index.html"
            }
            if(nombrepagina() != "index.html"){
                location.href ='index.html';
            }
            
            categoria = selectCategory.value;
            productos = "";
            products.forEach(item => {
                if (item.category === categoria) {
                    productos += `<div class="producto">
                    <a href="detalles.html?id=${item.id}">
                        <img src="${item.images[0]}" alt="${item.title}" class="imagen-producto">
                        <h3>${item.title}</h3>
                    </a>
                    <div class="compra">
                        <p>${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.price)}</p>
                        <i class="fa fa-shopping-bag" data-id="${item.id}" id="ca${item.id}" aria-hidden="true"></i>
                    </div>
                </div>`;
                }
            });
            cargar(productos);
            obtenerDatosCarrito();
        });
        // para el buscador por palabra clave
        buscador.addEventListener("keypress", function() {
            if(nombrepagina() != "index.html"){
                location.href ='index.html';
            }
            palabra = buscador.value;
            productos = "";
            console.log("palabra para buscar: "+palabra);
            products.forEach(item => {
                if (item.title.toLowerCase().includes(palabra.toLowerCase())) { 
                    productos += `<div class="producto">
                    <a href="detalles.html?id=${item.id}">
                        <img src="${item.images[0]}" alt="${item.title}" class="imagen-producto">
                        <h3>${item.title}</h3>
                        
                    </a>
                    <div class="compra">
                        <p>${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.price)} </p>
                        <i class="fa fa-shopping-bag" data-id="${item.id}" id="c${item.id}" aria-hidden="true"></i>
                    </div>
                </div>`;
                } 
            });
            if(productos === ""){
                productos='<div class="productoD">No hemos encontrado el producto</div>';
            }
            cargar(productos);
            obtenerDatosCarrito();

           
        });
        // de menos a mayor
        let menos = document.getElementById("down");
        if(menos != null){
            menos.addEventListener("click", function() {
                if(nombrepagina() != "index.html"){
                    location.href ='index.html';
                }
                productos = "";
    
                products.sort((a, b) => a.price - b.price);
                products.forEach(item => {
    
                    productos += `<div class="producto">
                    <a href="detalles.html?id=${item.id}">
                        <img src="${item.images[0]}" alt="${item.title}" class="imagen-producto">
                        <h3>${item.title}</h3>
                    </a>
                    <div class="compra">
                        <p>${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.price)} </p>
                        <i class="fa fa-shopping-bag" data-id="${item.id}" id="c${item.id}" aria-hidden="true"></i>
                    </div>
                </div>`;
    
                });
                cargar(productos);
                obtenerDatosCarrito();
            });
            // de mayor a menos
            let mayor = document.getElementById("up");
            mayor.addEventListener("click", function() {
                if(nombrepagina() != "index.html"){
                    location.href ='index.html';
                }
                productos = "";
    
                products.sort((a, b) => b.price - a.price);
                products.forEach(item => {
    
                    productos += `<div class="producto">
                    <a href="detalles.html?id=${item.id}">
                        <img src="${item.images[0]}" alt="${item.title}" class="imagen-producto">
                        <h3>${item.title}</h3>
                    </a>
                    <div class="compra">
                        <p>${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.price)} </p>
                        <i class="fa fa-shopping-bag" data-id="${item.id}" id="c${item.id}" aria-hidden="true"></i>
                    </div>
                </div>`;
    
                });
                cargar(productos);
                obtenerDatosCarrito();
            });
        }



function cargar(producto){
// cargar en contenido
    let section = document.getElementById("principal");
    if (section !== null) {
        section.innerHTML = producto;
                // para las imagenes
                document.querySelectorAll(".segunda").forEach((e) => {
                    e.addEventListener("click", () => {
                            console.log("esto es lo que hace "+document.getElementById(e.id).src);
                            document.getElementById("imgprincipl").src = e.src;
                        });
                    });
    }
            // para las imagenes
            document.querySelectorAll(".segunda").forEach((e) => {
                e.addEventListener("click", () => {
                        console.log("esto es lo que hace "+document.getElementById(e.id).src);
                        document.getElementById("imgprincipl").src = e.src;
                    });
                });

}
function nombrepagina(){
    //nombre ruta
    var rutaAbsoluta = self.location.href;   
    var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
    var rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length );
    return rutaRelativa;  
} 

let oferta= document.getElementById("ofertas");
oferta.addEventListener("click", function() {
    if(nombrepagina() != "index.html"){
        location.href ='index.html';
    }
    productos = "";

    console.log("he hecho click en ofertas")
    products.forEach(item => {
        if(item.ofert === true) {
            productos += `<div class="producto">
            <a href="detalles.html?id=${item.id}">
                <img src="${item.images[0]}" alt="${item.title}" class="imagen-producto">
                <h3>${item.title}</h3>
            </a>
            <div class="compra">
                <p>${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.price)} </p>
                <i class="fa fa-shopping-bag" data-id="${item.id}" id="c${item.id}" aria-hidden="true"></i>
            </div>
        </div>`;
         }

   

    });
    cargar(productos);
    obtenerDatosCarrito();
});