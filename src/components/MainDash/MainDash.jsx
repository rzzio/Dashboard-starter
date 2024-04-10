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
    <Table/>
      
    </div>
  )
}

export default MainDash
