export function validateTask({ title, datetime, location }) {
    const errors = {};
    if (!title || !title.trim()) errors.title = 'Title is required';
    if (!datetime) errors.datetime = 'Date & time is required';
    if (!location || !location.trim()) errors.location = 'Location is required';
    return { valid: Object.keys(errors).length === 0, errors };
}
