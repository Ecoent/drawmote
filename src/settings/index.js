export const COLORS = [
  {
    name: 'white',
    rgb: [255, 255, 255]
  },
  {
    name: 'black',
    rgb: [56, 60, 71]
  },
  {
    name: 'blue',
    rgb: [196, 232, 247]
  },
  {
    name: 'green',
    rgb: [184, 221, 190]
  },
  {
    name: 'yellow',
    rgb: [253, 188, 75]
  },
  {
    name: 'red',
    rgb: [253, 121, 75]
  }
]

export const DEFAULT_COLOR = COLORS[3]
export const RADIUS_DEFAULT = 10
export const RADIUS_MIN = 1
export const RADIUS_MAX = 70

export const HARDNESS_DEFAULT = 100
export const HARDNESS_MIN = 0
export const HARDNESS_MAX = 100

export const OPACITY_DEFAULT = 100
export const OPACITY_MIN = 1
export const OPACITY_MAX = 100

// export const SMOOTHING_INIT = 0.85
export const SMOOTHING_INIT = 1.3

export const SMUDGE_AMOUNT = 0.25

export const BRUSH_DEFAULT = {
  color: DEFAULT_COLOR,
  radius: RADIUS_DEFAULT,
  hardness: HARDNESS_DEFAULT,
  opacity: OPACITY_DEFAULT,
  style: 'smudge'
}

export const TOOLBAR_TOOLS = [
  {
    id: 'freeform',
    component: 'ToolbarButton',
    icon: 'icon-freeform'
  },
  {
    id: 'polygon',
    component: 'ToolbarButton',
    icon: 'icon-polygon'
  },
  {
    id: 'eraser',
    component: 'ToolbarButton',
    icon: 'icon-erase'
  },
  {
    id: 'delete',
    component: 'ToolbarButton',
    icon: 'icon-delete'
  }
]

export const TOOLBAR_SLIDERS = [
  {
    id: 'opacity',
    component: 'ToolbarSliderOpacity',
    icon: ''
  },
  {
    id: 'size',
    component: 'ToolbarSliderSize',
    icon: ''
  },
  {
    id: 'hardness',
    component: 'ToolbarSliderHardness',
    icon: ''
  }
]
