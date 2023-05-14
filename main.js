const carrito = document.querySelector('#carritoc')
const template = document.querySelector('#template')
const footer = document.querySelector('.footer')
const templateFooter = document.querySelector('#templateFooter')
const fragment = document.createDocumentFragment()

document.addEventListener('click', (e) => {
   
    if(e.target.matches('.btn-primary')){
       agregarCarrito(e)
    }

    if(e.target.matches('.list-group-item .btn-success')){
        btnAgregar(e);
    }
    if(e.target.matches('.btn-danger')){
        btnDisminuir(e)
    }
})

let carritoObjeto = []

const agregarCarrito = (e) => {

    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio)
    };

    const indice = carritoObjeto.findIndex((item)=> item.id === producto.id)
    
    if(indice === -1){
        carritoObjeto.push(producto)
    }
    else{
        carritoObjeto[indice].cantidad ++
        
    }
    pintarCarrito()   

}

const pintarCarrito = () => {

    carrito.textContent = ''

    carritoObjeto.forEach((item)=>{
        const clone = template.content.cloneNode(true)
        clone.querySelector('.lead').textContent = item.titulo;
        clone.querySelector('.badge').textContent = item.cantidad;
        clone.querySelector('.span').textContent = item.precio * item.cantidad;

        clone.querySelector('.btn-danger').dataset.id = item.id
        clone.querySelector('.btn-success').dataset.id = item.id

        fragment.appendChild(clone)
    })

    carrito.appendChild(fragment)

    pintarFooter()
}

const pintarFooter = ( ) =>{
    footer.textContent = ''
   const total = carritoObjeto.reduce(
    (acc, current) => acc + current.cantidad * current.precio,
    0
    );
      
    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector('span').textContent = total;
    footer.appendChild(clone)
   } 

const btnAgregar = (e) => {
    carritoObjeto = carritoObjeto.map(item => {
        if(item.id === e.target.dataset.id){
            item.cantidad ++
        }
        return item;
    })
    pintarCarrito()
}


const btnDisminuir = (e) => {
    carritoObjeto = carritoObjeto.filter(item => {
        if(item.id === e.target.dataset.id){
            if(item.cantidad > 0){
                item.cantidad--
            }
            if(item.cantidad === 0 ){
                    return
            }
        }
        return item;
    })
    pintarCarrito()
}






