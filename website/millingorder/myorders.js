const orders = [
    { orderNo: "ORD-28431", trackingNo: "TRK-9843", orderRef: "AO-IMPLANT-123", jobType: "Implant Case", orderDate: "2025-02-28", status: "Shipped", shippedBy: "FedEx", shippedDate: "2025-03-01" },
    { orderNo: "ORD-28432", trackingNo: "TRK-9844", orderRef: "AO-EMAX-456", jobType: "CAD emax Crown", orderDate: "2025-03-02", status: "Processing", shippedBy: "DHL", shippedDate: "" },
    { orderNo: "ORD-28433", trackingNo: "TRK-9845", orderRef: "AO-ZIRCON-789", jobType: "Zirconia Bridge", orderDate: "2025-03-05", status: "Completed", shippedBy: "UPS", shippedDate: "2025-03-08" }
];

// Function to render orders dynamically
function loadOrders(filteredOrders = orders) {
    const tableBody = document.getElementById("orderTableBody");
    tableBody.innerHTML = ""; // Clear previous rows

    filteredOrders.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.orderNo}</td>
            <td>${order.trackingNo}</td>
            <td>${order.orderRef}</td>
            <td>${order.jobType}</td>
            <td>${order.orderDate}</td>
            <td><span class="status-${order.status.toLowerCase()}">${order.status}</span></td>
            <td>${order.shippedBy}</td>
            <td>${order.shippedDate || "N/A"}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to filter orders based on input values
function filterOrders() {
    const orderNo = document.getElementById("orderNo").value.toLowerCase();
    const orderRef = document.getElementById("orderRef").value.toLowerCase();
    const orderDate = document.getElementById("orderDate").value;
    const status = document.getElementById("status").value;

    const filteredOrders = orders.filter(order => 
        (orderNo === "" || order.orderNo.toLowerCase().includes(orderNo)) &&
        (orderRef === "" || order.orderRef.toLowerCase().includes(orderRef)) &&
        (orderDate === "" || order.orderDate === orderDate) &&
        (status === "" || order.status === status)
    );

    loadOrders(filteredOrders);
}

// Function to reset filters
function resetFilters() {
    document.getElementById("orderNo").value = "";
    document.getElementById("orderRef").value = "";
    document.getElementById("orderDate").value = "";
    document.getElementById("status").value = "";
    loadOrders();
}

// Initial Load
document.addEventListener("DOMContentLoaded", () => loadOrders());
