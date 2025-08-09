export function formatDateTime(ms) {
    if (!ms) return '';
    const d = new Date(ms);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function compareByStatus(a, b) {
    const order = ['Todo', 'In Progress', 'Completed', 'Cancelled'];
    return order.indexOf(a.status) - order.indexOf(b.status);
}
