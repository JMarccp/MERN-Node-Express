var getButton = document.getElementById('user_form');
getButton.addEventListener('submit', getRequest);

function getRequest(event) {
    event.preventDefault();
    var noteId = event.target.noteIdS.value;
    const URL = `/notes/${noteId}`;
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log('noteIduu: ', noteId);
            if (!noteId){
                document.getElementById("results").innerHTML = "";
                for(var i in data) {
                    console.log(data[i]);
                    document.getElementById("results").innerHTML += "Id: " + data[i]._id + " ---- Title: " + data[i].noteTitle + ", Body: " + data[i].noteBody + '<br />'
                }
            } else {
                console.log('noteId: ', noteId);
                document.getElementById("results").innerHTML = "";
                document.getElementById("results").innerHTML += "Id: " + data._id + " ---- Title: " + data.noteTitle + ", Body: " + data.noteBody + '<br />'
            }

        })
        document.getElementById("noteIdS").value = "";
}

var postButton = document.getElementById('user_form_post');
postButton.addEventListener('submit', newPost);

function newPost(event, post) {
    event.preventDefault();
    var noteTitle = event.target.noteTitle.value;
    var noteBody = event.target.noteBody.value;
    
    document.getElementById("noteInput").value = "";
    document.getElementById("bodyInput").value = "";
    document.getElementById("results").innerHTML = "";
    post = {
        noteTitle: noteTitle,
        noteBody: noteBody
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    return fetch('/notes', options)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        var obj = document.getElementById("getButton");
        obj.click();
    })
}

var deleteButton = document.getElementById('user_form_delete');
deleteButton.addEventListener('submit', deletePost);

function deletePost(event) {
    event.preventDefault();
    var noteId = event.target.noteIdDel.value;
    console.log('note: ', noteId);
    const options = {
        method: 'DELETE',
        headers: new Headers({
            'Content-type': 'application/json'
        }),
        body: JSON.stringify({
            movieId: noteId
        })
    }
    const URL = `/notes/${noteId}`;
    fetch(URL, options)
    .then(response => response.json())
    .then(data => {
        document.getElementById("noteIdDel").value = "";
        document.getElementById("results").innerHTML = "";
        console.log('note to delete: ', data);
        var obj = document.getElementById("getButton");
        obj.click();
    })
}


var putButton = document.getElementById('user_form_put');
putButton.addEventListener('submit', putPost);

function putPost(event) {
    event.preventDefault();
    var noteId = event.target.noteIdUp.value;
    var noteTitle = event.target.updateTitle.value;
    var noteContent = event.target.updateBody.value;

    document.getElementById("updateTitle").value = "";
    document.getElementById("updateBody").value = "";
    document.getElementById("noteIdUp").value = "";
    document.getElementById("results").innerHTML = "";

    post = {
        noteTitle: noteTitle,
        noteBody: noteContent
    }
    const options = {
        method: 'PATCH',
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    const URL = `/notes/${noteId}`;

    return fetch(URL, options)
    .then(response => response.json())
    .then(data => {
        console.log('note to update: ', data);
        var obj = document.getElementById("getButton");
        obj.click();
    })

}