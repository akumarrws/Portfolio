var sys = ''
var id = ''
let ids = [ 'cInput', 'fInput', 'kInput' ]

let functions = { C: convertCtoF, F: convertFtoC, K: convertCtoK }
var convertButton = ''
var errorElement = document.getElementById('errorMessage')
    
window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
  convertButton = document.getElementById('convertButton')
  errorElement = document.getElementById('errorMessage')
  ids.forEach(function(i, index) {
    i = document.getElementById(i)
    i.addEventListener('input', function(e) {
      id = e.target.id
      let oppIds = []
      if (id === 'cInput') oppIds = ['fInput', 'kInput']
      if (id === 'fInput') oppIds = ['cInput', 'kInput']
      if (id === 'kInput') oppIds = ['cInput', 'fInput']
      oppIds.forEach(function(id, i) {
        let oppElement = document.getElementById(id)
        oppElement.value = ''
      })
      sys = id[0].toUpperCase()
    })
  })
  
  convertButton.addEventListener('click', function(e) {
    let oppId = ''
    if (id === 'cInput') oppId = 'fInput'
    else if (id === 'fInput') oppId = 'cInput'
    let oppElement = document.getElementById(oppId)
    let kElement = document.getElementById('kInput')
    let currElement = document.getElementById(id)
    let currValue = ''
    if (!!currElement) {
      currValue = currElement.value
    }
    if (!!id === false) id = 'convertButton'
    if (checkValidity(currValue)) {
      let convertedValue = parseFloat(functions[sys](currValue))
      if (!!oppElement) {
        oppElement.value = convertedValue
      }
      let kValue = currValue
      if (sys ==='K') {
        let cElement = document.getElementById('cInput')
        let fElement = document.getElementById('fInput')
        let cValue = convertKtoC(kValue)
        let fValue = convertCtoF(cValue)
        cElement.value = cValue
        fElement.value = fValue
      }
      else {
        if (sys === 'F') kValue = convertedValue
        kValue = convertCtoK(kValue)
        if (!!kElement) {
          kElement.value = kValue
        }
      }

      let imageTemp = currValue
      if (sys === 'C') imageTemp = convertedValue
      let imageSrc = 'error.png'
      if (imageTemp < 32) imageSrc = 'cold.png'
      else if (imageTemp >= 32 && imageTemp <= 50) imageSrc = 'cool.png'
      else if (imageTemp > 50) imageSrc = 'warm.png'

      let image = document.getElementById('weatherImage')
      let imageAlt = imageSrc.split('.')[0]
      imageAlt = `${imageAlt[0].toUpperCase()}${imageAlt.substring(1)}`
      image.src = imageSrc
      image.alt = imageAlt
    }
  })
}

function convertCtoF(degreesCelsius) {
  // °F = °C * 9/5 + 32
  return (degreesCelsius * 9/5) + 32
}

function convertFtoC(degreesFahrenheit) {
  // °C = (°F - 32) * 5/9
  return (degreesFahrenheit - 32) * 5/9
}

function convertCtoK(degreesCelsius) {
  // K = C + 273.15
  return Number(degreesCelsius) + 273.15
}

function convertKtoC(degreesKelvin) {
  // K = C + 273.15
  return Number(degreesKelvin) - 273.15
}

function checkValidity(value) {
  if (value === convertButton.value) {
    errorElement.textContent = `No ${value.toLowerCase()} value provided`
    return false
  }
  else if (!!value === false || (!parseFloat(value) && parseFloat(value) !== 0)) {
    errorElement.textContent = `${value} is not a number`
    return false
  }
  else {
    errorElement.textContent = ''
    return true
  }
}