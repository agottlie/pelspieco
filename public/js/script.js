$(function() {
    console.log("js connected");

    //initialize variables
    const pics = [
        "img_8857_2.jpg",
        "img_8912.jpg",
        "img_8916.jpg",
        "img_8917.jpg",
        "apple.jpg",
        "counter.jpg",
        "counterculture.jpg",
        "hotchocolate.jpg",
        "ofpelspies.jpg",
        "piew_drizzle.jpg",
        "pumpkins1.jpg",
        "boxed up-crop-u1503.jpg"
    ];
    let pies = [],
        shipping = 0,
        counter = 0,
        cartTotal = 0;

    let pieInfo = {
        "Raspberry Almond Frangipane": {
            "description": "Fresh raspberries in soft almond cream.",
            "photo": ""
        },
        "Country Apple": {
            "description": "Tart apple pieces in a buttery-sweet sauce with plenty of spices in a double crust.",
            "photo": ""
        },
        "Grapefruit Honey Lavender": {
            "description": "Mellow citrus custard topped with a fluffy layer of honey and lavender flowers.",
            "photo": ""
        },
        "Fig Buttermilk": {
            "description": "Mediterranean figs blended with honey, lemon and spices in a tangy buttermilk custard.",
            "photo": ""
        },
        "Black Bottom Pumpkin": {
            "description": "Creamy browned butter pumpkin spice filling covering dark chocolate ganache.",
            "photo": ""
        },
        "Pecan": {
            "description": "Classic buttery pecan pie with vanilla (and no corn syrup).",
            "photo": ""
        },
        "Baked Chocolate": {
            "description": "Just set chocolate custard, light and creamy.",
            "photo": ""
        },
        "Passionfruit Custard": {
            "description": "Tangy passionfruit custard with a fluffy top layer.",
            "photo": ""
        },
        "Blueberry Cobbler Pie": {
            "description": "Juicy blueberries in our famous buttery crust with a cobbler topping.",
            "photo": ""
        },
        "Peach Cobbler Pie": {
            "description": "Fresh peach halves baked in our famous buttery crust with a cobbler topping.",
            "photo": ""
        },
        "Roasted Red Pepper Cheddar Frittata": {
            "description": "Roasted red pepper and sharp cheddar in a savory egg custard with nutmeg and herbs de province (keto friendly).",
            "photo": ""
        },
        "Spinach Ricotta Frittata": {
            "description": "Spinach and fresh ricotta cheese baked in a savory egg custard with nutmeg and herbs de province (keto friendly).",
            "photo": ""
        },
        "Bacon Cheddar Frittata": {
            "description": "Crispy bacon and sharp cheddar in a savory egg custard with nutmeg and herbs de province (keto friendly).",
            "photo": ""
        },
        "Tomato Basil Cheddar Pie": {
            "description": "Fresh tomatoes and basil pesto baked in our famous buttery crust with sharp cheddar and Dijon sauce on top.",
            "photo": ""
        },
        "Pear Almond Frangipane": {
            "description": "Fresh pears in soft almond cream.",
            "photo": ""
        },
        "Chocolate Mousse": {
            "description": "Light and chilled Italian meringue mousse.",
            "photo": ""
        },
        "Peach": {
            "description": "Fresh peach halves baked in our famous buttery double crust.",
            "photo": ""
        },
        "Blueberry": {
            "description": "Juicy blueberries in our famous buttery double crust.",
            "photo": ""
        },
        "Coconut Custard": {
            "description": "Toasted coconut based in a rich, creamy custard.",
            "photo": ""
        },
        "Sweet Potato Marshmallow": {
            "description": "Brown butter, sweet potato filling with toasted marshmallows on top.",
            "photo": ""
        },
        "Banana Creme": {
            "description": "Chilled banana custard with thin slices of fresh banana.",
            "photo": ""
        },
        "Cherry": {
            "description": "Succulent cherries in our famous buttery double crust.",
            "photo": ""
        },
        "Black Forest Cherry": {
            "description": "Dark chocolate custard studded with plump, fresh cherries.",
            "photo": ""
        },
        "Strawberry Rhubarb": {
            "description": "Tangy rhubarb baked with sweet fresh strawberries in a buttery lattice-topped crust.",
            "photo": ""
        },
        "Rhubarb": {
            "description": "Tangy rhubarb baked in a buttery lattice-topped crust.",
            "photo": ""
        },
    };


    //---------------MAIN PAGE SETUP-------------------

    //flatpickr setup for event date chooser
    flatpickr(".date-input", { altInput: true, minDate: "today" });
    flatpickr(".time-input", {
        enableTime: true,
        noCalendar: true,
        enableSeconds: false,
        time_24hr: false,
        dateFormat: "h:i K",
        defaultHour: 12,
        defaultMinute: 0
    });

    let month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    for (i = 0; i < $('.date').length; i++) {
        let date = new Date($('.date').eq(i).text());
        $('.date').eq(i).text(month[date.getMonth()] + " " + date.getDate());
    }

    //----------PICS CAROUSEL--------------------

    //rotates a new pic as the display every 3 seconds
    const len = pics.length;
    setInterval(function() {
        counter++;
        if (counter >= len - 1) {
            counter = 0;
        }
        $('.mainPic').attr('src', "images/" + pics[counter]);
    }, 3000);


    $(document.body).on('click', '.left', function() {
        if (counter <= 0) {
            counter = len - 1;
        } else {
            counter--;
        }
        $('.mainPic').attr('src', "images/" + pics[counter]);
    });

    $(document.body).on('click', '.right', function() {
        counter++;
        if (counter >= len - 1) {
            counter = 0;
        }
        $('.mainPic').attr('src', "images/" + pics[counter]);
    });
    //------------END PICS CAROUSEL----------------

    //------------DROPDOWN MENU SETUP--------------


    $(document.body).on('click', ".mobile", function() {
        if ($('.dropdown-content').css("display") === "none") {
            $('.dropdown-content').show();
        } else {
            $('.dropdown-content').hide();
        }
    });

    //----------END DROPDOWN MENU SETUP--------------

    //-----------------END MAIN PAGE SETUP----------------




    //-----------------MAIN ORDERS PAGE SETUP--------------------
    $('.totalValue').text(cartTotal);

    //random string generator for idempotency key
    const randomString = function() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
        for (i = 0; i < 38; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    //fills description and photo
    $(document).ready(function() {
        $('.pieDescription').text(pieInfo[$('.pie-input option:selected').attr('name')].description);
        $('.pieImage').attr("src", pieInfo[$('.pie-input option:selected').attr('name')].photo)
    })
    $(".addItem").on('change', () => {
        $('.pieDescription').text(pieInfo[$('.pie-input option:selected').attr('name')].description);
        $('.pieImage').attr("src", pieInfo[$('.pie-input option:selected').attr('name')].photo)
    })

    //adds an item to teh shopping cart
    $(".add").on('click', () => {
        //checks to make sure quantity is a positive integer
        if ($('.quantity').val() > 0 && $('.quantity').val() % 1 === 0) {
            let newItem = $('<div class="cartItem">');
            newItem.html($('.pie-input option:selected').attr('name') + "&nbsp; &nbsp; x " + $('.quantity').val() + "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $" + parseInt($('.quantity').val()) * 30 + ".00");
            $('.cart').prepend(newItem);
            cartTotal += parseInt($('.quantity').val()) * 30;
            $('.totalValue').text(cartTotal);
            let pie = {}
            pie.id = $('.pie-input').val();
            pie.quantity = $('.quantity').val();
            pie.name = $('.pie-input option:selected').attr('name');
            pie.amount = parseInt(pie.quantity) * 30;
            pies.push(pie);
            shipping += parseInt($('.quantity').val());

            $('.cartBox').css("display", "block");
            $('.emptyCart').css("display", "block");
        }
    });

    //empties shopping cart
    $(".remove").on('click', () => {
        $('.cart').empty();
        cartItems = [];
        quantities = [];
        pies = [];
        cartTotal = 0;
        shipping = 0;
        $('.cartBox').css("display", "none");
        $('.emptyCart').css("display", "none");
    });

    //for sending to review page
    $('.order-form').on('submit', (e) => {
        e.preventDefault();
        if (shipping > 0) {
            shipping = (shipping + 1) * 5;
            cartTotal += shipping;
        }
        $.ajax({
            method: 'POST',
            url: `/order/review`,
            data: { pies, cartTotal: cartTotal, shipping: shipping },
            success: response => {
                window.location.replace('/order/review');
            },
            error: msg => {
                console.log(msg);
            }
        });
    })

    //-----------------END MAIN ORDERS PAGE SETUP----------------



    //-----------------REVIEW PAGE SETUP-------------------------

    //toggles shipping display
    $('input[name="method"]').on('change', () => {
        if ($('input[name="method"]:checked').val() === "Delivery") {
            $('.shipping').css('display', 'block');
            $('.totalValueReview').text(parseInt($('.totalValueReview').text()) + parseInt($('#shipping').text()));
        } else {
            $('.shipping').css('display', 'none');
            $('.totalValueReview').text(parseInt($('.totalValueReview').text()) - parseInt($('#shipping').text()));
        }
    })

    //for sending to Square payment page
    $('.review').on('submit', (e) => {
        e.preventDefault();

        let items = [],
            key = randomString(),
            deliveryValue = false;

        //checks if order is delivery or pickup
        if ($('input[name="method"]:checked').val() === "Delivery") {
            deliveryValue = true;
        }

        //creates a new object for each item on the invoice
        for (i = 0; i < $('.cartItem').length; i++) {
            let newItem = {};
            newItem.id = $('.cartItem').eq(i).data('id');
            newItem.quantity = $('.cartItem').eq(i).data('quantity');
            newItem.name = $('.cartItem').eq(i).data('name');
            newItem.amount = $('.cartItem').eq(i).data('amount');
            items.push(newItem);
        }

        $.ajax({
            method: 'POST',
            url: `/order/`,
            data: { items, key: key, deliveryValue: deliveryValue },
            success: response => {
                window.location.replace(`https://connect.squareup.com/v2/checkout?c=${response.id}&l=EYXHZ8T51YJ2A`);
            },
            error: msg => {
                console.log(msg);
            }
        });
    })

    //-------------END REVIEW PAGE SETUP----------------




    //-----------------EVENTS PAGE SETUP--------------------
    //creates a new event object based on user input
    $('.event-form').on('submit', (e) => {
        e.preventDefault();

        const email = $('.email-input').val(),
            first_name = $('.first-name-input').val(),
            last_name = $('.last-name-input').val(),
            phone = $('.phone-input').val(),
            num_people = $('.people-input').val(),
            type_of_event = $('.type-input').val(),
            event_date = $('.date-input').val(),
            event_time = $('.time-input').val();

        const newEvent = {
            email: email,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            num_people: num_people,
            type_of_event: type_of_event,
            event_date: event_date,
            event_time: event_time
        }

        $.ajax({
            method: 'POST',
            url: `/events/`,
            data: newEvent,
            success: response => {
                window.location.replace('/events/thanks')
            },
            error: msg => {
                console.log(msg);
            }
        });
    });

    //-----------------END EVENTS PAGE SETUP----------------

    //-----------------CALENDAR SETUP-----------------------
    $('.calendar-form').on('submit', (e) => {
        e.preventDefault();

        const title = $('.title-input').val(),
            description = $('.description-input').val(),
            calendar_date = $('.date-input').val(),
            calendar_time = $('.time-input').val();

        const newEvent = {
            title: title,
            description: description,
            calendar_date: calendar_date,
            calendar_time: calendar_time
        }

        $.ajax({
            method: 'POST',
            url: `/admin/calendar/`,
            data: newEvent,
            success: response => {
                window.location.replace('/admin/calendar')
            },
            error: msg => {
                console.log(msg);
            }
        });
    });

    //--------------END CALENDAR SETUP-----------------------



    //--------------PRICE TOOL SETUP-------------------------

    $('.name-input').on('change', () => {
        if ($('.name-input').val() === 'new') {
            $('.new-item-input').show();
        } else {
            $('.new-item-input').hide();
        }
    })

    $('.measurement-input').on('change', () => {
        if ($('.measurement-input').val() === 'weight') {
            $('.weight-input').show();
            $('.volume-input').hide();
        } else if ($('.measurement-input').val() === 'volume') {
            $('.weight-input').hide();
            $('.volume-input').show();
        } else {
            $('.weight-input').hide();
            $('.volume-input').hide();   
        }
    })

    $('.price-form').on('submit', (e) => {
        e.preventDefault();

        //base units are pounds and cups
        const vendor = $('.vendor-input').val(),
            name = $('.new-item-input').val();
        let measurement = "unit",
            price = $('.price-input').val() / $('.quantity-input').val()

        if ($('.measurement-input').val() === 'weight') {
            if ($('.weight-input').val() === 'grams') {
                price *= 453.592;
            } else if ($('.weight-input').val() === 'ounces') {
                price *= 16;
            }
            measurement = "pound"
        } else if ($('.measurement-input').val() === 'volume') {
            if ($('.volume-input').val() === 'tablespoons') {
                price *= 16.2307;
            } else if ($('.volume-input').val() === 'fluid_ounces') {
                price *= 8.11537;
            } else if ($('.volume-input').val() === 'quarts') {
                price *= 0.253605;
            } else if ($('.volume-input').val() === 'liters') {
                price *= 0.24;
            } else if ($('.volume-input').val() === 'milliliters') {
                price *= 240;
            }
            measurement = "cup"
        } 

        let newEvent = {
            name: name,
            measurement: measurement,
            price: price,
            vendor: vendor
        }

        if ($('.name-input').val() === "new") {
            $.ajax({
                method: 'POST',
                url: `/price/`,
                data: newEvent,
                success: response => {
                    window.location.replace('/price/add')
                },
                error: msg => {
                    console.log(msg);
                }
            });
        } else {
            newEvent.id = $('.name-input').val();
            $.ajax({
                method: 'PUT',
                url: `/price/`,
                data: newEvent,
                success: response => {
                    window.location.replace('/price/add')
                },
                error: msg => {
                    console.log(msg);
                }
            });
        }

    });


    //--------------END PRICE TOOL SETUP---------------------

})