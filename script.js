// --- ДАННЫЕ ---
const database = {
    welcome: [],
    anime: [
        { title: "Атака титанов", episodes: 25, duration: 24, rating: 9, plot: "Мир атакован Титанами — гигантскими гуманоидами, которые пожирают людей без видимой причины. Остатки человечества выживают за тремя огромными стенами... Спустя сто лет спокойствия Колоссальный Титан пробивает внешнюю стену, и главный герой Эрен Йегер клянется уничтожить всех гигантов." },
        { title: "Тетрадь смерти", episodes: 37, duration: 23, rating: 10, plot: "Старшеклассник Лайт Ягами находит сверхъестественную тетрадь, позволяющую убивать любого человека, зная его имя и лицо. Он решает очистить мир от преступников, но на его след выходит гениальный детектив L." },
        { title: "Ванпанчмен", episodes: 24, duration: 24, rating: 9, plot: "История о Сайтаме — человеке, который стал настолько сильным, что побеждает любых врагов с одного удара. Но абсолютная сила привела его к экзистенциальному кризису и скуке." }
    ],
    films: [
        { title: "Интерстеллар", episodes: 1, duration: 169, rating: 8, plot: "Когда Земля становится непригодной для жизни, группа исследователей отправляется через червоточину в другую галактику, чтобы найти новый дом для человечества." },
        { title: "Начало", episodes: 1, duration: 148, rating: 9, plot: "Профессиональный вор Кобб крадет секреты из подсознания во время сна. Ему предлагают шанс искупить вину, но задача — не украсть идею, а внедрить её." }
    ],
    series: [
        { title: "Чернобыль", episodes: 5, duration: 68, rating: 9, plot: "Драматизация событий одной из самых страшных техногенных катастроф в истории человечества и героизма людей, предотвративших еще больший масштаб трагедии." },
        { title: "Игра престолов", episodes: 73, duration: 55, rating: 8, plot: "Девять благородных семей борются за контроль над мифическим континентом Вестерос, пока древняя угроза возвращается после тысячелетнего сна." }
    ],
    shows: [
        { title: "Что было дальше?", episodes: 60, duration: 90, rating: 8, plot: "Популярное комедийное шоу, где участники слушают историю гостя, а затем пытаются угадать ее финал или просто смешно шутят над ситуацией." }
    ],
    letsplays: []
};

let currentData = [];
let chartInstance = null;

// --- УПРАВЛЕНИЕ СЕКЦИЯМИ И РЕНДЕР ---
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const cat = card.dataset.category;
        
        // Обновление навигации
        document.querySelector('.active-card').classList.remove('active-card');
        card.classList.add('active-card');

        if (cat === 'welcome') {
            showSection('welcome-screen');
            hideSection('table-section');
            return;
        }

        currentData = database[cat];
        renderTable(cat);
        showSection('table-section');
        hideSection('welcome-screen');
    });
});

function showSection(id) {
    document.getElementById(id).classList.remove('hidden-section');
    document.getElementById(id).classList.add('active-section');
}

function hideSection(id) {
    document.getElementById(id).classList.remove('active-section');
    document.getElementById(id).classList.add('hidden-section');
}

function renderTable(categoryName) {
    document.getElementById('current-category-title').textContent = getCategoryDisplayName(categoryName);
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    currentData.forEach(item => {
        const totalMin = item.episodes * item.duration;
        const totalHours = (totalMin / 60).toFixed(2);
        
        let rowClass = '';
        if (item.rating >= 8 && item.rating <= 10) rowClass = 'row-green';
        if (item.rating >= 5 && item.rating <= 7) rowClass = 'row-yellow';
        if (item.rating >= 0 && item.rating <= 4) rowClass = 'row-red';

        const tr = document.createElement('tr');
        tr.className = rowClass;
        
        tr.innerHTML = `
            <td>${item.title}</td>
            <td>${item.episodes}</td>
            <td>${item.duration}</td>
            <td>${totalMin}</td>
            <td>${totalHours}</td>
            <td>${item.rating}</td>
            <td class="plot-cell ${item.plot.length > 100 ? 'plot-short' : 'plot-full'}" data-full="${escapeHtml(item.plot)}">
                ${item.plot.length > 100 ? escapeHtml(item.plot.slice(0, 100)) : escapeHtml(item.plot)}
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    initPlots();
    updateTimeStats();
    initChart();
}

function getCategoryDisplayName(key) {
    const names = { anime: "Аниме", films: "Фильмы", series: "Сериалы", shows: "Шоу", letsplays: "Летсплеи" };
    return names[key] || key;
}

// Защита от XSS при вставке текста сюжета
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Раскрытие полного текста сюжета
function initPlots() {
    document.querySelectorAll('.plot-cell').forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.classList.contains('plot-short')) {
                cell.textContent = cell.dataset.full;
                cell.classList.remove('plot-short');
                cell.classList.add('plot-full');
            } else {
                const shortText = cell.dataset.full.slice(0, 100);
                cell.textContent = shortText + '...';
                cell.classList.remove('plot-full');
                cell.classList.add('plot-short');
            }
        });
    });
}

// --- КАЛЬКУЛЯТОР ---
function updateTimeStats() {
    const statsDiv = document.getElementById('time-stats');
    let totalMinutes = 0;
    currentData.forEach(item => totalMinutes += item.episodes * item.duration);

    const hours = (totalMinutes / 60).toFixed(2);
    const days = (hours / 24).toFixed(2);

    statsDiv.innerHTML = `
        <p><strong>Всего минут:</strong> ${totalMinutes}</p>
        <p><strong>Всего часов:</strong> ${hours}</p>
        <p><strong>Всего дней:</strong> ${days}</p>
    `;
}

// --- ГРАФИКИ ---
function initChart() {
    const ctx = document.getElementById('timeChart').getContext('2d');
    if (chartInstance) chartInstance.destroy();

    const labels = currentData.map(item => item.title.length > 15 ? item.title.slice(0, 15) + '...' : item.title);
    const dataHours = currentData.map(item => parseFloat(((item.episodes * item.duration) / 60).toFixed(2)));

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Время на тайтл (часов)',
                data: dataHours,
                backgroundColor: '#6a9fb5',
                borderColor: '#4a7a90',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: {color: '#e0e0e0'}, grid: {color: '#333'} },
                x: { ticks: {color: '#e0e0e0'}, grid: {color: '#333'} }
            },
            plugins: { legend: {labels: {color: '#e0e0e0'}} }
        }
    });
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => {
    updateTimeStats(); // Показываем нули в калькуляторе сразу
    initChart();
});