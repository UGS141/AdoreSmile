// Type definitions
interface Order {
    id: string;
    product: string;
    status: 'In Progress' | 'Completed' | 'Pending';
    date: string;
}

interface ToothData {
    id: number;
    imgUrl: string;
    label: string;
}

interface FileItem {
    name: string;
    type: string;
    size: number;
}

// Constants
const orders: Order[] = [
    { id: 'ORD-001', product: 'Milling Order', status: 'In Progress', date: '2024-03-15' },
    { id: 'ORD-002', product: 'Design + Milling', status: 'Completed', date: '2024-03-14' },
    { id: 'ORD-003', product: 'Scan + Design', status: 'Pending', date: '2024-03-13' }
];

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
function displayOrders(): void {
    const tbody: HTMLElement | null = document.querySelector('#orderTable tbody');
    if (tbody) {
        tbody.innerHTML = orders.map((order: Order) => `
            <tr>
                <td>${order.id}</td>
                <td>${order.product}</td>
                <td>${order.status}</td>
                <td>${order.date}</td>
                <td>
                    <button class="btn-download" onclick="downloadOrder('${order.id}')">
                        Download
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

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