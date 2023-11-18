import { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { styled } from '@fower/react'
import { Command } from '@penx/cmdk'

const CommandDialog = styled(Command.Dialog)
const StyledCommand = styled(Command)

interface CommandWrapperProps {
  isMobile?: boolean
  open: boolean
  setSearch: Dispatch<SetStateAction<string>>
  setOpen: (open: boolean) => void
}

export const CommandWrapper = ({
  children,
  isMobile,
  open,
  setOpen,
  setSearch,
}: PropsWithChildren<CommandWrapperProps>) => {
  if (isMobile) {
    return (
      <StyledCommand
        bgRed100
        w-100p
        left-50p
        bgWhite
        css={{
          height: 'fit-content',
        }}
        loop
        className="command-panel"
        onValueChange={(value) => {
          console.log(value)
        }}
        onKeyUp={(e) => {
          // Escape goes to previous page
          // Backspace goes to previous page when search is empty
          if (e.key === 'Escape' || e.key === 'Backspace') {
            e.preventDefault()
          }
        }}
      >
        {children}
      </StyledCommand>
    )
  }
  return (
    <CommandDialog
      shadow="0 16px 70px rgba(0,0,0,.2)"
      rounded2XL
      w-640
      fixed
      top-100
      left-50p
      zIndex-10000
      translateX="-50%"
      bgWhite
      css={{
        height: 'fit-content',
      }}
      loop
      className="command-panel"
      open={open}
      onOpenChange={setOpen}
      onValueChange={(value) => {
        console.log(value)
      }}
      onEscapeKeyDown={() => {
        setSearch('')
      }}
      onKeyUp={(e) => {
        // Escape goes to previous page
        // Backspace goes to previous page when search is empty
        if (e.key === 'Escape' || e.key === 'Backspace') {
          e.preventDefault()
        }
      }}
    >
      {children}
    </CommandDialog>
  )
}
