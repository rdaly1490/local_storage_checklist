  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const items = [];

  function addItem(e) {
  	e.preventDefault();
  	const text = (this.querySelector('[name=item]')).value;
  	const item = {
  		text,
  		done: false
  	};
  	items.push(item);
  	populateList(items, itemsList);
  	this.reset();
  }

  function populateList(items = [], htmlList) {
  	const listElements = items.map((item, index) => {
  		const isDone = item.done ? 'checked' : '';
  		return `
  			<li>
  				<input type="checkbox" data-index="${index}" id="item${index}" ${isDone} />
  				<label for="item${index}">${item.text}</label>
  			</li>
  		`;
  	}).join('');
  	htmlList.innerHTML = listElements;
  }

  addItems.addEventListener('submit', addItem);