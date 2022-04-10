var cardsContainer = document.querySelector('.home-blog-cards-container');

const loadMore = document.querySelector('.next-btn');

var cardsData = [];

let currentItem = 0;

window.addEventListener("DOMContentLoaded", function() {

    loadItems();
});

function showPerson(person, id) {
    const item = person;
    var card = document.createElement('div');
    card.className = 'card';
    card.id = `card-${id}`

    card.innerHTML = `<div class="profile-image">
            <img id="profile_image" src="${item.profile_image}" style="width: 8%; border-radius: 55%;margin-top: 6%; margin-left:10%;"alt="" >
            <div id="author">${item.name}</div>
            <img class="logo" src="https://img.icons8.com/fluency/48/000000/instagram-new.png"/>
            <p class="date"id="date" >${item.date}</p>
            </div>
        </div>
            <div class="card-content-container">
            <img src="${item.image}" id="image" alt=""/>

        
            <div class="card-body">
            <div class="card-body-container">
            <div class="card-body-content">
            <p id="caption">${item.caption}</p>
            </div>
            </div>
                </div>
        <div class="card-footer">
        <img class="heart" id="notClicked" src="./heart.svg" onclick="heartFun(event)">
        <div class="likes" id="likes" value="${item.likes}">${item.likes}</div>
        </div>
        </div>`;

    cardsContainer.appendChild(card)
};

loadMore.addEventListener("click", function() {
    loadItems();

});


function heartFun(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    var likesTarget = target.parentNode.querySelector('#likes');
    var likesCounter = parseInt(likesTarget.innerHTML);

    if (target.id == "notClicked") {
        likesCounter++;
        target.src = "./heartclicked.svg"
        target.id = "clicked"
        likesTarget.innerHTML = likesCounter;
    } else {
        likesCounter--;
        target.src = "./heart.svg"
        target.id = "notClicked"
        likesTarget.innerHTML = likesCounter;
    }

}

function loadItems() {
    fetch("./data.json")
        .then(response => {
            response.json().then(function(data) {

                for (var i = 0; i < 4; i++) {
                    if (currentItem > data.length - 1) break;
                    showPerson(data[currentItem], currentItem);
                    currentItem++;
                }

            })
        });
}