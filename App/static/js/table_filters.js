$(document).ready(function () {
    $('#example thead tr')
        .clone(true)
        .addClass('filters')
        .appendTo('#example thead');

    let table = $('#example').DataTable({
        orderCellsTop: true,
        fixedHeader: true,
        paging: true,
        pageLenght: 10,
        lengthChange: true,
        autoWidht: false,
        searching: true,
        order: [[4, 'desc']],
        bInfo: true,
        bSort: true,
        // BUTTONS
        dom: 'lBfrtip',
        buttons: [

            {
                extend: 'copy',
                text: '<i class="fas fa-clone"></i>',
                className: 'btn btn-secondary',
                titleAttr: 'Copy to clipboard',
                exportOptions: {
                    columns: ':visible'
                },
            },
            {
                extend: 'csv',
                text: '<i class="fas fa-file-csv"></i>',
                className: 'btn btn-secondary',
                titleAttr: 'Download as CSV',
                exportOptions: {
                    columns: ':visible'
                },
            },
            {
                extend: 'print',
                text: '<i class="fas fa fa-print"></i>',
                className: 'btn btn-secondary',
                titleAttr: 'Print',
                exportOptions: {
                    columns: ':visible'
                },
                customize: function (win) {
                    $(win.document.body).css('font-size', '10pt')
                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            },
            {
                extend: 'pdfHtml5',
                download: 'open',
                text: '<i class="fas fa-file-pdf"></i>',
                className: 'btn btn-secondary',
                titleAttr: 'Download as PDF',
                exportOptions: {
                    columns: ':visible'
                },
                // Center the table
                tableHeader: {
                    alignment: 'center'
                },
                customize: function (doc) {
                    doc.styles.tableHeader.alignment = 'center';
                    doc.styles.tableBodyOdd.alignment = 'center';
                    doc.styles.tableBodyEven.alignment = 'center';
                    doc.styles.tableHeader.fontSize = 7;
                    // doc.defaultStyle.fontSize = 6;
                    //doc.content[1].table.widths =
                    //    Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                }
            },
            {
                extend: 'colvis',
                text: 'Columns'
            },
        ],
        initComplete: function () {
            let api = this.api();

            // Set the columns you wish filtering
            api
                .columns([0, 1, 2, 3, 4, 5])
                .eq(0)
                .each(function (colIdx) {
                    let cell = $('.filters th').eq(
                        $(api.column(colIdx).header()).index()
                    );
                    let title = $(cell).text();
                    $(cell).html('<input type="text" placeholder="' + title + '"/>');
                    $(
                        'input',
                        $('.filters th').eq($(api.column(colIdx).header()).index())
                    )
                        .off('keyup change')
                        .on('keyup change', function (e) {
                            e.stopPropagation();
                            // Get the search value
                            $(this).attr('title', $(this).val());
                            let regexr = '({search})'; //$(this).parents('th').find('select').val();

                            let cursorPosition = this.selectionStart;
                            // Search the column for that value
                            api
                                .column(colIdx)
                                .search(
                                    this.value != ''
                                        ? regexr.replace('{search}', '(((' + this.value + ')))')
                                        : '',
                                    this.value != '',
                                    this.value == ''
                                )
                                .draw();
                        })
                        .on('keyup', function (e) {
                            e.stopPropagation();

                            $(this).trigger('change');
                            $(this)
                                .focus()[0]
                                .setSelectionRange(cursorPosition, cursorPosition);
                        });
                });
        },
    });
    // Enable search box outside
    let newSearch = $("#example").DataTable();
    $('#search').keyup(function () {
        newSearch.search($(this).val()).draw();
    });
});
