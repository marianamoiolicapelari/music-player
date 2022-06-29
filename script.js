let musicas = [
  { titulo: 'Guittar Solo', artista: 'Blitz', src: './music/01.mp3', img: './assets/rock.jpg' },
  { titulo: 'Samba raiz', artista: 'Blitz', src: './music/02.mp3', img: './assets/mpb.jpg' },
  { titulo: 'Música piano', artista: 'Blitz', src: './music/03.mp3', img: './assets/classic.jpg' },
]

let indexMusica = 0
let musica = document.querySelector('audio')
let duracaoMusica = document.querySelector('.fim')
let imagem = document.querySelector('img')
let nomeMusica = document.querySelector('.descricao h2')
let nomeArtista = document.querySelector('.descricao i')

renderizarMusica(indexMusica)

function renderizarMusica(index) {
  musica.setAttribute('src', musicas[index].src)
  musica.addEventListener('loadeddata', () => {
    nomeMusica.textcontent = musicas[index].titulo
    nomeArtista.textContent = musicas[index].artista
    imagem.src = musicas[index].img
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration))
    pausarMusica()
  })
}

function tocarMusica() {
  musica.play()
  document.querySelector('.botao-pause').style.display = 'block'
  document.querySelector('.botao-play').style.display = 'none'
}

function pausarMusica() {
  musica.pause()
  document.querySelector('.botao-pause').style.display = 'none'
  document.querySelector('.botao-play').style.display = 'block'
}

function atualizarBarra() {
  let barra = document.querySelector('progress')
  barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%'
  let tempoDecorrido = document.querySelector('.inicio')
  tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime))
}

function segundosParaMinutos(segundos) {
  let campoMinutos = Math.floor(segundos / 60)
  let campoSegundos = segundos % 60
  if (campoSegundos < 10) {
    campoSegundos = '0' + campoSegundos
  }
  return campoMinutos + ':' + campoSegundos
}



document.querySelector('.botao-play').addEventListener('click', tocarMusica)
document.querySelector('.botao-pause').addEventListener('click', pausarMusica)
musica.addEventListener('timeupdate', atualizarBarra)
document.querySelector('.anterior').addEventListener('click', () => {
  indexMusica--
  if (indexMusica < 0) {
    indexMusica = 2
  }
  renderizarMusica(indexMusica)
})
document.querySelector('.proxima').addEventListener('click', () => {
  indexMusica++
  if (indexMusica > 2) {
    indexMusica = 0
  }
  renderizarMusica(indexMusica)
})