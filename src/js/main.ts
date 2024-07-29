import '../css/style.css'
import {
  createDraggableElement,
  getDraggablePositions,
  isDraggable,
  saveDraggable,
} from './draggable'

const draggableContainer = document.querySelector(
  '.draggables'
) as HTMLDivElement

const draggablePositions = getDraggablePositions()

if (Object.keys(draggablePositions).length > 0) {
  for (const [id, info] of Object.entries(draggablePositions)) {
    createDraggableElement(draggableContainer, info.type, parseInt(id), info)
  }
} else {
  for (let i = 0; i < 5; i++) {
    const draggableType = Math.random() > 0.5 ? 'square' : 'circle'
    createDraggableElement(draggableContainer, draggableType, i)
  }
}

document.addEventListener('dragstart', e => {
  const target = e.target as HTMLElement
  if (!isDraggable(target)) return

  const clientRect = target.getBoundingClientRect()

  const offsetX = e.clientX - clientRect.left
  const offsetY = e.clientY - clientRect.top

  target.dataset.offsetX = offsetX.toString()
  target.dataset.offsetY = offsetY.toString()
})

document.addEventListener('dragend', e => {
  const target = e.target as HTMLElement
  if (!isDraggable(target)) return

  const offsetX = parseFloat(target.dataset.offsetX as string)
  const offsetY = parseFloat(target.dataset.offsetY as string)

  const newLeft = e.clientX - offsetX
  const newTop = e.clientY - offsetY

  target.style.left = `${newLeft}px`
  target.style.top = `${newTop}px`

  saveDraggable(target)
})
