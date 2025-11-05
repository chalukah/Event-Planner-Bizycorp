// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";
import "particles";
import "reddit_tracking";

// Allows setting the value of an `input` tag
Turbo.StreamActions.update_input = function () {
	this.targetElements.forEach((target) => {
		target.value = this.templateContent.textContent.trim();
	});
};

// Allows removing a class from an element (like `hidden`)
Turbo.StreamActions.remove_class = function () {
	this.targetElements.forEach((target) => {
		target.classList.remove(this.templateContent.textContent.trim());
	});
};
