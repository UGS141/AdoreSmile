

function downloadOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Create a text file with order details
    const content = `
Order Details:
ID: ${order.id}
Product: ${order.product}
Status: ${order.status}
Date: ${order.date}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `order-${orderId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
}



// document.addEventListener('DOMContentLoaded', function() {
//     const orderButtons = document.querySelectorAll('.order-type-btn');
//     const uploadSection = document.getElementById('uploadSection');
//     const dropZone = document.getElementById('dropZone');
//     const fileList = document.getElementById('fileList');
//     const submitButton = document.getElementById('submitOrder');
//     const certifyCheckbox = document.getElementById('certify');
//     const orderReference = document.getElementById('orderReference');
    
//     let files = [];
//     const toothContainer = document.getElementById("toothContainer");
//     toothContainer.innerHTML = ""; // Clear previous icons
//     const toothImages = [
//         "images/tooth_1.png", "images/tooth_1.png", "images/tooth_1.png", "images/tooth_1.png", // Upper row
//         "images/tooth_1.png", "images/tooth_1.png", "images/tooth_1.png", "images/tooth_1.png"  // Lower row
//     ];
    
//     toothImages.forEach((src, index) => {
//         const toothElement = document.createElement("div");
//         toothElement.classList.add("tooth");
//         toothElement.style.backgroundImage = `url(${src})`;
//         toothElement.setAttribute("data-id", index);

//         // Toggle selection on click
//         toothElement.addEventListener("click", function () {
//             this.classList.toggle("selected");
//         });

//         toothContainer.appendChild(toothElement);
//     });

//     orderButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             uploadSection.style.display = 'block';
//             orderButtons.forEach(btn => btn.classList.remove('selected'));
//             button.classList.add('selected');
//             // Scroll to upload section
//             uploadSection.scrollIntoView({ behavior: 'smooth' });
//         });
//     });

//     //File drop handling
//     dropZone.addEventListener('dragover', (e) => {
//         e.preventDefault();
//         dropZone.classList.add('drag-over');
//     });

//     dropZone.addEventListener('dragleave', (e) => {
//         e.preventDefault();
//         dropZone.classList.remove('drag-over');
//     });

//     dropZone.addEventListener('drop', (e) => {
//         e.preventDefault();
//         dropZone.classList.remove('drag-over');
        
//         if (e.dataTransfer.files) {
//             handleFiles(Array.from(e.dataTransfer.files));
//         }
//     });

//     //Click to upload
//     dropZone.addEventListener('click', () => {
//         const input = document.createElement('input');
//         input.type = 'file';
//         input.multiple = true;
//         input.accept = '.stl,.xml';
        
//         input.addEventListener('change', (e) => {
//             if (e.target.files) {
//                 handleFiles(Array.from(e.target.files));
//             }
//         });
        
//         input.click();
//     });

//     function handleFiles(newFiles) {
//         files = [...files, ...newFiles];
//         updateFileList();
//     }

//     function updateFileList() {
//         fileList.innerHTML = '';
//         files.forEach((file, index) => {
//             const fileItem = document.createElement('div');
//             fileItem.className = 'file-item';
//             fileItem.innerHTML = `
//                 <span>${file.name}</span>
//                 <button onclick="removeFile(${index})" class="remove-btn">×</button>
//             `;
//             fileList.appendChild(fileItem);
//         });
//     }

//     window.removeFile = function(index) {
//         files.splice(index, 1);
//         updateFileList();
//     };

//     submitButton.addEventListener('click', () => {
//         if (!certifyCheckbox.checked) {
//             alert('Please certify that the statements are true and correct.');
//             return;
//         }
        
//         if (files.length === 0) {
//             alert('Please upload at least one file.');
//             return;
//         }
        
//         if (!orderReference.value) {
//             alert('Please provide an order reference.');
//             return;
//         }
        
//         // Here you would typically send the files to a server
//         alert('Order submitted successfully!');
//         // Redirect to orders page or show confirmation
//         window.location.href = '/orders';
//     });
// });

const title = sessionStorage.getItem("selectedTitle");
const image = sessionStorage.getItem("selectedImage");
const selectedImage = document.getElementById('order-image');
selectedImage.src  = image;
const titleBox = document.getElementById('product');
const titleOption = document.createElement("option");
titleOption.textContent = title;
titleBox.appendChild(titleOption);
const dropZone = document.getElementById('dropZone');
const fileList = document.getElementById('fileList');
const toothContainer = document.getElementById('toothContainer');
let files = [];

// FILE UPLOAD HANDLING
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');

    if (e.dataTransfer.files.length > 0) {
        handleFiles(Array.from(e.dataTransfer.files));
    }
});

document.querySelector('.upload-btn').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.stl,.xml';

    input.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFiles(Array.from(e.target.files));
        }
    });

    input.click();
});

function handleFiles(newFiles) {
    files = [...files, ...newFiles];
    updateFileList();
    if (files.length > 0) {
        showToothIcons();  // Show tooth icons only when at least one file is uploaded
    }
}

function updateFileList() {
    fileList.innerHTML = '';
    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>${file.name}</span>
            <button onclick="removeFile(${index})" class="remove-btn">×</button>
        `;
        fileList.appendChild(fileItem);
    });
}

window.removeFile = function (index) {
    files.splice(index, 1);
    updateFileList();
    if (files.length === 0) {
        toothContainer.style.display = "none"; // Hide icons if no files left
    }
};

// SHOW TOOTH ICONS ONLY AFTER FILE UPLOAD
const detailsContainer = document.getElementById("detailsContainer");
const optionsContainer = document.getElementById("optionsContainer");
function showToothIcons() {
    toothContainer.innerHTML = ""; // Clear previous icons
    toothContainer.style.display = "flex"; // Make it visible

    const toothImages = [
        { id: 1, imgUrl: "img/tooth_1.png" },
        { id: 2, imgUrl: "img/tooth_1.png" },
        { id: 3, imgUrl: "img/tooth_1.png" },
        { id: 4, imgUrl: "img/tooth_1.png" },
        { id: 5, imgUrl: "img/tooth_1.png" },
        { id: 6, imgUrl: "img/tooth_1.png" },
        { id: 7, imgUrl: "img/tooth_1.png" },
        { id: 8, imgUrl: "img/tooth_1.png" },
        { id: 9, imgUrl: "img/tooth_1.png" },
        { id: 10, imgUrl: "img/tooth_1.png" },
        { id: 11, imgUrl: "img/tooth_1.png" },
        { id: 12, imgUrl: "img/tooth_1.png" },
        { id: 13, imgUrl: "img/tooth_1.png" },
        { id: 14, imgUrl: "img/tooth_1.png" },
        { id: 15, imgUrl: "img/tooth_1.png" },
        { id: 16, imgUrl: "img/tooth_1.png" },
        { id: 17, imgUrl: "img/tooth_1.png" },
        { id: 18, imgUrl: "img/tooth_1.png" },
        { id: 19, imgUrl: "img/tooth_1.png" },
        { id: 20, imgUrl: "img/tooth_1.png" },
        { id: 21, imgUrl: "img/tooth_1.png" },
        { id: 22, imgUrl: "img/tooth_1.png" },
        { id: 23, imgUrl: "img/tooth_1.png" },
        { id: 24, imgUrl: "img/tooth_1.png" },
        { id: 25, imgUrl: "img/tooth_1.png" },
        { id: 26, imgUrl: "img/tooth_1.png" },
        { id: 27, imgUrl: "img/tooth_1.png" },
        { id: 28, imgUrl: "img/tooth_1.png" },
        { id: 29, imgUrl: "img/tooth_1.png" },
        { id: 30, imgUrl: "img/tooth_1.png" },
        { id: 31, imgUrl: "img/tooth_1.png" },
        { id: 32, imgUrl: "img/tooth_1.png" }
      ];
      

    // toothImages.forEach((src, index) => {
    //     const toothElement = document.createElement("div");
    //     toothElement.classList.add("tooth");
    //     toothElement.style.backgroundImage = `url(${src.imgUrl})`;
    //     toothElement.setAttribute("data-id", index);

    //     // Toggle selection on click
    //     toothElement.addEventListener("click", function () {
    //         this.classList.toggle("selected");
    //     });

    //     toothContainer.appendChild(toothElement);
    // });
    toothImages.forEach((tooth, index) => {
        const toothWrapper = document.createElement("div");
        toothWrapper.classList.add("tooth-wrapper");
    
        const toothElement = document.createElement("div");
        toothElement.classList.add("tooth");
        toothElement.style.backgroundImage = `url(${tooth.imgUrl})`;
        toothElement.setAttribute("data-id", tooth.id);
    
        // Toggle selection on click
        toothElement.addEventListener("click", function () {
            this.classList.toggle("selected");
            const existingBox = document.getElementById(`details-${tooth.id}`);
        if (existingBox) {
            existingBox.remove(); // Remove box if already selected
        } else {
            addDetailsBox(tooth.id);
        }
        });
    
        const label = document.createElement("span");
        label.classList.add("tooth-label");
        label.textContent = tooth.id;
    
        toothWrapper.appendChild(toothElement);
        toothWrapper.appendChild(label);
        toothContainer.appendChild(toothWrapper);
    });

    const optionsBox = document.createElement("div");
    optionsBox.classList.add("radio-options-box");

    const group1 = document.createElement("div");
    group1.classList.add("group");
    const goldCoatingLabel = createLabel("i-ON Gold Coating", true);
    //goldCoatingLabel.classList.add("label-margin");
    const radioGroup1 = createRadioGroup(["Gold Hue (+SKU: TIN $26)", "None"], `radio1`);

    const group2 = document.createElement("div");
    group2.classList.add("group");
    const extraScrewLabel = createLabel("Extra Screw", true);
    const radioGroup2 = createRadioGroup(["i-ON Screw (+ $15 each)", "None"], `radio2`);

    group1.appendChild(goldCoatingLabel);
    group1.appendChild(radioGroup1);
    group2.appendChild(extraScrewLabel);
    group2.appendChild(radioGroup2);
    optionsBox.appendChild(group1);
    optionsBox.appendChild(group2);


    const selectBox1 = document.createElement("div");
    selectBox1.classList.add("radio-options-box");
    const group3 = document.createElement("div");
    group3.classList.add("group");
    const select1 = createSelect(["System 1", "System 2", "System 3"], "Library Used");
    group3.appendChild(select1);

    const group4 = document.createElement("div");
    group4.classList.add("group");
    const crownLabel = createLabel("Crown", true);
    const radioGroup3 = createRadioGroup(["With Crown", "None"], `radio2`);
    group4.appendChild(crownLabel);
    group4.appendChild(radioGroup3);

    const selectBox2 = document.createElement("div");
    selectBox2.classList.add("radio-options-box");
    const group5 = document.createElement("div");
    group5.classList.add("group");
    const select2 = createSelect(["System 1", "System 2", "System 3"], "Implant Lab Analogue");
    group5.appendChild(select2);

    selectBox1.appendChild(group3);
    selectBox1.appendChild(group4);
    selectBox2.appendChild(group5);


    const label = document.createElement("label");
    label.textContent = "Message";
    label.setAttribute("for", "messageBox");

    const textarea = document.createElement("textarea");
    textarea.id = "messageBox"; // Set ID to match label's "for" attribute
    textarea.placeholder = "You can leave any message here";
    textarea.rows = 5;
    textarea.style.width = "100%";

    optionsContainer.appendChild(optionsBox);
    optionsContainer.appendChild(selectBox1);
    optionsContainer.appendChild(selectBox2);


    function addDetailsBox(toothId) {
        const detailsBox = document.createElement("div");
        detailsBox.classList.add("details-box");
        detailsBox.id = `details-${toothId}`;
    
        // Tooth ID Label
        const toothLabel = document.createElement("h4");
        toothLabel.textContent = `${toothId}`;
    
        // Implant System (Picklist 1)
        // const implantSystemLabel = createLabel("Implant System", true);
        // const implantSystemSelect = createSelect(["System 1", "System 2", "System 3"]);
    
        // // Implant Size (Picklist 2)
        // const implantSizeLabel = createLabel("Implant Size", true);
        // const implantSizeSelect = createSelect(["Size A", "Size B", "Size C"]);
    
        // Create a row container for the two picklists
        const picklistRow = document.createElement("div");
        picklistRow.classList.add("picklist-row");

        const implantSystemSelect = createSelect(["System 1", "System 2", "System 3"], "Implant System");
        const implantSizeSelect = createSelect(["Size A", "Size B", "Size C"], "Implant Size");
        // picklistRow.appendChild(implantSystemLabel);
        picklistRow.appendChild(implantSystemSelect);
        // picklistRow.appendChild(implantSizeLabel);
        picklistRow.appendChild(implantSizeSelect);
    
        // Screw Channel (Radio Group)
        const screwChannelLabel = createLabel("Screw Channel", true);
        screwChannelLabel.classList.add("label-margin");
        const radioGroup = createRadioGroup(["Straight", "Angulated (+SKU: ANGCHN $20)"], `radio-${toothId}`);
    
        // Append elements to details box
        detailsBox.appendChild(toothLabel);
        detailsBox.appendChild(picklistRow);
        detailsBox.appendChild(screwChannelLabel);
        detailsBox.appendChild(radioGroup);
    
        detailsContainer.appendChild(detailsBox);
    }
    
    // Function to create a label with a red asterisk
    function createLabel(text, required = false) {
        const label = document.createElement("label");
        label.textContent = text;
        if (required) {
            const star = document.createElement("span");
            star.textContent = " *";
            star.style.color = "red";
            label.appendChild(star);
        }
        return label;
    }
    
    // Function to create a select dropdown
    // function createSelect(options) {
    //     const select = document.createElement("select");
    //     select.classList.add("custom-select");
    //     options.forEach((opt) => {
    //         const option = document.createElement("option");
    //         option.textContent = opt;
    //         select.appendChild(option);
    //     });
    //     return select;
    // }

    function createSelect(options, labelText) {
        const container = document.createElement("div");
        container.classList.add("custom-select-container");
    
        const label = document.createElement("label");
        label.classList.add("custom-label");
        label.innerHTML = labelText + '<span class="required-star">*</span>';
    
        const select = document.createElement("select");
        select.classList.add("custom-select");
    
        // Default option
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "Select options...";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        select.appendChild(defaultOption);
    
        // Add provided options
        options.forEach((opt) => {
            const option = document.createElement("option");
            option.textContent = opt;
            select.appendChild(option);
        });
    }
});

// Make removeFile available globally
(window as any).removeFile = removeFile;