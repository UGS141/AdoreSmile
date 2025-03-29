// Type definitions
// interface Order {
//     id: string;
//     product: string;
//     status: 'In Progress' | 'Completed' | 'Pending';
//     date: string;
// }

// interface ToothData {
//     id: number;
//     imgUrl: string;
//     label: string;
// }

// interface FileItem {
//     name: string;
//     type: string;
//     size: number;
// }

// Constants
// const orders: Order[] = [
//     { id: 'ORD-001', product: 'Milling Order', status: 'In Progress', date: '2024-03-15' },
//     { id: 'ORD-002', product: 'Design + Milling', status: 'Completed', date: '2024-03-14' },
//     { id: 'ORD-003', product: 'Scan + Design', status: 'Pending', date: '2024-03-13' }
// ];

// DOM Elements with type safety
const title: string | null = sessionStorage.getItem("selectedTitle");
const image: string | null = sessionStorage.getItem("selectedImage");
const dropZone: HTMLElement = document.getElementById('dropZone') as HTMLElement;
const fileList: HTMLElement = document.getElementById('fileList') as HTMLElement;
const toothContainer: HTMLElement = document.getElementById('toothContainer') as HTMLElement;
const orderImage: HTMLImageElement = document.getElementById("order-image") as HTMLImageElement;

if (orderImage && image) {
    orderImage.src = image;
}

// File handling
let files: File[] = [];

// Display orders with type safety
// function displayOrders(): void {
//     const tbody: HTMLElement | null = document.querySelector('#orderTable tbody');
//     if (tbody) {
//         tbody.innerHTML = orders.map((order: Order) => `
//             <tr>
//                 <td>${order.id}</td>
//                 <td>${order.product}</td>
//                 <td>${order.status}</td>
//                 <td>${order.date}</td> 
//                 <td>
//                     <button class="btn-download" onclick="downloadOrder('${order.id}')">
//                         Download
//                     </button>
//                 </td>
//             </tr>
//         `).join('');
//     }
// }

// Download functionality with type checking
function downloadOrder(orderId: string): void {
    const order: Order | undefined = orders.find(o => o.id === orderId);
    if (!order) return;

    const content: string = `
Order Details:
ID: ${order.id}
Product: ${order.product}
Status: ${order.status}
Date: ${order.date}
    `;

    const blob: Blob = new Blob([content], { type: 'text/plain' });
    const url: string = window.URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = `order-${orderId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// File upload handling with type safety
function handleDragOver(e: DragEvent): void {
    e.preventDefault();
    dropZone.classList.add('drag-over');
}

function handleDragLeave(e: DragEvent): void {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
}

function handleDrop(e: DragEvent): void {
    e.preventDefault();
    dropZone.classList.remove('drag-over');

    if (e.dataTransfer?.files.length > 0) {
        handleFiles(Array.from(e.dataTransfer.files));
    }
}

function handleFiles(newFiles: File[]): void {
    files = [...files, ...newFiles];
    updateFileList();
    if (files.length > 0) {
        showToothIcons();
    }
}

function updateFileList(): void {
    fileList.innerHTML = '';
    files.forEach((file: File, index: number) => {
        const fileItem: HTMLDivElement = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>${file.name}</span>
            <button onclick="removeFile(${index})" class="remove-btn">×</button>
        `;
        fileList.appendChild(fileItem);
    });
}

function removeFile(index: number): void {
    files.splice(index, 1);
    updateFileList();
    if (files.length === 0) {
        toothContainer.style.display = "none";
    }
}

// Tooth selection functionality
function showToothIcons(): void {
    const teethData: ToothData[] = Array.from({ length: 32 }, (_, i) => ({
        id: i + 1,
        imgUrl: "images/tooth_1.png",
        label: `Tooth ${i + 1}`
    }));

    toothContainer.innerHTML = "";
    toothContainer.style.display = "flex";

    teethData.forEach((tooth: ToothData) => {
        const toothWrapper: HTMLDivElement = document.createElement("div");
        toothWrapper.classList.add("tooth-wrapper");

        const toothElement: HTMLDivElement = document.createElement("div");
        toothElement.classList.add("tooth");
        toothElement.style.backgroundImage = `url(${tooth.imgUrl})`;
        toothElement.setAttribute("data-id", tooth.id.toString());

        toothElement.addEventListener("click", function(this: HTMLDivElement) {
            this.classList.toggle("selected");
            const existingBox = document.getElementById(`details-${tooth.id}`);
            if (existingBox) {
                existingBox.remove();
            } else {
                addDetailsBox(tooth.id);
            }
        });

        const label: HTMLSpanElement = document.createElement("span");
        label.classList.add("tooth-label");
        label.textContent = tooth.id.toString();

        toothWrapper.appendChild(toothElement);
        toothWrapper.appendChild(label);
        toothContainer.appendChild(toothWrapper);
    });

    setupOptionsContainer();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayOrders();
    
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);

    const uploadBtn = document.querySelector('.upload-btn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = '.stl,.xml';

            input.addEventListener('change', (e: Event) => {
                const target = e.target as HTMLInputElement;
                if (target.files?.length > 0) {
                    handleFiles(Array.from(target.files));
                }
            });

            input.click();
        });
    }
});

// Make removeFile available globally
(window as any).removeFile = removeFile;


// Fix syntax errors and improve code structure

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form elements and event listeners
    initializeFormElements();
    setupEventListeners();
    
    // Load saved data if available
    loadSavedData();
});

function initializeFormElements() {
    // Initialize date picker with current date
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);
    document.getElementById('orderDate').value = formattedDate;
    
    // Initialize select elements with Select2 if available
    if (typeof $.fn.select2 !== 'undefined') {
        $('.select2-dropdown').select2({
            placeholder: "Select an option",
            allowClear: true
        });
    }
}

function setupEventListeners() {
    // Add product button
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', addProduct);
    }
    
    // Form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleFormSubmit);
    }
    
    // File upload preview
    const fileInputs = document.querySelectorAll('.file-input');
    fileInputs.forEach(input => {
        input.addEventListener('change', handleFileUpload);
    });
    
    // Calculate totals when quantity or price changes
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('product-quantity') || 
            e.target.classList.contains('product-price')) {
            calculateTotals();
        }
    });
    
    // Remove product button
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-product')) {
            removeProduct(e.target);
        }
    });
}

function addProduct() {
    const productsContainer = document.getElementById('productsContainer');
    const productCount = productsContainer.children.length + 1;
    
    const productRow = document.createElement('div');
    productRow.className = 'product-row';
    productRow.innerHTML = `
        <div class="form-row">
            <div class="form-group col-md-5">
                <label for="productName${productCount}">Product Name</label>
                <input type="text" class="form-control product-name" id="productName${productCount}" required>
            </div>
            <div class="form-group col-md-2">
                <label for="productQuantity${productCount}">Quantity</label>
                <input type="number" class="form-control product-quantity" id="productQuantity${productCount}" min="1" value="1" required>
            </div>
            <div class="form-group col-md-2">
                <label for="productPrice${productCount}">Price</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                    </div>
                    <input type="number" class="form-control product-price" id="productPrice${productCount}" min="0" step="0.01" required>
                </div>
            </div>
            <div class="form-group col-md-2">
                <label for="productTotal${productCount}">Total</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                    </div>
                    <input type="text" class="form-control product-total" id="productTotal${productCount}" readonly>
                </div>
            </div>
            <div class="form-group col-md-1">
                <label class="d-block">&nbsp;</label>
                <button type="button" class="btn btn-danger remove-product">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    
    productsContainer.appendChild(productRow);
    
    // Add event listeners to new inputs
    const newQuantityInput = productRow.querySelector('.product-quantity');
    const newPriceInput = productRow.querySelector('.product-price');
    
    newQuantityInput.addEventListener('change', calculateTotals);
    newPriceInput.addEventListener('change', calculateTotals);
}

function removeProduct(button) {
    const productRow = button.closest('.product-row');
    if (productRow) {
        productRow.remove();
        calculateTotals();
    }
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const filePreview = e.target.parentElement.querySelector('.file-preview');
    if (!filePreview) return;
    
    // Clear previous preview
    filePreview.innerHTML = '';
    
    // Check file type
    if (file.type.startsWith('image/')) {
        // Image preview
        const img = document.createElement('img');
        img.classList.add('preview-image');
        img.file = file;
        
        filePreview.appendChild(img);
        
        const reader = new FileReader();
        reader.onload = (function(aImg) { 
            return function(e) { 
                aImg.src = e.target.result; 
            }; 
        })(img);
        
        reader.readAsDataURL(file);
    } else {
        // File icon for non-images
        const fileIcon = document.createElement('div');
        fileIcon.classList.add('file-icon');
        fileIcon.innerHTML = `
            <i class="fas fa-file"></i>
            <span>${file.name}</span>
        `;
        
        filePreview.appendChild(fileIcon);
    }
}

function calculateTotals() {
    let subtotal = 0;
    
    // Calculate each product total and subtotal
    const productRows = document.querySelectorAll('.product-row');
    productRows.forEach(row => {
        const quantity = parseFloat(row.querySelector('.product-quantity').value) || 0;
        const price = parseFloat(row.querySelector('.product-price').value) || 0;
        const total = quantity * price;
        
        row.querySelector('.product-total').value = total.toFixed(2);
        subtotal += total;
    });
    
    // Update order summary
    const subtotalElement = document.getElementById('subtotal');
    if (subtotalElement) {
        subtotalElement.textContent = '$' + subtotal.toFixed(2);
    }
    
    // Calculate tax (assuming 10% tax rate)
    const taxRate = 0.1;
    const tax = subtotal * taxRate;
    const taxElement = document.getElementById('tax');
    if (taxElement) {
        taxElement.textContent = '$' + tax.toFixed(2);
    }
    
    // Calculate total
    const total = subtotal + tax;
    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.textContent = '$' + total.toFixed(2);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Collect form data
    const formData = collectFormData();
    
    // Save data locally (could be replaced with API call)
    saveOrderData(formData);
    
    // Show success message
    showSuccessMessage();
    
    // Optionally redirect to order confirmation page
    // setTimeout(() => {
    //     window.location.href = 'order-confirmation.html';
    // }, 2000);
}

function validateForm() {
    // Basic form validation
    const form = document.getElementById('orderForm');
    if (!form.checkValidity()) {
        // Trigger browser's native validation UI
        form.reportValidity();
        return false;
    }
    
    // Additional custom validation can be added here
    
    return true;
}

function collectFormData() {
    const formData = {
        customer: {
            name: document.getElementById('customerName').value,
            email: document.getElementById('customerEmail').value,
            phone: document.getElementById('customerPhone').value,
            address: document.getElementById('customerAddress').value
        },
        order: {
            date: document.getElementById('orderDate').value,
            number: generateOrderNumber(),
            products: []
        }
    };
    
    // Collect products data
    const productRows = document.querySelectorAll('.product-row');
    productRows.forEach(row => {
        formData.order.products.push({
            name: row.querySelector('.product-name').value,
            quantity: parseInt(row.querySelector('.product-quantity').value),
            price: parseFloat(row.querySelector('.product-price').value),
            total: parseFloat(row.querySelector('.product-total').value)
        });
    });
    
    return formData;
}

function generateOrderNumber() {
    // Generate a unique order number (timestamp-based)
    return 'ORD-' + Date.now();
}

function saveOrderData(data) {
    // Save to localStorage for demo purposes
    localStorage.setItem('lastOrder', JSON.stringify(data));
    
    // In a real application, you would send this data to a server
    // using fetch or axios
    console.log('Order data saved:', data);
}

function loadSavedData() {
    // Load previously saved data if available
    const savedData = localStorage.getItem('lastOrder');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            // Populate form with saved data
            // This is just a placeholder - implement as needed
            console.log('Loaded saved data:', data);
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

function showSuccessMessage() {
    // Create and show success message
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success mt-3';
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        <h4 class="alert-heading">Order Submitted Successfully!</h4>
        <p>Your order has been received and is being processed.</p>
        <hr>
        <p class="mb-0">Order number: ${generateOrderNumber()}</p>
    `;
    
    const formContainer = document.querySelector('.form-container');
    formContainer.insertBefore(alertDiv, formContainer.firstChild);
    
    // Scroll to top to show the message
    window.scrollTo(0, 0);
    
    // Remove the message after some time
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}