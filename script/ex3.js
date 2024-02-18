function useRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.error('Error:', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
      
      xhr.onerror = function() {
        console.error('Error:', xhr.status);
    };
    
    xhr.send();
  };
  
  const resultNode = document.querySelector('.j-result');
  const btnNode = document.querySelector('.j-btn-request');
  
  btnNode.addEventListener('click', () => {
    const value = document.querySelector('input').value;
    if (value >= 1 && value <= 10) {
      useRequest(`https://jsonplaceholder.typicode.com/photos?_limit=${value}`, displayResult);
    } else {
      resultNode.innerHTML = '🤔 Please enter a number between 1 and 10.';
    }
  });
  
  function displayResult(result) {
    resultNode.innerHTML = '';
    result.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo.url;
      resultNode.appendChild(img);
    });
  }