const http = require('http');
const fs = require('fs');

const readFileTamplate = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject.err
      else resolve(data)
    })
  })
}


const PORT = 3003
let serverCount = 0

const server = http.createServer(async (request, response) => {
  

  if (request.url === '/favicon.ico') {
    response.writeHead(200, {'Content-Type': 'image/x-icon'} );
    try {
      const data = await readFileTamplate('./assets/favicon-16x16.png')
      response.write(data)
      response.end();
    }
    catch {
      response.write('something error')
      response.end()
    }
    return;
  }
  
  serverCount++

  switch (request.url) {
    case '/':
      response.write(` Serik-programmer ${serverCount}`)
      break;
    case '/skills':
      response.write(`Skills ${serverCount}`)
      break;
    case '/courses':
      response.write(`back-end ${serverCount}`)
      break;
    case '/login':
      try{
        const data = await readFileTamplate('./pages/login.html')
        response.write(data)
        response.end()
      }
      catch (err) {
        response.write('something happend wrong')
        response.end()
      }
      break
      
    default:
      response.write('error 404 not found')
  
  }
  
  response.end()
})

server.listen(PORT)

