import { StyledH2, StyledSpan } from '@/components'
import type { AvatarListProps } from '@/types'
import { Avatar, Box } from '@mui/material'
import { pxToRem } from '@/utils'
 
function AvatarList(props: AvatarListProps) {
  return (
    <>
      {props.listData.map((item, index) => (
        <Box
          key={index}
          sx={{
            alignItems: 'center',
            display: 'flex',
            padding: pxToRem(12),
          }}
        >
          <Box>
            <Avatar
              alt={item.name}
              src={item.avatar}
              sx={{
                width: pxToRem(48),
                height: pxToRem(48),
                marginRight: pxToRem(16),
              }}
            />
          </Box>

          <Box>
            <StyledH2>{item.name}</StyledH2>
            <StyledSpan>{item.subtitle}</StyledSpan>
          </Box>
        </Box>
      ))}
    </>
  )
}

export default AvatarList
