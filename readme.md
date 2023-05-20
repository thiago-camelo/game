class game {

	constructor() {
      	this.width = 100
      	this.height = 100
    }

	actualScenes: null,
	
	start: () => {

		// definir scenes

     	// aqui. acho q a criaria a primeira instancia de uma cena > menu / uma telinha simples, igual do slither.io, para por o nome apenas, talvez escolher skin...
        this.actualScenes = new Scene('scene_menu')
        
        window.requestAnimationFrame(this.update)
   },

   update: () => {
     
     // ou... quando o usuario selecioanr o mapa, vem dinamico na instancia da class...
     // daria tbm. selecionou, define qual é o mapa e carrega a scene, carrega tudo na verdade, o mapa definiria quais armas, terreno, etc...
     // certo
     // como chamaria o mapa ? nao o nome exatamente, mas falo como vamos chamalo genericamente... map ? mapa ? scene ? phase ? 
     // scene, seria a parte mais externa
     // (mapa > nome em discução kkk) seria a fase. q estaria dentro de scene
     // scene, seria apenas pra ter o update/draw e ter as mesmas propriedadesdai internamente cada um faria sua função
     // 
     // no mario kart, a colecao de mapas, eles chamam de "tracks" - faixas. nao sei se faz muito sentido kkkk
     // perai. vou apager um pouco
     	     	
 		this.scenes.forEach( scene => scene.update() )
     	// ok, temos o menu
     	// agora o update do game
     	// ta ae?
     
     	// sim. tava vendo sua classe Scene...
     	// bostinha
     	

      this.render()
   },

   draw: () => {

   }

}

class Player {
  
  	constructor() { 
      this.inventario = []
    }
  
}

// nao entendi, quando eu for instanciar new game(), nao posso passar o nome do mapa como Scene, mas na instancia do menu pode ser, scene_menu ?? kkkkk
// aqui fora
new Game().start()

// tanto faz ta feio igual. *-*

// teria q ter eventos aqui na scene, pra mudar de scene
// quando finalizar um mapa, teria que chamar o proximo. quando nao tiver mais mapas, chama a tela de ranking
// teria uma listagem de mapas?
// pq dai teria como referenciar pelo click

// seria tipo no mario mesmo, um "Circuito", que teriam 3/4 mapas dentro, ai seria varios circuitos, com mapas diferntes internamente...
// vamos ver se entendi
let json_circuitos = {
    c1: [
    	mapa1: {
      		velocidade_base: 1,
      		itens_disponiveis: [
    			{id: 1, modificador/fator ??}, // so a referencia mesmo, os dados desse item, estaria em outro lugar.
      			{} // sim, mas alguns modificadores ex: na agua coisas de fogo n funciona bem, ou seria no item tbm
				// pessimo exempplo kkkk ok
                // bom, ai podemos pensar melhor depois... Eu entendi o exemplo...
				// a principio, teria a referencia do item aqui, ai podemos ver como fazemos para cada item se comportar de uma forma em cada mapa...
				// se a gente coloca esses "Atributos" no proprio mapa, ou se colocamos no item e fazemos uma regra...
				// [mapas que favorecem o item] => c1 -> mapa1 (favorecem) ( no item, entao vai pegar a propriedade que favorece ) "+velocidade"
				// [mapas que nao favorecem o item] c1 -> mapa2 (nao favorece) ( no item, vai pegar a propriedade que nao favorece) "-velocidade"
				// ai tipo, se o mapa nao faz diferenca, ai usa o atributo base do item, sem vantagem/desvantagem (hahahaha)
				// entendikkkkk onus sei la. ok Sr
				// bora dormir
				// vou colocar isso no readme.md do proeto ok? ok... depoois escrevo melhor o que pensei, acho que vai ficar legal.
				// as ideias vao vindo e eu so vou colocando para fora kkkk

				// Para nao ficar exaustivo criando regra nos itens/mapas, poderia simplesmente criar uma regra geral, item gelo com mapa gelo (bonus) etc...
    			// realmente. faz sentido
				// cada fase, só add os fatores e cada item/obj verifica esses fatores
				// Sim, exatamente, evita trabalho... kkkkk - Bom vou dormir cara... amanha acho que entro quando acordar, qualquer coisa da um salve...
				// blz, vou no centro cedo, umas 10/11 to de volta coisa rapida
				// flw
									// flllw < tab lixo > horrivel

			]
      	},
        mapa2: {
      		velocidade_base: 3, // quase isso né?
      	},
        mapa3: '',
    ],
    c2: [
    	mapa1: '',
        mapa2: '',
        mapa3: '',
    ],
}
// quando fosse instanciar o game, passaria qual o circuito foi escolhido, e nele teria os 3/4 mapas que tem nesse circuito...
// só exemplo, isso? - Sim, exatamente... ai quando pegar o c1, em algum local, teria tudo que precisamos para jogar o jogo, armas, sons, etc...
// ficaria vinculado ao mapa. tipo, todas armas disponiveis, so que a gente escolhe qual vai usar em qual circuito, ai seria o que fizesse mais sentido para aqueles mapas.
// por exemplo, se for um mapa de agua, uma pistola de agua faz sentido... entende ? kkkk
// sim... ai tipo, no item, poderia ter tambem fatores para dificultar ou ajudar o player, como ganho de velocidade ou reducao, ai meio que taria tudo vinculado sabe...
// tendeu

class Scene {
  
  	constructor(scene) {
		// definir qual 
      	// propriedades. ok (bostinha)
    }
  
  	setObeject() {
      
    }
  
  	changeScene('mapa/menu/gameover/outracoisa') {
      	
    }

	update() {
			
   	}

   	render() {

   	}

}