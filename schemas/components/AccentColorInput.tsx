import {useCallback} from 'react'
import {Box, Card, Flex, Grid, Stack, Text} from '@sanity/ui'
import {CheckmarkIcon} from '@sanity/icons'
import {set, type StringInputProps} from 'sanity'

import {accentColors} from '../lib.accentColors'

export function AccentColorInput(props: StringInputProps) {
  const {value, onChange, readOnly, schemaType} = props
  const label = schemaType.title || 'Accent Color'

  const handleSelect = useCallback(
    (nextValue: string) => {
      if (readOnly) return

      onChange(set(nextValue))
    },
    [onChange, readOnly],
  )

  return (
    <Stack gap={3}>
      <Grid
        gridTemplateColumns={[1, 2, 3]}
        gap={2}
        role="radiogroup"
        aria-label={label}
      >
        {accentColors.map((color) => {
          const selected = value === color.value

          return (
            <Card
              key={color.value}
              as="button"
              type="button"
              padding={4}
              radius={2}
              tone={selected ? 'primary' : 'default'}
              border
              shadow={selected ? 1 : 0}
              disabled={readOnly}
              aria-checked={selected}
              role="radio"
              onClick={() => handleSelect(color.value)}
              style={{
                cursor: readOnly ? 'not-allowed' : 'pointer',
                textAlign: 'left'
              }}
            >
              <Flex align="center" gap={3}>
                <Box
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '3px',
                    backgroundColor: color.hex,
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    flexShrink: 0,
                  }}
                />

                <Box flex={1}>
                  <Text size={1} weight={selected ? 'semibold' : 'regular'}>
                    {color.title}
                  </Text>
                </Box>

                {selected && (
                  <Text size={1}>
                    <CheckmarkIcon />
                  </Text>
                )}
              </Flex>
            </Card>
          )
        })}
      </Grid>
    </Stack>
  )
}