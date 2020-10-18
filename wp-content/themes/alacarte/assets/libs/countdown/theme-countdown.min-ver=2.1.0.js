jQuery(document).ready(function ($) {
    "use strict";
    /**
     * window load event.
     *
     * Bind an event handler to the "load" JavaScript event.
     * @author Chinh Duong Manh
     */
    $(window).on('load', function () {
        ef5_countdown();
    });
    /* CMS Countdown. */
    function ef5_countdown() {
        "use strict";
        var ef5_countdown = [];
        $('.red-countdown').each(function () {
            var ef5_countdown_date = $(this).find('.red-countdown-bar'),
                data_count = ef5_countdown_date.data('count'),
                data_format = ef5_countdown_date.data('format'),
                server_offset = ef5_countdown_date.data('timezone'),
                layout = '';
            /* get local time zone */
            var offset = (new Date()).getTimezoneOffset();
            offset = (-offset / 60) - server_offset;

            if (data_count != undefined) {
                var data_label = ef5_countdown_date.attr('data-label');
                if (data_label != undefined && data_label != '') {
                    data_label = data_label.split(',')
                } else {
                    data_label = ['YEARS', 'MONTHS', 'DAYS', 'HOURS', 'MINUTES', 'SECONDS'];
                }
                switch (data_format) {
                    case 1:  
                        data_format = 'yowdHMS';
                        layout = '<span class="item year"><span class="red-heading amount">{ynn}</span><span class="red-heading title">' + data_label[0] + '</span></span><span class="item month"><span class="red-heading amount">{onn}</span><span class="red-heading title">' + data_label[1] + '</span></span><span class="item week"><span class="red-heading amount">{wnn}</span><span class="red-heading title">' + data_label[2] + '</span></span><span class="item day"><span class="red-heading amount">{dnn}</span><span class="red-heading title">' + data_label[3] + '</span></span><span class="item hour"><span class="red-heading amount">{hnn}</span><span class="red-heading title">' + data_label[4] + '</span></span><span class="item minute"><span class="red-heading amount">{mnn}</span><span class="red-heading title">' + data_label[5] + '</span></span><span class="item second"><span class="red-heading amount">{snn}</span><span class="red-heading title">' + data_label[6] + '</span></span>';
                        break;
                    case 2:  
                        data_format = 'owdHMS';
                        layout = '<span class="item month"><span class="red-heading amount">{onn}</span><span class="red-heading title">' + data_label[1] + '</span></span><span class="item week"><span class="red-heading amount">{wnn}</span><span class="red-heading title">' + data_label[2] + '</span></span><span class="item day"><span class="red-heading amount">{dnn}</span><span class="red-heading title">' + data_label[3] + '</span></span><span class="item hour"><span class="red-heading amount">{hnn}</span><span class="red-heading title">' + data_label[4] + '</span></span><span class="item minute"><span class="red-heading amount">{mnn}</span><span class="red-heading title">' + data_label[5] + '</span></span><span class="item second"><span class="red-heading amount">{snn}</span><span class="red-heading title">' + data_label[6] + '</span></span</span>';
                        break;
                    case 3: 
                        data_format = 'odHMS';
                        layout = '<span class="item month"><span class="red-heading amount">{onn}</span><span class="red-heading title">' + data_label[1] + '</span></span><span class="item day"><span class="red-heading amount">{dnn}</span><span class="red-heading title">' + data_label[3] + '</span></span><span class="item hour"><span class="red-heading amount">{hnn}</span><span class="red-heading title">' + data_label[4] + '</span></span><span class="item minute"><span class="red-heading amount">{mnn}</span><span class="red-heading title">' + data_label[5] + '</span></span><span class="item second"><span class="red-heading amount">{snn}</span><span class="red-heading title">' + data_label[6] + '</span></span>';
                        break;
                    case 4:  
                        data_format = 'wdHMS';
                        layout = '<span class="item week"><span class="red-heading amount">{wnn}</span><span class="red-heading title">' + data_label[2] + '</span></span><span class="item day"><span class="red-heading amount">{dnn}</span><span class="red-heading title">' + data_label[3] + '</span></span><span class="item hour"><span class="red-heading amount">{hnn}</span><span class="red-heading title">' + data_label[4] + '</span></span><span class="item minute"><span class="red-heading amount">{mnn}</span><span class="red-heading title">' + data_label[5] + '</span></span><span class="item second"><span class="red-heading amount">{snn}</span><span class="red-heading title">' + data_label[6] + '</span></span>';
                        break;
                    case 5:  
                        data_format = 'dHMS';
                        layout = '<span class="item day"><span class="red-heading amount">{dnn}</span><span class="red-heading title">' + data_label[3] + '</span></span><span class="item hour"><span class="red-heading amount">{hnn}</span><span class="red-heading title">' + data_label[4] + '</span></span><span class="item minute"><span class="red-heading amount">{mnn}</span><span class="red-heading title">' + data_label[5] + '</span></span><span class="item second"><span class="red-heading amount">{snn}</span><span class="red-heading title">' + data_label[6] + '</span></span>';
                        break;
                    case 6:  
                        data_format = 'HMS';
                        layout = '<span class="item hour"><span class="red-heading amount">{hnn}</span><span class="red-heading title">' + data_label[4] + '</span></span><span class="item minute"><span class="red-heading amount">{mnn}</span><span class="red-heading title">' + data_label[5] + '</span></span><span class="item second"><span class="red-heading amount">{snn}</span><span class="red-heading title">' + data_label[6] + '</span></span>';
                        break;
                }
                data_count = data_count.split(',')
                var austDay = new Date(data_count[0], parseInt(data_count[1]) - 1, data_count[2], parseInt(data_count[3]) + offset, data_count[4], data_count[5]);
                ef5_countdown.push(ef5_countdown_date.countdown({
                    until: austDay,
                    format: data_format,
                    layout: layout
                }));
            }
        });
    }
});