// Задание 1.
// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

const parser = new DOMParser();

const list = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`

const xmlDOM = parser.parseFromString(list, 'text/xml');

const studentNodes = xmlDOM.querySelectorAll('student');

const result = {
	list: Array.from(studentNodes).map(studentNode => {
		const nameNode = studentNode.querySelector('name');
		const firstNode = nameNode.querySelector('first').textContent;
		const secondNode = nameNode.querySelector('second').textContent;
		const ageNode = studentNode.querySelector('age').textContent;
		const profNode = studentNode.querySelector('prof').textContent;
		const langAttr = nameNode.getAttribute('lang')
		const fullName = `${firstNode} ${secondNode}`;
		
		return {
			name: fullName,
			age: ageNode,
			prof: parseInt(ageNode),
			lang: langAttr,
		};
	})
}

console.log(result);