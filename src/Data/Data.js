// Sidebar imports
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    
  } from "@iconscout/react-unicons";
import { Description } from "@material-ui/icons";
  



  export const SidebarData = [
    { 
      icon: UilEstate,
      heading: "Dashboard",
    },
    // {
    //   icon: UilClipboardAlt,
    //   heading: "Tickets",    TICKET TAB is removed from sidebar
    // },
    {
      icon: UilUsersAlt,
      heading: "Users",
    },
    {
      icon: UilPackage,
      heading: 'IT Technicians'
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
        // {
        //   name: 'John1 Doe',
        //   title: 'SSL Certificate',
        //   createdat: '2024-01-01',
        //   useremail: 'john.doe@example.com',
        //   priority: 'High',
        //   status: 'Completed',
        //   admin: "John Admin"
        // },
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
      export const SingleTicketDetail = [
        {
          title: "Title of the ticket 1",
          createdat: "2020-01-01",
          useremail: 'michael.brown@example.com',
          priority: 'Critical',
          status: 'Pending',
          admin: "John Doe",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          attachment: ['https://picsum.photos/536/354', 'https://picsum.photos/id/237/536/354'],
          comments: null
        }
      ];
      

      export const AdminList=[
        {
          adminId: 1,
          email: "sudarshan@gmail.com",
        },
        {
          adminId: 2,
          email: "kamal@gmal.com",

        },
        {
          adminId: 3,
          email: "roshni@gmal.com",

        }



      ]

      export const UserLists=[
        {
          userId: 1,
          useremail: 'user1@gmail.com'
        },
        {
          userId: 2,
          useremail: "user2@gmail.com"
        }


      ]


      export const CommentData = [
        {
          TicketId: 101,
          message: [
            {
              UID: 1,
              text: "comment on 2024-04-01",
              name: "Sudarshan Koirala",
              isAdmin: true,
              createdDate: "2024-04-01",
              attachment: ['https://picsum.photos/536/354', 'https://picsum.photos/id/237/536/354'],
            },
            
            {
              UID: 2,
              text: "comment on 2024-04-03",
              name: "Kamal ",
              isAdmin: false,
              createdDate: "2024-04-03",
              attachment: null,
            },
            {
              UID: 2,
              text: "comment on 2024-04-23",
              name: "John ",
              isAdmin: false,
              createdDate: "2024-04-23",
              attachment: ['https://picsum.photos/536/354', 'https://picsum.photos/id/237/536/354'],
            },
            {
              UID: 2,
              text: "comment on 2024-04-10",
              name: "Sudarshan Koirala",
              isAdmin: true,
              createdDate: "2024-04-10",
              attachment: null,
            },
            
            // Additional comments...
          ]
        },
        
      ];
      