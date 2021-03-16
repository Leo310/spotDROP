
async function logout() {
    const options = {
        method: 'POST',
    }
    const response = await fetch("/logout", options);
    window.location = "/home";
}

function getCategories(sid) {
    return fetch("/spots/" + sid + "/getcategories", {
        method: "post"
    })
    .then(response => {
        if (!response.ok)
            throw new Error('Network response was not ok');
        return response.json();
    })
    .then(categories => {       
        return categories;
    })
    .catch(err => console.log(err));
}

function getImage(sid, id) {
    fetch("/spots/" + sid + "/getimage", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "getimage": "Get SpotImage"
            })
        })
        .then(response => {
            if (!response.ok)
                throw new Error('Network response was not ok');
            return response.blob();
        })
        .then(image => {
            console.log(image);
            if (image.type.startsWith("image")) //if starts with image tahn server send a profile picture 
            {
                document.querySelector("#"+ id).src = URL.createObjectURL(image);
            } else {
                document.querySelector("#"+ id).src =
                "resources/img/spotdefault.png"; //default profile picture
            }
        })
        .catch(err => console.log(err));
}

function rateSpot(sid, title, stars, text)
{
    return fetch("/spots/" + sid + "/rate", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "title": title,
            "stars": stars.toString(),
            "text": text
        })
    })
    .then(response => {
        if (!response.ok)
            throw new Error('Network response was not ok');
        return response.json();
    })
    .then(status => {
        return status;
    })
    .catch(err => console.log(err));
}

function getRatings(sid, count = 0) {
    return fetch("/spots/" + sid + "/ratings", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "ratingcount": count.toString()
            })
        })
        .then(response => {
            if (!response.ok)
                throw new Error('Network response was not ok');
            return response.json();
        })
        .then(ratings => {
            return ratings;
        })
        .catch(err => console.log(err));
}

function getSpot(sid)
{
    return fetch("/spot/" + sid, {
        method: "post"
    })
    .then(response => {
        if (!response.ok)
            throw new Error('Network response was not ok');
        return response.json();
    })
    .then(spot => spot)
    .catch(err => console.log(err));
}

function redirectSpotView(sid)
{
    window.location = "/spot?sid=" + sid;
}

function redirectUserView(name)
{
    window.location = "/user?name=" + name;
}

function createSpots(spots, count) {
    console.log(spots)
    for(let i = 1; i <= count; i++) //index 0 is status code
    {
        $("#spotsview").append(
            $('<div>', {"class": "spot-preview", "onclick":"redirectSpotView("+ spots[i].sid+")"}).append(
                $('<img>', {"class":"previewimg", "id":"spotpreviewimg"+i, "src":"resources/img/spotdefault.png"}),
                $('<div>', {"class":"databar"}).append(
                    $('<h2>', {"text": spots[i].title}),
                    $('<h3>', {"text": spots[i].street + ", " + spots[i].zip + " " + spots[i].city}),
                    $('<p>' ,{"class":"prating", "text":"4.5"})
                ),
                $('<div>', {"class":"iconbar"}).append(
                    $('<img>', {"class":"actionbarmini1", "src":"resources/img/icons/view.png"}),
                    $('<p>', {"id":"viewcount", "text":spots[i].views}),
                    $('<img>', {"class":"actionbarmini2", "src":"resources/img/icons/fave.png"}),
                    $('<img>', {"class":"actionbarmini3", "src":"resources/img/icons/save.png"})
                )    
            )
        );
        getImage(spots[i].sid, "spotpreviewimg"+i);
    }
}

function getUserPP(username) { //gets profile picture
    return fetch("/user/" + username, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "getpp": "Get Profilepicture"
            })
        })
        .then(response => {
            if (!response.ok)
                throw new Error('Network response was not ok');
            return response.blob();
        })
        .then(image => {
            if (image.type.startsWith("image")) //if starts with image tahn server send a profile picture 
                return URL.createObjectURL(image);
            else
                return "resources/img/defaultprofile.png"; //default profile picture
        })
        .catch(err => console.log(err));
}

function getUsername() {
    return fetch("/profile", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "getloginedusername": "Get username"
            })
        })
        .then(response => {
            if (!response.ok)
                throw new Error('Network response was not ok');
            return response.json();
        })
        .then(content => {
            if (content.status == errorcodes.success) {
                console.log("Succesfully fetched Username");
                return content.username;
            } else{
                console.log(content.status);
                return content.status;
            }

        })
        .catch(err =>{
            console.log(err);
            return err;
        })
}

function isLogined() {
    return fetch("/profile", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "getloginedusername": "Get username"
            })
        })
        .then(response => {
            if (!response.ok)
                throw new Error('Network response was not ok');
            return response.json();
        })
        .then(content => {
            return content;
        })
        .catch(err =>{
            console.log(err);
            return err;
        })
}


function getPP() { //gets profile picture
    fetch("/profile", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "getpp": "Get Profilepicture"
            })
        })
        .then(response => {
            if (!response.ok)
                throw new Error('Network response was not ok');
            return response.blob();
        })
        .then(image => {
            if (image.type.startsWith("image")) //if starts with image tahn server send a profile picture 
                document.querySelector("#profilepicture").src = URL.createObjectURL(image);
            else
                document.querySelector("#profilepicture").src =
                "resources/img/defaultprofile.png"; //default profile picture
        })
        .catch(err => console.log(err));
}