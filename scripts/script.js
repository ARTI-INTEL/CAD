window.onload = () => {
    checkLoginStatus();
    // Check if user is logged in
    if (localStorage.getItem('loggedIn')) {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

        if (!accessToken) {
            return (document.getElementById('login').style.display = 'block');
        }

        // Get user info
        fetch('https://discord.com/api/users/@me', {
            headers: { authorization: `${tokenType} ${accessToken}` }
        })
        .then(res => res.json())
        .then(user => {
            document.getElementById('welcome').innerText =
                `Welcome, ${user.username} (ID: ${user.id}) to Ultimate CAD!`;
                localStorage.setItem('discordID', user.id);

            // Get guilds list
            // return fetch('https://discord.com/api/users/@me/guilds', {
            //     headers: { authorization: `${tokenType} ${accessToken}` }
            // });
        })
        // .then(res => res.json())
        // .then(guilds => {
        //     const guildList = document.createElement('ul');
        //     guilds.forEach(g => {
        //         const li = document.createElement('li');
        //         li.textContent = `${g.name} (ID: ${g.id})`;
        //         guildList.appendChild(li);
        //     });
        //     document.body.appendChild(guildList);
        // })
        // .catch(console.error);
    }
};

function discordLogin() {
    // Replace this with your actual Discord OAuth URL
    window.location.href = "https://discord.com/oauth2/authorize?client_id=1403334739724861563&response_type=token&redirect_uri=http%3A%2F%2F127.0.0.1%3A5500%2Findex.html&scope=identify+guilds";
}

function checkLoginStatus() {
    // Check if user is logged in
    if (localStorage.getItem('discordID')) {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('servers-page').classList.remove('hidden');
        localStorage.setItem('loggedIn', true);
    } else {
        localStorage.setItem('loggedIn', false);
        document.getElementById('login-page').classList.remove('hidden');
        document.getElementById('servers-page').classList.add('hidden');
    }
}

function logOut() {
    // Clear local storage and redirect to login page
    localStorage.removeItem('discordID');
    localStorage.removeItem('loggedIn');
    document.getElementById('login-page').classList.remove('hidden');
    document.getElementById('servers-page').classList.add('hidden');
}

function refresh() {
    `Welcome, ${user.username} (ID: ${user.id}) to Ultimate CAD!`
}