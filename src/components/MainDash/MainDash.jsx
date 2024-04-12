import React from 'react'
import './MainDash.css'
import '../Cards/Cards'
import Cards from '../Cards/Cards'
import Table from '../Table/Table'
const MainDash = () => {
  return (
    <div>
       <h1>Dashboard</h1>
    <Cards/>
    <h3> Recent Tickets</h3>
    <Table/>
      
    </div>
  )
}

export default MainDash
