""" views exporters app
"""
from django.contrib.admin.views.decorators import staff_member_required
from core_main_app.utils.rendering import admin_render
import core_exporters_app.components.exporter.api as exporter_api
import core_exporters_app.commons.constants as exporter_constants


@staff_member_required
def manage_exporters(request):
    """ Manage exporters, Display as list

    Args:
        request:

    Returns:

    """
    exporter_list = exporter_api.get_all()
    exporter_xslt_list = exporter_api.get_all_by_url(exporter_constants.XSL_URL)

    context = {
        'exporters_list': exporter_list,
        'exporter_xslt_list': exporter_xslt_list
    }

    modals = [
        "core_exporters_app/admin/exporters/list/modals/edit.html",
        "core_exporters_app/admin/exporters/list/modals/associated_templates.html",
        "xsl/admin/exporters/list/modals/add.html"
    ]

    assets = {
        "js": [
            {
                "path": "core_main_app/libs/fSelect/js/fSelect.js",
                "is_raw": False
            },
            {
                "path": 'core_exporters_app/admin/js/exporters/list/modals/edit.js',
                "is_raw": False
            },
            {
                "path": 'core_exporters_app/admin/js/exporters/list/modals/associated_templates.js',
                "is_raw": False
            },
            {
                "path": 'xsl/admin/js/exporters/list/modals/add.js',
                "is_raw": False
            }
        ],
        "css": [
            "core_main_app/libs/fSelect/css/fSelect.css",
            "core_exporters_app/admin/css/exporters/list/list_exporters.css"
        ]
    }

    return admin_render(request,
                        'core_exporters_app/admin/exporters/list_exporters.html',
                        assets=assets,
                        context=context,
                        modals=modals)