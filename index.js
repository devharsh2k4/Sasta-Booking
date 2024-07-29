const http = require('http');

const url = require('url');
const port = 4000;

var Data = [  
  {
    id:1,
    name: 'Patna',
    adventurePlaces: ['gandhi maidan', 'patna museum', 'patna zoo'],
  },

    {
    id:2,
    name: 'Mumbai',
    adventurePlaces: ['gateway of india', 'marine drive', 'elephanta caves'],
  },
  {
    id:3,
    name:"Delhi",   
    adventurePlaces: ['red fort', 'india gate', 'qutub minar'],
  },
  {
    id:4,
    name:"Kolkata", 
    adventurePlaces: ['victoria memorial', 'eden gardens', 'howrah bridge'],
  },

  {
    id:5,
    name:"Chennai",
    adventurePlaces: ['marina beach', 'kapaleeshwarar temple', 'valluvar kottam'],
  },

  {
    id:6,
    name:"Bangalore",
    adventurePlaces: ['lalbagh botanical garden', 'cubbon park', 'bangalore palace'],
  },
  {
    id:7,
    name:"Hyderabad",
    adventurePlaces: ['charminar', 'golconda fort', 'ramoji film city'],
  },
  {
    id:8,
    name:"Ahmedabad",
    adventurePlaces: ['sabarmati ashram', 'kankaria lake', 'akshardham temple'],
  },
  {
    id:9,
    name:"Jaipur",
    adventurePlaces: ['amber fort', 'city palace', 'jantar mantar'],
  },
  {
    id:10,
    name:"Lucknow",
    adventurePlaces: ['bara imambara', 'chota imambara', 'rumi darwaza'],

  },
    {
        id:11,
        name:"Guwahati",
        adventurePlaces: ['kamakhya temple', 'saraighat bridge', 'assam state zoo'],
    },


 ]

const serveHandler = (req, res) => {
    const { url:api_url, method } = req

   const {pathname,query}= url.parse(api_url, true)
    

    if(pathname === '/cities' && method === 'GET'){

       res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        const result = {
            success: true,
            data: Data
        }

        res.end(JSON.stringify(result))
    }else if(pathname === '/cities/add' && method === 'POST'){

      let body = ""
      req.on('data',(chunk)=>{
      body+=chunk.toString()
      })

      req.on("end",()=>{
       const REQUEST_PAYLOAD =  JSON.parse(body)
       console.log(REQUEST_PAYLOAD)

       const {name, adventurePlaces} = REQUEST_PAYLOAD

       Data.push({
        id:Data.length+1,
        name,
        adventurePlaces
       })

       res.writeHead(201, {
        'Content-Type': 'application/json'
       });

       const result ={
        success:true,
       }

       res.end(JSON.stringify(result))
      })

    }
      else if (pathname === '/cities/update' && method === 'PUT') {
        const id = query.id;
        let body = "";
        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          const REQUEST_PAYLOAD = JSON.parse(body);
          console.log(REQUEST_PAYLOAD);

          const { name, adventurePlaces } = REQUEST_PAYLOAD;

          const index = Data.findIndex((city) => city.id == id);

          if (index === -1) {
            res.writeHead(404, {
              'Content-Type': 'application/json'
            });
            const result = {
              success: false,
              message: 'City not found'
            }

            res.end(JSON.stringify(result));
          } else {
            Data[index].name = name;
            Data[index].adventurePlaces = adventurePlaces;

            res.writeHead(200, {
              'Content-Type': 'application/json'
            });
            const result = {
              success: true,
              message: 'City updated successfully'
            }

            res.end(JSON.stringify(result));
          }
        });
      }
    
    else if(pathname === '/cities/delete' && method === 'DELETE'){

      if(!query.id){

        res.writeHead(400, {
            'Content-Type': 'application/json'
        }); 
        const result = {
            success: false,
            message: 'Id is required'
        }

        res.end(JSON.stringify(result))
        
      }else{
        const id = query.id
        const index = Data.findIndex((city)=>city.id == id)

        if(index === -1){
            res.writeHead(404, {
                'Content-Type': 'application/json'
            }); 
            const result = {
                success: false,
                message: 'City not found'
            }
    
            res.end(JSON.stringify(result))
        }else{
            Data.splice(index,1)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            }); 
            const result = {
                success: true,
                message: 'City deleted successfully'
            }
    
            res.end(JSON.stringify(result))
        }
      }


      
        
        
    }else{
        
        res.writeHead(404, {
            'Content-Type': 'application/json'
        }); 
        const result = {
            success: false,
            message: 'Route not found'
        }

        res.end(JSON.stringify(result))
    }


   
}

const server = http.createServer(serveHandler);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


