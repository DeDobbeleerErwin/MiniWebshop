const matchUp = {
	products: [
		{ 
			name: 'Koffie', 
			description: 'Zwarte koffie', 
			picture: 'img/blackCoffee.png',
			price: 2.60,
			inBasket: false,
			amountInBasket: 0
		},
		{ 
			name: 'Koffie met melk', 
			description: 'Koffie met warme melk', 
			picture: 'img/koffieMetMelk.png',
			price: 2.75,
			inBasket: false,
			amountInBasket: 0
		},
		{ 
			name: 'Espresso', 
			description: 'Sterke koffie', 
			picture: 'img/espresso.png',
			price: 2.90,
			inBasket: false,
			amountInBasket: 0
		},
		{ 
			name: 'Cappuccino', 
			description: 'Laagjes melkschuim, melk en espresso', 
			picture: 'img/cappucino.png',
			price: 3.25,
			inBasket: false,
			amountInBasket: 0
		},
		{ 
			name: 'Latte Macchiatto', 
			description: 'Laagjes melk en espresso', 
			picture: 'img/latteMacchiatto.png',
			price: 3.25,
			inBasket: false,
			amountInBasket: 0
		},
		{ 
			name: 'Affogato', 
			description: 'Hete espresso met een bol vanille-ijs', 
			picture: 'img/affogato.png',
			price: 4.00,
			inBasket: false,
			amountInBasket: 0
		},
		{ 
			name: 'Dalgona', 
			description: 'IJskoffie met melk', 
			picture: 'img/dalgona.png',
			price: 4.10,
			inBasket: false,
			amountInBasket: 0
		},
		{ 
			name: 'Karamel Macchiatto', 
			description: 'Laagjes melk en espresso met karamel', 
			picture: 'img/karamelMacchiatto.png',
			price: 3.55,
			inBasket: false,
			amountInBasket: 0
		},
		{ 
			name: 'Vanille Macchiatto', 
			description: 'Laagjes melk en espresso met vanille', 
			picture: 'img/vanilleMacchiatto.png',
			price: 3.55,
			inBasket: false,
			amountInBasket: 0
		},
		{ 
			name: 'Pumpkin Spice Latte', 
			description: 'Laagjes espresso en gestoomde melk', 
			picture: 'img/pumpkinSpiceLatte.png',
			price: 4.20,
			inBasket: false,
			amountInBasket: 0
		},
		{ 
			name: 'Speculoos Macchiatto', 
			description: 'Laagjes melk en espresso met speculoos', 
			picture: 'img/speculoosMacchiatto.png',
			price: 3.70,
			inBasket: false,
			amountInBasket: 0
		},
		{ 
			name: 'Irish koffie', 
			description: 'Koffie met Ierse whisky en room', 
			picture: 'img/irishKoffie.png',
			price: 5.00,
			inBasket: false,
			amountInBasket: 0
		},
		{ 
			name: 'Italian koffie', 
			description: 'Koffie met Italiaanse amaretto en room', 
			picture: 'img/italianKoffie.png',
			price: 5.25,
			inBasket: false,
			amountInBasket: 0
		},
		{ 
			name: 'Baileys koffie', 
			description: 'Koffie met Baileys en warme melk', 
			picture: 'img/baileysKoffie.png',
			price: 5.15,
			inBasket: false,
			amountInBasket: 0
		}
	]
};

const productsString = JSON.stringify(matchUp);
const data = JSON.parse(productsString);

const shoppingBasket = document.getElementById('offcanvas-body');
const totalP = document.getElementById('total');
let totalPrice = 0.00;
let basketList = [];
totalP.innerText = `€ ${totalPrice}`;

// Function to update price
function updatePrice(){
	totalP.innerText = `€ ${Math.round(totalPrice * 100) / 100}`;
}

// Load all products from JSON file on page
for(let i = 0; i < data.products.length; i++){
	const coldiv = document.createElement('div');
	coldiv.classList.add('col-3', 'my-4');

	const carddiv = document.createElement('div');
	carddiv.classList.add('card', 'h-100', 'border-0');

	const cardbody = document.createElement('div');
	cardbody.classList.add('card-body');

	const newimage = document.createElement('img');
	newimage.classList.add('card-img-top');
	newimage.alt = data.products[i].name;
	newimage.src = data.products[i].picture;

	const h4 = document.createElement('h4');
	h4.classList.add('card-title');
	h4.innerText = data.products[i].name;

	const description = document.createElement('p');
	description.classList.add('card-text');
	description.innerText = data.products[i].description;

	const price = document.createElement('p');
	price.innerText = `€ ${ data.products[i].price }`;

	const button = document.createElement('a');
	button.classList.add('btn', 'btn-lg');
	button.id = i;
	button.href = '#';
	button.innerText = 'In winkelmandje';

	button.addEventListener('click', (e) => {
		e.preventDefault();

		const product = data.products[button.id];

		// Check if product is already in basket
		if(product.inBasket){
			product.amountInBasket++;

			const amountP = document.getElementById(product.name);
			amountP.innerText = `x ${product.amountInBasket}`;

			totalPrice += product.price;
			updatePrice();
		} else {
			product.amountInBasket++;

			const nameP = document.createElement('p');
			nameP.classList.add('mt-4');
		    nameP.innerText = product.name;
		    shoppingBasket.insertBefore(nameP, totalP);

			const amountP = document.createElement('p');
			amountP.id = product.name;
		    amountP.innerText = `x ${product.amountInBasket}`;
			shoppingBasket.insertBefore(amountP, totalP);

	// - button in basket
	const minus = document.createElement('button');
	minus.classList.add('btn', 'me-2');
	minus.id = product.description;
	minus.innerText = '-';
	shoppingBasket.insertBefore(minus, totalP);
	minus.addEventListener('click', (e) => {
		e.preventDefault();

		if(product.amountInBasket > 0){
			product.amountInBasket--;
			const amount = document.getElementById(product.name);
			amount.innerText = `x ${product.amountInBasket}`;
			totalPrice -= product.price;
			updatePrice();
		}
	});
	totalPrice += product.price;
	updatePrice();
	product.inBasket = true;

	// + button in basket
	const plus = document.createElement('button');
	plus.classList.add('btn');
	plus.id = product.description;
	plus.innerText = '+';
	shoppingBasket.insertBefore(plus, totalP);
	plus.addEventListener('click', (e) => {
		e.preventDefault();

		product.amountInBasket++;
		const amount = document.getElementById(product.name);
		amount.innerText = `x ${product.amountInBasket}`;
		totalPrice += product.price;
		updatePrice();
		});
	}
});

	const productArea = document.getElementById('products');
	cardbody.append(h4, description, price);
	carddiv.append(newimage, cardbody, button);
	coldiv.append(carddiv);
	productArea.append(coldiv);
}