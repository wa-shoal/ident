const increment = document.getElementById('increment');
const decrement = document.getElementById('decrement');
const qty = document.getElementById('qty');
const basketBtn = document.getElementById('add-to-basket');
const basketContent = document.getElementById('basket-content');
const accordionBlocks = document.querySelectorAll('.accordion-block');
const projectBtn = document.getElementById('add-to-project');
const projectMessage = document.getElementById('project-login');
const mobileBasketBtn = document.getElementById('mobile-basket-btn');
const previewInput = document.getElementById('preview-input');
const previewText = document.getElementById('preview-text');
const labelPreviewImage = document.getElementById('image-preview');
const customHeight = document.getElementById('custom-height');
const customWidth = document.getElementById('custom-width');
const updateCustom = document.getElementById('update-custom');
const productPrice = document.getElementById('ex-vat');
const productPriceVAT = document.getElementById('inc-vat');

increment.addEventListener('click', function(e) {
	qty.value++;
	
	e.preventDefault();
});

decrement.addEventListener('click', function(e) {
	qty.value--;
	
	e.preventDefault();
});

basketBtn.addEventListener('click', function(e) {
	if(qty.value < 1) {
	   message.innerHTML = '<p class="error">Please select a quantity of more than 1.</p>';
	}
	
	e.preventDefault();
});

projectBtn.addEventListener('click', function(e) {
	projectMessage.innerHTML = '<span class="show-project-message">Please login to your account.</span>';
	
	setTimeout(function() {
       projectMessage.remove();
    }, 8000);
	
	e.preventDefault();
});

accordionBlocks.forEach(function(accordion) {
	accordion.addEventListener('click', function() {
	    let showContent = this.nextElementSibling;
		showContent.classList.toggle('show');
		if(showContent.classList.contains("show")) {
			accordion.style.borderBottom = "none";
		} else {
			accordion.style.borderBottom = "1px solid #a4bcc2";
		}
	});
});

// Mobile add to basket button
window.onscroll = function() { showMobileBasketBtn() };

function showMobileBasketBtn() {
	if (document.body.scrollTop > 1150 || document.documentElement.scrollTop > 1150) {
		mobileBasketBtn.classList.add('show-mobile-btn');
	} else {
		mobileBasketBtn.classList.remove('show-mobile-btn');
   }
}

// Show hidden basket
const hiddenBasket = document.getElementById('hidden-basket-container');
const closeBasket = document.getElementById('close');

basketBtn.addEventListener('click', function() {
	hiddenBasket.classList.add('show-hidden-basket');
	hiddenBasket.classList.remove('hide-hidden-basket');
});

closeBasket.addEventListener('click', function() {
	hiddenBasket.classList.remove('show-hidden-basket');
	hiddenBasket.classList.add('hide-hidden-basket');
});

// Label Preview
previewInput.addEventListener('keyup', function() {
	if(previewInput.value === '') {
		previewText.innerHTML = 'CABLECRAFT';
	} else {
		previewText.innerHTML = previewInput.value;
	}
});


// Basket event listeners
function loadEventListeners() {
	basketBtn.addEventListener('click', addToBasketClicked);
}

loadEventListeners();


// Add to basket
function addToBasketClicked() {
	const productTitle = document.getElementsByClassName('product-title')[0].innerText;
	const productImage = document.getElementsByClassName('small-image')[0].src;
	const customerText = document.getElementById('textarea-input').value;
	const sku = document.getElementById('sku').innerText;
	console.log(productTitle, productPrice, productImage, customerText);
	addToBasket(productTitle, productPrice, productImage, customerText, sku);
}

function addToBasket(productTitle, productPrice, productImage, sku) {
	const basketRow = document.createElement('div');
	basketRow.classList.add('basket-products');
	const basketItems = document.getElementsByClassName('basket-products')[0];
	const calc = productPrice.innerText * qty.value;
	const total = calc.toFixed(2);
	const basketContents = `<table class="basket-table">
							<tbody>
							<tr>
							<td><img src="${productImage}" alt="" id="main-image" class="table-image"></td>
							<td><span class="table-sku">${sku}</span>
								<span class="table-title">${productTitle}</span></td>
							</tr>
							<tr>
								<td class="table-price">£${total}
								<td class="table-qty">Qty: ${qty.value}</td>
								<td class="basket-delete"><i class="fas fa-trash-alt delete"></i></td>
							</tr>
							</tbody>
						</table>`;
	basketRow.innerHTML = basketContents;
	basketItems.append(basketRow);
}

// Label prices
const size100x100 = 17.50;
const size150x150 = 25.50;

updateCustom.addEventListener('click', customDimensions)

function customDimensions() {
	if(customHeight.value == 100 || customWidth.value == 100) {
		productPrice.innerText = size100x100.toFixed(2);
	} if(customHeight.value == 150 || customWidth.value == 150) {
		productPrice.innerText = size150x150.toFixed(2);
	}
}