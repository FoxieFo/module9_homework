const btn = document.querySelector('.j-btn-request');
const btnClear = document.querySelector('.j-btn-clear');
const result = document.querySelector('.j-result');

btn.addEventListener('click', () => {
    const valueOne = document.getElementById('textInput1').value;
    const valueTwo = document.getElementById('textInput2').value;

    if ((valueOne < 1 || valueOne > 10 || isNaN(valueOne)) && (valueTwo < 1 || valueTwo > 10 || isNaN(valueTwo))) {
    result.innerText = 'Номер страницы и лимит вне диапазона от 1 до 10';
} else if (valueOne < 1 || valueOne > 10 || isNaN(valueOne)) {
    result.innerText = 'Номер страницы вне диапазона от 1 до 10';
} else if (valueTwo < 1 || valueTwo > 10 || isNaN(valueTwo)) {
    result.innerText = 'Лимит вне диапазона от 1 до 10';
} else {
	fetch(`https://jsonplaceholder.typicode.com/photos?_page=${valueOne}&_limit=${valueTwo}`)
		.then(response => {
			if (!response.ok) {
				throw new Error('An error has occurred');
			}
			return response.json();
		})
			.then(data => {
			localStorage.setItem('lastData', JSON.stringify(data));
		
			result.innerHTML = '';
			data.forEach(image => {
				const imageUrl = image.url;
				const imageElement = document.createElement('img');
				imageElement.src = imageUrl;
				result.appendChild(imageElement);
			})
		})
			.catch(error => {
			result.innerText = '❌ Ошибка при загрузке изображения';
		});
	}
});

window.addEventListener('load', () => {
    const lastRequestData = localStorage.getItem('lastData');
    if (lastRequestData) {
        const data = JSON.parse(lastRequestData);
        result.innerHTML = '';
        data.forEach(image => {
            const imageUrl = image.url;
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            result.appendChild(imageElement);
        });
    }
});