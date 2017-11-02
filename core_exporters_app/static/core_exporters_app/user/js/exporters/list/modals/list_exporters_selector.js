var data_url_selected = [];
var templates_list = [];

$(document).ready(function() {
    $('#btn-explore-example-export').on('click', exporterSelectionOpenModal);
    $('#btn-exporter-selection-save').on('click', submitExporterSelectionForm);
});


/**
 * Exporter selection form
 */
exporterSelectionOpenModal = function(event) {
    event.preventDefault();
    loadExporterSelectionForm();
};


/**
 * AJAX call, loads exporter selection form
 */
loadExporterSelectionForm = function(){
    // re init the list
    data_url_selected = [];
    templates_list = JSON.parse($("#templates-export").html());
    $(".results-page input:checked").each(function() {
        data_url_selected.push($(this).val());
        var template_id = $(this).attr("data-template-id");
        if (template_id){
            templates_list.push(template_id);
        }
    });

    if (data_url_selected.length != 0) {
        $.ajax({
            url: exporterOpenFormUrl,
            type: "POST",
            dataType: "json",
            data: {
                'templates_list': templates_list,
                'data_url_list': data_url_selected
            },
            success: function (data) {
                $("#select-exporters-modal").modal("show");
                $("#banner_errors").hide();
                $("#form-exporter-selection").html(data.template);
            },
            error: function (data) {
                if (data.responseText != "") {
                    $("#form-exporter-selection-errors").html(data.responseText);
                    $("#banner_errors").show(500);
                    return false;
                }
                return true;
            }
        });
    }else{
        showErrorModal("Please select data to export");
    }
};

/**
 * AJAX call, submit exporter selection form
 */
submitExporterSelectionForm = function(){
    var formData = new FormData($("#form-exporter-selection")[0]);
    formData.append("templates_id", templates_list);
    formData.append("data_url_list", data_url_selected);
    // Need to be initialized. window.open not working in asynchronous call (Safari)
    // https://stackoverflow.com/questions/20696041/window-openurl-blank-not-working-on-imac-safari

    var windowReference = window.open();

    $.ajax({
        url : exporterSelectionUrl,
        type : "POST",
        cache: false,
        contentType: false,
        processData: false,
        async: true,
        data: formData,
        success: function(data){
            $("#select-exporters-modal").modal("hide");
            windowReference.location = data.url_to_redirect;
        },
        error:function(data){
            if (data.responseText != ""){
                $("#form-exporter-selection-errors").html(data.responseText);
                $("#banner_errors").show(500);
                return false;
            }
            return true;
        }
    });
};
