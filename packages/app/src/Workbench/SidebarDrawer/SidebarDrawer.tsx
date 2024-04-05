import { useMemo } from 'react'
import { Box, styled } from '@fower/react'
import {
  CalendarDays,
  CheckCircle2,
  Cloud,
  Database,
  Folder,
  Hash,
  Inbox,
  Menu,
} from 'lucide-react'
import { Drawer } from 'vaul'
import { Button } from 'uikit'
import { useActiveNodes, useRouterName, useSidebarDrawer } from '@penx/hooks'
import { Node } from '@penx/model'
import { useNodes } from '@penx/node-hooks'
import { useSession } from '@penx/session'
import { store } from '@penx/store'
import { LoginButton } from '../Sidebar/LoginButton'
import { SpacePopover } from '../Sidebar/SpacePopover/SpacePopover'
import { TreeView } from '../Sidebar/TreeView/TreeView'
import { UserProfile } from '../Sidebar/UserProfile'
import { MenuItem } from './MenuItem'

const DrawerOverlay = styled(Drawer.Overlay)
const DrawerContent = styled(Drawer.Content)

export const SidebarDrawer = () => {
  const { isOpen, close, open } = useSidebarDrawer()
  const { nodes, nodeList } = useNodes()
  const { loading, data: session } = useSession()

  const name = useRouterName()
  const { activeNodes } = useActiveNodes()

  const isTodosActive = name === 'TODOS'

  const isTodayActive = useMemo(() => {
    if (name !== 'NODE' || !activeNodes.length) return false
    if (!activeNodes[0]) return false
    if (new Node(activeNodes[0]).isToday) return true
    return false
  }, [name, activeNodes])

  const isTagsActive = useMemo(() => {
    if (name !== 'NODE' || !activeNodes.length) return false
    if (!activeNodes[0]) return false
    if (new Node(activeNodes[0]).isDatabaseRoot) return true
    return false
  }, [name, activeNodes])

  return (
    <Drawer.Root
      shouldScaleBackground
      open={isOpen}
      onOpenChange={(o) => {
        if (o) {
          open()
        } else {
          close()
        }
      }}
    >
      <Drawer.Trigger asChild>
        <Button variant="ghost" size="sm" isSquare p0 colorScheme="gray600">
          <Menu />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <DrawerOverlay fixed bgBlack--T60 zIndex-100 css={{ inset: 0 }} />
        <DrawerContent
          bgWhite
          column
          roundedTop2XL
          h-94vh
          fixed
          bottom-0
          left-0
          right-0
          zIndex-101
          // overflowHidden
          bgNeutral100
          px4
          py4
        >
          <Box px2 toCenterY pb2 gap1>
            {session && !loading && (
              <>
                <UserProfile isMobile />
                <Box>/</Box>
              </>
            )}
            <SpacePopover />
          </Box>
          <Box column flex-1>
            <Box flex-1 mt3 gap4 column>
              <Box bgWhite roundedLG>
                <MenuItem
                  icon={<CalendarDays size={22} />}
                  label="Today"
                  isActive={isTodayActive}
                  onClick={() => {
                    store.node.selectDailyNote()
                    close()
                  }}
                />

                <MenuItem
                  icon={<CheckCircle2 size={22} />}
                  label="Tasks"
                  isActive={isTodosActive}
                  onClick={() => {
                    store.router.routeTo('TODOS')
                    close()
                  }}
                />

                <MenuItem
                  icon={<Database size={22} />}
                  label="Tags"
                  isActive={isTagsActive}
                  borderBottom={false}
                  onClick={() => {
                    store.node.selectTagBox()
                    close()
                  }}
                />
              </Box>

              {/* <Box column gap2>
                <TagsEntry isActive={isTagsActive} />
                <DatabaseList />
              </Box> */}

              <Box bgWhite roundedLG>
                <TreeView nodeList={nodeList} />
              </Box>
            </Box>
          </Box>

          <Box px4>
            {/* <SetupGitHubButton /> */}
            <LoginButton />
          </Box>
        </DrawerContent>
      </Drawer.Portal>
    </Drawer.Root>
  )
}