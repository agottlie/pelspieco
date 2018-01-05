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

    });

    let rowCount = 0;

    $('.list-form').on('submit', (e) => {
        e.preventDefault();
        rowCount++;

        let summaryDiv = $(`<div class='rowContainer groceries' row='${rowCount}'></div>`);
        let lowPriceDiv = $(`<div class='rowContainer groceries' row='${rowCount}'></div>`);
        let newName = $("<div></div>").text($(".list-input").val()),
        	lowPriceName = $("<div></div>").text($(".list-input").val()),
            newJetro = $("<div id='jetro'></div>").text($("option:selected", this).attr("jetro").substr(0,7)),
            newDairy = $("<div id ='dairy'></div>").text($("option:selected", this).attr("dairyland").substr(0,7)),
            newBaldor = $("<div id='baldor'></div>").text($("option:selected", this).attr("baldor").substr(0,7)),
            newDollar = $("<div id='dollar'></div>").text($("option:selected", this).attr("dollartree").substr(0,7)),
            newOther = $("<div id='other'></div>").text($("option:selected", this).attr("other").substr(0,7)),
            newQuantity = $("<div><input class='list-quantity-input' value=1 required /></div>"),
            newMeasurement = $("<div></div>").text($("option:selected", this).attr("measurement")),
            newRemove = $(`<div class='remove-grocery' data-id='${rowCount}'>Remove</div>`);

        let prices = [newJetro, newDairy, newBaldor, newDollar, newOther];
        let lowPrice = -1;
        let lowVendor;

        for (let i = 0; i < prices.length; i++) {

            if (Number((prices[i].text()) < lowPrice || lowPrice === -1) && Number(prices[i].text()) > 0) {
                lowPrice = Number(prices[i].text());
                lowVendor = prices[i];
            }
        };

        let vendorClass = "." + lowVendor.attr("id") + "_result";
        let lowPriceVendor=lowVendor.clone();
        lowPriceDiv.append(lowPriceName, lowPriceVendor);

        $(vendorClass).append(lowPriceDiv);

        lowVendor.addClass('green');

        summaryDiv.append(newName, newJetro, newDairy, newBaldor, newDollar, newOther, newQuantity, newMeasurement, newRemove);
        $(".shopping_list").append(summaryDiv);

    });

    $(document.body).on('click', '.remove-grocery', (e) => {
        e.preventDefault();

        let row = $(e.target).attr("data-id");
        $(`.rowContainer[row="${row}"`).remove();
    })


    //--------------END PRICE TOOL SETUP---------------------

})