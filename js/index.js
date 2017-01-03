  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const clearButton = document.querySelector('#clear-btn');
  let selectAllChecked = JSON.parse(localStorage.getItem('selectAllChecked'))|| false;
  let items = JSON.parse(localStorage.getItem('items')) || [];

  function addItem(e) {
  	e.preventDefault();
  	const text = (this.querySelector('[name=item]')).value;
  	const done = selectAllChecked;
  	const item = {
  		text,
  		done
  	};
  	items.push(item);
  	populateList(items, itemsList);
  	storeData(items, selectAllChecked);
  	this.reset();
  }

  function populateList(items = [], htmlList) {
  	let selectAll = '';
  	if (items.length > 0) {
	  	selectAll = `
	  		<li>
	  			<input type="checkbox" id="selectAll" ${selectAllChecked ? 'checked' : ''} />
	  			<label for="selectAll">Select All</label>
	  		</li>
	  	`;
	}
	
  	const listElements = items.map((item, index) => {
  		const isDone = item.done ? 'checked' : '';
  		return `
  			<li>
  				<input type="checkbox" data-index="${index}" id="item${index}" ${isDone} />
  				<label for="item${index}">${item.text}</label>
  			</li>
  		`;
  	}).join('');
  	htmlList.innerHTML = selectAll + listElements;
  }

  function toggleDone(e) {
  	if (!e.target.matches('input')) return;
  	if (e.target.id === 'selectAll') {
  		handleSelectAll();
  	} else {
  		markItemComplete(e.target)
	}
  }

  function clearLocalStorage() {
  	localStorage.removeItem('items');
  	localStorage.removeItem('selectAllChecked');
  	items = [];
  	populateList(items, itemsList);
  }

  function handleSelectAll() {
  	selectAllChecked = !selectAllChecked;
  	items.forEach(item => item.done = selectAllChecked);
  	storeData(items, selectAllChecked);
  	populateList(items, itemsList);
  }

  function markItemComplete(item) {
	const index = item.dataset.index;
	items[index].done = !items[index].done;
	storeData(items, selectAllChecked);
	populateList(items, itemsList);
  }

  function storeData(items, selectAllChecked) {
  	localStorage.setItem('items', JSON.stringify(items));
  	localStorage.setItem('selectAllChecked', selectAllChecked);
  }

  addItems.addEventListener('submit', addItem);
  itemsList.addEventListener('click', toggleDone);
  clearButton.addEventListener('click', clearLocalStorage);

  populateList(items, itemsList);

