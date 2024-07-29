type DraggableElemStyle = 'square' | 'circle'

type DraggableInfo = { left: string; top: string; type: DraggableElemStyle }

const DRAGGABLE_KEY = '__DRAGABLE_POSITIONS__'

export const createDraggableElement = (
  container: HTMLElement,
  classes: DraggableElemStyle,
  id: number,
  draggableInfo?: DraggableInfo
) => {
  const inlineStyles = draggableInfo
    ? `style="left: ${draggableInfo.left}; top: ${draggableInfo.top};"`
    : null

  container.innerHTML += `
    <div data-id="${id}" ${inlineStyles} class="draggable ${classes}" draggable="true">
    </div>`
}

export const isDraggable = (elem: HTMLElement) => {
  return elem.classList.contains('draggable')
}

export const getDraggablePositions = (): {
  [key: string]: DraggableInfo
} => {
  return JSON.parse(localStorage.getItem(DRAGGABLE_KEY) ?? '{}')
}

export const saveDraggable = (draggable: HTMLElement) => {
  let id = draggable.dataset.id
  if (!id) {
    throw new Error('Draggable id missing')
  }

  const intId = parseInt(id)

  const draggableType = draggable.classList.contains('circle')
    ? 'circle'
    : 'square'

  const draggablePositions = getDraggablePositions()
  draggablePositions[intId] = {
    left: draggable.style.left,
    top: draggable.style.top,
    type: draggableType,
  }

  localStorage.setItem(DRAGGABLE_KEY, JSON.stringify(draggablePositions))
}
