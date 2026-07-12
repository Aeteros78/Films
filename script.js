// 1. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
var myChart = null;

var database = {
    anime: {
        title: "Аниме",
        img: "img/anime.webp",
        data: [
            { name: "Наруто", eps: 220, dur: 24, rate: 8.5, plot: "История о ниндзя..." },
            { name: "Ван Пис", eps: 1000, dur: 22, rate: 9.0, plot: "Приключения..." }
        ]
    },
    films: {
        title: "Фильмы",
        img: "img/films.jpg",
        data: [
            { name: "Начало", eps: 1, dur: 148, rate: 8.8, plot: "Сны..." },
            { name: "Мусор", eps: 1, dur: 90, rate: 4.0, plot: "Пусто..." }
        ]
    },
    series: {
        title: "Сериалы",
        img: "img/serials.jpg",
        data: [
            { name: "Во все тяжкие", eps: 62, dur: 47, rate: 9.5, plot: "Химия..." }
        ]
    },
    shows: {
        title: "Шоу",
        img: "img/shows.webp",
        data: [
            { name: "Голос", eps: 10, dur: 60, rate: 7.0, plot: "Музыка..." }
        ]
    },
    letsplays: {
        title: "Летсплеи",
        img: "img/kuplinov.jpg",
        data: [
            { name: "Minecraft", eps: 50, dur: 30, rate: 8.0, plot: "Выживание..." }
        ]
    }
};

// РУЧНОЙ СПИСОК ВСЕХ АЧИВОК (Цвета и формы ПЕРЕМЕШАНЫ вручную для каждой категории)
var achievementSets = {
    global: [
        { m: 10,    name: "Старт",      shape: "shape-circle",   color: "color-1" },
        { m: 25,    name: "Зритель",    shape: "shape-diamond",  color: "color-2" },
        { m: 50,    name: "Любитель",  shape: "shape-hexagon",  color: "color-3" },
        { m: 100,   name: "Фанат",     shape: "shape-circle",   color: "color-4" },
        { m: 250,   name: "Знаток",    shape: "shape-diamond",  color: "color-1" },
        { m: 500,   name: "Мастер",    shape: "shape-hexagon",  color: "color-2" },
        { m: 1000,  name: "Эксперт",   shape: "shape-circle",   color: "color-3" },
        { m: 2500,  name: "Гурман",    shape: "shape-diamond",  color: "color-4" },
        { m: 5000,  name: "Гений",     shape: "shape-hexagon",  color: "color-1" },
        { m: 10000, name: "Легенда",   shape: "shape-circle",   color: "color-2" },
        { m: 25000, name: "Титан",     shape: "shape-diamond",  color: "color-3" },
        { m: 50000, name: "Бог",       shape: "shape-hexagon",  color: "color-4" },
        { m: 100000,name: "Миф",       shape: "shape-circle",   color: "color-1" },
        { m: 250000,name: "Эпоха",     shape: "shape-diamond",  color: "color-2" },
        { m: 500000,name: "Вечность",  shape: "shape-hexagon",  color: "color-3" },
        { m: 1000000,name: "Абсолют", shape: "shape-circle",   color: "color-4" }
    ],
    anime: [
        { m: 10,    name: "Отаку I",   shape: "shape-hexagon",  color: "color-3" },
        { m: 25,    name: "Отаку II",  shape: "shape-circle",   color: "color-1" },
        { m: 50,    name: "Сенпай",    shape: "shape-diamond",  color: "color-4" },
        { m: 100,   name: "Ками",      shape: "shape-hexagon",  color: "color-2" },
        { m: 250,   name: "Ниндзя",    shape: "shape-circle",   color: "color-3" },
        { m: 500,   name: "Шиноби",    shape: "shape-diamond",  color: "color-1" },
        { m: 1000,  name: "Хикари",    shape: "shape-hexagon",  color: "color-4" },
        { m: 2500,  name: "Аниме-Бог", shape: "shape-circle",   color: "color-2" },
        { m: 5000,  name: "Тайтл",     shape: "shape-diamond",  color: "color-3" },
        { m: 10000, name: "Мастер",    shape: "shape-hexagon",  color: "color-1" },
        { m: 25000, name: "Легенда",   shape: "shape-circle",   color: "color-4" },
        { m: 50000, name: "Олимп",    shape: "shape-diamond",  color: "color-2" },
        { m: 100000,name: "Миф",       shape: "shape-hexagon",  color: "color-3" },
        { m: 250000,name: "Вечность",  shape: "shape-circle",   color: "color-1" },
        { m: 500000,name: "Бессмертный",shape: "shape-diamond",  color: "color-4" },
        { m: 1000000,name: "Абсолют",  shape: "shape-hexagon",  color: "color-2" }
    ],
    films: [
        { m: 10,    name: "Киноман I", shape: "shape-diamond",  color: "color-4" },
        { m: 25,    name: "Киноман II",shape: "shape-circle",   color: "color-1" },
        { m: 50,    name: "Критик",    shape: "shape-hexagon",  color: "color-2" },
        { m: 100,   name: "Режиссер",  shape: "shape-diamond",  color: "color-3" },
        { m: 250,   name: "Актер",     shape: "shape-circle",   color: "color-4" },
        { m: 500,   name: "Голливуд",  shape: "shape-hexagon",  color: "color-1" },
        { m: 1000,  name: "Звезда",    shape: "shape-diamond",  color: "color-2" },
        { m: 2500,  name: "Оскар",     shape: "shape-circle",   color: "color-3" },
        { m: 5000,  name: "Легенда",   shape: "shape-hexagon",  color: "color-4" },
        { m: 10000, name: "Мастер",    shape: "shape-diamond",  color: "color-1" },
        { m: 25000, name: "Титан",     shape: "shape-circle",   color: "color-2" },
        { m: 50000, name: "Бог",       shape: "shape-hexagon",  color: "color-3" },
        { m: 100000,name: "Миф",       shape: "shape-diamond",  color: "color-4" },
        { m: 250000,name: "Эпоха",     shape: "shape-circle",   color: "color-1" },
        { m: 500000,name: "Вечность",  shape: "shape-hexagon",  color: "color-2" },
        { m: 1000000,name: "Абсолют",  shape: "shape-diamond",  color: "color-3" }
    ],
    series: [
        { m: 10,    name: "Серийный I",shape: "shape-hexagon",  color: "color-2" },
        { m: 25,    name: "Серийный II",shape: "shape-circle",   color: "color-4" },
        { m: 50,    name: "Марафонец", shape: "shape-diamond",  color: "color-1" },
        { m: 100,   name: "Binge",     shape: "shape-hexagon",  color: "color-3" },
        { m: 250,   name: "Эксперт",   shape: "shape-circle",   color: "color-2" },
        { m: 500,   name: "Мастер",   shape: "shape-diamond",  color: "color-4" },
        { m: 1000,  name: "Легенда",   shape: "shape-hexagon",  color: "color-1" },
        { m: 2500,  name: "Титан",     shape: "shape-circle",   color: "color-3" },
        { m: 5000,  name: "Бог",       shape: "shape-diamond",  color: "color-2" },
        { m: 10000, name: "Миф",       shape: "shape-hexagon",  color: "color-4" },
        { m: 25000, name: "Эпоха",     shape: "shape-circle",   color: "color-1" },
        { m: 50000, name: "Вечность",  shape: "shape-diamond",  color: "color-3" },
        { m: 100000,name: "Абсолют",   shape: "shape-hexagon",  color: "color-2" },
        { m: 250000,name: "Бессмертный",shape: "shape-circle",   color: "color-4" },
        { m: 500000,name: "Олимп",     shape: "shape-diamond",  color: "color-1" },
        { m: 1000000,name: "Вселенная",shape: "shape-hexagon",  color: "color-3" }
    ],
    shows: [
        { m: 10,    name: "Зритель I",  shape: "shape-diamond",  color: "color-2" },
        { m: 25,    name: "Зритель II",shape: "shape-hexagon",  color: "color-4" },
        { m: 50,    name: "Шоумен",   shape: "shape-circle",   color: "color-1" },
        { m: 100,   name: "Звезда",   shape: "shape-diamond",  color: "color-3" },
        { m: 250,   name: "Мастер",   shape: "shape-hexagon",  color: "color-4" },
        { m: 500,   name: "Титан",    shape: "shape-circle",   color: "color-2" },
        { m: 1000,  name: "Легенда",   shape: "shape-diamond",  color: "color-1" },
        { m: 2500,  name: "Бог",       shape: "shape-hexagon",  color: "color-3" },
        { m: 5000,  name: "Миф",       shape: "shape-circle",   color: "color-4" },
        { m: 10000, name: "Эпоха",     shape: "shape-diamond",  color: "color-2" },
        { m: 25000, name: "Вечность",  shape: "shape-hexagon",  color: "color-1" },
        { m: 50000, name: "Абсолют",   shape: "shape-circle",   color: "color-3" },
        { m: 100000,name: "Бессмертный",shape: "shape-diamond",  color: "color-4" },
        { m: 250000,name: "Олимп",     shape: "shape-hexagon",  color: "color-1" },
        { m: 500000,name: "Вселенная", shape: "shape-circle",   color: "color-2" },
        { m: 1000000,name: "Божество", shape: "shape-diamond",  color: "color-3" }
    ],
    letsplays: [
        { m: 10,    name: "Геймер I",  shape: "shape-hexagon",  color: "color-4" },
        { m: 25,    name: "Геймер II",shape: "shape-circle",   color: "color-1" },
        { m: 50,    name: "Стример",   shape: "shape-diamond",  color: "color-2" },
        { m: 100,   name: "Профи",    shape: "shape-hexagon",  color: "color-3" },
        { m: 250,   name: "Мастер",   shape: "shape-circle",   color: "color-4" },
        { m: 500,   name: "Легенда",   shape: "shape-diamond",  color: "color-1" },
        { m: 1000,  name: "Титан",     shape: "shape-hexagon",  color: "color-2" },
        { m: 2500,  name: "Бог",       shape: "shape-circle",   color: "color-3" },
        { m: 5000,  name: "Миф",       shape: "shape-diamond",  color: "color-4" },
        { m: 10000, name: "Эпоха",     shape: "shape-hexagon",  color: "color-1" },
        { m: 25000, name: "Вечность",  shape: "shape-circle",   color: "color-2" },
        { m: 50000, name: "Абсолют",   shape: "shape-diamond",  color: "color-3" },
        { m: 100000,name: "Бессмертный",shape: "shape-hexagon",  color: "color-4" },
        { m: 250000,name: "Олимп",     shape: "shape-circle",   color: "color-1" },
        { m: 500000,name: "Вселенная", shape: "shape-diamond",  color: "color-2" },
        { m: 1000000,name: "Бог Игр",  shape: "shape-hexagon",  color: "color-3" }
    ]
};

var cardsGrid = document.getElementById('cards-grid');
var cardsView = document.getElementById('cards-view');
var tableView = document.getElementById('table-view');
var tableBody = document.getElementById('table-body');
var tableTitle = document.getElementById('table-title');
var totalTimeAll = document.getElementById('total-time-all');
var statsList = document.getElementById('stats-list');
var catAchContainer = document.getElementById('achievements-container');

function toggleAchievements() {
    var footer = document.querySelector('.achievements-footer');
    if (footer) footer.classList.toggle('expanded');
}

function init() {
    renderCards();
    updateGlobalStats();
    
    if (catAchContainer) {
        catAchContainer.innerHTML = ''; 

        // 1. Глобальные
        var globalSection = document.createElement('div');
        globalSection.className = 'achievements-section';
        globalSection.innerHTML = '<h3 class="ach-title">🏆 Общие достижения</h3><div class="achievements-row" id="grid-global"></div>';
        catAchContainer.appendChild(globalSection);
        
        renderAchItems(document.getElementById('grid-global'), achievementSets.global, calculateGlobalHours());

        // 2. Категории
        for (var key in database) {
            var section = document.createElement('div');
            section.className = 'achievements-section';
            section.innerHTML = '<h3 class="ach-title">🏆 ' + database[key].title + '</h3><div class="achievements-row" id="grid-' + key + '"></div>';
            catAchContainer.appendChild(section);
            
            var grid = document.getElementById('grid-' + key);
            var catHours = calculateMins(database[key].data) / 60;
            
            renderAchItems(grid, achievementSets[key], catHours);
        }
    }
}

function renderAchItems(container, achList, currentHours) {
    if (!container || !achList) return;
    for (var i = 0; i < achList.length; i++) {
        var ach = achList[i];
        var div = document.createElement('div');
        var isUnlocked = currentHours >= ach.m;
        
        // Берем значения напрямую из объекта (они уже перемешаны вручную выше)
        var shape = ach.shape;
        var color = ach.color;
        
        var classList = 'achievement ' + shape;
        if (isUnlocked) {
            classList += ' unlocked ' + color;
        }
        
        div.className = classList;
        div.innerHTML = '<span class="name">' + ach.name + '</span>' +
                        '<span class="cond">' + formatNumber(ach.m) + ' ч.</span>';
        container.appendChild(div);
    }
}

function renderCards() {
    if (!cardsGrid) return;
    cardsGrid.innerHTML = '';
    for (var key in database) {
        var val = database[key];
        var mins = calculateMins(val.data);
        var card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = function() { showCategoryDetails(key); };
        card.innerHTML = '<img src="' + val.img + '" class="card-img" onerror="this.src=\'https://via.placeholder.com/150?text=No+Img\'">' +
                         '<div class="card-body"><h3>' + val.title + '</h3><span class="time-label">' + formatTime(mins) + '</span></div>';
        cardsGrid.appendChild(card);
    }
}

function showCategoryDetails(key) {
    var cat = database[key];
    if (!cat) return;
    tableTitle.innerText = cat.title;
    tableBody.innerHTML = '';
    for (var i = 0; i < cat.data.length; i++) {
        var item = cat.data[i];
        var m = item.eps * item.dur;
        var r = item.rate;
        var rowClass = 'row-high', rText = 'Обязательно';
        if (r < 4) { rowClass = 'row-low'; rText = 'Нежелательно'; }
        else if (r < 7) { rowClass = 'row-mid'; rText = 'Желательно'; }
        tableBody.innerHTML += '<tr class="' + rowClass + '">' +
            '<td>' + item.name + '</td><td>' + item.eps + '</td><td>' + item.dur + '</td>' +
            '<td>' + m + '</td><td>' + (m/60).toFixed(1) + '</td><td>' + r + ' (' + rText + ')</td>' +
            '<td class="plot-cell" onclick="openPlot(\'' + item.plot.replace(/'/g, "\\'") + '\')">' + item.plot + '</td></tr>';
    }
    cardsView.classList.add('hidden');
    tableView.classList.remove('hidden');
}

function showAllCards() {
    cardsView.classList.remove('hidden');
    tableView.classList.add('hidden');
}

function updateGlobalStats() {
    var grandTotalMins = 0;
    if (statsList) statsList.innerHTML = '';
    for (var key in database) {
        var val = database[key];
        var mins = calculateMins(val.data);
        grandTotalMins += mins;
        if (statsList) {
            var row = document.createElement('div');
            row.className = 'stats-row';
            row.innerHTML = '<span>' + val.title + '</span><span>' + formatTime(mins) + '</span>';
            statsList.appendChild(row);
        }
    }
    totalTimeAll.innerText = formatTime(grandTotalMins);
    initChart('hours');
}

function calculateGlobalHours() {
    var total = 0;
    for (var key in database) total += calculateMins(database[key].data) / 60;
    return total;
}

function calculateMins(data) { 
    var sum = 0;
    for (var i = 0; i < data.length; i++) { sum += (data[i].eps * data[i].dur); }
    return sum;
}

function formatTime(totalMinutes) {
    var h = Math.floor(totalMinutes / 60);
    var m = totalMinutes % 60;
    return formatNumber(h) + 'ч. ' + formatNumber(m) + 'м.';
}

function formatNumber(num) { return new Intl.NumberFormat('ru-RU').format(num); }

function initChart(unit) {
    var ctx = document.getElementById('statsChart').getContext('2d');
    if (myChart) myChart.destroy();
    var labels = [];
    for (var k in database) { labels.push(database[k].title); }
    var dataValues = [];
    for (var k in database) {
        var m = calculateMins(database[k].data);
        if (unit === 'hours') dataValues.push(m / 60);
        else if (unit === 'days') dataValues.push(m / (60 * 24));
        else dataValues.push(m / (60 * 24 * 365));
    }
    myChart = new Chart(ctx, {
        type: 'bar',
        data: { labels: labels, datasets: [{ data: dataValues, backgroundColor: '#38bdf8', borderRadius: 5 }] },
        options: { responsive: true, scales: { y: { grid: { color: '#334155' }, ticks: { color: '#fff' } }, x: { ticks: { color: '#fff' } } }, plugins: { legend: { display: false } } }
    });
}

function updateChart(unit) { initChart(unit); }
function openPlot(text) { document.getElementById('modal-text').innerText = text; document.getElementById('modal').style.display = 'flex'; }
function closeModal() { document.getElementById('modal').style.display = 'none'; }

init();