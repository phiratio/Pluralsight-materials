

	// BASIC
		
		var animal = {
			eat: function() { console.log("I'm eating"); }
		}
		
		var dog = {
			bark: function() { console.log("I'm barking"); }
		}
		
		dog.bark();
		console.log(dog.eat);
		
		// added
		$.extend(dog, animal);
		dog.eat();
		
		// prove copy
		animal.eat = function() { console.log("I'm still eating"); }
		animal.eat();
		dog.eat();
		
		
	// MULTIPLE INHERITANCE
		var cat = {
			meow: function() { console.log("meow"); }
		}
	
		var catDog = {}
		$.extend(catDog, cat, dog, animal);
		catDog.eat();
		catDog.bark();
		catDog.meow();
		
	// RETURN VALUE
		var catDog = $.extend({}, cat, dog, animal);
		catDog.eat();
		catDog.bark();
		catDog.meow();
		
	// DEEP COPY
		var animal = {
			actions: { 
				eat: function() { console.log("I'm eating"); },
				sit: function() { console.log("I'm sitting"); }
			}
		}
		
		var dog = {
			actions: { 
				bark: function() { console.log("I'm barking"); },
				dig: function() { console.log("I'm digging"); }
			}
		}
		
		dog.actions.dig();
		$.extend(dog, animal);
		console.log('extended');
		dog.actions.sit();
		dog.actions.dig();
		
		// with deep copy
		dog.actions.dig();
		$.extend(true, dog, animal);
		console.log('extended');
		dog.actions.sit();
		dog.actions.dig();
		
		

