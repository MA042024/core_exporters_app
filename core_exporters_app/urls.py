""" Url router for the exporters application
"""
from django.conf.urls import url, include
from views.user import ajax as user_ajax, views as user_views


urlpatterns = [
    url(r'^selection', user_ajax.exporters_selection,
        name='core_exporters_app_exporters_selection'),
    url(r'^download', user_views.download_exported_compressed_file,
        name='core_exporters_app_exporters_download'),
    url(r'^status-file', user_ajax.check_download_status,
        name='core_exporters_app_exporters_check_download'),
    url(r'^', include('core_exporters_app.exporters.urls')),
]