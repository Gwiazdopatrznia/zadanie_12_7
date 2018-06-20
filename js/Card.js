// KLASA KANBAN CARD
function Card(id, name, bootcamp_kanban_column_id) {
	var self = this;
	
	this.id = id;
	this.name = name;
	this.bootcamp_kanban_column_id = bootcamp_kanban_column_id;
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardRenameBtn = $('<button class="btn-rename-card">edit card</button>');
		var cardDescription = $('<p class="card-description"></p>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});

		cardRenameBtn.click(function(event) {
			var newCardTitle = prompt('Enter new the name of card');
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'PUT',
				data: {
					name: newCardTitle,
					bootcamp_kanban_column_id: self.bootcamp_kanban_column_id
				},
				success: function(response) {
					self.element.children('p').html(newCardTitle);
				}
			});
		});

		card.append(cardDeleteBtn);		
		cardDescription.text(self.name);
		card.append(cardRenameBtn);
		card.append(cardDescription);
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(){
				self.$element.remove();
			}
		});
	}
};
