formElem.onsubmit = async(e) => {
    let now = new Date();

    e.preventDefault();

    let response = await fetch('http://localhost:3000/clicks', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            'date': now
        })
    })

    await fetch('http://localhost:3000/clicks').then((response) => {
        response.json().then((data) => {
            let liLast = document.createElement('li');
            liLast.innerHTML = data[data.length - 1].date;
            list.append(liLast);
            liLast.innerHTML = "";
            loadData();
        })
    });
}

async function loadData() {
    list.innerHTML = "";
    let response1 = await fetch('http://localhost:3000/clicks').then((response) => {
        response.json().then((data) => {
            for(let i = 0; i < data.length; i++){
                let liLast = document.createElement('li');
                liLast.innerHTML = data[i].date;
                list.append(liLast);
                let button = document.createElement('button');
                let buttonDelete = document.createElement('button');
                button.onclick = function (event) {
                    updateItem(data[i], liLast, button, buttonDelete)

                }

                buttonDelete.onclick = function (event) {
                    deleteItem(data[i], liLast, button)
                }
                button.innerHTML = "Обновить";
                buttonDelete.innerHTML = "Удалить";
                button.setAttribute("id", "update");
                buttonDelete.setAttribute("id", "delete");
                liLast.append(button);
                liLast.append(buttonDelete);
                
            }
        })
    });
}

loadData();

var updateItem = function (data, liLast, button, deleteButton) {
    let result = fetch('http://localhost:3000/clicks/' + data.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            'date': new Date()
        })
    }).then(response => response.json())
        .then(data => {
            liLast.innerHTML = data.date;
            liLast.append(button);
            liLast.append(deleteButton);
        });
}

var deleteItem = function (data, liLast, button) {
    let result = fetch('http://localhost:3000/clicks/' + data.id, {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    }).then(response => response.json())
        .then(data => {
            liLast.innerHTML = "";
        });
}