const plants = document.querySelectorAll('.plant')

for (const plant of plants) {
  dragElement(plant)
}

/**
 * @param {HTMLElement} terrariumElement
 */
function dragElement(terrariumElement) {
  const delta = {
    x: 0,
    y: 0,
  }

  const lastPosition = {
    x: 0,
    y: 0,
  }
  /**
   * @param {MouseEvent} e
   */
  terrariumElement.onpointerdown = (e) => {
    e.preventDefault()

    lastPosition.x = e.clientX
    lastPosition.y = e.clientY

    document.onpointermove = elementDrag
    document.onpointerup = stopElementDrag
  }

  /**
   * @param {MouseEvent} e
   */
  function elementDrag(e) {
    delta.x = lastPosition.x - e.clientX
    delta.y = lastPosition.y - e.clientY

    lastPosition.x = e.clientX
    lastPosition.y = e.clientY

    terrariumElement.style.top = terrariumElement.offsetTop - delta.y + 'px'
    terrariumElement.style.left = terrariumElement.offsetLeft - delta.x + 'px'
  }

  terrariumElement.ondblclick = reorderToTop

  function reorderToTop() {
    for (const plant of plants) {
      plant.style.zIndex = plant === terrariumElement ? 3 : 2
    }
  }

  function stopElementDrag() {
    document.onpointerup = null
    document.onpointermove = null
  }
}
