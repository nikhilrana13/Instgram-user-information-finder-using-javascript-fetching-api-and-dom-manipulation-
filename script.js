

const searchInput = document.getElementById("searchinput");
const searchbtn = document.getElementById("searchbtn");
const databox = document.querySelector('.databox');

async function getdata(search) {

    const url = `https://instagram-scraper-api2.p.rapidapi.com/v1/search_users?search_query=${search}`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '7c4fa6fe7emsh71e95b91cf2b31ap152661jsn4684e92fe08f',
            'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data)

        

        databox.innerHTML = '';

        if (data.data && Array.isArray(data.data.items)) {
        data.data.items.forEach(data => {
                 let newdiv = document.createElement("div")
                 newdiv.classList.add("cards")

                 newdiv.innerHTML = `
                  <h3>Full name : ${data.full_name}</h3>
                 <h3>User name : ${data.username}</h3>
                 <h3>Is private :${data.is_private}</h3>
                 <h3> Is verified : ${data.is_verified}</h3>
                 <img src="${data.profile_pic_url}" alt="image not available">
                  `
                 databox.append(newdiv)
    
    
            });
        } else{
            console.error('result is not array:',data);
        }

      
        
       
    } catch (error) {
        console.error(error);
    }
}


getdata();


searchbtn.addEventListener("click", async () => {
    let search = searchInput.value.trim();
    let result = await getdata(search);
    console.log(result);
});


