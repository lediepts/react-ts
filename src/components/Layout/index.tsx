import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, Zoom } from '@mui/material'
import Fab from '@mui/material/Fab'

import { useEffect, useRef, useState } from 'react'

interface Props {
  children: any
}

export default function Layout({ children }: Props) {
  const contentRef = useRef<HTMLDivElement>()
  const [trigger, setTrigger] = useState(false)
  useEffect(() => {
    const controlTrigger = () => {
      if (
        contentRef &&
        contentRef.current &&
        contentRef.current.scrollTop > 100
      ) {
        setTrigger(true)
      } else {
        setTrigger(false)
      }
    }
    if (contentRef && contentRef.current) {
      contentRef.current.addEventListener('scroll', controlTrigger)
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      contentRef.current?.removeEventListener('scroll', controlTrigger)
    }
  }, [])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          height: (theme) => `calc(100vh - ${theme.mixins.toolbar.height}px )`,
        }}
      >
        <Box
          sx={{
            flex: 1,
            p: 1,
            height: '100%',
          }}
          ref={contentRef}
          className="scroll-bar"
        >
          <Box sx={{ mr: 0.5, pb: 1 }}>
            {children}
            <Zoom in={trigger}>
              <Box
                onClick={() => {
                  const anchor = document.querySelector(
                    '.scroll-bar>*:first-child'
                  )
                  if (anchor) {
                    anchor.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }
                }}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
              >
                <Fab color="primary" size="small">
                  <KeyboardArrowUpIcon />
                </Fab>
              </Box>
            </Zoom>
          </Box>
        </Box>
      </Box>
    </>
  )
}
