// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(dailyPlanner);

function dailyPlanner(params) {

    //shows the curernt date
    function getTime(params) {
        let todayDate = dayjs().format('[Today is ]dddd MMMM YYYY');
        $('#currentDay').text(todayDate);
    }
    
    let currentHour = dayjs().format('H');

    //identifies hours from ID and sers
    function calculateColour (params) {
        $('.time-block').each(function() {
            let rowHour = parseInt(this.id);
            console.log(rowHour)
            $(this).toggleClass('past', rowHour < currentHour);
            $(this).toggleClass('present', rowHour === currentHour);
            $(this).toggleClass('future', rowHour > currentHour);
        });
    }

    //changes classes to change color
    function changeColour() {
        $('.time-block').each(function() {
          let rowHour = parseInt(this.id);
          if (rowHour == currentHour) {
            $(this).removeClass('past future').addClass('present');
          } else if (rowHour < currentHour) {
            $(this).removeClass('future present').addClass('past');
          } else {
            $(this).removeClass('past present').addClass('future');
          }
        });
    }

    // sends custom text to local storage after clicking save
    function customText() {
      $('.saveBtn').on('click', function() {
        let key = $(this).parent().attr('id');
        let value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      });
    }

    // grabs from local storage and displays text
    $('.time-block').each(function() {
      let key = $(this).attr('id');
      let value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });

    //calls all the functions to run the planner
    customText();
    calculateColour();
    changeColour();
    setInterval(getTime, 1000);
}
