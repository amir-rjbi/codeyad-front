function loadCkeditor(id, uploadUrl, jwtToken) {
  return ClassicEditor.create(document.querySelector("#" + id), {
    simpleUpload: {
      uploadUrl: uploadUrl,
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    },
    toolbar: {
      items: [
        "heading",
        "highlight",
        "removeFormat",
        "|",
        "bold",
        "italic",
        "underline",
        "alignment",
        "link",
        "|",
        "bulletedList",
        "numberedList",
        "indent",
        "outdent",
        "|",
        "fontBackgroundColor",
        "fontColor",
        "fontSize",
        "|",
        "blockQuote",
        "insertTable",
        "specialCharacters",
        "horizontalLine",
        "|",
        "undo",
        "redo",
        "|",
        "code",
        "codeBlock",
      ],
    },
    language: "fa",
    image: {
      toolbar: [
        "imageTextAlternative",
        "imageStyle:full",
        "imageStyle:side",
        "linkImage",
      ],
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
      ],
    },
    licenseKey: "",
    updateSourceElementOnDestroy: true,
    removePlugins: ["Title"],
  }).then((editor) => {
    return editor;
  });
}
