// 1. ИМПОРТ ДАННЫХ (Все данные теперь в папке data/)
import { animeData } from './data/anime.js';
import { filmsData } from './data/films.js';
import { seriesData } from './data/series.js';
import { showsData } from './data/shows.js';
import { letsplaysData } from './data/letsplays.js';
import { achievementSets } from './data/achievements.js';

// 2. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
var myChart = null;

var database = {
    anime: animeData,
    films: filmsData,
    series: seriesData,
    shows: showsData,
    letsplays: letsplaysData
};

var cardsGrid = document.getElementById('cards-grid');
var cardsView = document.getElementById('cards-view');
var tableView = document.getElementById('table-view');
var tableBody = document.getElementById('table-body');
var tableTitle = document.getElementById('table-title');
var totalTimeAll = document.getElementById('total-time-all');
var statsList = document.getElementById('stats-list');
var catAchContainer = document.getElementById('achievements-container');
var sidebarCategories = document.getElementById('sidebar-categories');

// 3. ОСНОВНЫЕ ФУНКЦИИ

function init() {
    renderCards();
    updateGlobalStats();
    renderSidebar(); 
    renderAchievements(); 
}

function renderSidebar() {
    if (!sidebarCategories) return;
    sidebarCategories.innerHTML = ''; 

    // ИСПОЛЬЗУЕМ let вместо var для key
    for (let key in database) {
        let category = database[key];
        let btn = document.createElement('div');
        btn.className = 'menu-item';
        btn.innerText = category.title;
        
        btn.onclick = function() {
            var allButtons = sidebarCategories.querySelectorAll('.menu-item');
            allButtons.forEach(function(b) {
                b.classList.remove('active');
            });

            btn.classList.add('active');
            showCategoryDetails(key);
        };
        
        sidebarCategories.appendChild(btn);
    }
}

function renderAchievements() {
    if (!catAchContainer) return;
    catAchContainer.innerHTML = ''; 

    var globalSection = document.createElement('div');
    globalSection.className = 'achievements-section';
    globalSection.innerHTML = '<h3 class="ach-title">🏆 Общие достижения</h3><div class="achievements-row" id="grid-global"></div>';
    catAchContainer.appendChild(globalSection);
    
    renderAchItems(document.getElementById('grid-global'), achievementSets.global, calculateGlobalHours());

    // ИСПОЛЬЗУЕМ let вместо var для key
    for (let key in database) {
        var section = document.createElement('div');
        section.className = 'achievements-section';
        section.innerHTML = '<h3 class="ach-title">🏆 ' + database[key].title + '</h3><div class="achievements-row" id="grid-' + key + '"></div>';
        catAchContainer.appendChild(section);
        
        var grid = document.getElementById('grid-' + key);
        var catHours = calculateMins(database[key].data) / 60;
        
        renderAchItems(grid, achievementSets[key], catHours);
    }
}

function renderAchItems(container, achList, currentHours) {
    if (!container || !achList) return;
    for (let i = 0; i < achList.length; i++) {
        var ach = achList[i];
        var div = document.createElement('div');
        var isUnlocked = currentHours >= ach.m;
        
        var classList = 'achievement ' + ach.shape;
        if (isUnlocked) {
            classList += ' unlocked ' + ach.color;
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
    // ИСПОЛЬЗУЕМ let вместо var для key
    for (let key in database) {
        let val = database[key];
        let mins = calculateMins(val.data);
        let card = document.createElement('div');
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
    for (let i = 0; i < cat.data.length; i++) {
        let item = cat.data[i];
        let m = item.eps * item.dur;
        let r = item.rate;
        let rowClass = 'row-high', rText = 'Обязательно';
        if (r < 4) { rowClass = 'row-low'; rText = 'Нежелательно'; }
        else if (r < 7) { rowClass = 'row-mid'; rText = 'Желательно'; }

        var tr = document.createElement('tr');
        tr.className = rowClass;
        tr.innerHTML = '<td>' + item.name + '</td><td>' + item.eps + '</td><td>' + item.dur + '</td>' +
                       '<td>' + m + '</td><td>' + (m/60).toFixed(1) + '</td><td>' + r + ' (' + rText + ')</td>' +
                       '<td class="plot-cell">' + item.plot + '</td>';
        
        tr.querySelector('.plot-cell').onclick = function() {
            openPlot(item.plot);
        };
        tableBody.appendChild(tr);
    }
    cardsView.classList.add('hidden');
    tableView.classList.remove('hidden');
}

function showAllCards() {
    cardsView.classList.remove('hidden');
    tableView.classList.add('hidden');

    if (sidebarCategories) {
        var allButtons = sidebarCategories.querySelectorAll('.menu-item');
        allButtons.forEach(function(b) {
            b.classList.remove('active');
        });
    }
}

function updateGlobalStats() {
    var grandTotalMins = 0;
    if (statsList) statsList.innerHTML = '';
    // ИСПОЛЬЗУЕМ let вместо var для key
    for (let key in database) {
        let val = database[key];
        let mins = calculateMins(val.data);
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

// 4. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

function calculateGlobalHours() {
    var total = 0;
    // ИСПОЛЬЗУЕМ let вместо var для key
    for (let key in database) total += calculateMins(database[key].data) / 60;
    return total;
}

function calculateMins(data) { 
    var sum = 0;
    for (let i = 0; i < data.length; i++) { sum += (data[i].eps * data[i].dur); }
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
    // ИСПОЛЬЗУЕМ let вместо var для key
    for (let k in database) { labels.push(database[k].title); }
    var dataValues = [];
    // ИСПОЛЬЗУЕМ let вместо var для key
    for (let k in database) {
        var m = calculateMins(database[k].data);
        if (unit === 'hours') dataValues.push(m / 60);
        else if (unit === 'days') dataValues.push(m / (60 * 24));
        else dataValues.push(m / (60 * 24 * 365));
    }
    myChart = new Chart(ctx, {
        type: 'bar',
        data: { labels: labels, datasets: [{ data: dataValues, backgroundColor: '#38bdf8', borderRadius: 5 }] },
        options: { 
            responsive: true, 
            scales: { 
                y: { grid: { color: '#334155' }, ticks: { color: '#fff' } }, 
                x: { ticks: { color: '#fff' } } 
            }, 
            plugins: { legend: { display: false } } 
        }
    });
}

function updateChart(unit) { initChart(unit); }
function openPlot(text) { 
    document.getElementById('modal-text').innerHTML = text; // Используем innerHTML
    document.getElementById('modal').style.display = 'flex'; 
}
function closeModal() { document.getElementById('modal').style.display = 'none'; }
function toggleAchievements() {
    var footer = document.querySelector('.achievements-footer');
    if (footer) footer.classList.toggle('expanded');
}

// 5. ПРИВЯЗКА К WINDOW
window.showAllCards = showAllCards;
window.showCategoryDetails = showCategoryDetails;
window.toggleAchievements = toggleAchievements;
window.updateChart = updateChart;
window.openPlot = openPlot;
window.closeModal = closeModal;

init();