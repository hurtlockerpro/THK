const loginForm = document.getElementById('loginForm')
const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')

const messageDiv = document.getElementById('message')

// profile 
const profileView = document.getElementById('profileView')
const profileUsername = document.getElementById('profileUsername')
const profileUserId = document.getElementById('profileUserId')
const profileRole = document.getElementById('profileRole')

// token
const tokenPreview = document.getElementById('tokenPreview')  
const tokenIssued = document.getElementById('tokenIssued')
const tokenExpires = document.getElementById('tokenExpires')


loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const username = usernameInput.value.trim()
    const password = passwordInput.value.trim()

    if (!username || !password) {
        messageDiv.innerText = "Enter username & password"
        messageDiv.style.display = 'block'
        messageDiv.classList.add('error')


        if (!username){
            usernameInput.style.border = '1px solid red';
            /*
            usernameInput.style.borderColor = 'red'
            usernameInput.style.borderStyle = 'solid'
            usernameInput.style.borderWidth = '1px'
            */
        }

        if (!password){
            passwordInput.classList.add('border-red')
        }

        retrun; 
    }

    try{
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        const data = await response.json()

        if (response.ok)
        {
            console.log('Login successfull')
            console.log('Your token: ' + data.token );
            //save jwt token
            saveToken(data.token)
            // get profile 
            await loadProfile()
            
        }

    } 
    catch(error)
    {
        console.log(error)
    }



})

async function loadProfile(){
    const _token = getToken()

    if (!_token){
        console.log('No token found');
        return;
    }

    try{

        const response = await fetch('/api/profile', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + _token
            }
        })

        if (response.ok){
            const data = await response.json()

            profileUsername.innerText = data.user.username
            profileUserId.innerText = data.user.id
            profileRole.innerText = data.user.role

            // token
            tokenPreview.innerText = _token
            tokenIssued.innerText = data.tokenInfo.issuedAt
            tokenExpires.innerText = data.tokenInfo.expiresAt

            // show profile block 
            profileView.classList.remove('hidden')
            loginForm.classList.add('hidden')

        }

    }
    catch(error)
    {
        console.log(error);
        
    }

}


function saveToken (token){
    localStorage.setItem('jwt_token', token)
}

function getToken(){
    return localStorage.getItem('jwt_token')
}

function removeToken(){
    localStorage.removeItem('jwt_token')
}
