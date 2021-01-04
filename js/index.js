
//Creamos variables donde vamos a guardar las clases de los colores, con sus mismos nombres.
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 5;


/* 
  Creamos una clase JUEGO
  - Va a tener un constructor: 
    • Ejecuta la funcion inicializar.
    • Ejecuta la funcion generarSecuencia.
    • Ejecuta la funcion siguienteNivel
*/
class Juego {
  constructor() {
    this.inicializar()
    this.generarSecuencia()
    setTimeout(() => {
      this.siguienteNivel()  
    }, 500);
    
  }

  // Inicializar:
  /* 
    - Comienza cuando el btn empezar le agregamos los estilos de add (Cuando lo tocamos).
    - Ponemos en nivel 1.
    - y guardamos los datos de colores de las constantes que teniamos al principio para tenerlas a mano.
  */
  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    this.inicializar = this.inicializar.bind(this);
    this.toggleBtnEmpezar();
    this.nivel = 1;
    this.colores = {
      celeste: celeste,
      violeta: violeta,
      naranja:naranja,
      verde:verde,
    }
  }

  toggleBtnEmpezar(){
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide');
    }else{
      btnEmpezar.classList.add('hide');
    }
  }

  /*
    Generar Secuencia:
    - Secuencia es igual a una array de 10 numeros, 
    - fill los pone a todos en cero (necesario iniciarlizar cada array para usar map)
    - map pone cada numero entre el 0 y el 1 - multiplicado por 4 - y eso redondeado para bajo
    Eso nos da numeros entre el 0 y el 3, osea 4, los 4 colores del juego.
  */
  generarSecuencia(){
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map( n => Math.floor(Math.random() * 4))
  }

  /*
    Siguiente Nivel
    - Ejecuta la funcion iluminar secuencia.
  */
  siguienteNivel(){
    this.subnivel = 0;
    this.iluminarSecuencia()
    this.agregarEventoClick()
  }

  transformarNumeroColor(numero){
    switch(numero){

      case 0:
        return 'celeste';
      
      case 1:
        return 'violeta';

      case 2:
        return 'naranja';

      case 3:
        return 'verde';
    }
  }

  
  transformarColorNumero(color){
    switch(color){

      case 'celeste':
        return 0;
      
      case 'violeta':
        return 1;

      case 'naranja':
        return 2;

      case 'verde':
        return 3;
    }
  }

  /*
    Iluminar Secuencia
    Ejecuta un for y recorre en base al nivel en el que estamos.
      • El for, crea un let color que es el color que nos da transformarNumeroColor(que recibe la secuencia de numeros, esos numeros se hacen colores)
      • SettimeOut usa IluminarColor, que lo ilumina en 1 segundo * i para que haya espacio de tiempo por cada color que se ilumina
  */
  iluminarSecuencia(){
    for(let i=0 ; i < this.nivel ; i++)
    {
      // SE USA LET PORQUE SETTIMEOUT SE EJECUTA AL FINAL Y VA A TOMAR EL ULTIMO VALOR DE COLOR SI ES UN NIVAL MAS ALTO QUE EL
      let color = this.transformarNumeroColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000* i);
    }
  }

  /*
    En base al color recibido por parametro, lo pasa a light y luego en 450 ms lo apaga
  */
  iluminarColor(color){
    this.colores[color].classList.add('light');
    setTimeout(() => this.apagarColor(color), 450);
  }

  /*
    Le saca la clase light, #lo apaga"
  */
  apagarColor(color){
     this.colores[color].classList.remove('light');
  }

  agregarEventoClick(){
    this.colores.celeste.addEventListener('click', this.elegirColor);
    this.colores.verde.addEventListener('click', this.elegirColor);
    this.colores.violeta.addEventListener('click', this.elegirColor);
    this.colores.naranja.addEventListener('click', this.elegirColor);
  }

  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor);
    this.colores.verde.removeEventListener('click', this.elegirColor);
    this.colores.violeta.removeEventListener('click', this.elegirColor);
    this.colores.naranja.removeEventListener('click', this.elegirColor);
  }

  elegirColor(ev){
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarColorNumero(nombreColor);

    this.iluminarColor(nombreColor);
    if(numeroColor === this.secuencia[this.subnivel]){
      this.subnivel++;
      if(this.subnivel == this.nivel){
        this.nivel++;
        this.eliminarEventosClick();
        if(this.nivel == (ULTIMO_NIVEL+ 1)){
          this.ganoJuego();
        }
        else{
           setTimeout(this.siguienteNivel,1500);
        }
      }
    }
    else{
      this.perdioJuego();
    }

  }


  ganoJuego(){
    swal("Simon Dice", "Ganaste!!!", 'success')
    .then(this.inicializar);
  }

  perdioJuego(){
    swal("Simon Dice", "Perdiste :C", 'error')
    .then(() => {
      this.eliminarEventosClick();
      this.inicializar();
    })
  }



} // Class: Juego.

function empezarJuego() {
  window.juego = new Juego()
}

