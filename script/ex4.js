const btn = document.querySelector('.j-btn-request');
const result = document.querySelector('.j-result');

btn.addEventListener('click', () => {
    const valueOne = parseInt(document.getElementById('textInput1').value);
    const valueTwo = parseInt(document.getElementById('textInput2').value);

    if ((valueOne < 100 || valueOne > 300) || (valueTwo < 100 || valueTwo > 300) || isNaN(valueOne) || isNaN(valueTwo)) {
        result.innerText = '❌ One of the numbers is outside the range of 100 to 300';
    } else {
        fetch(`https://dummyimage.com/${valueOne}x${valueTwo}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('An error has occurred');
            }
            return response.url;
        })
        .then(imageUrl => {
            result.innerHTML = `<img src="${imageUrl}"/>`;
        })
        .catch(error => {
            result.innerText = '❌ Error fetching image';
        });
    }
});