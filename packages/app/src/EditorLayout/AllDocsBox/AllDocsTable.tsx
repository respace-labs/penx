import { Box } from '@fower/react'
import { Trash2 } from 'lucide-react'
import { Button, ColumnsType, Table } from 'uikit'
import { Doc, DocService } from '@penx/domain'

interface Props {
  docs: Doc[]
}

export const AllDocsTable = ({ docs }: Props) => {
  const columns: ColumnsType<Doc> = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      width: '50%',
      render(value) {
        return <Box fontBold>{value}</Box>
      },
    },
    {
      title: 'Created time',
      dataIndex: 'createdAtFormatted',
      key: 'createdAtFormatted',
      render: (value) => <Box textXS>{value}</Box>,
    },
    {
      title: 'Updated time',
      dataIndex: 'updatedAtFormatted',
      key: 'updatedAtFormatted',
      render: (value) => <Box textXS>{value}</Box>,
    },
    {
      title: '',
      dataIndex: 'op',
      key: 'op',
      render(_, item) {
        return (
          <Box toCenterY gap1>
            <Button size={28} variant="ghost" colorScheme="gray500" isSquare>
              <Trash2 />
            </Button>
          </Box>
        )
      },
    },
  ]

  return (
    <Table
      columns={columns}
      data={docs}
      rowKey="id"
      bordered={false}
      components={{
        body: {
          row: (props: any) => (
            <Box
              as="tr"
              {...props}
              rounded2XL
              bgGray100--hover
              cursorPointer
              transitionColors
              onClick={async () => {
                const doc = docs.find((doc) => doc.id === props['data-row-key'])
                await new DocService(doc!).selectDoc()
              }}
            />
          ),
          cell: (props: any) => {
            return (
              <Box
                as="td"
                px3
                py2
                textLeft
                {...props}
                contentEditable={false}
              />
            )
          },
        },
      }}
    />
  )
}
