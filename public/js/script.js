$(function() {
    console.log("js connected");
    let counter = 0;
    let cartTotal = 0;
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
    let pies = [];

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

    const len = pics.length;

    setInterval(function() {
        counter++;
        if (counter >= len - 1) {
            counter = 0;
        }
        $('.mainPic').attr('src', "images/" + pics[counter]);
    }, 3000);

    const randomString = function() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
        for (i = 0; i < 38; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    $('.totalValue').text(cartTotal);

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

    $('.login-form').on('submit', (e) => {
        e.preventDefault();

        const password = $('.password-input').val();

        const passData = {
            password: password
        }

        $.ajax({
            method: 'PUT',
            url: `/events/login`,
            data: passData,
            success: response => {
                window.location.replace('/events/show')
            },
            error: msg => {
                console.log(msg);
                alert("incorrect password");
            }
        });
    });

    //for sending to review page
    $('.order-form').on('submit', (e) => {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: `/order/review`,
            data: { pies, cartTotal: cartTotal },
            success: response => {
                window.location.replace('/order/review');
            },
            error: msg => {
                console.log(msg);
            }
        });
    })

    //for sending to square payment
    $('.review').on('submit', (e) => {
        e.preventDefault();

        let items = [],
            key = randomString(),
            deliveryValue = false;

        if ($('input[name="method"]:checked').val() === "Delivery") {
            deliveryValue = true;
        }

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

    $(".add").on('click', () => {
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

        $('.cartBox').css("display", "block");
        $('.emptyCart').css("display", "block");
    });

    $(".remove").on('click', () => {
        $('.cart').empty();
        cartItems = [];
        quantities = [];
        cartTotal = 0;
        $('.cartBox').css("display", "none");
        $('.emptyCart').css("display", "none");

    });

})
