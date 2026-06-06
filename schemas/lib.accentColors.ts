export const accentColors = [
  { title: 'Bright Red', value: 'bright-red', hex: '#DD4A4D' },
  { title: 'Bright Teal', value: 'bright-teal', hex: '#2A979B' },
  { title: 'Bright Yellow', value: 'bright-yellow', hex: '#F8CE3B' },
  { title: 'Muted Blue', value: 'muted-blue', hex: '#6A939B' },
  { title: 'Muted Brick', value: 'muted-brick', hex: '#CE5E4D' },
  { title: 'Muted Mustard', value: 'muted-mustard', hex: '#C6AE5C' },
  { title: 'Muted Slate', value: 'muted-slate', hex: '#BAB58F' },
  { title: 'Muted Seafoam', value: 'muted-seafoam', hex: '#669870' },
  { title: 'Muted Dark Teal', value: 'muted-dark-teal', hex: '#3C4E52' },
  { title: 'Muted Rose', value: 'muted-rose', hex: '#8B5B5C' },
] as const

export const accentColorOptions = accentColors.map(({title, value}) => ({
  title,
  value,
}))