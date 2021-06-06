/* eslint-disable no-undef */
import React,{useMemo} from 'react'
import { useTable,useRowSelect,useGlobalFilter, usePagination} from 'react-table'
import {GlobalFilter} from './GlobalFilter'
import {Checkbox} from './Checkbox'
import './Table.css'
import DATA from './DATA.json'
import { COLUMNS } from './columns'



export const Pagination = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => DATA, [])

  const {
      setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    prepareRow,
    deleteRow,
    selectedFlatRows
  } = useTable(
      {
    columns,
    data
  },useGlobalFilter,usePagination,useRowSelect,
 hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
        },
        ...columns
      ])
    }
  )
  const {globalFilter}= state
    const {pageIndex} = state

  return (
    <>
<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        
      </table>
     
      <div>
          <span>
              Page{' '}
              <strong>
                  {pageIndex+1} of {pageOptions.length}
              </strong>{' '}
          </span>
      <button onClick={()=> gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
      <button onClick={()=> previousPage()} disabled={!canPreviousPage}>{'<'}</button>
      
      <button onClick={()=> nextPage()} disabled={!canNextPage}>{'>'}</button>
      <button onClick={()=> gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
      
      <button onClick={() => deleteRow(
          {
              selectedFlatRows:selectedFlatRows.map((row)=> row.original),
                    
          }
      )}>Delete</button>
  
      
    




      </div>
      </>
    
  )
}
