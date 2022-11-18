// // Script Sign In Page //
if (window.location.pathname.endsWith('signin.html')) {
    // Mengakses elemen untuk memunculkan alert
    const alertElement = document.getElementById('alert');
    const closeBtn = document.getElementById('close-btn');
    const alertLogin = document.getElementById('alert-login');
    const formLogin = document.getElementById('login-form');

    // Memberikan event saat form di-submit
    formLogin.addEventListener('submit', (event) => {
        // Validasi email dan password
        if (event.target.email.value === 'admin@mail.com' && event.target.password.value === '1234') {
            alertElement.innerText = '';
            alertElement.prepend(alertLogin);
            alertElement.setAttribute('class', 'alert');
            alertLogin.innerText = 'Login Berhasil';
            alertElement.style.display = 'flex';
            setTimeout(() => { 
                window.location = '/home-myaccount.html';
            }, 5000);
        } else {
            alertElement.innerText = '';
            alertElement.prepend(alertLogin);
            alertElement.append(closeBtn);
            alertElement.setAttribute('class', 'alert-warning');
            alertLogin.innerText = 'Login Gagal';
            closeBtn.innerText = 'x';
            alertElement.style.display = 'flex';
        }
        // Memberikan event pada tombol x saat di klik maka alert hilang
        closeBtn.addEventListener('click', () => {
            alertElement.style.display = 'none';
        });
        event.preventDefault(); // Untuk mencegah aksi default saat form di-submit
    });

    // Mengakses untuk mengubah icon
    const icon = document.getElementById('icon');
    const password = document.getElementById('password');

    // Memberikan event saat icon di-klik maka icon dan type input akan berubah
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
} 


// // Script Home Page dan Movie Details // //
const dataEndPoint = [
    'https://www.omdbapi.com/?t=tenet&plot=full&apikey=254f0379',
    'https://www.omdbapi.com/?t=black+adam&plot=full&apikey=254f0379',
    'https://www.omdbapi.com/?t=black+panther+wakanda+forever&plot=full&apikey=254f0379',
    'http://www.omdbapi.com/?t=john+wick+chapter+3&plot=full&apikey=254f0379',
    'http://www.omdbapi.com/?t=enola+holmes+2&plot=full&apikey=254f0379',
    'https://www.omdbapi.com/?t=satria+dewa&plot=full&apikey=254f0379',
    'https://omdbapi.com/?t=hansan&plot=full&apikey=254f0379',
    'https://www.omdbapi.com/?t=fistful+of+vengeance&plot=full&apikey=254f0379'
];

// // Script Home Page // //
if (window.location.href.endsWith('home.html') || window.location.href.endsWith('home-myaccount.html') || window.location.href === 
"https://roaring-seahorse-f3d962.netlify.app/") {

    dataEndPoint.forEach(movie => {
    // Fetching end point
    const fetchEndPoint = fetch(movie);
    
    // Buat fungsi untuk akses data
    const getData = async () => {
        const response = await fetchEndPoint;
        const data = await response.json();
        // console.log(data);
        const {Poster, Title, Genre, imdbID} = data;

        // Membuat elemen baru
        const card = document.createElement('div');
        card.className = 'card-image-title';

        const img = document.createElement('img');
        img.src = Poster;
        img.alt = 'image';
        card.appendChild(img);

        const detail = document.createElement('div');
        detail.className = 'title';
        card.appendChild(detail);

        const title = document.createElement('h1');
        title.textContent = Title;
        detail.appendChild(title);

        const genre = document.createElement('p');
        genre.textContent = Genre;
        detail.appendChild(genre);

        const btnWrapper = document.createElement('div');
        btnWrapper.className = 'btn-details';
        detail.appendChild(btnWrapper);

        const btnDetails = document.createElement('button');
        btnDetails.textContent = 'Details';
        btnDetails.className = 'btn-to-details';
        btnDetails.setAttribute('data-imdbid', `${imdbID}`);
        btnWrapper.appendChild(btnDetails);
        
        console.log(movie);
        btnDetails.addEventListener('click', () => {        
            window.location = 'movie-details.html?content='+imdbID;
        })

        // Mengakses parent elemen untuk elemen baru
        const wrapperItem = document.getElementById('wrap');

        // Menempatkan elemen baru ke dalam parent elemen
        wrapperItem.appendChild(card); 
        }
        getData();
})
};


// // Script Movie Details Page // //
if (window.location.href.includes('movie-details.html')) {
    
    // Query String
    const queryString = new URLSearchParams(window.location.search);
    const qsObject = Object.fromEntries(queryString);

    const movieDetails = document.getElementById('movie-details');
    const text = '';
    movieDetails.textContent = qsObject.text;
    
   
    // Membuat Elemen Baru
    // Poster 
    const wrapPoster = document.createElement('div');
    const frame = document.createElement('div');
    frame.className = 'desc-banner';
    const poster = document.createElement('img');
    poster.setAttribute('id', 'gambar');
    poster.alt = 'image';
    frame.appendChild(poster);
    wrapPoster.appendChild(frame);
    movieDetails.appendChild(wrapPoster);

    // Wrapper Description  
    const wrapDescription = document.createElement('div');
    wrapDescription.className = 'desc-details';

    // Judul dan Genre
    const wrapTitleGenre = document.createElement('div');
    wrapTitleGenre.className = 'desc-details-title';
    const titleH1 = document.createElement('h1');
    titleH1.setAttribute('id', 'judul');
    const genreH2 = document.createElement('h2');
    genreH2.setAttribute('id', 'genre');
    wrapTitleGenre.appendChild(titleH1);
    wrapTitleGenre.appendChild(genreH2);
    wrapDescription.appendChild(wrapTitleGenre);

    // Wrapper Info Item
    const wrapInfo = document.createElement('div');
    wrapInfo.className = 'desc-flex-col';

    // Info Item A
    const wrapInfoItemA = document.createElement('div');
    wrapInfoItemA.className = 'desc-flec-row';
    
    // Info Release Date
    const infoItem1 = document.createElement('div');
    infoItem1.className = 'desc-flex-item1';
    const itemRelease = document.createElement('p');
    itemRelease.className = 'grey';
    itemRelease.innerText = 'Release date';
    const itemReleaseContent = document.createElement('p');
    itemReleaseContent.setAttribute('id', 'released');
    itemReleaseContent.className = 'black';
    infoItem1.appendChild(itemRelease);
    infoItem1.appendChild(itemReleaseContent);
    wrapInfoItemA.appendChild(infoItem1);

    // Info Director
    const infoItem2 = document.createElement('div');
    infoItem2.className = 'desc-flex-item2';
    const itemDirector = document.createElement('p');
    itemDirector.className = 'grey';
    itemDirector.innerText = 'Directed by';
    const itemDirectorContent = document.createElement('p');
    itemDirectorContent.setAttribute('id', 'director');
    itemDirectorContent.className = 'black';
    infoItem2.appendChild(itemDirector);
    infoItem2.appendChild(itemDirectorContent);
    wrapInfoItemA.appendChild(infoItem2);

    // Info Item B
    const wrapInfoItemB = document.createElement('div');
    wrapInfoItemB.className = 'desc-flec-row';

    // Info Durasi
    const infoItem3 = document.createElement('div');
    infoItem3.className = 'desc-flex-item1';
    const itemDuration = document.createElement('p');
    itemDuration.className = 'grey';
    itemDuration.innerText = 'Duration';
    const itemDurationContent = document.createElement('p');
    itemDurationContent.setAttribute('id', 'runtime');
    itemDurationContent.className = 'black';
    infoItem3.appendChild(itemDuration);
    infoItem3.appendChild(itemDurationContent);
    wrapInfoItemB.appendChild(infoItem3);
    
    // Info Casts
    const infoItem4 = document.createElement('div');
    infoItem4.className = 'desc-flex-item2';
    const itemCasts = document.createElement('p');
    itemCasts.className = 'grey';
    itemCasts.innerText = 'Casts';
    const itemCastsContent = document.createElement('p');
    itemCastsContent.setAttribute('id', 'actors');
    itemCastsContent.className = 'black';
    infoItem4.appendChild(itemCasts);
    infoItem4.appendChild(itemCastsContent);
    wrapInfoItemB.appendChild(infoItem4);
    
    wrapInfo.appendChild(wrapInfoItemA);
    wrapInfo.appendChild(wrapInfoItemB);

    // Synopsis
    const synopsis = document.createElement('div');
    synopsis.className = 'desc-synopsis';
    const synopsisH3 = document.createElement('h3');
    synopsisH3.innerText = 'Synopsis';
    const synopsisP = document.createElement('p');
    synopsisP.setAttribute('id', 'plot');
    synopsis.appendChild(synopsisH3);
    synopsis.appendChild(synopsisP);

    // Menyusun elemen ke dalam parent
    wrapDescription.appendChild(wrapInfo);
    wrapDescription.appendChild(synopsis);
    movieDetails.appendChild(wrapDescription);

    // Fetching data berdasarkan id (value content saat tombol details diklik)
    const movieId = qsObject.content;
    const endPointById = 'https://www.omdbapi.com/?i=' + movieId + '&plot=full&apikey=254f0379';
    const fetcById = fetch(endPointById);
    const getDataById = async () => {
        const responseById = await fetcById;
        const dataById = await responseById.json();
        const {Poster, Title, Genre, Released, Runtime, Director, Actors, Plot} = dataById;

        // Mengakses elemen
        const gambar = document.getElementById('gambar');
        const judul = document.getElementById('judul');
        const genre = document.getElementById('genre');
        const released = document.getElementById('released');
        const runtime = document.getElementById('runtime');
        const director = document.getElementById('director');
        const actors = document.getElementById('actors');
        const plot = document.getElementById('plot');

        // Manipulasi elemen
        gambar.src = Poster;
        judul.innerText = Title;
        genre.innerText = Genre;
        released.innerText = Released;
        runtime.innerText = Runtime;
        director.innerText = Director;
        actors.innerText = Actors;
        plot.innerText = Plot;   

    }
    getDataById();

};
