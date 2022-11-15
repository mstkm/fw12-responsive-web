if (window.location.pathname.endsWith('signin.html') || window.location.href.endsWith('/')) {
    const alertElement = document.getElementById('alert');
    const closeBtn = document.getElementById('close-btn');
    const alertLogin = document.getElementById('alert-login');
    const formLogin = document.getElementById('login-form');

    formLogin.addEventListener('submit', (event) => {
        if (event.target.email.value === 'admin@mail.com' && event.target.password.value === '1234') {
            alertElement.innerHTML = '';
            alertElement.prepend(alertLogin);
            alertElement.setAttribute('class', 'alert');
            alertLogin.innerHTML = 'Login Berhasil';
            alertElement.style.display = 'flex';
            setTimeout(() => {
                window.location = '/home-myaccount.html';
            }, 5000);
        } else {
            alertElement.innerHTML = '';
            alertElement.prepend(alertLogin);
            alertElement.append(closeBtn);
            alertElement.setAttribute('class', 'alert-warning');
            alertLogin.innerHTML = 'Login Gagal';
            closeBtn.innerHTML = 'x';
            alertElement.style.display = 'flex';
        }
        closeBtn.addEventListener('click', () => {
            alertElement.style.display = 'none';
        });
        event.preventDefault();
    });

    const icon = document.getElementById('icon');
    const password = document.getElementById('password');

    icon.addEventListener('click', () => {
        if (icon.dataset.clicked === 'false') {
            icon.innerHTML = feather.icons['eye-off'].toSvg()
            password.setAttribute('type', 'text');
            icon.dataset.clicked = 'true';
        } else {
            icon.innerHTML = feather.icons['eye'].toSvg()
            password.setAttribute('type', 'password');
            icon.dataset.clicked = 'false';
        }    
    })
} else {
    const wrapperItem = document.getElementById('wrap');
        
    const item = [
        {
            title: 'The Witches',
            picture: './assets/witches.png',
            genre: 'Adventure, Comedy, Family',
            link: 'movie-details.html'
        },
        {
            title: 'Tenet',
            picture: './assets/tenet.png',
            genre: 'Action, Sci-Fi',
            link: 'movie-details.html'
        },
        {
            title: 'Black Widow',
            picture: './assets/black widow.png',
            genre: 'Action, Adventure, Sci-Fi',
            link: 'movie-details.html'
        },
        {
            title: 'John Wick 3',
            picture: './assets/john wick 3.png',
            genre: 'Action, Crime, Thriller',
            link: 'movie-details.html'
        },
        {
            title: 'Spiderman',
            picture: './assets/spiderman.png',
            genre: 'Action, Hero, Sci-Fi',
            link: 'movie-details.html'
        },
    ];

    item.forEach((data) => {
        const card = document.createElement('div');
        card.className = 'card-image-title';

        const img = document.createElement('img');
        img.src = data.picture;
        img.alt = 'image';
        card.appendChild(img);

        const detail = document.createElement('div');
        detail.className = 'title';
        card.appendChild(detail);

        const title = document.createElement('h1');
        title.textContent = data.title;
        detail.appendChild(title);

        const genre = document.createElement('p');
        genre.textContent = data.genre;
        detail.appendChild(genre);

        const btnWrapper = document.createElement('div');
        btnWrapper.className = 'btn-details';
        detail.appendChild(btnWrapper);

        const btnDetails = document.createElement('button');
        btnDetails.textContent = 'Details';
        btnWrapper.appendChild(btnDetails);

        btnDetails.addEventListener('click', () => {
            window.location = data.link;
        })

        wrapperItem.appendChild(card);

    })
}

