  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const items = JSON.parse(localStorage.getItem('items')) || [];

  function addItem(e) {
  	e.preventDefault();
  	const text = (this.querySelector('[name=item]')).value;
  	const item = {
  		text,
  		done: false
  	};
  	items.push(item);
  	populateList(items, itemsList);
  	localStorage.setItem('items', JSON.stringify(items));
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

  function toggleDone(e) {
  	if (!e.target.matches('input')) return;
  	const el = e.target;
  	const index = el.dataset.index;
  	items[index].done = !items[index].done;
  	localStorage.setItem('items', JSON.stringify(items));
  	populateList(items, itemsList);
  }

  addItems.addEventListener('submit', addItem);
  itemsList.addEventListener('click', toggleDone);

  populateList(items, itemsList);

