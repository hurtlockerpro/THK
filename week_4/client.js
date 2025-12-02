console.log("Hello");

const serverHost = 'http://localhost:3001'

const btn = document.getElementById('loginWithGoogle')
btn.addEventListener('click', () => {
  loginWithGoogle()
})

async function loginWithGoogle() {
  console.log("STEP 1: login to google");

  try {
    const response = await fetch(serverHost + "/api/auth/url");
    const data = await response.json();

    console.log("---Start---");
    window.location.href = data.url
    console.log("URL: ", data);

  } catch (error) {
    console.log(error.message);
  }
}

// listen to window , get href , find ?code=
window.addEventListener('DOMContentLoaded', () => {
  
  const url = window.location.search
  const urlSearch = new URLSearchParams(url) 
  const code = urlSearch.get('code')
  
  console.log('code', code);

  if (code){
    console.log('STEP 2: send to server');
    
    sendToServer(code)
  }
  
})


async function sendToServer(_code){
  const response = await fetch(serverHost + '/api/auth/token', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ code: _code})
  })

  if (!response.ok){
    throw new Error('Server is failing')
  }

  const data = await response.json()

  console.log('data: ', data);
  
  // next step 
}