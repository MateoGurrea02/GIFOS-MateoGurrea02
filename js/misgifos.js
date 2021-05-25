window.onload = function(){
    let artMisGifos = document.getElementById('artMisGifos')
    let logo = document.getElementById('logo')
    let modoNocturno = document.getElementById('modoNocturno')
    let body = document.getElementById('body')
    let crearGifo = document.getElementById('crearGifo')
    let menu = document.getElementById('menu')
    let hamburguesa = document.getElementById('iconoMenu')
    let sliderR = document.getElementById('btnSliderR')
    let sliderL = document.getElementById('btnSliderL')
    let darkMode = false
    let card
    let gifHijo = document.getElementById('gifHijo')
    let overlay 
    let gifFavLista = []
    let cardPadre

    function pagPrincipal(){
        logo.addEventListener('click', () =>{
            window.location.href = 'http://127.0.0.1:5500/index.html'
        })
    }
    
    function misGifos(){
        if((localStorage.getItem('miGifo') !== null ) && (JSON.parse(localStorage.getItem('miGifo') !== "[]"))){
            listaMisGif = (JSON.parse(localStorage.getItem('miGifo')))
            for(let i = 0; i < listaMisGif.length;i++){
                let id = listaMisGif[i].data.id
                fetchMisGifos(id)
            }
        }else{
            let misGifsSinResultado = document.createElement('div')
            misGifsSinResultado.classList.add('misGifosSinResultado')
            misGifsSinResultado.innerHTML = '<img src="./images/icon-mis-gifos-sin-contenido.svg"><p class="pMisGifosSinCont">"¡Anímate a crear tu primer GIFO!"</p>'
            artMisGifos.appendChild(misGifsSinResultado)
        }
    }
    async function fetchMisGifos(id){
        let response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=bCngMprE1xNasA9iSMDnhK5O3T4GufEq`)
        let infoMisGifos = await response.json()   
        renderMisGifos(infoMisGifos)
    }
    function renderMisGifos(infoMisGifos){
        let buttonTrash = []
        cardPadre = document.createElement('div')
        cardPadre.classList.add('cardPadre')
        artMisGifos.appendChild(cardPadre)
        for(let i = 0; i < 1;i++){
            card = document.createElement('div')
            card.classList.add('cardBusqueda')
            card.innerHTML = `<div class="original"><img class="trendingGif" src='${infoMisGifos.data.images.original.url}'></img></div>`;
            cardPadre.appendChild(card)
            overlay = document.createElement('div')
            overlay.classList.add('overlay')
            overlay.innerHTML = `<ul>
                                    <li><img class="fav" id="favoritos${i}" src="./images/icon-trash-normal.svg"></li>
                                    <li><a id="downloadHrefFav${i}"><img class="download" id="downloadFav${i}" src="./images/icon-download.svg"></a></li>
                                    <li><a href="#header"><img class="fullScreen" id="fullScreenFav${i}" src="./images/icon-max-normal.svg"></a></li>
                                </ul>
                                <div class="userTitle">
                                    <p>${infoMisGifos.data.username}</p>
                                    <p>${infoMisGifos.data.title}</p>
                                </div`
            card.appendChild(overlay)   
            //boton de favoritos
            buttonTrash[i] = document.getElementById(`favoritos${i}`)
            buttonTrash[i].addEventListener('click', ()=>{                
                if(gifFavLista.some((element)=> element.id === infoMisGifos.data.id)){
                    let encontrarPosicion = gifFavLista.findIndex((element)=> element.id === infoMisGifos.data.id)                    
                    gifFavLista.splice(encontrarPosicion,encontrarPosicion)
                    localStorage.setItem('fav',JSON.stringify(gifFavLista))
                }
            })
            //ver gif completo
            let fullScreen = document.getElementById(`fullScreenFav${i}`)
            let gif = infoMisGifos.data.images.original.url
            let titulo = infoMisGifos.data.title
            let user = infoMisGifos.data.username
            let favId = `favoritos${i}`
            gifTamañoOriginal(fullScreen, gif, titulo, user)

            //descargar gif
            let downloadHref = document.getElementById(`downloadHrefFav${i}`)
            let urlGifs = infoMisGifos.data.images.original.url
            downloadFile(i, infoMisGifos, downloadHref, urlGifs)
        }
    }

















    function nightMode (){
        modoNocturno.addEventListener('click', () =>{
            body.classList.toggle('modoNocturnoBody')
            if(darkMode){
                modoNocturno.innerText = "Modo Nocturno"
                logo.setAttribute('src', "./images/logo-mobile.svg")
                crearGifo.setAttribute('src',"./images/button-crear-gifo.svg")
                hamburguesa.setAttribute('src', "./images/close.svg")
                sliderL.classList.toggle('btnSliderLNoct')
                sliderL.classList.toggle('btnSliderL')
                sliderR.classList.toggle('btnSliderRNoct')
                sliderR.classList.toggle('btnSliderR')
                // hover de iconos segun el tema
                iconoHover('crearGifo', './images/button-crear-gifo.svg', './images/CTA-crear-gifo-hover.svg')
                iconoHover('instagram', './images/icon_instagram.svg', './images/icon_instagram-hover.svg')
                iconoHover('facebook', './images/icon_facebook.svg', './images/icon_facebook_hover.svg')
                iconoHover('twitter', './images/icon-twitter.svg', './images/icon-twitter-hover.svg')
                darkMode = false
            }else{
                modoNocturno.innerText = "Modo Diurno"
                logo.setAttribute('src', "./images/logo-mobile-modo-noct.svg")
                crearGifo.setAttribute('src',"./images/button-crear-gifo-noct.svg")
                hamburguesa.setAttribute('src', "./images/close-modo-noct.svg")
                sliderL.classList.toggle('btnSliderLNoct')
                sliderL.classList.toggle('btnSliderL')
                sliderR.classList.toggle('btnSliderRNoct')
                sliderR.classList.toggle('btnSliderR')
                // hover de iconos segun el tema
                iconoHover('crearGifo', './images/button-crear-gifo-noct.svg', './images/button-crear-gifo-noct-hover.svg')
                iconoHover('instagram', './images/icon_instagram.svg', './images/icon_instagram-hover.svg')
                iconoHover('facebook', './images/icon_facebook.svg', './images/icon_facebook_hover.svg')
                iconoHover('twitter', './images/icon-twitter.svg', './images/icon-twitter-hover.svg')
                darkMode = true
            }
    
        })
        if(!darkMode){
            iconoHover('crearGifo', './images/button-crear-gifo.svg', './images/CTA-crear-gifo-hover.svg')
            iconoHover('instagram', './images/icon_instagram.svg', './images/icon_instagram-hover.svg')
            iconoHover('facebook', './images/icon_facebook.svg', './images/icon_facebook_hover.svg')
            iconoHover('twitter', './images/icon-twitter.svg', './images/icon-twitter-hover.svg')
        }
    
    }

     //despliege del menu hamburguesa con estilos de modo nocturno y diurno
     function desplegarMenu (){
        let hamburguesa = document.getElementById('iconoMenu')
        hamburguesa.addEventListener('click',(e) =>{
            let despliega = e.target.getAttribute('src');
        
            if(despliega == "./images/burger.svg"){
                e.target.setAttribute('src', "./images/close.svg")
                menu.classList.toggle('noActivo')
                menu.classList.toggle('activo')
            }else if(despliega == "./images/close.svg"){
                e.target.setAttribute('src', "./images/burger.svg")
                menu.classList.toggle('noActivo')
                menu.classList.toggle('activo')
            }else if(despliega == "./images/close-modo-noct.svg"){
                e.target.setAttribute('src', "./images/burger-modo-noct.svg")
                menu.classList.toggle('noActivo')
                menu.classList.toggle('activo')
            }else if(despliega == "./images/burger-modo-noct.svg"){
                e.target.setAttribute('src', "./images/close-modo-noct.svg")
                menu.classList.toggle('noActivo')
                menu.classList.toggle('activo')
            }
        })
        
        }
        //funcion de Hover de iconos
        function iconoHover(idIcono, url, nuevaUrl){
            let  icono = document.getElementById(idIcono)
            icono.addEventListener('mouseover', () =>{
                icono.setAttribute('src',nuevaUrl)
            })
            icono.addEventListener('mouseout', ()=>{
                icono.setAttribute('src',url)
            })
        
        }
        //funcion para estilos de scroll del header
        function scrollHeader(){
            let headerId = document.getElementById('header')
            window.addEventListener('scroll', () =>{
                let posicionDelScroll = window.scrollY
        
                if(posicionDelScroll >= 1){
                headerId.classList.add('headerScroll')
                }else{
                    headerId.classList.remove('headerScroll')
                }
            })
        }
    //fetch  de los gifos trending
    async function gifosTrending(){
        let response = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=bCngMprE1xNasA9iSMDnhK5O3T4GufEq&limit=25&rating=g')
        let info = await response.json()
        renderGifos(info)
    }
    
    
    function renderGifos(info){
        buttonFav = []
        for(let i = 0; i < 25;i++){
            card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `<div class="original"><img class="trendingGif" src='${info.data[i].images.original.url}'></img></div>`;
            gifHijo.appendChild(card)
            overlay = document.createElement('div')
            overlay.classList.add('overlay')
            overlay.innerHTML = `<ul>
                                    <li><img class="fav" id="fav${i}" src="./images/icon-fav.svg"></li>
                                    <li><a id="downloadHref${i}"><img class="download" id="download${i}" src="./images/icon-download.svg"></a></li>
                                    <li><a href="#header"><img class="fullScreen" id="fullScreen${i}" src="./images/icon-max-normal.svg"></a></li>
                                </ul>
                                <div class="userTitle">
                                    <p>${info.data[i].username}</p>
                                    <p>${info.data[i].title}</p>
                                </div`
            card.appendChild(overlay)
    
            //boton favoritos
            //boton de favoritos
            buttonFav[i] = document.getElementById(`fav${i}`)
            buttonFav[i].addEventListener('click', ()=>{                
                if(gifFavLista.some((element)=> element.id === info.data[i].id)){
                    let encontrarPosicion = gifFavLista.findIndex((element)=> element.id === info.data[i].id)                    
                    gifFavLista.splice(encontrarPosicion, 1)
                    localStorage.setItem('fav',JSON.stringify(gifFavLista))
                    favActive = buttonFav[i].setAttribute('src', "../images/icon-fav.svg")
                }else{
                    gifFavLista.push(info.data[i])
                    localStorage.setItem('fav', JSON.stringify(gifFavLista))
                    favActive = buttonFav[i].setAttribute('src', "../images/icon-fav-active.svg")
                }
            })
            //ver gif completo
            let fullScreen = document.getElementById(`fullScreen${i}`)
            let gif = info.data[i].images.original.url
            let titulo = info.data[i].title
            let user = info.data[i].username
            let favId = `fav${i}`
            gifTamañoOriginal(fullScreen, gif, titulo, user)

            //descargar gif
            let downloadHref = document.getElementById(`downloadHref${i}`)
            let urlGifs = info.data[i].images.original.url
            downloadFile(i, info, downloadHref, urlGifs)
        }
    
    }


    function gifTamañoOriginal(id, urlGif, titulo, userName){
        id.addEventListener('click',() => {
            let card = document.createElement('div')
            card.classList.add('gifCompleto')
            card.innerHTML =`<img src="./images/close.svg" id="cerrarGifMax" class="cerrarGifMax">
                            <div class="fff">
                            <img src="${urlGif}" class="gif">
                            <div class="divPadre">
                                <div class="divTexto">
                                    <p>${userName}</p>
                                    <p>${titulo}</p>
                                </div>
                                <div class="divFavDow">
                                    <img id="fav" src="./images/icon-fav.svg">
                                    <a id="downloadHref"><img src="./images/icon-download.svg"></a>
                                </div>
                            </div>
                            </div>
                            `
            body.appendChild(card)
            body.classList.add('noScroll')
            let cerrarGifMax = document.getElementById('cerrarGifMax')
            cerrarGifMax.addEventListener('click', ()=>{
            card.innerHTML = ''
            card.classList.remove('gifCompleto')
            body.classList.remove('noScroll')          
        })
        })
        
    }
    async function downloadFile(index, gifs, downloadHref, url){
        let response = await fetch(url)
        let imageBlob = await response.blob()
        let urlBlob = URL.createObjectURL(imageBlob)
        downloadHref.href = urlBlob 
        downloadHref.setAttribute('download', `${gifs[index]}.gif`)
    }

    misGifos()
    pagPrincipal()
    nightMode ()
    scrollHeader()
    gifosTrending()
    desplegarMenu ()

}