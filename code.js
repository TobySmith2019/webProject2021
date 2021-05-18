//Setting up array with the products in it for being pushed into the HTML page later
var products = [
  ['Purple Shirt', "images/shirt2.png", 6.78, 'description'],
  ['Pink Shirt', "images/shirt1.png", 6.78, 'description'],
  ['Blue Shirt', "images/shirt3.png", 6.78, 'description'],
  ['Pink Hoodie', "images/hoodie2.png", 3.94, 'description'],
  ['Blue Hoodie', "images/hoodie1.png", 3.94, 'description'],
  ['Red Hoodie', "images/hoodie3.png", 3.94, 'description']
];

//Quantity of each product, set to 0 initially, used for displaying items in the cart
var quantity = [
  0, 0, 0, 0, 0, 0
];

//Pushes products onto the products page along with the corresponding buttons to add to cart
function loadProducts() {
    var main = document.getElementById('shopping');

    for (var i = 0; i < products.length; i++) {

        //Creating elements for pushing into HTML page
        var ele = document.createElement('li');
        var title = document.createElement('h1');
        var img = document.createElement('img');
        var price = document.createElement('h2');
        var desc = document.createElement('p');
        var subtract = document.createElement('button');
        var input = document.createElement('input');
        var add = document.createElement('button');
        var addCart = document.createElement('button');
        var p = 0;

        //Assigning elements to a parent element in order to assign where they appear on the page
        main.appendChild(ele);
        ele.appendChild(title);
        ele.appendChild(img);
        ele.appendChild(price);
        ele.appendChild(desc);
        ele.appendChild(subtract);
        ele.appendChild(input);
        ele.appendChild(add);
        ele.appendChild(addCart);

        //Adding information to the elements so they actually have something to display, a lot of information comes from arrays
        title.innerHTML = products[i][0];
        img.src = products[i][1];
        img.width = 300;
        img.height = 360;
        price.innerHTML = '$' + products[i][2];
        desc.innerHTML = products[i][3];
        subtract.innerHTML = '-';
        subtract.id = "s" + i;
        input.value = 1;
        input.type = "number";
        input.id = 'input' + i;
        add.id = "a" + i;
        add.innerHTML = '+';

        subtract.onclick = function () {
            subNum(i);
        };
        addCart.innerHTML = 'Add To Cart';
        addCart.id = "cart" + i;
    }
    changeNum();
    addToCart();
}

//Allows input box with number of items to change when buttons pressed
//Assigns an onclick element to each individual button
function changeNum() {
    document.getElementById("a0").onclick = function () {
        addNum(0);
    };
    document.getElementById("a1").onclick = function () {
        addNum(1);
    };
    document.getElementById("a2").onclick = function () {
        addNum(2);
    };
    document.getElementById("a3").onclick = function () {
        addNum(3);
    };
    document.getElementById("a4").onclick = function () {
        addNum(4);
    };
    document.getElementById("a5").onclick = function () {
        addNum(5);
    };
    document.getElementById("s0").onclick = function () {
        subNum(0);
    };
    document.getElementById("s1").onclick = function () {
        subNum(1);
    };
    document.getElementById("s2").onclick = function () {
        subNum(2);
    };
    document.getElementById("s3").onclick = function () {
        subNum(3);
    };
    document.getElementById("s4").onclick = function () {
        subNum(4);
    };
    document.getElementById("s5").onclick = function () {
        subNum(5);
    };
}

//Makes the add to cart button work and triggers another function to change the quantity of the quantity array so that they appear in the cart
function addToCart() {
    document.getElementById("cart0").onclick = function () {
        cart(0);
    }
    document.getElementById("cart1").onclick = function () {
        cart(1);
    }
    document.getElementById("cart2").onclick = function () {
        cart(2);
    }
    document.getElementById("cart3").onclick = function () {
        cart(3);
    }
    document.getElementById("cart4").onclick = function () {
        cart(4);
    }
    document.getElementById("cart5").onclick = function () {
        cart(5);
    }
}

//Increases values of quantity array to signify items being added to the cart
function cart(num) {
    var input = document.getElementById('input' + num).value;
    quantity[num] = localStorage.getItem("quantity" + num);
    for (var i = 0; i < input; i++) {
        quantity[num]++;
        console.log(quantity[num]);
        localStorage.setItem("quantity" + num, quantity[num]);
    }
    document.getElementById('input' + num).value = 1;
}

//Increases value of input box when add button is pushed
function addNum(num) {
    var inputValue = document.getElementById('input' + num).value;
    inputValue++;
    document.getElementById('input' + num).value = inputValue;
}

//Decreases value of input box when minus button is pushed
function subNum(num) {
    var inputValue = document.getElementById('input' + num).value;
    if (inputValue > 1) {
        inputValue--;
        document.getElementById('input' + num).value = inputValue;
    }
}

//Loads items which were added to the cart on the cart page and displays a message if no items are in the cart, also adds total cost at bottom of page if items are in cart
function cartProducts() {
    var main = document.getElementById('cartItems');
    var totalCost = 0;
    var allZero = "true";
    for (var i = 0; i < products.length; i++) {
        quantity[i] = localStorage.getItem("quantity" + i);
        //Checking whether any items have been added to cart
        if (quantity[i] > 0) {
            allZero = "false";
        }
        var add = quantity[i] * products[i][2];
        totalCost = totalCost + add;
        totalCost = Math.round((totalCost + Number.EPSILON) * 100) / 100;
    }
    //if no items in cart, display message saying no items
    if (allZero == "true") {
        var main1 = document.getElementById('noProducts');
        var ele = document.createElement('li');
        var text = document.createElement('p');
        main1.appendChild(ele);
        ele.appendChild(text);
        text.innerHTML = "Your Cart Is Empty :("
    } else {
        var main2 = document.getElementById('total')
        var ele = document.createElement('li');
        var grandTotal = document.createElement('p');

        main2.appendChild(ele);
        ele.appendChild(grandTotal);

        grandTotal.innerHTML = "Total: $" + totalCost;
    }
    //Pushes products onto page
    for (var i = 0; i < products.length; i++) {
        if (quantity[i] > 0) {
            //Creating elements for pushing into HTML page
            var ele = document.createElement('li');
            var img = document.createElement('img');
            var title = document.createElement('h1');
            var price = document.createElement('h2');
            var quan = document.createElement('p');
            var delet = document.createElement('button');
            var total = document.createElement('p');

            //Assigning elements to a parent element in order to assign where they appear on the page
            main.appendChild(ele);
            ele.appendChild(img);
            ele.appendChild(title);
            ele.appendChild(price);
            ele.appendChild(quan);
            ele.appendChild(delet);
            ele.appendChild(total);

            //Adding information to the elements so they actually have something to display, a lot of information comes from arrays
            img.src = products[i][1];
            title.innerHTML = products[i][0];
            price.innerHTML = "$" + products[i][2];
            quan.innerHTML = "Quantity: " + quantity[i];
            delet.innerHTML = "Delete";
            delet.id = "d" + i;
            total.innerHTML = "$" + Math.round((products[i][2] * quantity[i] + Number.EPSILON) * 100) / 100;;
        }
    }

    deleteItems();
}

//Assigns onclick elements to the delete buttons if they have been added to the cart
function deleteItems() {
    if (quantity[0] > 0) {
        document.getElementById("d0").onclick = function () {
            delet(0);
        };
    }
    if (quantity[1] > 0) {
        document.getElementById("d1").onclick = function () {
            delet(1);
        };
    }
    if (quantity[2] > 0) {
        document.getElementById("d2").onclick = function () {
            delet(2);
        };
    }
    if (quantity[3] > 0) {
        document.getElementById("d3").onclick = function () {
            delet(3);
        };
    }
    if (quantity[4] > 0) {
        document.getElementById("d4").onclick = function () {
            delet(4);
        };
    }
    if (quantity[5] > 0) {
        document.getElementById("d5").onclick = function () {
            delet(5);
        }
    }
}

//Decreases values of quantity array in cart when delete button is pressed
function delet(num) {
    localStorage.setItem("quantity" + num, quantity[num] - 1);
    window.location.reload();
}
