export async function generateWorldData(width, height, x, y) {
    const types = ["r", "i", "g", "s", "d"];
    const arr = Array.from({ length: width }, () =>
        Array.from({ length: height }, () => ({ t: types[Math.floor(Math.random() * types.length)] }))
    );
    return arr;
}
