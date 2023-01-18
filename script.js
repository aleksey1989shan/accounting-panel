
// база данных
let listData = [
    {
        name: 'Олег',
        surame: 'Мостин',
        lastname: 'Иванович',
        age: '2005-07-19',
        startDate: '2000',
        hobby: 'Игры',

    },
    {
        name: 'Виталий',
        surame: 'Константинович',
        lastname: 'Дроздов',
        age: '1990-09-01',
        startDate: '2001',
        hobby: 'Коктейли',
    },
    {
        name: 'Алексей',
        surame: 'Анатольевич',
        lastname: 'Демченко',
        age: '1987-05-27',
        startDate: '2002',
        hobby: 'Радиоэлектроника',
    },
    {
        name: 'Алексей',
        surame: 'Юрьевич',
        lastname: 'Шанин',
        age: '1989-02-10',
        startDate: '2003',
        hobby: 'Фрнтенд разработка',
    },
    {
        name: 'Оля',
        surame: 'Ивановна',
        lastname: 'Воронина',
        age: '1988-09-01',
        startDate: '2004',
        hobby: 'Танцы',
    },
];



let data = new Date().getDate() + '-' + new Date().getMonth() + 1 + '-' + new Date().getFullYear();

let sortColumnFlsg = 'fio',
    sortDirFlag = true

//  создание элементов

// форма

const $addForm = document.getElementById('add-form');
const $inputName = document.getElementById('add-form__name-inp');
const $inputSurname = document.getElementById('add-form__surname-inp');
const $inputLastname = document.getElementById('add-form__lastname-inp');
const $inputAge = document.getElementById('add-form__age-inp');
const $startDate = document.getElementById('add-form__startDate-inp');
const $inputHobby = document.getElementById('add-form__hobby-inp');
// const $formButton = document.getElementById('button');


// кнопки для сотировки
// const $sortFIOBtn = document.getElementById('sort__fio');
const $sortAgeBtn = document.getElementById('sort__age');


// таблица
const $app = document.getElementById('app');
const $table = document.createElement('table');
const $tableHead = document.createElement('thead');
const $tableBody = document.createElement('tbody');

// фильтрация
const $filterForm = document.getElementById('filter-form');
const $fioFilterInp = document.getElementById('filter-form__fio-inp');
const $hobbyFilterInp = document.getElementById('filter-form__hobby-inp');
const $startFilterInp = document.getElementById('filter-form__start-inp');
const $finishFilterInp = document.getElementById('filter-form__finish-inp');

const $tableHeadTr = document.createElement('tr');
const $tableHeadThFIO = document.createElement('th');
const $tableHeadThAge = document.createElement('th');
const $tableHeadThBirthYear = document.createElement('th');
const $tableHeadThHobby = document.createElement('th');

$table.classList.add('table', 'table-dark', 'table-hover')

// кнопка ФИО
const $btnFIO = document.createElement('button');
$btnFIO.classList.add('btnSort')
$btnFIO.textContent = 'ФИО'
$tableHeadThFIO.style.padding = '0px'
$tableHeadThFIO.append($btnFIO)

// кнопка факультет
const $btnHobby = document.createElement('button');
$btnHobby.classList.add('btnSort')
$btnHobby.textContent = 'Факультет'
$tableHeadThHobby.style.padding = '0px'
$tableHeadThHobby.append($btnHobby)

// кнопка Годы обучения и номер курса
const $btnStartDate = document.createElement('button');
$btnStartDate.classList.add('btnSort')
$btnStartDate.textContent = 'Годы обучения и номер курса'
$tableHeadThBirthYear.style.padding = '0px'
$tableHeadThBirthYear.append($btnStartDate)

// кнопка Дата рождения и возраст
const $btnAge = document.createElement('button');
$btnAge.classList.add('btnSort')
$btnAge.textContent = 'Дата рождения и возраст'
$tableHeadThAge.style.padding = '0px'
$tableHeadThAge.append($btnAge)








$tableHeadTr.append($tableHeadThFIO)
$tableHeadTr.append($tableHeadThAge)
$tableHeadTr.append($tableHeadThBirthYear)
$tableHeadTr.append($tableHeadThHobby)

$tableHead.append($tableHeadTr)
$table.append($tableHead)
$table.append($tableBody)
$app.append($table)



function createUserTr(oneUser) {
    const $userTr = document.createElement('tr');
    const $userFIO = document.createElement('th');
    const $userAge = document.createElement('th');
    const $userBirthYear = document.createElement('th');
    const $userHobby = document.createElement('th');

    $userFIO.textContent = oneUser.fio
    $userAge.textContent = `${oneUser.age} (${data.substr(6, 4) - oneUser.age.substr(0, 4)} лет)`
    $userBirthYear.textContent = oneUser.BirthYear
    $userHobby.textContent = oneUser.hobby

    $userTr.append($userFIO)
    $userTr.append($userAge)
    $userTr.append($userBirthYear)
    $userTr.append($userHobby)

    // возвращаем созданый $userTr
    return $userTr
}

// Фильтрация
// arr массив который фильтруем, prop свойство по которому фильтрую(мой массив), value значение(которое ввели в инпут)
// вызываю ф с аргументами. Возвращаю массив отфильтрованый ф.filter. в oneUser на каждой итеррации
// подставляется элемент массива. если искомом свойстве(prop) есть значение value то возвращаем
// true и ф. записывает объект в массив и выводит на экран
function filter(arr, prop, value) {
    return arr.filter(function (oneUser) {
        if (oneUser[prop].includes(value.trim())) return true
    });
}


function render(arrData) {
    // рендер
    $tableBody.innerHTML = '';
    // подготовка

    // делаю копию массива
    let copyListData = [...arrData];
    for (const oneUser of copyListData) {
        // создаю новый элемент fio в каждом элементе нового массива
        oneUser.fio = oneUser.name + ' ' + oneUser.surame + ' ' + oneUser.lastname;
        oneUser.BirthYear = '';

        function course() {
            if (new Date().getFullYear() + 1 - oneUser.startDate > 4) {
                oneUser.BirthYear = `${ oneUser.startDate } - ${ parseInt(oneUser.startDate) + 4 } (закончил)`
            } else {
                oneUser.BirthYear = `${oneUser.startDate}-${parseInt(oneUser.startDate) + 4}  (${new Date().getFullYear() + 1 - oneUser.startDate} курс)`
            }
        }
        course();
    }

    console.log(copyListData);

    // сортировка
    copyListData = copyListData.sort(function (a, b) {
        // обращаюсь к элементу массива по значению в переменной которое установил при клике на кнопки
        let sort = a[sortColumnFlsg] < b[sortColumnFlsg]
        // меняю условие при другом булевом значении переменной
        if (sortDirFlag == false) sort = a[sortColumnFlsg] > b[sortColumnFlsg]
        if (sort) return -1
    })

    // фильтрация

    if ($fioFilterInp.value.trim() !== "") {
        copyListData = filter(copyListData, 'fio', $fioFilterInp.value)
        /*  ЭТОТ КОД УПАКОВАН В ФУНКЦИЮ function filter(arr, prop, value)
    filter вызывает функцию на каждом цикле. каждый раз в oneUser помещается элемент массива.
    далее я обращаюсь к элементу массива name и сравниваю. если выражение вернёт true то
    помещаем элемент в массив, после чего он выводится на экран. 
        copyListData = copyListData.filter(function (oneUser) {
            if (oneUser.fio.includes($fioFilterInp.value.trim())) return true
    }); */
    }

    if ($hobbyFilterInp.value.trim() !== "") {
        copyListData = filter(copyListData, 'hobby', $hobbyFilterInp.value)
    }

    if ($startFilterInp.value.trim() !== "") {
        copyListData = filter(copyListData, 'startDate', $startFilterInp.value)
    }

    if ($finishFilterInp.value.trim() !== "") {
        copyListData = filter(copyListData, 'startDate', String($finishFilterInp.value - 4))
    }
    // отрисовка
    for (const oneUser of copyListData) {
        // при каждом повторении цикла пользователь(oneUser) передаётся в эту функцию. Функция создаёт $userTr, возвращает его
        // и помещает в константу newTr
        const $newTr = createUserTr(oneUser)
        // добавляем созданый элемент в tableBody
        $tableBody.append($newTr)
    }
};

render(listData);

// добавление
// добавляю действие при событии submit
$addForm.addEventListener('submit', function (event) {
    // отменяю стандартное действие формы, перезагрузку при отправке
    event.preventDefault();

    // валидация 
    if ($inputName.value.trim() == '') {
        alert('имя не введено')
        // return остановит действие функции и код дальше выполнятся не бкдет
        return
    }

    if ($inputSurname.value.trim() == '') {
        alert('Отчество не введено')
        return
    }

    if ($inputLastname.value.trim() == '') {
        alert('фамилия не введена')
        return
    }

    if ($inputAge.value < '1900-01-01' || $inputAge.value > data) {
        alert('не правильно введён возраст')
        return
    }

    if ($startDate.value < '2000-01-01' || $startDate.value > data) {
        alert('не правильно введён год начала обучения')
        return
    }

    if ($inputHobby.value.trim() == '') {
        alert('не введено название факультета')
        return
    }





    listData.push({
        // .trim() уберёт все пробелы слва и справа
        name: $inputName.value.trim(),
        surame: $inputSurname.value.trim(),
        lastname: $inputLastname.value.trim(),
        age: $inputAge.value.trim(),
        hobby: $inputHobby.value.trim(),
        startDate: $startDate.value.trim(),
    });
    render(listData);
});


// сортировка события кнопок

$btnFIO.addEventListener('click', function () {
    // меняю значение в переменной и запускаю функцию с новыми значениями
    sortColumnFlsg = 'fio'
    // меняю значение на противоположное
    sortDirFlag = !sortDirFlag
    render(listData);
})

$btnHobby.addEventListener('click', function () {
    sortColumnFlsg = 'hobby'
    sortDirFlag = !sortDirFlag
    render(listData);
})

$btnStartDate.addEventListener('click', function () {
    sortColumnFlsg = 'startDate'
    sortDirFlag = !sortDirFlag
    render(listData);
})

$btnAge.addEventListener('click', function () {
    sortColumnFlsg = 'age'
    sortDirFlag = !sortDirFlag
    render(listData);
})


// фильтр
$filterForm.addEventListener('submit', function (event) {
    event.preventDefault();
})

$fioFilterInp.addEventListener('input', function () {
    render(listData);
})

$hobbyFilterInp.addEventListener('input', function () {
    render(listData);
})

$startFilterInp.addEventListener('input', function () {
    render(listData);
})

$finishFilterInp.addEventListener('input', function () {
    render(listData);
})








// конец  console.log();


// 