
document.addEventListener('DOMContentLoaded', function () {

    function start() {

        const card = document.querySelectorAll('.card')
        const number = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8,];
        const text = document.querySelectorAll('.text')
        const numCard = [null, null, null];
        const arrayIndex = [];
        const id = [];

        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }
        shuffle(number);

        console.log(shuffle);

        for (let i of card) {
            i.addEventListener('click', () => {
                i.classList.add('open')
                numCard.unshift(i.textContent)
                arrayIndex.push(i)
                console.log(arrayIndex);
                let ostatok = arrayIndex.length % 2

                id.unshift(i.id)
                console.log(id);

                if (numCard[-1] != numCard[1] && numCard[1] != null && ostatok == 1) {
                    arrayIndex[arrayIndex.length - 2].classList.remove('open');
                    arrayIndex[arrayIndex.length - 3].classList.remove('open');
                }

                let openCard = document.querySelectorAll('.open');

                if (numCard[0] == numCard[1] && ostatok == 0 && id[1] != id[0]) {

                    for (let i of openCard) {
                        i.classList.add('closed')
                    }
                }

                let arr = [];
                let kolvo = document.querySelectorAll('.closed')

                for (let i of kolvo) {
                    arr.push(i);
                }
                if (arr.length == 16) {
                    setTimeout(say, 300);
                }
            });
        }

        for (let i = 0; i < 16; i++) {
            text[i].textContent = number[i]
        }

        function say() {
            for (let i of card) {
                i.classList.remove('open');
                i.classList.remove('closed');
            }
            alert('Сыграть ещё раз');
            setTimeout(start, 1000);
        }
    } start();

});


// конец    console.log();