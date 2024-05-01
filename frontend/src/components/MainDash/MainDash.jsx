import React, {useEffect, useState} from 'react'
import './MainDash.css'
import '../Cards/Cards'
import {CardsData} from "../../Data/Data";
import Cards from '../Cards/Cards'
import BasicTable from '../Table/SingleTable'

const MainDash = () => {
    const [CardsDatas, setCardsData] = useState(CardsData)
    const getCardsData = async ( ) => {
        try{
            const url = process.env.REACT_APP_API_URL + '/api/ticket-count'
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
            });
            response.json().then((data) =>{
                setCardsData(updatedCardsData(data))
            })
        } catch (e) {
            console.error(e)
        }
    }
    const updatedCardsData = (data) => {
        return CardsDatas.map((card, index) => {
            switch (card.title.toLowerCase()) {
                case 'completed':
                    return {...card, value: data.completed}
                case 'pending':
                    return {...card, value: data.pending}
                case 'unassigned':
                    return {...card, value: data.unassigned}
                default:
                    return card
            }
        })
    }
    useEffect(() => {
        getCardsData()
    }, [])
  return (
    <div>
       <h1>Dashboard</h1>
    <Cards CardsData={CardsDatas}/>
   
   <BasicTable />
    </div>
  )
}

export default MainDash
