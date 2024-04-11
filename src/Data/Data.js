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
      heading: "Tickets",
    },
    {
      icon: UilUsersAlt,
      heading: "Users",
    },
    {
      icon: UilPackage,
      heading: 'Admins'
    },
  ];


  export const CardsData=[

    {
        title: "Completed",
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

      export const TicketLists = [
        {
          name: 'John Doe',
          title: 'SSL certificate',
          createdat: '2024-01-01',
          useremail: 'supporter@gmail.com',
          priority: 'High',
          status: 'Completed',
          admin: " suraj pandey"
        },
        {
          name: 'John Doe',
          title: 'SSL Certificate',
          createdat: '2024-01-01',
          useremail: 'john.doe@example.com',
          priority: 'High',
          status: 'Completed',
          admin: "John Admin"
        },
        {
          name: 'Jane Smith',
          title: 'Web Hosting',
          createdat: '2024-02-15',
          useremail: 'jane.smith@example.com',
          priority: 'Medium',
          status: 'In Progress',
          admin: " Member 2"
        },
        {
          name: 'Emily Johnson',
          title: 'Domain Registration',
          createdat: '2024-03-22',
          useremail: 'emily.johnson@example.com',
          priority: 'Low',
          status: 'Pending',
          admin: "Support Member 1"
        },
        {
          name: 'Michael Brown',
          title: 'Email Hosting',
          createdat: '2024-04-30',
          useremail: 'michael.brown@example.com',
          priority: 'Critical',
          status: 'Delayed',
          admin: "Support Member 3"
        }
      ];
      
