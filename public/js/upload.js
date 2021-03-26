window.addEventListener('load', ready)

function ready() {
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginFileEncode,
    )

    FilePond.setOptions({

    })

    FilePond.parse(document.body)
}