var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '2894',
  'X-Auth-Token': '699f6dd588f6435a2c44077b8dca856c'
};

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
	url: baseUrl + '/board',
	method: 'GET',
	success: function(response) {
		setupColumns(response.columns);
	}
});

function setupColumns(columns) {
	columns.forEach(function (column) {
		var col = new Column(column.id, column.name);
		board.createColumn(col);
		setupCards(col, column.cards);
	});
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
		var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    	col.createCard(cardObj);
	});
}
