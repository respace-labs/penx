import { useEffect, useState } from 'react'
import { Box } from '@fower/react'
import { MoreHorizontal } from 'lucide-react'
import { Button } from 'uikit'
import { useCatalogue } from '@penx/hooks'
import { db, IDoc } from '@penx/local-db'
import { CatalogueIconPopover } from './CatalogueIconPopover'
import { SqlParser } from './SqlParser'

export const RecentlyEdited = () => {
  const [docs, setDocs] = useState<IDoc[]>([])
  useEffect(() => {
    const sql = 'SELECT * FROM doc ORDER BY updatedAt DESC limit 4'
    const parsed = new SqlParser(sql)

    db[parsed.tableName].select(parsed.queryParams).then((docs = []) => {
      setDocs(docs)
    })
  }, [])

  const catalogue = useCatalogue()

  return (
    <Box gray600 p3 bgWhite rounded2XL>
      <Box toCenterY toBetween gap2>
        <Box fontBold>Recently Edited</Box>
        <Button
          size="sm"
          variant="ghost"
          colorScheme="gray700"
          isSquare
          roundedFull
        >
          <MoreHorizontal />
        </Button>
      </Box>
      <Box column>
        {docs.map((doc) => {
          const node = catalogue.tree.findNode(doc.id)!

          return (
            <Box
              key={doc.id}
              toCenterY
              gap2
              gray500
              textSM
              py2
              px1
              bgGray100--hover
              cursorPointer
              rounded
              onClick={() => {
                catalogue.selectNode(node)
              }}
            >
              <CatalogueIconPopover node={node} />
              <Box flex-1>{doc.title}</Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}