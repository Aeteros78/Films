// data/achievements.js

/**
 * Генератор цветов для достижений.
 * Возвращает объект с CSS-свойствами для градиента и свечения.
 * 
 * @param {number} index - Индекс достижения (для создания последовательности оттенков)
 * @param {string} baseHue - Базовый оттенок (0-360). Можно передать случайное число или фиксированное.
 * @returns {object} { background: string, boxShadow: string, borderColor: string }
 */
function generateAchievementColor(index, baseHue = null) {
    // Если baseHue не передан, генерируем случайный оттенок
    // Иначе используем переданный, но сдвигаем его для каждого элемента
    const hue = baseHue !== null ? (baseHue + index * 15) % 360 : Math.floor(Math.random() * 360);
    
    // Насыщенность 70-90% для ярких цветов
    const saturation = 70 + Math.floor(Math.random() * 20);
    
    // Светлота 50-60% для читаемости белого текста
    const lightness = 50 + Math.floor(Math.random() * 10);
    
    // Основной цвет (HSL)
    const mainColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    // Цвет для градиента (чуть темнее/светлее)
    const gradientEnd = `hsl(${(hue + 30) % 360}, ${saturation}%, ${Math.max(30, lightness - 15)}%)`;
    
    // Цвет для рамки (чуть светлее основного)
    const borderColor = `hsl(${hue}, ${saturation}%, ${Math.min(80, lightness + 15)}%)`;
    
    // Цвет для свечения (с прозрачностью)
    const glowColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`;

    return {
        background: `linear-gradient(135deg, ${mainColor}, ${gradientEnd})`,
        boxShadow: `0 4px 15px ${glowColor}`,
        borderColor: borderColor
    };
}

// Вспомогательная функция для создания объекта достижения с сгенерированным цветом
function createAchievement(m, name, shape, baseHue = null) {
    // Генерируем уникальный индекс на основе m (чтобы цвета были стабильными при перезагрузке)
    // Используем простое хеширование, чтобы одно и то же m давало один и тот же цвет
    const index = m % 360; 
    
    const colors = generateAchievementColor(index, baseHue);

    return {
        m,
        name,
        shape,
        // Вместо строки "color-1" мы храним объект со стилями
        style: colors
    };
}

export const achievementSets = {
    global: [
        createAchievement(10, "Первый клик", "shape-circle"),
        createAchievement(25, "Пульт в руках", "shape-diamond"),
        createAchievement(50, "Марафонец", "shape-hexagon"),
        createAchievement(100, "Попкорн не заканчивается", "shape-circle"),
        createAchievement(250, "Охотник за титрами", "shape-diamond"),
        createAchievement(500, "Повелитель плейлиста", "shape-hexagon"),
        createAchievement(1000, "Голос народа", "shape-circle"),
        createAchievement(2500, "Лампочка", "shape-diamond"),
        createAchievement(5000, "Алхимик рекомендаций", "shape-hexagon"),
        createAchievement(10000, "Спойлер, стой!", "shape-circle"),
        createAchievement(25000, "Режиссёрская версия", "shape-diamond"),
        createAchievement(50000, "Хранитель архива", "shape-hexagon"),
        createAchievement(100000, "Снайпер мема", "shape-circle"),
        createAchievement(250000, "Киномарафон 24/7", "shape-diamond"),
        createAchievement(500000, "Слепая дегустация", "shape-hexagon"),
        createAchievement(1000000, "Культурный посол", "shape-circle"),
        createAchievement(2500000, "Свидетель эпохи VHS", "shape-diamond"),
        createAchievement(5000000, "Повелитель лонгридов", "shape-circle"),
        createAchievement(10000000, "Человек-рекомендация", "shape-diamond"),
        createAchievement(25000000, "Стенографист титров", "shape-hexagon"),
        createAchievement(50000000, "Хроникёр вселенной", "shape-circle"),
        createAchievement(100000000, "Смотрящий", "shape-diamond")
    ],
    anime: [
        createAchievement(10, "Чунибьё I", "shape-hexagon"),
        createAchievement(25, "Чунибьё II", "shape-circle"),
        createAchievement(50, "Сейлор-фуку", "shape-diamond"),
        createAchievement(100, "Меха-пилот", "shape-hexagon"),
        createAchievement(250, "Шинсенгуми", "shape-circle"),
        createAchievement(500, "Ёкай", "shape-diamond"),
        createAchievement(1000, "Сёнэн-чемпион", "shape-hexagon"),
        createAchievement(2500, "Сёнэн-полудемон", "shape-circle"),
        createAchievement(5000, "Сёнэн-демон", "shape-diamond"),
        createAchievement(10000, "Крушитель миров", "shape-hexagon"),
        createAchievement(25000, "Истребитель демонов", "shape-circle"),
        createAchievement(50000, "Сверхъестественный", "shape-diamond"),
        createAchievement(100000, "Крушитель титанов", "shape-hexagon"),
        createAchievement(250000, "Король титанов", "shape-circle"),
        createAchievement(500000, "Берсерк", "shape-diamond"),
        createAchievement(1000000, "Попаданец", "shape-hexagon")
    ],
    films: [
        createAchievement(10, "Попкорн I", "shape-diamond"),
        createAchievement(25, "Попкорн II", "shape-circle"),
        createAchievement(50, "Киномеханик", "shape-hexagon"),
        createAchievement(100, "Сценарист", "shape-diamond"),
        createAchievement(250, "Монтажер", "shape-circle"),
        createAchievement(500, "Сандэнс", "shape-hexagon"),
        createAchievement(1000, "Премьера", "shape-diamond"),
        createAchievement(2500, "Золотая пальмовая ветвь", "shape-circle"),
        createAchievement(5000, "Мастер пленки", "shape-hexagon"),
        createAchievement(10000, "Золотой век", "shape-diamond"),
        createAchievement(25000, "Новая волна", "shape-circle"),
        createAchievement(50000, "Авторское кино", "shape-hexagon"),
        createAchievement(100000, "Каннская легенда", "shape-diamond"),
        createAchievement(250000, "Эпоха блокбастеров", "shape-circle"),
        createAchievement(500000, "Золотой фонд", "shape-hexagon"),
        createAchievement(1000000, "Фродо", "shape-diamond")
    ],
    series: [
        createAchievement(10, "Зритель I", "shape-hexagon"),
        createAchievement(25, "Зритель II", "shape-circle"),
        createAchievement(50, "Запойный", "shape-diamond"),
        createAchievement(100, "Спойлер, стой!", "shape-hexagon"),
        createAchievement(250, "Клиффхэнгер", "shape-circle"),
        createAchievement(500, "Фанат теорий", "shape-diamond"),
        createAchievement(1000, "Сюжетный поворот", "shape-hexagon"),
        createAchievement(2500, "Сценарная комната", "shape-circle"),
        createAchievement(5000, "Шоураннер", "shape-diamond"),
        createAchievement(10000, "Вселенная сериала", "shape-hexagon"),
        createAchievement(25000, "Кроссовер", "shape-circle"),
        createAchievement(50000, "Спин-офф", "shape-diamond"),
        createAchievement(100000, "Финал сезона", "shape-hexagon"),
        createAchievement(250000, "Закрытый на пике", "shape-circle"),
        createAchievement(500000, "Вечная франшиза", "shape-diamond"),
        createAchievement(1000000, "Lost", "shape-hexagon")
    ],
    shows: [
        createAchievement(10, "В зале I", "shape-diamond"),
        createAchievement(25, "В зале II", "shape-hexagon"),
        createAchievement(50, "Аплодирую стоя", "shape-circle"),
        createAchievement(100, "В эфире", "shape-diamond"),
        createAchievement(250, "Звезда экрана", "shape-hexagon"),
        createAchievement(500, "Хедлайнер", "shape-circle"),
        createAchievement(1000, "Мастер сцены", "shape-diamond"),
        createAchievement(2500, "Король импровизации", "shape-hexagon"),
        createAchievement(5000, "Человек-оркестр", "shape-circle"),
        createAchievement(10000, "Золотой состав", "shape-diamond"),
        createAchievement(25000, "Прайм-тайм", "shape-hexagon"),
        createAchievement(50000, "Суперигра", "shape-circle"),
        createAchievement(100000, "Бессменный ведущий", "shape-diamond"),
        createAchievement(250000, "Голубой огонек", "shape-hexagon"),
        createAchievement(500000, "Национальное достояние", "shape-circle"),
        createAchievement(1000000, "ШПАМ", "shape-diamond")
    ],
    letsplays: [
        createAchievement(10, "Зритель I", "shape-hexagon"),
        createAchievement(25, "Зритель II", "shape-circle"),
        createAchievement(50, "В гостях у Куплинова", "shape-diamond"),
        createAchievement(100, "Дэвид Блэйд", "shape-hexagon"),
        createAchievement(250, "Кот под рукой", "shape-circle"),
        createAchievement(500, "Поймал эмоцию", "shape-diamond"),
        createAchievement(1000, "Дед", "shape-hexagon"),
        createAchievement(2500, "Повар", "shape-circle"),
        createAchievement(5000, "Гений", "shape-diamond"),
        createAchievement(10000, "Кибердемон", "shape-hexagon"),
        createAchievement(25000, "Ламповый вечер", "shape-circle"),
        createAchievement(50000, "Культ Куплинова", "shape-diamond"),
        createAchievement(100000, "Легенда кухни", "shape-hexagon"),
        createAchievement(250000, "Вечный стрим", "shape-circle"),
        createAchievement(500000, "Абсолютный Блэйд", "shape-diamond"),
        createAchievement(1000000, "Двойник Куплинова", "shape-hexagon")
    ]
};