import React from 'react'
import './MainDash.css'
import '../Cards/Cards'
import Cards from '../Cards/Cards'
import Table from '../Table/Table'
import BasicTable from '../Table/SingleTable'
const MainDash = () => {
  return (
    <div>
       <h1>Dashboard</h1>
    <Cards/>
   
   <BasicTable />
    </div>
  )
}

export default MainDash
