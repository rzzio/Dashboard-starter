// Sidebar imports
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    
  } from "@iconscout/react-unicons";
  



  export const SidebarData = [
    { 
      icon: UilEstate,
      heading: "Dashboard",
    },
    {
      icon: UilClipboardAlt,
      heading: "Ticket",
    },
    {
      icon: UilUsersAlt,
      heading: "Users",
    },
    {
      icon: UilPackage,
      heading: 'Support'
    },
  ];


  export const CardsData=[

    {
        title: "Solved",
        color: {
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
          },
          value: 112,
        },
    
        {
            title: "Pending", 
            color: {
                backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
                boxShadow: "0px 10px 20px 0px #FDC0C7",
              },
              value: 110,
        },
    
        {
            title: "Unassigned", 
            value: 10,
            color: {
                backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
                boxShadow: "0px 10px 20px 0px #F9D59B",
              },
             
        }
    
    
    
    
      ]