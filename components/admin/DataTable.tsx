'use client'

import { useState } from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, InputAdornment, IconButton, Checkbox, Menu, MenuItem } from '@mui/material'
import { Search, FilterList, MoreVert } from '@mui/icons-material'
import { themeConfig } from '@/lib/config/theme'

interface Column {
  id: string
  label: string
  render?: (row: any) => React.ReactNode
  sortable?: boolean
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  onRowAction?: (action: string, row: any) => void
  actions?: { label: string; value: string }[]
  searchable?: boolean
  selectable?: boolean
}

export default function DataTable({ columns, data, onRowAction, actions = [], searchable = true, selectable = false }: DataTableProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [anchorEl, setAnchorEl] = useState<{ el: HTMLElement; row: any } | null>(null)

  const filteredData = data.filter(row =>
    Object.values(row).some(val => String(val).toLowerCase().includes(search.toLowerCase()))
  )

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box>
      {searchable && (
        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ flex: 1, maxWidth: 400 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <IconButton size="small" sx={{ bgcolor: '#f8f9fa' }}>
            <FilterList />
          </IconButton>
        </Box>
      )}

      <TableContainer sx={{ bgcolor: 'white', borderRadius: 3, border: '1px solid #e5e7eb' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8f9fa' }}>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.length === paginatedData.length}
                    onChange={(e) => setSelected(e.target.checked ? paginatedData.map(r => r._id) : [])}
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell key={col.id} sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>
                  {col.label}
                </TableCell>
              ))}
              {actions.length > 0 && (
                <TableCell align="right" sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row._id} sx={{ '&:hover': { bgcolor: '#f8f9fa' }, transition: 'all 0.2s' }}>
                {selectable && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(row._id)}
                      onChange={(e) => setSelected(e.target.checked ? [...selected, row._id] : selected.filter(id => id !== row._id))}
                    />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.id}>
                    {col.render ? col.render(row) : row[col.id]}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell align="right">
                    <IconButton size="small" onClick={(e) => setAnchorEl({ el: e.currentTarget, row })}>
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        sx={{ mt: 2 }}
      />

      <Menu
        anchorEl={anchorEl?.el}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {actions.map((action) => (
          <MenuItem
            key={action.value}
            onClick={() => {
              onRowAction?.(action.value, anchorEl?.row)
              setAnchorEl(null)
            }}
          >
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
