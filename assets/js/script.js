let filterButtons = document.querySelectorAll(".filter-button");
let filterItems = document.querySelectorAll(".filter-item");

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        let filterValue = this.getAttribute("data-filter");
        
        filterItems.forEach(function(item) {
            if (filterValue === "all" || item.classList.contains(filterValue)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});

// Функция для создания модального окна
function CreateModalWindow(width, height, backgroundColor) {
    let modal = document.createElement('div');

    modal.classList.add('modal'); // Добавляем класс 'modal'
    modal.style.width = width;
    modal.style.height = height;
    modal.style.backgroundColor = backgroundColor;
    
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.overflow = 'auto';

    return modal;
}

// Функция для создания общих стилей для элементов
function createStyles(element, width) {
    element.style.margin = 'auto';
    element.style.display = 'block';
    element.style.width = width; // Здесь вы можете настроить размер элемента

    return element;
}

// Функция для создания модального изображения
function createModalImage(src, width) {
    let img = document.createElement('img');
    img.src = src;
    return createStyles(img, width);
}

// Функция для создания модального видео
function createModalVideo(src, width) {
    let video = document.createElement('video');
    video.autoplay = true;
    video.loop = true;
    video.muted = true;

    let source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';

    video.appendChild(source);
    
    return createStyles(video, width);
}

// Получаем все элементы img и video внутри div с классом 'acrilBackground gallery'
let elements = document.querySelectorAll('.acrilBackground.gallery img, .acrilBackground.gallery video');

// Создаем модальное окно
let modalWindow = CreateModalWindow('100%', '100%', 'rgba(0, 0, 0, 0.7)');
let modalElement;

// Добавляем модальное окно в body
document.body.appendChild(modalWindow);

// Добавляем обработчик событий click для каждого элемента
elements.forEach(function(element) {
    element.addEventListener('click', function() {
        // Очищаем модальное окно
        modalWindow.innerHTML = '';

        // Создаем элемент (img или video) для модального окна
        if (this.tagName.toLowerCase() === 'img') {
            modalElement = createModalImage(this.src, '80%');
        } else if (this.tagName.toLowerCase() === 'video') {
            modalElement = createModalVideo(this.querySelector('source').src, '80%');
        }

        modalElement.classList.add('modalElement');

        // Добавляем новый элемент в модальное окно
        modalWindow.appendChild(modalElement);

        // Отображаем модальное окно
        modalWindow.style.display = 'block';
    });
});

// Закрываем модальное окно при клике в любом месте
window.onclick = function(event) {
    if (event.target == modalWindow || event.target == modalElement) {
        modalWindow.style.display = 'none';
    }
};
