let container = append(document.body, new Div('.container'))

const SVG_NS = 'http://www.w3.org/2000/svg'

const configure = (el, attributes) => {
  for (const attr in attributes) {
    el.setAttribute(attr, attributes[attr])
  }
}
const create = (type, props) => {
  const el = document.createElementNS(SVG_NS, type)
  configure(el, props)
  return el
}

let svg = document.createElementNS(SVG_NS, 'svg')
configure(svg, {
  width: '100%',
  height: '100%'
})

append(container, svg)

let groupCW = create('g', {
  stroke: 'red',
  'stroke-width': '7px',
  fill: 'none',
  opacity: 0.5
})

let groupCCW = create('g', {
  stroke: 'cyan',
  'stroke-width': '4px',
  fill: 'none',
  opacity: 0.5
})

let groupCW2 = create('g', {
  stroke: 'purple',
  'stroke-width': '6px',
  fill: 'none',
  opacity: 0.5
})

let groupCCW2 = create('g', {
  stroke: 'green',
  'stroke-width': '5px',
  fill: 'none',
  opacity: 0.5
})

let totalX = window.innerWidth
let totalY = window.innerHeight

let rgbIncrement

let incrementX = parseInt(totalX)
let incrementXHalf = parseInt(incrementX / 30)
let incrementY = parseInt(totalY)
let incrementYHalf = parseInt(incrementY / 30)

const getPolyLines = (swap) => {
  const lines = []
  for (let rotation = 1; rotation<=20; rotation++) {
    let rand = Math.random()
    let negX = Math.random() > .5 ? -1 : 1
    let negY = Math.random() > .5 ? -1 : 1
    let points = ''
    for (let point = 1; point<=10; point++) {
      if (points)
        points += ' '
      let x = parseInt((point*(point%2===0?incrementX:incrementXHalf)) + (rand * 20 * negX))
      let y = parseInt((point*(point%2===0?incrementYHalf:incrementYHalf)) + (rand * 20 * negY))
      points += swap ? `${x},${y}` : `${y},${x}`
    }
    let poly = create('polyline', {
      points: points
    })
    poly.style['transform-origin'] = `${totalX/2}px ${totalY/2}px`
    poly.style.transform = `rotate(${(rotation*18)}deg)`
    lines.push(poly)
  }
  return lines
}
append(groupCCW, getPolyLines(true))
groupCCW.style['transform-origin'] = `${totalX/2}px ${totalY/2}px`
append(svg, groupCCW)

append(groupCW, getPolyLines())
groupCW.style['transform-origin'] = `${totalX/2}px ${totalY/2}px`
append(svg, groupCW)

append(groupCCW2, getPolyLines())
groupCCW2.style['transform-origin'] = `${totalX/2}px ${totalY/2}px`
append(svg, groupCCW2)

append(groupCW2, getPolyLines(true))
groupCW2.style['transform-origin'] = `${totalX/2}px ${totalY/2}px`
append(svg, [
  groupCCW,
  groupCCW2,
  groupCW,
  groupCW2
])


let dist = 1
let odd = false

const draw = () => {
  odd = !odd
  dist += .25
  groupCW.style.transform = `rotate(${dist}deg)`
  groupCCW.style.transform = `rotate(-${dist*2}deg)`
  groupCCW2.style.transform = `rotate(${dist*3}deg)`
  groupCW2.style.transform = `rotate(-${dist*4}deg)`
  document.body.style.filter = `hue-rotate(${dist*12}deg)`
  window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)