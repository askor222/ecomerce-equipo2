let carritoCompra = document.getElementById("cartId");
if(localStorage.getItem("carrito") != null){
    
    obtenerCarrito(carritoCompra);
}else{
    console.log("creamos el local store");
    iniciar();
    
}
function iniciar(){
    carritoCompra.innerHTML="0";
    let lista = document.getElementById("lista");
    if(lista !== null){
        lista.innerHTML = '<img class="imagen-carrito" src="img/foto-carrito.jpg">'+
        '<h2 class="titulo-carrito">Tu carrito esta vacio</h2>'+
        '<p class="p-carrito"> ¡Explora nuestro catalogo! </p>'+
        '<a href="index.html"><button class="button-carrito">Ver productos</button></a>';
    }
}
obtenerDatosCarrito();
function obtenerDatosCarrito(){
    
    document.querySelectorAll(".fa-shopping-bag").forEach((e) => {
        e.addEventListener("click", () => {
            let mostrar = document.getElementById("anidad");
            carrito.push(e.dataset.id);

            mostrar.style.display = "block";
            localStorage.setItem("carrito", JSON.stringify(carrito));


                localStorage.setItem("carrito", JSON.stringify(carrito));

                console.log("click en "+e.id+" - "+ e.dataset.id);
                obtenerCarrito(carritoCompra);
                //carrito.push(e.dataset.id);
                //console.log("mi cariito tiene " + carrito.length);

                setTimeout(() => {
                    mostrar.style.display = "none"
                }, 3000);
            });
            

        });
        document.querySelectorAll(".fa-trash-o").forEach((e) => {
            e.addEventListener("click", () => {
                
                console.log("click en "+e.id+"cartId "+ e.dataset.id);
                carrito.splice(e.dataset.id,1);

                localStorage.setItem("carrito", JSON.stringify(carrito));
                carrito = JSON.parse(localStorage.getItem("carrito"));
                    obtenerCarrito(carritoCompra);
                    obtenerDatosCarrito();
                    //carrito.push(e.dataset.id);
                    //console.log("mi cariito tiene " + carrito.length);
                    
                   
                });
            });
            let confirmar = document.getElementById("confirmar");
            if(confirmar != null){
                confirmar.addEventListener("click", ()=> {localStorage.clear();})
            }
        
}

function obtenerCarrito(carritoCompa){
    carrito = JSON.parse(localStorage.getItem("carrito"));
    carritoCompa.innerHTML= carrito.length;
    console.log("Tenemos el local store con: "+carrito);
    let listacarrito = "";
    let totalComra = 0;
    if(carrito.length == 0){
        console.log("No hay nada");
        iniciar();
    }else{
        for (let i = 0; i < carrito.length; i++) {
            console.log(`posicion: ${carrito[i]-1}, id: ${carrito[i]}`);
            
            products.forEach(item => {
                if (carrito[i] == item.id) {
                listacarrito += `<div class="listaProducto"> 
                        <div><img src="${item.images[0]}" alt="${item.title}"></div>
                        <div class="descripLista">${item.title}</div>
                        <div>${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.price)}</div>
                        <i class="fa fa-trash-o" data-id="${i}" id="c${i}${carrito[i]}" aria-hidden="true"></i>
                    </div>`;
                    totalComra += item.price;
                }
            });
            localStorage.setItem("total", totalComra);
            //console.log("la lista es: "+listacarrito);
        }
    }
    
    let totalC = document.getElementById("total");
    if(totalC !== null){
        totalC.innerHTML = `Total: ${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(totalComra)}`;
    }
    let listado = document.getElementById("listacompra");
    if (listado !== null) {
        listado.innerHTML = listacarrito;

        let seguir = document.getElementById("seguir");
        seguir.addEventListener("click", () =>{
            location.href ='index.html';
        });
        let finalizar = document.getElementById("finalizar");
        finalizar.addEventListener("click", () =>{
            location.href ='solicitar.html';
        });
    }
    
}
