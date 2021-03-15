
async function logout() {
    const options = {
        method: 'POST',
    }
    const response = await fetch("/logout", options);
    window.location = "/index";
}


function getImage(sid, id) {
    fetch("/spots/" + sid + "/image", {
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
            if (image.type.startsWith("image")) //if starts with image tahn server send a profile picture 
            {
                document.querySelector("#spotpreviewimg" + id).src = URL.createObjectURL(image);
            } else {
                document.querySelector("#spotpreviewimg" + id).src =
                "resources/img/spotdefault.png"; //default profile picture
            }
        })
        .catch(err => console.log(err));
}

function createSpots(spots, count) {
    for(let i = 1; i <= count; i++) //index 0 is status code
    {
        console.log(spots[i]);
        $("#spotsview").append(
            $('<div>', {"class": "spot-preview"}).append(
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
        console.log(spots[i].sid);
        getImage(spots[i].sid, i);
    }
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