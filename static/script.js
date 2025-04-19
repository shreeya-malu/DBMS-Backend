$(document).ready(function () {
    let eventLinks = [];

    $.get('/api/events', function (data) {
        eventLinks = data;

        // Set the initial Apply Here link
        $('#apply').attr('href', eventLinks[0].apply_link);

        // Update carousel images if needed
        eventLinks.forEach((event, index) => {
            $('#myCarousel .carousel-inner .item').eq(index).find('img').attr('src', event.image_url);
        });
    });

    $('#myCarousel').on('slid.bs.carousel', function () {
        const index = $('#myCarousel .carousel-inner .item.active').index();
        $('#apply').attr('href', eventLinks[index]?.apply_link || '#');
    });
});

$(document).ready(function () {
    let eventsData = [];

    // Fetch the events from the backend
    $.get('/api/events', function (events) {
      if (!events || !events.length) return;

      eventsData = events;

      const indicators = $('.carousel-indicators');
      const inner = $('.carousel-inner');

      // Populate carousel items and indicators
      events.forEach((event, index) => {
        indicators.append(
          `<li data-target="#myCarousel" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>`
        );

        inner.append(
          `<div class="item ${index === 0 ? 'active' : ''}">
              <img src="${event.image_url}" alt="${event.title}">
          </div>`
        );
      });

      // Set the initial "Apply here" button link
      $('#apply').attr('href', events[0].apply_link);
    });

    // When carousel slide changes, update the Apply button
    $('#myCarousel').on('slid.bs.carousel', function () {
      const index = $('#myCarousel .carousel-inner .item.active').index();
      const newLink = eventsData[index]?.apply_link || '#';
      $('#apply').attr('href', newLink);
    });
  });