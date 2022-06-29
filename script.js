let musicas = [
  {titulo:'You Know Im No Good', artista:'Amy Winehouse', src:'./music/You Know Im No Good.mp3', img: './assets/Amy Winehouse.jpg'},
  {titulo:'Loner', artista:'Black Sabbath', src:'./music/Loner.mp3', img: './assets/Black Sabbath.jpg'},
  {titulo:'Mr Crawley', artista:'Ozzy Osboune', src:'./music/Mr._Crawley.mp3', img: './assets/Ozzy Osboune.jpg'},
  {titulo:'Territory', artista:'Sepultura', src:'./music/Territory.mp3', img: './assets/Sepultura.jpg'},
  {titulo:'Angel of Death', artista:'Slayer', src:'./music/Angel of Death.mp3', img: './assets/Slayer.jpg'}
]

let musica = document.querySelector('audio')
let indexMusica = 0
let duracaoMusica = document.querySelector('.fim')
let imagem = document.querySelector('img')
let nomeMusica = document.querySelector('.descricao h2')
let nomeArtista = document.querySelector('.descricao i')

renderizarMusica(indexMusica)


function renderizarMusica(index){
  musica.setAttribute('src', musicas[index].src)
  musica.addEventListener('loadeddata', () => {
      nomeMusica.textContent = musicas[index].titulo
      nomeArtista.textContent = musicas[index].artista
      imagem.src = musicas[index].img
      duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration))
      pausarMusica()
  })
}

function tocarMusica(){
  musica.play()
  document.querySelector('.botao-pause').style.display = 'block'
  document.querySelector('.botao-play').style.display = 'none'
}

function pausarMusica(){
  musica.pause()
  document.querySelector('.botao-pause').style.display = 'none'
  document.querySelector('.botao-play').style.display = 'block'
}

function atualizarBarra(){
  let barra = document.querySelector('progress')
  barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%'
  let tempoDecorrido = document.querySelector('.inicio')
  tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime))
}

function segundosParaMinutos(segundos){
  let campoMinutos = Math.floor(segundos / 60)
  let campoSegundos = segundos % 60
  if (campoSegundos < 10){
      campoSegundos = '0' + campoSegundos
  }

  return campoMinutos+':'+campoSegundos
}

document.querySelector('.botao-play').addEventListener('click', tocarMusica)
document.querySelector('.botao-pause').addEventListener('click', pausarMusica)
musica.addEventListener('timeupdate', atualizarBarra)

document.querySelector('.anterior').addEventListener('click', () => {
  indexMusica--
  if (indexMusica < 0) {
      indexMusica = 4
  }
  renderizarMusica(indexMusica)
})

document.querySelector('.proxima').addEventListener('click', () => {
  indexMusica++
  if (indexMusica > 4){
      indexMusica = 0
  }
  renderizarMusica(indexMusica)
})

