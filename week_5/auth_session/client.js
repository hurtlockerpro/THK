const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')

const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const _username = usernameInput.value.trim()
    const _password = passwordInput.value.trim()

    // username != true
    if (!_username || !_password){
        /*
        usernameInput.style.BorderColor = 'red'
        usernameInput.style.BorderWidth = '1px'
        usernameInput.style.BorderStyle = 'solid'
        */
        usernameInput.style.border = '1px solid red'
        passwordInput.style.border = '1px solid red'
        return;
    }
    //console.log('_username', _username, '_password', _password);

    try {
        const response = await fetch('http://localhost:3001/api/login', 
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify( {
                username: _username, 
                password: _password
            })
        })
        const data = await response.json()
        console.log('success', data.success);
        console.log('username', data.username);
        console.log('sessionID', data.sessionID);

    }
    catch (error)
    {}


})
