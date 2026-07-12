// --- ДАННЫЕ ---
const database = {
    anime: [
        { title: "Атака титанов", episodes: 25, duration: 24, rating: 9, plot: "Человечество живет за стенами...", category: "anime" },
        { title: "Тетрадь смерти", episodes: 37, duration: 23, rating: 10, plot: "Старшеклассник находит тетрадь...", category: "anime" }
    ],
    films: [
        { title: "Интерстеллар", episodes: 1, duration: 169, rating: 8, plot: "Земля страдает от засухи...", category: "films" }
    ],
    series: [
        { title: "Чернобыль", episodes: 5, duration: 68, rating: 9, plot: "История одной из самых страшных техногенных катастроф...", category: "series" }
    ],
    shows: [],
    letsplays: []
};

let currentData = [];
let chartInstance = null;

// --- ЛОГИКА ПЕРЕКЛЮЧЕНИЯ КАРТОЧЕК ---
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const cat = card.dataset.category;
        
        // Меняем активную карточку
        document.querySelector('.active-card').classList.remove('active-card');
        card.classList.add('active-card');

        showCategory(cat);
    });
});

function showCategory(category) {
    currentData = database[category];
    renderTable();
    
    // Прячем остальные карточки в меню
    document.querySelectorAll('.card').forEach(c => c.style.display = 'none');
    document.getElementByById('hidden-menu').style.opacity = '0';
    document.getElementById('hidden-menu').style.visibility = 'hidden';
    
    // Оставляем только активную видимой
    document.querySelector(`.card[data-category="${category}"]`).style.display = 'block';
}

// Показываем скрытые категории при клике на активную (если нужно вернуть меню)
document.querySelector('.active-card').addEventListener('click', () => {
    if(document.querySelectorAll('.card:not(.active-card):not([style*="none"])').length === 0){
        document.querySelectorAll('.card:not(.active-card)').forEach(c => c.style.display = 'inline-block');
        document.getElementById('hidden-menu').style.opacity = '1';
        document.getElementById('hidden-menu').style.visibility = 'visible';
    }
});


// --- РЕНДЕР ТАБЛИЦЫ И СЮЖЕТА ---
function renderTable() {
    const container = document.getElementById('content-area');
    let html = '<table><thead><tr>';
    ['Название', 'Кол-во серий', 'Длительность серии', 'Затрачено (мин)', 'Затрачено (час)', 'Рейтинг', 'Сюжет'].forEach(h => html += `<th>${h}</th>`);
    html += '</tr></thead><tbody>';

    currentData.forEach(item => {
        const totalMin = item.episodes * item.duration;
        const totalHours = (totalMin / 60).toFixed(2);
        
        let rowClass = '';
        if (item.rating >= 8 && item.rating <= 10) rowClass = 'row-green';
        if (item.rating >= 5 && item.rating <= 7) rowClass = 'row-yellow';
        if (item.rating >= 0 && item.rating <= 4) rowClass = 'row-red';

        html += `<tr class="${rowClass}">`;
        html += `<td>${item.title}</td>`;
        html += `<td>${item.episodes}</td>`;
        html += `<td>${item.duration}</td>`;
        html += `<td>${totalMin}</td>`;
        html += `<td>${totalHours}</td>`;
        html += `<td>${item.rating}</td>`;
        
        // Обрезка текста сюжета до 100 символов
        const shortPlot = item.plot.length > 100 ? item.plot.slice(0, 100) : item.plot;
        const isLong = item.plot.length > 100;
        
        html += `<td class="plot-cell ${isLong ? 'plot-short' : 'plot-full'}" data-full="${item.plot}">${shortPlot}</td>`;
        
        html += '</tr>';
    });

    html += '</tbody></table>';
    html += '<button class="toggle-btn" onclick="toggleCalculator()">Открыть калькулятор</button>';
    
    container.innerHTML = html;
    updateTimeStats(); // Пересчитываем итоги сразу после рендера
    initPlots();
    initChart();
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
                cell.textContent = shortText;
                cell.classList.remove('plot-full');
                cell.classList.add('plot-short');
            }
        });
    });
}

// --- КАЛЬКУЛЯТОР ВРЕМЕНИ ---
function toggleCalculator() {
    const section = document.getElementById('calculator-section');
    if (section.style.display === 'none') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
    updateTimeStats();
    initChart();
}

function updateTimeStats() {
    const statsDiv = document.getElementById('time-stats');
    if (!statsDiv) return;

    let totalMinutes = 0;
    currentData.forEach(item => {
        totalMinutes += item.episodes * item.duration;
    });

    const hours = (totalMinutes / 60).toFixed(2);
    const days = (hours / 24).toFixed(2);

    statsDiv.innerHTML = `
        <p><strong>Всего затрачено:</strong> ${totalMinutes} минут (${hours} часов)</p>
        <p><strong>Это примерно:</strong> ${days} дней непрерывного просмотра</p>
    `;
}

// --- ГРАФИКИ (CHART.JS) ---
function initChart() {
    const ctx = document.getElementById('timeChart').getContext('2d');
    
    // Уничтожаем старый график, чтобы не было наложений
    if (chartInstance) {
        chartInstance.destroy();
    }

    const labels = currentData.map(item => item.title.length > 15 ? item.title.slice(0, 15) + '...' : item.title);
    const dataHours = currentData.map(item => parseFloat(((item.episodes * item.duration) / 60).toFixed(2)));

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Время на тайтл (в часах)',
                data: dataHours,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {color: '#f5f5f5'},
                    grid: {color: '#444'}
                },
                x: {
                    ticks: {color: '#f5f5f5'},
                    grid: {color: '#444'}
                }
            },
            plugins: {
                legend: {labels: {color: '#f5f5f5'}},
                tooltip: {enabled: true}
            }
        }
    });
}

// Запуск первой загрузки (по умолчанию Аниме)
document.addEventListener('DOMContentLoaded', () => {
    showCategory('anime');
});