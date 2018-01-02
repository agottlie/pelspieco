$(function() {
    console.log("js connected");

    let calendarEvents = [];
    $('.calendarItem').each(function(i) {
        let newObject = {}
        newObject.title = $(this).attr('title');
        newObject.start = $(this).attr('start');
        newObject.description = $(this).attr('description');
        calendarEvents.push(newObject);
    })
    
    console.log(calendarEvents)

    $('#calendar').fullCalendar({
        events: calendarEvents
    });



});