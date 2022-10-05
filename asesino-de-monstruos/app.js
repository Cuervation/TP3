new Vue({
    el: '#app',
    data: {
        posMin:0,
        posMax:1,
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego=true
            this.saludJugador =  100
            this.saludMonstruo = 100       
            this.turnos = []     
        },
        atacar: function () {
            let damage = this.calcularHeridas(this.rangoAtaque);  
            if (this.saludMonstruo - damage < 0 ){ 
                this.saludMonstruo = 0 
            }           
            else {
                this.saludMonstruo -= damage
            }
            this.turnos.unshift({
               esJugador:true,               
               text : 'El jugador golpea al monstruo por ' + damage
            })
            if (!this.verificarGanador()){
                this.ataqueDelMonstruo()    
            }            
        },
        

        ataqueEspecial: function () {
            let damage = this.calcularHeridas(this.rangoAtaqueEspecial);              
            if (this.saludMonstruo - damage < 0 ){ 
                this.saludMonstruo = 0 
            }           
            else {
                this.saludMonstruo -= damage
            }
            this.turnos.unshift({
                esJugador:true,
                text : 'El jugador golpea al monstruo por ' + damage
             })
            if (!this.verificarGanador()){                
                this.ataqueDelMonstruo()    
            }
        },

        curar: function () {
            if (this.saludJugador <=90 ){
                this.saludJugador +=10
                this.turnos.unshift({
                    esJugador:true,
                    text : 'El jugador se curó un 10% '
                 })
            }
            else{
                this.saludJugador =100
                this.turnos.unshift({
                    esJugador:true,
                    text : 'El jugador está totalmente curado '
                 })
                
            }
            this.ataqueDelMonstruo()
        },

        registrarEvento(evento) {
        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
            this.turnos.unshift({
                esJugador:true,
                text : 'El jugador se rindió'
             })
            
        },

        ataqueDelMonstruo: function () {
            let damage = this.calcularHeridas(this.rangoAtaqueDelMonstruo)                        
            if (this.saludJugador - damage < 0 ){ 
                this.saludJugador = 0 
            }           
            else {
                this.saludJugador -= damage
            }
            this.turnos.unshift({
                esJugador:false,
                text : 'El monstruo golpea al jugador por ' + damage
             })
            this.verificarGanador()
        },

        calcularHeridas: function (rango) { 
            return Math.max(Math.floor(Math.random() * rango[this.posMax])+1,rango[this.posMin])

        },
        verificarGanador: function () {
            if (this.saludMonstruo <= 0){
                if (confirm('Ganaste! Jugar de Nuevo?')){
                    this.empezarPartida()
                }
                else {
                    this.hayUnaPartidaEnJuego = false;
                }
                return true
            }            
            else if (this.saludJugador <= 0){
                if (confirm('Perdiste! Jugar de Nuevo?')){
                    this.empezarPartida()
                }
                else {
                    this.hayUnaPartidaEnJuego = false;                 
                }
                return true
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});