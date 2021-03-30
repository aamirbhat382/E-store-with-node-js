window.addEventListener('load', ready)

function ready() {
    FilePond.registerPlugin(

        // encodes the file as base64 data
        FilePondPluginFileEncode,
        // previews dropped images
        // FilePondPluginImagePreview
    );

    // Select the file input and use create() to turn it into a pond
    FilePond.create(
        document.querySelector('.filepond')
    );
}