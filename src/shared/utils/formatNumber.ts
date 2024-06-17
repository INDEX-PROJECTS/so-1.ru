export function formatNumber(num: number | string, separator = ' ') {
    const numStr = num.toString();

    const regex = separator === '.' ? /\B(?=(\d{3})+(?!\d))/g : /\B(?=(\d{3})+(?!\d))/g;

    return numStr.replace(regex, separator);
}
