// 1. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
let myChart = null;

const database = {
    anime: {
        title: "Аниме",
        img: "img/anime.webp",
        data: [
            { name: "Наруто", eps: 220, dur: 24, rate: 8.5, plot: "История о ниндзя, который мечтает стать лидером деревни." },
            { name: "Ван Пис", eps: 1000, dur: 22, rate: 9.0, plot: "Приключения пиратов в поисках сокровищ." },
            { name: "Плохое аниме", eps: 1, dur: 10, rate: 2.0, plot: "Очень скучный сюжет, смотреть не рекомендуется." }
        ]
    },
    films: {
        title: "Фильмы",
        img: "img/films.jpg",
        data: [
            { name: "Начало", eps: 1, dur: 148, rate: 8.8, plot: "Сложный фильм про путешествия в сны и подсознание." },
            { name: "Мусор", eps: 1, dur: 90, rate: 4.0, plot: "Слишком предсказуемый и пустой фильм." }
        ]
    },
    series: {
        title: "Сериалы",
        img: "img/serials.jpg",
        data: [
            { name: "Во все тяжкие", eps: 62, dur: 47, rate: 9.5, plot: "Превращение учителя химии в короля наркобизнеса." }
        ]
    },
    shows: {
        title: "Шоу",
        img: "img/shows.webp",
        data: [
            { name: "Голос", eps: 10, dur: 60, rate: 7.0, plot: "Музыкальное соревнование талантов." }
        ]
    },
    letsplays: {
        title: "Летсплеи",
        img: "img/kuplinov.jpg",
        data: [
            { name: "Minecraft", eps: 50, dur: 30, rate: 8.0, plot: "Прохождение выживания в кубическом мире." }
        ]
    }
};

const milestones = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];
const achNames = ["Новичок", "Зритель", "Фанат", "Знаток", "Мастер", "Гурман", "Гений", "Легенда", "Титан", "Бог", "Миф", "Эпоха", "Вечность", "Бессмертный", "Олимп", "Абсолют"];
const shapes = ['shape-circle', 'shape-diamond', 'shape-hexagon'];
const colors = ['color-1', 'color-2', 'color-3', 'color-4'];

// 2. ЭЛЕМЕНТЫ DOM
const cardsGrid = document.getElementById('cards-grid');
const cardsView = document.getElementById('cards-view');
const tableView = document.getElementById('table-view');
const tableBody = document.getElementById('table-body');
const tableTitle = document.getElementById('table-title');
const totalTimeAll = document.getElementById('total-time-all');
const statsList = document.getElementById('stats-list');
const globalAchGrid = document.getElementById('global-achievements');
const catAchContainer = document.getElementById('achievements-container');

// 3. ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ АЧИВОК (Исправлено)
function toggleAchievements() {
    const footer = document.querySelector('.achievements-footer');
    if (footer) {
        footer.classList.toggle('expanded');
    }
}

// 4. ОСНОВНЫЕ ФУНКЦИИ
function init() {
    renderCards();
    updateGlobalStats();
    renderAchievements('global', 0);
    
    if (catAchContainer) {
        for (const key in database) {
            const section = document.createElement('div');
            section.className = 'achievements-section';
            section.id = `ach-section-${key}`;
            section.innerHTML = `<h3>🏆 ${database[key].title}</h3><div class="achievements-row" id="grid-${key}"></div>`;
            catAchContainer.appendChild(section);
            
            const grid = document.getElementById(`grid-${key}`);
            const catHours = calculateMins(database[key].data) / 60;
            const catNames = achNames.map(n => `${n} ${database[key].title.split(' ')[0]}`);
            generateAchItems(grid, milestones, catNames, catHours);
        }
    }
}

function renderCards() {
    if (!cardsGrid) return;
    cardsGrid.innerHTML = '';
    for (const [key, val] of Object.entries(database)) {
        const mins = calculateMins(val.data);
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => showCategoryDetails(key);
        card.innerHTML = `
            <img src="${val.img}" class="card-img" onerror="this.src='https://via.placeholder.com/150?text=No+Img'">
            <div class="card-body">
                <h3>${val.title}</h3>
                <span class="time-label">${formatTime(mins)}</span>
            </div>`;
        cardsGrid.appendChild(card);
    }
}

function showCategoryDetails(key) {
    const cat = database[key];
    if (!cat) return;
    tableTitle.innerText = cat.title;
    tableBody.innerHTML = '';
    cat.data.forEach(item => {
        const m = item.eps * item.dur;
        const r = item.rate;
        let rowClass = 'row-high', rText = 'Обязательно';
        if (r < 4) { rowClass = 'row-low'; rText = 'Нежелательно'; }
        else if (r < 7) { rowClass = 'row-mid'; rText = 'Желательно'; }
        tableBody.innerHTML += `<tr class="${rowClass}">
            <td>${item.name}</td><td>${item.eps}</td><td>${item.dur}</td>
            <td>${m}</td><td>${(m/60).toFixed(1)}</td><td>${r} (${rText})</td>
            <td class="plot-cell" onclick="openPlot('${item.plot.replace(/'/g, "\\'")}')">${item.plot}</td>
        </tr>`;
    });
    cardsView.classList.add('hidden');
    tableView.classList.remove('hidden');
}

function showAllCards() {
    cardsView.classList.remove('hidden');
    tableView.classList.add('hidden');
}

// 5. СТАТИСТИКА
function updateGlobalStats() {
    let grandTotalMins = 0;
    if (statsList) statsList.innerHTML = '';
    for (const [key, val] of Object.entries(database)) {
        const mins = calculateMins(val.data);
        grandTotalMins += mins;
        if (statsList) {
            const row = document.createElement('div');
            row.className = 'stats-row';
            row.innerHTML = `<span>${val.title}</span><span>${formatTime(mins)}</span>`;
            statsList.appendChild(row);
        }
    }
    totalTimeAll.innerText = formatTime(grandTotalMins);
    initChart('hours');
}

// 6. АЧИВКИ
function renderAchievements(type, categoryKey = null) {
    if (type === 'global' && globalAchGrid) {
        globalAchGrid.innerHTML = '';
        generateAchItems(globalAchGrid, milestones, achNames, calculateGlobalHours());
    }
}

function generateAchItems(container, thresholds, names, currentHours) {
    if (!container) return;
    thresholds.forEach((m, index) => {
        const div = document.createElement('div');
        const isUnlocked = currentHours >= m;
        const shape = shapes[index % shapes.length];
        const color = colors[index % colors.length];
        div.className = `achievement ${shape} ${isUnlocked ? 'unlocked ' + color : ''}`;
        div.innerHTML = `<span class="name">${names[index]}</span><span class="cond">${formatNumber(m)} ч.</span>`;
        container.appendChild(div);
    });
}

function calculateGlobalHours() {
    let total = 0;
    for (const key in database) total += calculateMins(database[key].data) / 60;
    return total;
}

// 7. ВСПОМОГАТЕЛЬНЫЕ
function calculateMins(data) { return data.reduce((sum, item) => sum + (item.eps * item.dur), 0); }
function formatTime(totalMinutes) {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${formatNumber(h)}ч. ${formatNumber(m)}м.`;
}
function formatNumber(num) { return new Intl.NumberFormat('ru-RU').format(num); }

function initChart(unit) {
    const ctx = document.getElementById('statsChart').getContext('2d');
    if (myChart) myChart.destroy();
    const labels = Object.values(database).map(v => v.title);
    const dataValues = Object.values(database).map(v => {
        const m = calculateMins(v.data);
        if (unit === 'hours') return m / 60;
        if (unit === 'days') return m / (60 * 24);
        if (unit === 'years') return m / (60 * 24 * 365);
    });
    myChart = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets: [{ data: dataValues, backgroundColor: '#38bdf8', borderRadius: 5 }] },
        options: { responsive: true, scales: { y: { grid: { color: '#334155' }, ticks: { color: '#fff' } }, x: { ticks: { color: '#fff' } } }, plugins: { legend: { display: false } } }
    });
}

function updateChart(unit) { initChart(unit); }
function openPlot(text) { document.getElementById('modal-text').innerText = text; document.getElementById('modal').style.display = 'flex'; }
function closeModal() { document.getElementById('modal').style.display = 'none'; }

// ЗАПУСК
init();