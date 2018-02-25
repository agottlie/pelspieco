$(function() {
    console.log("js connected");

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

        alert("Item Added");

    });

})