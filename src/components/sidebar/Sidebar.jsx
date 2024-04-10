import React, { useState } from "react";
import './Sidebar.css'
import Logo from "../../imgs/confirmation_number_FILL0_wght400_GRAD0_opsz24.png"
import { SidebarData } from '../../Data/Data'
import { UilSignOutAlt } from "@iconscout/react-unicons";
 


const Sidebar = () => {

 const [selected, setSelected] = useState(0);
 const [expanded, setExpaned] = useState(true)


  return (
      <div className="Sidebar">
         {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>
          Tic<span>K</span>et CRM
        </span>
      </div>
      <div className="menu">
            {SidebarData.map((item,index)=>{ 
                return(
                    <div className={selected === index ? "menuItem active" : "menuItem"}
                   key={index}
                   onClick={() => setSelected(index)}
                    >
                        <item.icon/>
                        <span>
                            {item.heading}
                        </span>

                        


                    </div>

                )
                
            }
            
            )}
            <div className="menuItem">
          <UilSignOutAlt />
        </div>


        </div>
        
      </div>

    
        )
        }
      
export default Sidebar
